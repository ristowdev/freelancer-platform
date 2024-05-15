import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { FaCircleInfo } from "react-icons/fa6";
import { ModalForm } from "./form";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";


interface MessagesCardProps {
    children: React.ReactNode;
    message: any;
    userId: Id<"users">;
    onReported: () => void;
}

const ReportMessageModal = ({
    children,
    message,
    userId,
    onReported
}: MessagesCardProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const _onReported = () => {
        setOpen(false);
        onReported();
    }
    
    return (
        <Dialog 
            onOpenChange={(open)=>{
                setOpen(open); 
                if(open===false){
                    onReported()
                }
            }} 
            open={open}
        >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-[600px] p-[30px]">
                <DialogHeader>
                <DialogTitle>Why do you wish to report this message?</DialogTitle>
                <DialogDescription>
                    <div className="mt-[20px]">
                        <div className="w-full bg-[#f0f4ff] flex items-center h-[55px] rounded-[10px] pl-[15px] pr-[15px]">
                            <FaCircleInfo size={21} color="#1d3369"/>
                            <span className="text-[#1D3369] text-base font-normal ml-[10px]">Your report will be kept anonymous</span>
                        </div>
                        <div className="mt-[30px]">
                            <ModalForm 
                                messageId={message._id}
                                reportedFromUserId={userId}
                                reportedUserId={message.userId}
                                onReported={_onReported}
                            />
                        </div>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ReportMessageModal;