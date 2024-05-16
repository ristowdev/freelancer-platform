'use client';
import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import {
    Avatar,
    AvatarFallback, 
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, MailOpen, SearchCheck, Star } from "lucide-react";
import ElapsedTimeComponent from "@/components/elapsed-realtime";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { isFileImage } from "@/utils/is-file-image";

interface ConversationBoxProps {
    conversation: Doc<"conversations"> & { 
        message: any,
        unReadMessages: number,
        files: any;
    };
    currentUser: Doc<"users">;
    filterMessages?: string;
    searchQuery?: string;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    conversation,
    currentUser,
    filterMessages,
    searchQuery
}) => {
    const router = useRouter();
    const otherUserId = conversation.participantOneId === currentUser._id ? conversation.participantTwoId : conversation.participantOneId;
    const otherUser = useQuery(api.users.get, { id: otherUserId });
    const params = useParams();
    const otherUserCheck = useQuery(api.users.getUserByUsername, { username: params.otherUserName as string })
    const favoriteConversation = useQuery(api.conversations.getFavoriteConversation, { conversationId: conversation._id as string })

    const handleClick = useCallback(() => {
        router.push(
            `/inbox/${otherUser?.username}${filterMessages && filterMessages !== "all-messages" ? "?f="+filterMessages : ""}${searchQuery && searchQuery ? "?s="+searchQuery : ""}`
        );
    }, [router, otherUser?.username, filterMessages, searchQuery]);
    
    const {
        mutate: setReadUnRead,
    } = useApiMutation(api.messages.markReadUnRead);
    

    const {
        mutate: _addToFavorite,
    } = useApiMutation(api.conversations.addToFavorite);


    const markReadUnRead = (id: string, type: string) => { 
        setReadUnRead({conversationId: id, type: type})
            .then(() => {
                toast.info(`Message ${type==="read" ? "Readed" : "Unreaded"}`);
            })
            .catch(() => {
                toast.error("Something went wrong")
            })  
    } 

    const addToFavorite = (id: string, type: string) => { 
        _addToFavorite({conversationId: id, type: type})
            .then(() => {
                toast.info(`${type==="add" ? "Added to" : "Removed from"} favorites`);
            })
            .catch(() => {
                toast.error("Something went wrong")
            })
    }  

    const messageFormation = (message: any, files:any) => {
        if(message.type !== "onlyMessage"){
            if(message.type === "onlyFiles"){
                if(files.length === 1){
                    return isFileImage(files[0].type) ? "Sent a photo" : "Sent a file"
                }else{
                    return files.length + " files"
                }
            }else{
                return message.text;
            }
        }else{
            return message.text;
        }
    }

    return (
        <div
            onClick={handleClick}
            className={cn(`
                w-full 
                relative 
                flex 
                items-center 
                hover:bg-neutral-100/10
                rounded-lg
                transition
                cursor-pointer
                mb-[5px]
            `, otherUserCheck && otherUserCheck._id === otherUser?._id && 'bg-[#f5f5f5]')}
        >
            <div className="p-[16px] flex w-full">
                <Avatar className="w-[48px] h-[48px]">
                    <AvatarImage src={otherUser?.profileImageUrl} alt="@shadcn" />
                    <AvatarFallback>{otherUser?.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-[10px] flex w-full flex-col">
                    <div className="flex w-full mt-[2px]">
                        <div className="flex flex-1">
                            <span className="text-sm text-black font-medium">{otherUser?.fullName}</span>
                        </div>
                        <div className="flex">
                            <span className="text-xs">
                                <ElapsedTimeComponent 
                                    submitTime={conversation?.message[0]?._creationTime}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="mt-[8px] flex w-full">
                        <div className="flex flex-1 mr-[40px]">
                            <p 
                                className={
                                    cn(
                                        "text-xs text-[#62646a] line-clamp-1",
                                        conversation?.message[0]?.lastMessageUserId !== currentUser._id && 
                                        !conversation?.message[0].read &&
                                        "font-semibold"

                                    )
                                }
                            >
                                
                                {
                                   conversation?.message[0]?.lastMessageUserId == currentUser?._id ? 
                                   "Me: " + messageFormation(conversation?.message[0], conversation?.files)! : 
                                   messageFormation(conversation?.message[0], conversation?.files)!
                                }
                            </p>
                        </div>
                        <div className="flex items-center">
                            {conversation?.unReadMessages > 0 && 
                                <div className="mr-[7px] flex items-center justify-center bg-[#c14a83] pl-[8px] pr-[8px] h-[17px] rounded-full">
                                    <span className="text-xs text-white">{conversation?.unReadMessages}</span>
                                </div>
                            }

                            {conversation?.message[0]?.read ? conversation?.message[0]?.lastMessageUserId !== currentUser._id &&
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full p-0 m-0 w-auto h-auto hover:bg-transparent"
                                    onClick={()=>{markReadUnRead(conversation._id, "unread")}}
                                >
                                    <MailOpen size={17} color="#62646a"/>
                                </Button>
                            : conversation?.message[0]?.lastMessageUserId !== currentUser._id &&
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full p-0 m-0 w-auto h-auto hover:bg-transparent"
                                    onClick={()=>{markReadUnRead(conversation._id, "read")}}
                                >
                                    <Mail size={17} color="#62646a"/>
                                </Button>
                            }

                            {favoriteConversation && favoriteConversation._id !== undefined ? 
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full p-0 m-0 w-auto h-auto ml-[5px] hover:bg-transparent"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToFavorite(conversation._id, "remove")
                                    }}
                                >
                                    <FaStar size={17} color="#ffb33e"/>
                                </Button>
                                :
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full p-0 m-0 w-auto h-auto ml-[5px] hover:bg-transparent"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToFavorite(conversation._id, "add")
                                    }}
                                >
                                    <FaRegStar size={17} color="#62646a"/>
                                </Button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox;