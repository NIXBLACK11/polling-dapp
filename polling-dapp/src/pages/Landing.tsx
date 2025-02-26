import { Twitter, Lock, Share2, Link, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className="min-h-screen bg-white text-black">
        {/* Navigation */}
        <nav className="flex justify-between items-center p-6 bg-white fixed top-0 w-full z-50">
            <div className="font-bold flex text-3xl"><Link />ChainPoll</div>
            <div className="space-x-4">
                <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-black"
                    onClick={() => scrollToSection("features")}
                >
                    Features
                </Button>
                <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-black"
                    onClick={() => scrollToSection("recommend")}
                >
                    Recommend
                </Button>
                <Button 
                    variant="outline" onClick={()=>{navigate("/polls")}} 
                    className="border-black hover:bg-black hover:text-white"
                >
                    Get Started
                </Button>
            </div>
        </nav>

        {/* Hereo Section */}
        <div className="mt-20 h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <main className="container mx-auto px-6 py-40 text-center">
                <h1 className="text-8xl font-bold mb-6">
                Decentralized Polling
                <br />
                Powered by Solana
                </h1>
                <p className="text-gray-600 text-2xl mb-8 max-w-2xl mx-auto">
                Create secure, verifiable polls that can be shared instantly on Twitter. 
                Powered by Solana for maximum transparency and security.
                </p>
                <div className="space-x-4">
                    <Button className="bg-black text-white hover:bg-gray-800 text-xl" onClick={()=>{navigate("/polls")}}>
                        Get Started
                    </Button>
                    <Button variant="outline" className="border-black text-xl hover:bg-black hover:text-white" onClick={()=>{window.open('https://github.com/NIXBLACK11/polling-dapp', '_blank', 'noopener,noreferrer')}}>
                        GitHub
                    </Button>
                </div>
            </main>
        </div>

        {/* Features */}
        <section  id="features" className="container mx-auto px-6 py-24">
            <h2 className="text-6xl font-bold mb-12 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                <Lock className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Web3 Security</h3>
                <p className="text-gray-600">
                    Blockchain-backed polls with cryptographic verification and 
                    transparent vote counting.
                </p>
                </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                <Twitter className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Twitter Integration(Coming Soon)</h3>
                <p className="text-gray-600">
                    Share polls directly to Twitter as interactive blinks. 
                    Engage your audience instantly.
                </p>
                </CardContent>
            </Card>

            <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                <Share2 className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy Sharing</h3>
                <p className="text-gray-600">
                    Generate unique links for your polls and share them 
                    across any platform.
                </p>
                </CardContent>
            </Card>
            </div>
        </section>

        {/* Recommend */}
        <section  id="recommend" className="container mx-auto px-6 py-24">
        <h2 className="text-6xl font-bold mb-12 text-center">Recommend</h2>
        <div className="max-w-2xl mx-auto">
            <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-8 text-center">
                <MessageSquarePlus className="h-16 w-16 mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">Request a Feature</h3>
                <p className="text-gray-600 mb-6">
                Have an idea for making ChainPoll better? We'd love to hear from you! 
                Submit your feature requests and help shape the future of decentralized polling.
                </p>
                <Button 
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => window.open('https://github.com/NIXBLACK11/polling-dapp/issues', '_blank')}
                >
                Submit Feature Request
                </Button>
            </CardContent>
            </Card>
        </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-20">
            <div className="container mx-auto px-6 py-8">
                <p className="text-center text-gray-600 items-center">
                    Proudly Open Source • Built with 
                    Rust <img src="rust.png" alt="Rust" className="inline-block h-[1.5em] w-[1.5em] mx-1" /> + 
                    Typescript <img src="ts.png" alt="TypeScript" className="inline-block h-[1em] w-[1.5em] mx-1" />
                </p>
            </div>
        </footer>
        </div>
    );
};