import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';
import { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import EmojiPicker from "emoji-picker-react";
import { Doc } from '@/convex/_generated/dataModel';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';


interface FormProps {
    message: any;
}
 
const ReactionPickEmoji = ({
    message
}: FormProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        mutate: reactToMessage
    } = useApiMutation(api.messages.reactToMessage)

    const onEmojiSelect = (emoji: any) => {
        reactToMessage({
            messageId: message._id,
            reaction: emoji.emoji
        })
            .then(() => {
                setIsOpen(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return(
        <>
            <div className="relative items-center flex">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button 
                                size="icon"
                                variant="ghost"
                                className="p-0 m-0 w-[32px] h-[32px] hover:bg-[#efeff0] rounded-full"
                                onClick={()=>{setIsOpen(!isOpen)}}
                            >
                                <Smile size={17} color="#74767e"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#404145] h-[41px] rounded-[10px] flex items-center justify-center" side="bottom">
                            <p className="text-md font-normal text-white">React</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider> 
                
                {isOpen && 
                    <div className='absolute bottom-0 right-0 -mb-[50px]'>
                        <EmojiPicker 
                            onEmojiClick={(emoji)=> {
                                setIsOpen(false);
                                onEmojiSelect(emoji);
                            }}
                            reactionsDefaultOpen={true}
                            allowExpandReactions={false}
                        />
                    </div>
                }

            </div>
        </>
    )
}
export default ReactionPickEmoji;