import React from 'react';
import { ConnectWalletButton } from './components/ConnectWalletButton';
import { TokenDetails } from './components/TokenDetails';

function App() {
  return (
    <div className="App">
        <ConnectWalletButton />
        <TokenDetails />
    </div>
  );
}

export default App;

