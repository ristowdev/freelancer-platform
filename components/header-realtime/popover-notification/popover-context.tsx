"use client";

import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

 
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


interface PopoverContextProps {
    title: string;
    icon: React.ReactNode; 
    unreadNumber: number;
    popoverIcon: React.ReactNode;
    notifications: React.ReactNode;
};

export const PopoverContext = ({
    title,
    icon,
    unreadNumber,
    popoverIcon,
    notifications
}: PopoverContextProps) => { 

    return ( 
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={()=>{}}>{popoverIcon}</Button>
                </PopoverTrigger>

                <PopoverContent className="w-[450px] p-0 h-[450px]" align='end'>
                    
                    <div className="border-b solid border-[#e4e5e7] h-[50px] flex pl-[15px] pr-[15px] items-center w-full bg-white rounded-t-sm">
                        <div className="mr-[7px]">{icon}</div>
                        <span className="text-sm text-[#404145] ">{title} <span className="font-semibold">{"("+unreadNumber+")"}</span></span>
                    </div>
                    <ScrollArea className="w-full h-[359px]">
                        {notifications}
                    </ScrollArea>
                    <div className="border-t solid border-[#e4e5e7] h-[40px] flex pl-[15px] pr-[15px] items-center w-full rounded-b-sm bg-white">
                        <div className="mr-[7px] flex items-center">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent p-0 w-auto h-auto" onClick={()=>{}}><Volume2 size={16} color="#404145"/></Button>
                        </div>
                    </div>

                </PopoverContent>
            </Popover>
        </>
    );
};