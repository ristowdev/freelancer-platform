"use client";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import { Mail, MailOpen, MailX } from "lucide-react";
import { useRouter } from "next/navigation";
import { TooltipReadUnRead } from "./tooltip";
 

interface NotificationCardProps {
    icon?: React.ReactNode; 
    avatar?: React.ReactNode;
    title: string;
    description: string;
    when: number;
    markReadUnRead: (id:string, type: string) => void;
    id:string;
    read: boolean;
    onClickRedirect?: string;
    lastMessageUserId?: string;
    currentUserId?: string;
    unReadMessages: number;
};

export const NotificationCard = ({
    icon,
    avatar,
    title,
    description,
    when,
    markReadUnRead,
    id,
    read,
    onClickRedirect,
    lastMessageUserId,
    currentUserId,
    unReadMessages
}: NotificationCardProps) => { 

    const router = useRouter();
    function calculateElapsedTime(submitTime: number): string {
        const currentTime = Date.now();
        const timeDifference = currentTime - submitTime;
        const msInMinute = 60 * 1000;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;
        const msInWeek = msInDay * 7;
        const msInMonth = msInDay * 30;
    
        if (timeDifference < msInMinute) {
            return `Now`;
        } else if (timeDifference < msInHour) {
            const minutes = Math.floor(timeDifference / msInMinute);
            return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
        } else if (timeDifference < msInDay) {
            const hours = Math.floor(timeDifference / msInHour);
            return `${hours} ${hours === 1 ? 'hr' : 'hrs'} ago`;
        } else if (timeDifference < msInWeek) {
            const days = Math.floor(timeDifference / msInDay);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (timeDifference < msInMonth) {
            const weeks = Math.floor(timeDifference / msInWeek);
            return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
        } else {
            const months = Math.floor(timeDifference / msInMonth);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        }
    }

    const handleOnClickRedirect = (link: string) => {
        if(link){
            router.push(link)
        }
    }

    return ( 
        <>
            <div 
                className={
                    cn(
                        "group hover:bg-[#f7f7f7] border-b solid border-[#e4e5e7] m-h-[100px] flex pl-[15px] pr-[15px] pt-[10px] pb-[10px] items-center",
                        read ? "" : "bg-[#f7f7f7]",
                        onClickRedirect && "cursor-pointer"
                    )
                } 

                onClick={()=>{
                    if(onClickRedirect){
                        handleOnClickRedirect(onClickRedirect!)
                    }
                }}

            >
                <div className="flex">
                   {icon && <div className="mr-[7px] bg-[#f3f3f3] h-[60px] w-[60px] rounded-full flex items-center justify-center">{icon}</div> }
                   {avatar && avatar}
                </div>
                <div className="ml-[5px] flex flex-1 flex-col relative">
                    {/* {!read && <div className="absolute top-0 right-0 bg-red-600 w-[40px] h-[17px] flex rounded-[25px] items-center justify-center"><span className="text-xs text-white p-0 m-0 ">New</span></div> } */}
                    <span className="text-sm text-[#62646a] font-semibold">{title}</span>
                    <p className="text-sm text-[#62646a] line-clamp-2 min-h-[30px]">{description}</p>
                    <span className="text-xs text-[#676767] mt-[5px]">{calculateElapsedTime(when)}</span>
                </div>
                <div className="w-[63px] flex items-end justify-end pr-[10px]">
                    <div className={
                        cn(
                            "items-center",
                            read === false ? "flex" : "group-hover:flex hidden"
                        )
                    }
                    
                    >

                        {
                        lastMessageUserId && currentUserId ? 
                        lastMessageUserId !== currentUserId && 
                            <>
                                <div className="flex items-center">
                                    {unReadMessages > 0 &&
                                        <div className="pl-[4px] pr-[4px] h-[16px] rounded-full bg-[#1dbf73] flex items-center justify-center mr-[4px]">
                                            <span className="text-xs text-white m-0 p-0">{unReadMessages}</span>
                                        </div>
                                    }
                                    {read ? 
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="rounded-full hover:bg-transparent p-0 w-auto h-auto flex items-center" 
                                                        onClick={(e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            markReadUnRead(id, "unread");
                                                        }}
                                                    >
                                                        <MailOpen size={19} color="#999999"/>    
                                                    </Button>
                                             
                                    :  
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="rounded-full hover:bg-transparent p-0 w-auto h-auto flex items-center" 
                                                        onClick={(e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            markReadUnRead(id, "read");
                                                        }}
                                                    >
                                                        <Mail size={19} color="#999999"/>    
                                                    </Button> 
                                    }
                                </div>

                            </>
                            :
                            <>
                                {read ? 
                                        
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="rounded-full hover:bg-transparent p-0 w-auto h-auto" 
                                                        onClick={(e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            markReadUnRead(id, "unread");
                                                        }}
                                                    >
                                                        <MailOpen size={19} color="#999999"/>    
                                                    </Button>
                                               
                                    : 
                                     
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="rounded-full hover:bg-transparent p-0 w-auto h-auto" 
                                                        onClick={(e)=>{
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            markReadUnRead(id, "read");
                                                        }}
                                                    >
                                                        <Mail size={19} color="#999999"/>    
                                                    </Button>
                                                
                                    }
                            </>
                        }
                    </div>

                </div>
            </div> 
        </>
    );
};