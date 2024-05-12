'use client';  
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";   
import SideBarWithFilters from "./filters";

const SideBar = () => {
    const conversations = useQuery(api.conversations.getByUser);
    const conversationsBelongsTo = useQuery(api.conversations.getConversationsBelongsTo);
    const favoriteConversations = useQuery(api.conversations.getAllInFavoriteConv);
    const currentUser = useQuery(api.users.getCurrentUser);

    if (conversations === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === undefined) {
        return <div>Loading...</div>
    }

    if(conversationsBelongsTo === undefined){
        return <div>Loading...</div>
    }

    if (currentUser === null) {
        return <div>Error: Not Found</div>
    }

    const userConversations = conversations?.filter((conversation) => {
        return conversation.participantOneId === currentUser?._id || conversation.participantTwoId === currentUser?._id;
    });  

    return (
        <>
            <SideBarWithFilters 
                userConversations={userConversations}
                currentUser={currentUser}
                conversationsBelongsTo={conversationsBelongsTo}
                favoriteConversations={favoriteConversations}
            />
        </>
    );
}

export default SideBar;