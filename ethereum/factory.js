import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb831fB7c7f79b8667239Be77926C9065D187E5eA'
);

export default instance;
