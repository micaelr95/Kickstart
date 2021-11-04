import { Button, Card, Grid } from 'semantic-ui-react';
import Link from 'next/link';

import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import ContributeForm from '../../../components/ContributeForm';

const CampaignDetails = ({
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const items = [
    {
      header: manager,
      meta: 'Address of Manager',
      description:
        'The manager created this campaign and can create requests to withdraw money.',
      style: { overflowWrap: 'break-word' },
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description:
        'You must contribute at least this much wei to become an approver.',
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description:
        'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description:
        'Number of people that have already donated to this campaign.',
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description:
        'The balance is how much money this campaign has left to spend.',
    },
  ];

  return (
    <>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width='10'>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width='6'>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaign/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default CampaignDetails;

export const getServerSideProps = async (context) => {
  const campaign = Campaign(context.query.address);

  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      address: context.query.address,
      minimumContribution: summary['0'],
      balance: summary['1'],
      requestsCount: summary['2'],
      approversCount: summary['3'],
      manager: summary['4'],
    },
  };
};
