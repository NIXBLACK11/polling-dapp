import { Route, Routes } from 'react-router-dom'
import { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import './App.css'
import '@solana/wallet-adapter-react-ui/styles.css';

import { Home } from './pages/Home'

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
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
	)
}

export default App;