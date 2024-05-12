'use client';

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from "clsx";
import ConversationBox from "./conversation-box";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// import { find, uniq } from 'lodash';

const ConversationList = () => {
    const conversations = useQuery(api.conversations.getByUser);
    const currentUser = useQuery(api.users.getCurrentUser);

    if (conversations === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === null) {
        return <div>Error: Not Found</div>
    }

    const userConversations = conversations.filter((conversation) => {
        return conversation.participantOneId === currentUser._id || conversation.participantTwoId === currentUser._id;
    });

    return (
        <>
            <p className="text-black text-base">All conversations</p>
            <div className="mt-[30px]">
                {userConversations.map((conversation) => (
                    <ConversationBox
                        key={conversation._id}
                        conversation={conversation}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </>
    );
}

export default ConversationList;