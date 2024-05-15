import { Button } from '@/components/ui/button';
import { Flag, MoreHorizontal, Smile } from 'lucide-react';
import { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import EmojiPicker from "emoji-picker-react";
import { Doc, Id } from '@/convex/_generated/dataModel';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" 
import ReportMessageModal from './modal';

interface FormProps {
    message: any;
    userId: Id<"users">;
}
 
const ReportMessage = ({
    message,
    userId
}: FormProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const _onReported = () => {
        setIsOpen(false);
    }
    return(
        <>
            
            <div className='relative'>

                    <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button 
                                        size="icon"
                                        variant="ghost"
                                        className="p-0 m-0 w-[32px] h-[32px] hover:bg-[#efeff0] rounded-full"
                                        onClick={()=>{setIsOpen(!isOpen)}}
                                    >
                                        <MoreHorizontal size={20} color="#74767e"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#404145] h-[41px] rounded-[10px] flex items-center justify-center" side="bottom">
                                    <p className="text-md font-normal text-white">More actions</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider> 
                        {isOpen && 
                        <div className="absolute bottom-0 -mb-[65px] right-0"> 
                            <div 
                                className="w-[200px] bg-white shadow-md rounded-[5px] flex items-center justify-start p-[10px]"
                            >
                                <ReportMessageModal
                                    message={message}
                                    userId={userId}
                                    onReported={_onReported}
                                >
                                    <Button 
                                            variant="ghost"
                                            className="p-0 m-0 w-full h-[40px] hover:bg-[#efeff0] pl-[10px] pr-[10px] flex items-center justify-start"
                                            // onClick={()=>{setIsOpen(!isOpen)}}
                                        >
                                            
                                            <div className="flex items-center">
                                                <div className="flex items-center mr-[10px]">
                                                    <Flag size={16} color="#c43333" />
                                                </div>
                                                <span className="text-base text-[#c43333] font-normal">Report</span>
                                            </div>
                                    </Button>
                                </ReportMessageModal>

                            </div>
                        </div>
                }
            </div>

        </>
    )
}
export default ReportMessage;