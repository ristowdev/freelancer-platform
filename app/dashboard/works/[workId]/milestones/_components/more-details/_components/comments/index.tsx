import React from 'react'
import Form from './form'
import CommentsList from './comments'
import { Id } from '@/convex/_generated/dataModel'

interface CommentsInitProps {
    milestoneId: Id<"milestones">;
    members: any;
}

function CommentsInit({
    milestoneId,
    members
}:CommentsInitProps) {

    return (
        <div className="w-[410px] h-[700px] bg-[#0000001f] rounded-r-md backdrop-blur-md">
            <div className="w-full h-full p-[20px] pt-[30px] flex flex-1 flex-col">
                <span className="text-xl text-white">Comments</span>

                <CommentsList 
                    milestoneId={milestoneId}
                />
                <Form 
                    milestoneId={milestoneId}
                    members={members}
                />
            </div>
        </div>
    )
}

export default CommentsInit