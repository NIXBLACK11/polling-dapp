import { Vote } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Vote className="h-8 w-8 text-black" />
                    <span className="text-xl font-semibold">PollApp</span>
                </div>
                <WalletMultiButton />
            </div>
        </div>
    </div>
  );
};