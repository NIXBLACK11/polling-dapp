import { LucideAlertCircle, Vote } from 'lucide-react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { initializeUser } from "@/anchor/methods";
import useAlert from '@/utility/useAlert';

export const Navbar = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { showAlert } = useAlert();
  const { connection } = useConnection();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Vote className="h-8 w-8 text-black" />
                    <span className="text-xl font-semibold">PollApp</span>
                </div>
                <WalletMultiButton />
                <button
                  className="bg-red-500"
                  onClick={async ()=>{
                    if(!publicKey || !sendTransaction) {
                      console.log("publicKey or senTransaction not provided");
                      showAlert({
                        icon: LucideAlertCircle,
                        title: "Error",
                        description: "To create first you need to connect your wallet!",
                        className: "destructive",
                        duration: 3000,
                      });
                      return;
                    }

                    const tx = await initializeUser(publicKey, sendTransaction, connection);
                    if(!tx) {
                      console.log("Empty tx");
                      return;
                    }

                    console.log(tx);
                  }}
			          >Click me</button>
            </div>
        </div>
    </div>
  );
};