'use client';

import { Doc } from "@/convex/_generated/dataModel";
import Header from "./header";
import Messages from "./messages";
import Form from "./form";

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
                    />
                </div>
                <div className="mt-[20px]">
                    <Form 
                        userId={userId}
                        conversationId={conversationId}
                        unReadMessages={unReadMessages}
                    />
                </div>

            </div>
        </>
    );
}

export default MessagesCard;