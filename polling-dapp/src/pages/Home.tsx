import SimpleForm from "@/components/CreatePoll"
import { Navbar } from "@/components/Navbar";
import PollDisplay from "@/components/PollDisplay";
import { Poll } from "@/types/Poll";

export const Home = () => {

	const polls: Poll[] = [
		{
			description: "What's your favorite color?jufvbf vbf nb gfb gfb gfb gfb gfb gf ngh fbx vdf nsbafdsb gsd fbv afdsv dafbvdafba fdb fda bafd",
			option1: "Blue",
			option2: "Red",
			endTime: new Date('2024-12-31'),
		},
		{
			description: "What's your favorite fruit?",
			option1: "Apple",
			option2: "Banana",
			endTime: new Date('2024-11-30'),
		},
		{
			description: "What's your favorite season?",
			option1: "Summer",
			option2: "Winter",
			endTime: new Date('2025-01-15'),
		},
		{
			description: "What's your favorite color?jufvbf vbf nb gfb gfb gfb gfb gfb gf ngh fbx vdf nsbafdsb gsd fbv afdsv dafbvdafba fdb fda bafd",
			option1: "Blue",
			option2: "Red",
			endTime: new Date('2024-12-31'),
		},
		{
			description: "What's your favorite fruit?",
			option1: "Apple",
			option2: "Banana",
			endTime: new Date('2024-11-30'),
		},
	];

	return (
		<div className="w-screen h-screen text-[#000000] bg-[#ffffff]">
			<Navbar />

			<div className="container mx-auto p-4 pt-20">
			  <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
				<div className="break-inside-avoid-column mb-4">
				  	<SimpleForm />
				</div>
				
				{/* PollDisplays */}
				{polls.map((poll, index) => (
				  <div key={index} className="break-inside-avoid-column mb-4">
					<PollDisplay
						description={poll.description}
						option1={poll.option1}
						option2={poll.option2}
						endTime={poll.endTime}
					/>
				  </div>
				))}
			  </div>
			</div>
		</div>
	)
}