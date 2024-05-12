'use client';

import clsx from "clsx";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageWithUserType } from "@/types";

interface MessageBoxProps {
    message: MessageWithUserType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    message,
    isLast
}) => {
    const currentUser = useQuery(api.users.getCurrentUser);
    if (currentUser === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === null) return null;

    const isOwn = message.userId === currentUser._id;

    const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
    const avatar = clsx(isOwn && 'order-2');
    const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
    const messageStyle = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        false ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    );

    return (
        <div className="flex w-[640px]">
            <div className="mr-[10px]">
                <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage src={message.user.profileImageUrl} alt={message.user.username} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex items-center flex-col">
                <div className="flex flex-col">
                    <div className="flex items-center mb-[10px]">
                        <span className="text-sm font-semibold">Me</span>
                        <span className="text-sm ml-[10px] text-[#62646a]">03 May 2024, 23:25</span>
                    </div>
                    <p className="text-sm text-[#62646a] leading-[1.6]">
                        {message.text}
                    </p>
                </div>
                {/* <div className="flex items-center gap-1">
                    <div className="text-xs text-gray-400">
                        {format(new Date(message._creationTime), 'p')}
                    </div>
                </div> */}
                {/* {isLast && isOwn && message.seen && (
                    <div
                        className="
                        text-xs 
                        font-light 
                        text-gray-500
                        "
                    >
                        {`Seen`}
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default MessageBox;