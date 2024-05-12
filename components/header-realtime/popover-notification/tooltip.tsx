"use client";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import { Mail, MailX } from "lucide-react";
import { useRef, useState } from "react";


interface TooltipProps { 
};

export const TooltipReadUnRead = ({
     
}: TooltipProps) => { 
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    

    return ( 
        <>
             <TooltipProvider>
                <Tooltip open={isTooltipOpen} defaultOpen={false} delayDuration={1500}>
                    <TooltipTrigger asChild>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full hover:bg-transparent p-0 w-[20px] h-[20px] flex items-center" 
                            onClick={(e)=>{
                               
                            }}
                            onMouseOverCapture={()=>{setIsTooltipOpen(true)}}
                            onMouseOutCapture={()=>{setIsTooltipOpen(false)}}
                        >
                            <Mail size={19} color="#999999"/>    
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#404145]">
                        <p className="text-sm text-white">Mark as Read</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
};