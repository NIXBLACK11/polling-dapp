import { fetchPoll } from "@/anchor/methods";
import { Navbar } from "@/components/Navbar";
import PollDisplay from "@/components/PollDisplay";
import { PollData } from "@/types/Poll";
import useAlert from "@/utility/useAlert";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { LucideAlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SharePoll = () => {
    const [pollData, setPollData] = useState<PollData>();
    const [searchParams] = useSearchParams();
    const poll = searchParams.get("poll");
    const { publicKey } = useWallet();
	const { showAlert } = useAlert();

    useEffect(() => {
        const fetchPollDetails = async () => {
            if(!poll) {
                showAlert({
                    icon: LucideAlertCircle,
                    title: "Need to get a poll first",
                    description: "Not available!",
                    duration: 3000,
                });
                return;
            }

            if(!publicKey) {
                showAlert({
                    icon: LucideAlertCircle,
                    title: "Need to connect wallet first",
                    description: "Not available!",
                    duration: 3000,
                });
                return;
            }

            const fetchedPollDetails = await fetchPoll(publicKey, new PublicKey(poll));
            if(!fetchedPollDetails) {
                showAlert({
                    icon: LucideAlertCircle,
                    title: "No such poll exists",
                    description: "Try some other poll",
                    duration: 3000,
                });
                return;
            }
            setPollData(fetchedPollDetails);

        }

        fetchPollDetails();
    })

    return (
        <div className="w-screen h-screen text-[#000000] bg-[#ffffff] overflow-x-hidden flex items-center ">
			<Navbar />
            {(pollData) && <PollDisplay
                polled={pollData.polled}
                idx={pollData.idx}
                description={pollData.description}
                option1={pollData.option1}
                option2={pollData.option2}
                option1Count={pollData.option1Count}
                option2Count={pollData.option2Count}
                endTime={new Date(pollData.endTime * 1000)}
                pollAccountPDA={pollData.pollAccountPDA}
            />}
        </div>
    )
}