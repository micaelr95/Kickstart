import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import factory from '../../../ethereum/factory';
import web3 from '../../../ethereum/web3';

const NewCampaign = () => {
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <h3>Create a Campaign</h3>
      <Form error={!!errorMessage} onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
            type='number'
          />
        </Form.Field>
        <Message error header='Oops!' content={errorMessage} />
        <Button loading={loading} disabled={loading} primary type='submit'>
          Create
        </Button>
      </Form>
    </>
  );
};

export default NewCampaign;
