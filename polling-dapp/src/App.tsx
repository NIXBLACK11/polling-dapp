import { Route, Routes } from 'react-router-dom'
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import './App.css'
import '@solana/wallet-adapter-react-ui/styles.css';

import { Home } from './pages/Home'
import { useRecoilValue } from 'recoil';
import { alertState } from './atom';
import CustomAlert from './components/Alert';
import { SharePoll } from './pages/SharePoll';
import { Landing } from './pages/Landing';

const GlobalAlert = () => {
    const alert = useRecoilValue(alertState);
  
    if (!alert.visible) return null;
  
    return (
      <CustomAlert
        icon={alert.icon}
        title={alert.title}
        description={alert.description}
        className={alert.className}
      />
    );
  };

function App() {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
 
    const wallets = useMemo(
        () => [],
        [network]
    );
	return (
		<ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <GlobalAlert />
                    <Routes>
                      <Route path='/' element={<Landing />} />
                      <Route path="/polls" element={<Home />} />
                      <Route path="/share" element={<SharePoll />} />
                    </Routes>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
	)
}

export default App;