import { useRouter } from 'next/router';
import { useState } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../../ethereum/campaign';
import web3 from '../../../../../ethereum/web3';

const NewCampaignRequest = ({ address }) => {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    const campaign = Campaign(address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      router.push(`/campaign/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <h3>New Campaign Request</h3>
      <Form error={!!errorMessage} onSubmit={onSubmit}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value (ether)</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Message error header='Oops!' content={errorMessage} />
        <Button loading={loading} disabled={loading} primary>
          Create
        </Button>
      </Form>
    </>
  );
};

export default NewCampaignRequest;

export const getServerSideProps = (context) => {
  const { address } = context.query;

  return {
    props: {
      address,
    },
  };
};
