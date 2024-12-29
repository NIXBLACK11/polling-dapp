import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { BookCheck, CalendarIcon, LucideAlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { makePoll } from "@/anchor/methods"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import useAlert from "@/utility/useAlert"
import { useRecoilState } from "recoil"
import { profileState } from "@/atom"
import { BN } from "@coral-xyz/anchor"
import { useState } from "react"

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  option1: z.string().min(1, {
    message: "Option 1 is required.",
  }),
  option2: z.string().min(1, {
    message: "Option 2 is required.",
  }),
  endTime: z.date({
    required_error: "End time is required.",
  }),
})

export function PollForm() {
	const [_profileAccount, setProfileAccount] = useRecoilState(profileState);
  const [loading, setLoading] = useState(false);
  const { publicKey, sendTransaction } = useWallet();
	const { showAlert } = useAlert();
	const { connection } = useConnection();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      option1: "",
      option2: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const endTime = new Date(values.endTime);
    const unixEpochTime = Math.floor(endTime.getTime() / 1000);

    if(!publicKey) {
        showAlert({
          icon: LucideAlertCircle,
          title: "User does not exist",
          description: "To create first you need to connect your wallet!",
          className: "destructive",
          duration: 3000,
        });
        setProfileAccount({
					authority: null,
					totalPolls: 0,
				});
        setLoading(false);
        return;
    }

    const tx = await makePoll(publicKey, sendTransaction, connection, values.description, values.option1, values.option2, new BN(unixEpochTime));

    if(!tx) {
			showAlert({
				icon: LucideAlertCircle,
				title: "Error in creating Poll",
				description: "Retry after sometime",
				duration: 3000,
			});
		} else {
			showAlert({
				icon: BookCheck,
				title: "Poll created successfully",
				description: "Your poll is live now!!",
				duration: 3000,
			});
		}
    form.reset();
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter poll description" 
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="option1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="option2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter option 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(loading) ? 
              <Button className="w-full">Loading...</Button>
              : 
              <Button type="submit" className="w-full">Create Poll</Button>
            }
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PollForm;