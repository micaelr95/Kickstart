import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We are in the browser and metamask is running
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server or the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/f2a05a8165aa4b1283f589dc177ed2c9'
  );
  web3 = new Web3(provider);
}

export default web3;
