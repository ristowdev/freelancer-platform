'use client';
import { Button } from "@/components/ui/button"; 
import ConversationBox from "../conversation-box";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface AllMessagesProps {
    conversations: any;
    currentUser: any;
    displayOnlyConversations: boolean;
    conversationsTitle: string;
    filterMessages: string;
    emptyMessage: string;
}

const AllMessages = ({
    conversations, 
    currentUser,
    displayOnlyConversations,
    conversationsTitle,
    filterMessages,
    emptyMessage
}: AllMessagesProps) => { 

    return (
        <>
            <div className="p-[5px] pr-[20px]">
                {!displayOnlyConversations &&
                    <div className="mb-[30px]">
                        <div className="mb-[10px]">
                            <span className="text-xs text-[#222325]">RISEUPGRAM GURU</span>
                        </div>
                        <Button className="w-full bg-white shadow-custom-2 h-auto p-0 m-0 hover:bg-transparent rounded-[15px]" variant="ghost">
                            <div className="p-[16px] flex w-full items-center">
                                <div className="flex">
                                    <div className="flex items-center bg-[#f5f5f5] w-[40px] h-[40px] rounded-full justify-center">
                                        <span className="p-0 m-0 text-base">{'👋'}</span>
                                    </div>
                                </div>
                                <div className="ml-[10px]">
                                    <span className="text-base font-semibold text-[#404145]">New chat</span>
                                </div>
                            </div>
                        </Button>
                    </div>
                }
                <div className="mt-[0px]">
                    <div className="mb-[10px]">
                        <span className="text-xs text-[#222325]">{conversationsTitle}</span>
                    </div>

                    {conversations && conversations.map((conversation: any) => (
                        <>
                            <ConversationBox
                                key={conversation._id}
                                conversation={conversation}
                                currentUser={currentUser}
                                filterMessages={filterMessages}
                            /> 
                        </>
                    )) 
                    }
                    {!(conversations.length > 0) && <>
                        <div className="w-full h-full flex flex-1 items-center justify-center mt-[100px] flex-col">
                            <Image
                                src="/empty-filter-ma.png"
                                alt="Empty"
                                width={200}
                                height={200}
                            />
                            <p className="text-muted-foreground text-sm mt-[50px]">
                                {emptyMessage}
                            </p>
                        </div>
                    </>}
                </div>
            </div> 
        </>
    );
}

export default AllMessages;