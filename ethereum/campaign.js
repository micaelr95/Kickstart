import web3 from './web3';
import CampaignContract from './build/Campaign.json';

const Campaign = (address) => {
  return new web3.eth.Contract(JSON.parse(CampaignContract.interface), address);
};

export default Campaign;
