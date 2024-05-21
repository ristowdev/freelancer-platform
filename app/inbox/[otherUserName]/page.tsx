"use client";

import SideBar from "../_components/side-bar";
import MessagesCard from "./_components/messages/messages-card";
import ProjectDetailsCard from "./_components/project-details/project-details-card";


import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCallback, useEffect, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import Header from "./_components/messages/header";
import MessageBox from "./_components/messages/message-box";
import Milestone from "./_components/milestone";
import Card from "./_components/milestone/_components/card";
 
interface FormProps {
    params: { otherUserName: string };
}

const ConversationPage = ({
    params,
}: FormProps) => {

    const [conversation, setConversation] = useState<Doc<"conversations"> | null>(null);

    const get = useMutation(api.conversations.getOrCreateConversation);
    const user = useQuery(api.users.getCurrentUser);
    const conv = useQuery(api.conversations.getConversation, { username: params.otherUserName });
    useEffect(() => {
        const callMutation = async () => {
            try {
                const result = await get({ otherUsername: params.otherUserName });
                setConversation(result);
            } catch (error) {
                console.error('Mutation failed:', error);
            }
        };

        callMutation();
    }, [get, params.otherUserName]);

    console.log("convconvconvconv")
    console.log("convconvconvconv")
    console.log("convconvconvconv")
    console.log("convconvconvconv")
    console.log("convconvconvconv")
    console.log(conv)

    if (conversation === null || conv === undefined || conv === undefined) {
        return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...</div>
    }

    return ( 
         <> 
         <div className="w-full flex h-calc-80px overflow-hidden">
                <div className="w-[22%] ">
                    <SideBar />
                </div>
                <div className="ml-[1%] mt-[10px] w-[58%]">
                    <MessagesCard
                        messages={conv.messagesWithUsersAndFiles}
                        userId={conversation.currentUser._id}
                        conversationId={conversation.conversation._id}
                        unReadMessages={conv.unReadMessages}
                        otherUser={conv.otherUser}
                        proposal={conv.proposal}
                        user={user}
                    />
                    </div>

                <div className="w-[20%] ml-[2%] mt-[10px]">
                    <div className="h-full flex flex-col">
                        <div className="h-full">
                            <div className="flex flex-col h-full">
                                <ProjectDetailsCard 
                                    proposal={conv.proposal}
                                />

                                <div className="flex-1 h-full flex border-t border-[#e4e5e7] mt-[20px] pt-[15px] flex-col overflow-hidden">
                                    <Milestone />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </>
    );
};
export default ConversationPage;