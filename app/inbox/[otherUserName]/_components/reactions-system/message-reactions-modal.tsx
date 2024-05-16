import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";

interface MessagesCardProps {
    children: React.ReactNode;
    message: any;
    currentUserId: string;
}

const MessageReactionsModal = ({
    children,
    message,
    currentUserId
}: MessagesCardProps) => {

    const {
        mutate: reactToMessage,
        pending
    } = useApiMutation(api.messages.reactToMessage)
    
    const handleRemoveReaction = (reaction: any, message:any) => {
        if(reaction.user._id === currentUserId){
            reactToMessage({
                messageId: message._id,
                reaction: reaction.reaction
            })
                .then(() => {
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Reactions</DialogTitle>
                <DialogDescription>
                    <div className="mt-[10px]">
                        {message?.reactions?.map((reaction: any, index: number) => (<>
                            <div className={cn("w-full flex items-center", index+1 !== message?.reactions?.length && "mb-[10px]")}>
                                <Button
                                    variant="ghost"
                                    className="flexw-full h-[65px] justify-start w-full hover:bg-[#fafafa]"
                                    onClick={()=>{handleRemoveReaction(reaction, message)}}
                                    disabled={pending}
                                >
                                    <div className="flex flex-1 items-center">
                                        <Avatar className="w-[50px] h-[50px]">
                                            <AvatarImage src={reaction?.user?.profileImageUrl} alt={reaction?.user?.username} />
                                            <AvatarFallback>{reaction?.user?.fullName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start ml-[15px]">
                                            <span className="text-base font-normal text-black">{reaction?.user?.fullName}</span>
                                            {reaction?.user?._id === currentUserId && <span className="text-md font-light text-black">Select to remove</span>}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="text-base">{reaction?.reaction}</span>
                                    </div>
                                </Button>
                            </div>
                        </>))}
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default MessageReactionsModal;