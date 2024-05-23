import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "sonner";
import MoveConversationActions from "../actions/move-conv-actions";

interface HeaderProps {
    otherUser: any;
    conversationId: string;
    user: any;
    work: any;
}

const Header = ({
    otherUser,
    conversationId,
    user,
    work
}: HeaderProps) => {  
    const favoriteConversation = useQuery(api.conversations.getFavoriteConversation, { conversationId: conversationId as string })
    const converstionBelongsTo = useQuery(api.conversations.getSingleConvBelongsTo, { conversationId: conversationId as string })

    const {
        mutate: _addToFavorite,
    } = useApiMutation(api.conversations.addToFavorite);

    const addToFavorite = (id: string, type: string) => { 
        _addToFavorite({conversationId: id, type: type})
            .then(() => {
                toast.info(`${type==="add" ? "Added to" : "Removed from"} favorites`);
            })
            .catch(() => {
                toast.error("Something went wrong")
            })
    }

    return (
        <div className="absolute top-0 left-0 h-[100px] border-b border-[#e4e5e7] w-full shadow-custom rounded-t-[24px] flex items-center z-10 bg-white">
            <div className="p-[24px] flex flex-col w-full">
                <div className="flex w-full items-center">

                    <div className="flex flex-1">
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <div className="w-[12px] h-[12px] bg-green-600 rounded-full  flex items-center justify-center">
                                    <div className="w-[10px] h-[10px] bg-green-600 rounded-full animate-ping"></div>
                                </div>
                                <div className="ml-[10px]">
                                    <span className="text-base underline text-black">{otherUser.fullName}</span>
                                </div>
                                <div className="ml-[10px]">
                                    <span className="text-base text-[#74767e]">{`@${otherUser.username}`}</span>
                                </div>
                            </div>
                            <div className="flex mt-[0px] items-center">
                                <div className="">
                                    <span className="text-xs text-[#62646a]">Last seen: 3 hours ago</span>
                                </div>

                                <Separator  orientation="vertical" className="bg-[#62646a] h-[15px] mr-[10px] ml-[10px] mt-[2px]"/>

                                <div className="">
                                    <span className="text-xs text-[#62646a]">Local time: 07 May 2024, 12:03</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center mr-[10px]">
                        {
                            favoriteConversation && 
                            favoriteConversation._id !== undefined ? 
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full p-0 m-0 w-auto h-auto hover:bg-transparent"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToFavorite(conversationId, "remove")
                                    }}
                                >
                                    <FaStar size={20} color="#ffb33e"/>
                                </Button>
                                :
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full p-0 m-0 w-auto h-auto hover:bg-transparent"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToFavorite(conversationId, "add")
                                    }}
                                >
                                    <FaRegStar size={20} color="#62646a"/>
                                </Button>
                            }
                        </div>

                        <MoveConversationActions 
                            favorite={favoriteConversation}
                            belongsTo={converstionBelongsTo}
                            conversationId={conversationId}
                            user={user}
                            work={work}
                        />

                    </div>

                </div>
            </div>

        
        </div>
    );
}

export default Header;
