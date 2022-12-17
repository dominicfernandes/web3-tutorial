import React from 'react';
import { getProvider, getWeb3 } from './web3';
import Web3 from 'web3';
import ERC20ABI from './abi/ERC20.json';
import { tokenAddress } from './tokenConfigs';

const connectWallet = async () => {
  const web3 =  getWeb3();
  await web3.eth.requestAccounts();
  registerEvents();
}

const registerEvents = () => {
  const provider = getProvider();

  provider.on("accountsChanged", (accounts: string[]) => {
    console.log(accounts)
  });

  provider.on('chainChanged', (chainId: number) => {
    console.log(Web3.utils.toDecimal(chainId))
  });
};

const getTokenName = async() => {
  const web3 = getWeb3();
  const contract = new web3.eth.Contract(ERC20ABI as any, tokenAddress.ethereum.chainLink);
  const result = await contract.methods.approve("0x4a5c8a9FC9b2Da27E46057584F3E08A1aC90F958", Web3.utils.toWei("10")).send({
    from: "0x2551e9C45860ca011C8f8df6B62F0f4d7473a3e9",
  });
  console.log(result);
}

function App() {
  return (
    <div className="App">
        <button onClick={connectWallet}>Connect</button>
        <button onClick={getTokenName}>Get Name</button>
    </div>
  );
}

export default App;

