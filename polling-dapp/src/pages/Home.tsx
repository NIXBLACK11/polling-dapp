import { fetchUser, fetchUserDetails, initializeUser } from "@/anchor/methods";
import { profileState } from "@/atom";
import SimpleForm from "@/components/CreatePoll"
import { Navbar } from "@/components/Navbar";
import PollDisplay from "@/components/PollDisplay";
import { PollData } from "@/types/Poll";
import useAlert from "@/utility/useAlert";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BookCheck, LucideAlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export const Home = () => {
	const [profileAccount, setProfileAccount] = useRecoilState(profileState);
	const [loading, setLoading] = useState(false);
	const [pollData, setPollData] = useState<PollData[] | null>(null);
	const { publicKey, sendTransaction } = useWallet();
	const { showAlert } = useAlert();
	const { connection } = useConnection();

	useEffect(()=>{
		const fetchData = async () => {
			if(!publicKey) {
				setProfileAccount({
					authority: null,
					totalPolls: 0,
				});
				return;
			}

			const profile = await fetchUser(publicKey);

			if(!profile || !profile.authority) {
				setProfileAccount({
					authority: null,
					totalPolls: 0,
				});
				return;
			}
			setProfileAccount(profile);
		}

		fetchData();
	}, [publicKey]);

	useEffect(() => {
		const fetchUserData = async () => {
			if(!publicKey) {
			  setProfileAccount({
			    authority: null,
			    totalPolls: 0,
			  });
			  return;
			}
		
			const fetchedPollData = await fetchUserDetails(publicKey);
			if(!fetchedPollData) {
				setPollData(null)
				return;
			};
			setPollData(fetchedPollData);
		}

		fetchUserData();
	}, [publicKey]);

	const initUser = async () => {
		if(!publicKey) {
			setProfileAccount({
				authority: null,
				totalPolls: 0,
			});
			showAlert({
				icon: LucideAlertCircle,
				title: "Error creating User Profile",
				description: "To create first you need to connect your wallet!",
				className: "destructive",
				duration: 3000,
			});
			setLoading(false);
			return;
		}

		const profile = await initializeUser(publicKey, sendTransaction, connection);

		if(!profile || !profile.authority) {
			setProfileAccount({
				authority: null,
				totalPolls: 0,
			});
			showAlert({
				icon: LucideAlertCircle,
				title: "Error in user creation",
				description: "Try after sometime!!!",
				duration: 3000,
				className: "destructive",
			});
			setLoading(false);
			return;
		}

		setProfileAccount(profile);
		showAlert({
			icon: BookCheck,
			title: "User created successfully",
			description: "You can create polls now!",
			duration: 3000,
		});
		setLoading(false);
	}

	return (
		<div className="w-screen h-screen text-[#000000] bg-[#ffffff] overflow-x-hidden">
			<Navbar />
			{(profileAccount.authority!=null) ? 
				<div className="container mx-auto py-20">
					<div className="columns-1 md:columns-2 lg:columns-3 gap-4">
						<div className="break-inside-avoid-column mb-4">
								<SimpleForm />
						</div>
						
						{/* PollDisplays */}
						{pollData && pollData.length > 0 ? (
							pollData.map((poll, index) => (
								<div key={index} className="break-inside-avoid-column mb-4">
								<PollDisplay
									polled={poll.polled}
									authority={poll.authority}
									idx={poll.idx}
									description={poll.description}
									option1={poll.option1}
									option2={poll.option2}
									option1Count={poll.option1Count}
									option2Count={poll.option2Count}
									endTime={new Date(poll.endTime * 1000)}
								/>
								</div>
							))
							) : (
							<p>No polls available.</p>
						)}
					</div>
				</div>
			: 
				<div className="h-screen w-screen flex items-center justify-center">
					{(loading) ? 
						<button
							className="flex justify-center items-center text-black outline bg-white p-4 rounded absolute"
						>
							Loading...
						</button>
						:
						<button
							className="flex justify-center items-center text-black outline bg-white p-4 rounded absolute hover:bg-slate-300"
							onClick={()=>{
								initUser();
								setLoading(true);
							}}
						>
							Initialize User
						</button>
					}
				</div>
			}
		</div>
	)
}