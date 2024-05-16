'use client';

import { Doc } from "@/convex/_generated/dataModel";
import Header from "./header";
import Messages from "./messages";
import Form from "./form";
import { useState } from "react";

interface MessagesCardProps {
    messages: any;
    userId: Doc<"users">["_id"];
    conversationId: Doc<"conversations">["_id"];
    unReadMessages: number;
    otherUser: any; 
    proposal: any; 
}

const MessagesCard = ({
    messages,
    userId,
    conversationId,
    unReadMessages,
    otherUser,
    proposal
}: MessagesCardProps) => {
    const [replyToMessage, setReplyToMessage] = useState<any | null>(null);
    const onMessageReply = (message: any) => {
        setReplyToMessage(message);
    } 

    const onCancleReplyToMessage = () => {
        setReplyToMessage(null);
    }
    
    return ( 
        <>
            <div className="border border-[#dadbdd] rounded-[24px] w-full h-full relative flex flex-col">
  {/* <div className="flex-1 overflow-y-auto">
    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29].map((index: number)=>(<>
        <div className="bg-black w-full h-[40px] mb-[10px] flex items-center justify-start pl-[10px] pr-[10px] rounded-[5px]">
            <span className="text-base font-semibold text-white">Mehraba {index}</span>
        </div>

    </>))}
</div> */}

                <Header 
                    otherUser={otherUser} 
                    conversationId={conversationId}
                />
                <div className="mt-[100px] flex flex-col min-h-0 h-full overflow-hidden w-full">
                    <Messages 
                        messages={messages}
                        userId={userId}
                        onMessageReply={onMessageReply}
                        proposal={proposal}
                    />
                </div>
                <div className="mt-[20px] pb-[30px]">
                    <Form 
                        userId={userId}
                        conversationId={conversationId}
                        unReadMessages={unReadMessages}
                        onReplyToMessage={replyToMessage}
                        cancleReplyToMessage={onCancleReplyToMessage}
                    />
                </div>

            </div>
        </>
    );
}

export default MessagesCard;