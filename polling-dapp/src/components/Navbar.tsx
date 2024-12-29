import { fetchUser } from '@/anchor/methods';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Vote } from 'lucide-react';

export const Navbar = () => {
  const { publicKey } = useWallet();
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
                  onClick={()=>{
                    if(!publicKey) {
                      console.log("No pub key");
                      return;
                    }
                    fetchUser(publicKey);
                  }}
                >
                  Click me!!
                </button>
            </div>
        </div>
    </div>
  );
};