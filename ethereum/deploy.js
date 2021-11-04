const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  '',
  'https://rinkeby.infura.io/v3/f2a05a8165aa4b1283f589dc177ed2c9'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000', gasPrice: '5000000000' });

  console.log('Contract deployed to', result.options.address);
};
deploy();
