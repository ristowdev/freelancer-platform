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
}

const MessagesCard = ({
    messages,
    userId,
    conversationId,
    unReadMessages,
    otherUser
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
            <div className="border border-[#dadbdd] rounded-[24px] w-full h-full relative ">
                <Header 
                    otherUser={otherUser} 
                    conversationId={conversationId}
                />
                <div className="mt-[100px] flex flex-col">
                    <Messages 
                        messages={messages}
                        userId={userId}
                        onMessageReply={onMessageReply}
                    />
                </div>
                <div className="mt-[20px]">
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