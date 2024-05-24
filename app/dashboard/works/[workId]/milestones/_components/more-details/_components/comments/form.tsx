import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { Send } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner';

interface FormProps {
    milestoneId: Id<"milestones">;
    members: any;
}

function Form({
    milestoneId,
    members
}:FormProps) {
    const [text, setText] = useState<string>("");

    const {
        mutate: addComment,
        pending
    } = useApiMutation(api.milestones.addComment)

    const handleSubmit = () => {
        if(!text || pending) return;
        if(text.length > 500){
            toast.error("Comment must be less than 500 characters.")
            return;
        }

        addComment({
            milestoneId,
            userId: members?.user?._id,
            clientId: members?.client?._id,
            comment: text
        }).then(()=>{
            setText("");
        }).catch((e)=>{
            console.log(e)
        })

    }

    return (
    
        <div className="flex items-center mt-[20px]">
            <div className="w-full h-[45px] bg-[#00000033] rounded-full border border-[#343434] flex items-center justify-center">
                <Input
                    placeholder="Add comment..."
                    className="rounded-full outline-none focus-visible:ring-0 bg-transparent pl-[20px] pr-[20px] text-base  text-white border-none placeholder:text-[#c4c4c4]"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}                
                />
            </div>
            <div className="flex ml-[10px]">
                <Button 
                    variant="ghost"
                    size="icon"
                    className="bg-[#1dbf73] hover:bg-[#1dbf73] rounded-full flex items-center justify-center border border-[#343434] h-[45px] w-[45px]"
                >
                    <Send size={21} color="white" className="-mb-[3px] -ml-[1px]"/>
                </Button>
            </div>
        </div>
    )
}

export default Form