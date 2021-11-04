import { Button, Card } from 'semantic-ui-react';
import Link from 'next/link';

import factory from '../../ethereum/factory';

const Index = ({ campaigns }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => ({
      header: address,
      description: (
        <Link href={`/campaign/${address}`}>
          <a>View Campaign</a>
        </Link>
      ),
      fluid: true,
    }));

    return <Card.Group items={items} />;
  };

  return (
    <div>
      <h3>Open Campaigns</h3>
      <Link href='/campaign/new'>
        <a>
          <Button
            floated='right'
            content='Create Campaign'
            icon='add circle'
            primary
          />
        </a>
      </Link>
      {renderCampaigns()}
    </div>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
};
