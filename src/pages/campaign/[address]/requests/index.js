import { Button, Table } from 'semantic-ui-react';
import Link from 'next/link';

import Campaign from '../../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';

const CampaignRequests = ({
  address,
  requests,
  requestCount,
  approversCount,
}) => (
  <>
    <h3>Campaign Requests</h3>
    <Link href={`/campaign/${address}/requests/new`}>
      <a>
        <Button primary floated='right' style={{ marginBottom: 10 }}>
          New Request
        </Button>
      </a>
    </Link>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Recipient</Table.HeaderCell>
          <Table.HeaderCell>Approval Count</Table.HeaderCell>
          <Table.HeaderCell>Approve</Table.HeaderCell>
          <Table.HeaderCell>Finalize</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {requests.map((request, index) => (
          <RequestRow
            key={request.description}
            id={index}
            request={request}
            address={address}
            approversCount={approversCount}
          />
        ))}
      </Table.Body>
    </Table>
    <div>Found {requestCount} requests</div>
  </>
);

export default CampaignRequests;

export const getServerSideProps = async (context) => {
  const { address } = context.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  console.log(approversCount);

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((_, index) => campaign.methods.requests(index).call())
  );

  const formatedRequests = requests.map((request) => ({
    description: request.description,
    value: request.value,
    recipient: request.recipient,
    complete: request.complete,
    approvalCount: request.approvalCount,
  }));

  return {
    props: {
      address,
      requests: formatedRequests,
      requestCount,
      approversCount,
    },
  };
};
