import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PollProps {
  description: string;
  option1: string;
  option2: string;
  endTime: Date;
}

const PollDisplay = ({ description, option1, option2, endTime }: PollProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

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

  const handleVote = () => {
    if (selectedOption) {
      console.log(`Voted for: ${selectedOption}`);
      // Here you would typically make an API call to submit the vote
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Poll</CardTitle>
        <p className="text-sm text-muted-foreground mt-2">Time remaining: {timeLeft}</p>
      </CardHeader>
      <CardContent className="space-y-6">
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
        </div>

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