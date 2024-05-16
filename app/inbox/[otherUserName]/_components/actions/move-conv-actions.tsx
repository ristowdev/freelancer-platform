'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Archive, MailWarning, MessagesSquare, MoreHorizontal } from "lucide-react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MoveConversationActionsProps {
    favorite: any;
    belongsTo: any;
    conversationId: string;
}

const MoveConversationActions = ({
    favorite, 
    belongsTo,
    conversationId,
}: MoveConversationActionsProps) => {
    const {
        mutate: _moveBelongsTo,
    } = useApiMutation(api.conversations.moveBelongsTo);

    const {
        mutate: _addToFavorite,
    } = useApiMutation(api.conversations.addToFavorite);

    const router = useRouter();

    const handleBelongsToChange = (id: string, belongsTo: string) => {
        _moveBelongsTo({conversationId: id, belongsTo: belongsTo})
            .then(() => {
                toast.info(`
                    ${
                        belongsTo === "allMessages" ? "Moved to All messages" : 
                        belongsTo === "archived" ? "Moved to Archived" :
                        belongsTo === "spam" && "Moved to Spam"
                    }
                `);
                router.push("/inbox")
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

    return (
        <>
           <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" className="rounded-full" variant="ghost">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[250px]"> 
                    {belongsTo?.belongsTo !== "allMessages" &&
                        <DropdownMenuItem 
                            className="h-[40px] pl-[10px] pr-[10px]"
                            onClick={()=>{handleBelongsToChange(conversationId, "allMessages")}}
                        >
                            <div className="flex items-center">
                                <div className="flex items-center mr-[10px]">
                                    <MessagesSquare size={16} color="black" />
                                </div>
                                <span className="text-base">Move to all messages</span>
                            </div>
                        </DropdownMenuItem>
                    }
                    {belongsTo?.belongsTo !== "archived" &&
                        <DropdownMenuItem 
                            className="h-[40px] pl-[10px] pr-[10px]"
                            onClick={()=>{handleBelongsToChange(conversationId, "archived")}}
                        >
                            <div className="flex items-center">
                                <div className="flex items-center mr-[10px]">
                                    <Archive size={16} color="black" />
                                </div>
                                <span className="text-base">Move to archive</span>
                            </div>
                        </DropdownMenuItem>
                    }
                    {belongsTo?.belongsTo !== "spam" &&
                        <DropdownMenuItem 
                            className="h-[40px] pl-[10px] pr-[10px]"
                            onClick={()=>{handleBelongsToChange(conversationId, "spam")}}
                        >
                            <div className="flex items-center">
                                <div className="flex items-center mr-[10px]">
                                    <MailWarning size={16} color="black" />
                                </div>
                                <span className="text-base">Move to spam</span>
                            </div>
                        </DropdownMenuItem>
                    }
                    {favorite?._id !== undefined ? 
                        <DropdownMenuItem 
                            className="h-[40px] pl-[10px] pr-[10px]"
                            onClick={()=>{addToFavorite(conversationId, "remove")}}
                        >
                            <div className="flex items-center">
                                <div className="flex items-center mr-[10px]">
                                    <FaRegStar size={16} color="black" />
                                </div>
                                <span className="text-base">Remove from favorites</span>
                            </div>
                        </DropdownMenuItem>
                        :
                        <DropdownMenuItem 
                            className="h-[40px] pl-[10px] pr-[10px]"
                            onClick={()=>{addToFavorite(conversationId, "add")}}
                        >
                            <div className="flex items-center">
                                <div className="flex items-center mr-[10px]">
                                    <FaStar size={16} color="black" />
                                </div>
                                <span className="text-base">Add to favorites</span>
                            </div>
                        </DropdownMenuItem>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default MoveConversationActions;