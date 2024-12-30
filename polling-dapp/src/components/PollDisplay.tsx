import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PublicKey } from '@solana/web3.js';
import { selectOption } from '@/anchor/methods';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRecoilState } from 'recoil';
import { profileState } from '@/atom';
import useAlert from '@/utility/useAlert';
import { BookCheck, Copy, LucideAlertCircle } from 'lucide-react';
import { Progress } from './ui/progress';

interface PollProps {
  polled: boolean;
  authority: PublicKey;
  idx: number;
  description: string;
  option1: string;
  option2: string;
  option1Count: number;
  option2Count: number;
  endTime: Date;
  pollAccountPDA: PublicKey;
}

const PollDisplay = ({ polled, authority, idx, description, option1, option2, option1Count, option2Count, endTime, pollAccountPDA }: PollProps) => {
  const { showAlert } = useAlert();
  const { connection } = useConnection();
  const [isExpired, setIsExpired] = useState(false);
  const { publicKey, sendTransaction } = useWallet();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [_profileAccount, setProfileAccount] = useRecoilState(profileState);
  const [option1Percent, setOption1Percent] = useState<number>();
  const [option2Percent, setOption2Percent] = useState<number>();  

  useEffect(() => {
    const totalVotes = option1Count + option2Count;
    if(totalVotes==0) {
      return;
    }
    setOption1Percent(Math.round((option1Count / totalVotes) * 100));
    setOption2Percent(Math.round((option2Count / totalVotes) * 100));
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft("Poll ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const handleVote = async () => {
    let option = -1;
    if (selectedOption) {
      if(selectedOption==option1) {
        option  = 1;
      } else {
        option = 2;
      }
    }

    if(!publicKey) {
      setProfileAccount({
        authority: null,
        totalPolls: 0,
      });
      return;
    }

    const tx = await selectOption(publicKey, sendTransaction, connection, authority, idx, option);

    if(!tx) {
			showAlert({
				icon: LucideAlertCircle,
				title: "You might have already made a choice, stick to it😠",
				description: "Try some other poll",
				duration: 3000,
			});
		} else {
			showAlert({
				icon: BookCheck,
				title: "You have selected a option successfully!",
				description: "Thanks for polling!!",
				duration: 3000,
			});
		}
  };

  const handleCopyLink = async () => {
    try {
      const pollUrl = `${window.location.origin}/share?poll=${pollAccountPDA}`;
      await navigator.clipboard.writeText(pollUrl);
      showAlert({
				icon: LucideAlertCircle,
				title: "Link copied!!",
				description: "Share this to invite others",
				duration: 3000,
			});
    } catch (err) {
      showAlert({
				icon: BookCheck,
				title: "Unable to copy link!",
				description: "Try after some time!!",
				duration: 3000,
			});
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">Poll</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Time remaining: {timeLeft}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {polled==false ? 
        <div className="space-y-4">
          <p className="text-lg">{description}</p>

          <RadioGroup
            disabled={isExpired}
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">{option1}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">{option2}</Label>
            </div>
          </RadioGroup>
        </div> : 
        <div className="space-y-4">
          <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{option1}</Label>
                <span className="text-sm text-muted-foreground">{option1Percent}%</span>
              </div>
              <Progress value={option1Percent} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{option1Count} votes</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">{option2}</Label>
                <span className="text-sm text-muted-foreground">{option2Percent}%</span>
              </div>
              <Progress value={option2Percent} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{option2Count} votes</p>
            </div>
        </div>}

        <Button 
          className="w-full" 
          disabled={!selectedOption || isExpired}
          onClick={handleVote}
        >
          {isExpired ? "Poll Ended" : "Vote"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PollDisplay;