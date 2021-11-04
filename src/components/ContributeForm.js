import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import web3 from '../../ethereum/web3';
import Campaign from '../../ethereum/campaign';

const ContributeForm = ({ address }) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');
    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      router.push(`/campaign/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setValue('');
    setLoading(false);
  };

  return (
    <Form error={!!errorMessage} onSubmit={onSubmit}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          label='ether'
          labelPosition='right'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </Form.Field>
      <Message error header='Oops!' content={errorMessage} />
      <Button loading={loading} disabled={loading} primary>
        Contribute!
      </Button>
    </Form>
  );
};

export default ContributeForm;
