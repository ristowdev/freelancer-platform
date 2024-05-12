'use client';
import { Button } from "@/components/ui/button"; 
import ConversationBox from "../conversation-box";
import { Sparkles } from "lucide-react";
import Image from "next/image";

interface SearchMessagesProps {
    conversations: any;
    currentUser: any;
    conversationsTitle: string;
    searchQuery: string;
}

const SearchMessages = ({
    conversations, 
    currentUser,
    conversationsTitle,
    searchQuery,
}: SearchMessagesProps) => { 

    return (
        <>
            <div className="p-[5px] pr-[20px]">
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
                                searchQuery={searchQuery}
                            /> 
                        </>
                    )) 
                    }
                </div>
            </div> 
        </>
    );
}

export default SearchMessages;