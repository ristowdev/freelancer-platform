"use client";
import { useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleButtonArrowProps {
    buttonTitle: string;
    buttonTitleClassName?: string;
    children: React.ReactNode;
    openDetails: boolean;
};

const CollapsibleButtonArrow = ({
    buttonTitle,
    buttonTitleClassName = "text-base font-semibold text-[#172B4D]",
    children,
    openDetails
}: CollapsibleButtonArrowProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(openDetails);
    
    return (
        <div className="w-full">
            <Collapsible defaultOpen={isOpen} onOpenChange={(o)=>{setIsOpen(o)}} open={isOpen}>
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        className="hover:bg-transparent m-0 p-0 w-full h-auto flex justify-start items-center"
                    >
                        <div className="flex flex-1 justify-start items-center">
                            <span className={buttonTitleClassName}>
                                {buttonTitle}
                                {/* <span className="font-normal">{'(click to see)'}</span> */}
                            </span>
                        </div>  
                        <div className={cn("flex items-center transition-transform duration-200", isOpen ? "rotate-180" : "")}> 
                            <ChevronUp size={21}/>
                        </div>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mb-0 pb-0">
                    {children}
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default CollapsibleButtonArrow;