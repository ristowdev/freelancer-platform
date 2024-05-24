import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { formatTime } from '@/utils/time-format';
import { useQuery } from 'convex/react';
import React, { useEffect, useRef } from 'react'
import Loading from './_components/skeleton';

interface CommentsListProps {
    milestoneId: Id<"milestones">;
}

function CommentsList({
    milestoneId
}:CommentsListProps) {

    const lastMessageRef = useRef<HTMLDivElement>(null);
    const comments = useQuery(api.milestones.getComments, { milestoneId: milestoneId });
    const currentUser = useQuery(api.users.getCurrentUser);

    useEffect(()=>{
        if(comments){
            if (lastMessageRef.current) {
                lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [comments]);

    if(comments === undefined || comments === null || currentUser === undefined || currentUser === null){
        return <Loading />;
    }

    return (
        <div className="h-fit overflow-y-scroll rounded-xl mt-[15px] flex flex-1 flex-col">
            {comments.map((comment: any, index: number)=>(<>
                <div className="w-full rounded-xl bg-[#00000033] mb-[10px] p-[25px] pt-[15px] pb-[15px] border border-[#343434]" key={comment._id}>
                    <div className="flex">
                        <Avatar className="w-[38px] h-[38px]  border-[1.5px] border-[#343434] -ml-[10px]">
                            <AvatarImage src={comment.messageOwner.profileImageUrl} />
                            <AvatarFallback>{comment.messageOwner.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-[10px]">
                            <div className="flex items-center">
                                <span className="text-base font-semibold text-white">{comment.messageOwner._id === currentUser._id ? "Me" : comment.messageOwner.fullName}</span>
                                <span className="text-xs text-[#7d7d7d] ml-[7px]">{formatTime(comment._creationTime)}</span>
                            </div>
                            <p className="text-sm text-[#c4c4c4] mt-[3px]">{comment.comment}</p>
                        </div>
                    </div>
                </div>
            </>))}
            <div ref={lastMessageRef}></div>
        </div>
    )
}

export default CommentsList