'use client';
import Link from "next/link";
import { BsDiamondFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import Milestone from "../milestone";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";


interface ProjectDetailsCardProps {
    proposal: any;
}

// 222325

const ProjectDetailsCard = ({proposal}: ProjectDetailsCardProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <>  
            <div className="pt-[15px] w-full">

                <Collapsible defaultOpen={isOpen} onOpenChange={(o)=>{setIsOpen(o)}} open={isOpen}>
                    <CollapsibleTrigger asChild>
                        <Button 
                            variant="ghost"
                            className="hover:bg-transparent m-0 p-0 w-full h-auto flex justify-start items-center"
                        >
                            <div className="flex flex-1 justify-start items-center">
                                <span className="text-base font-semibold text-[#222325]">Project details</span>
                            </div>  
                            <div className={cn("flex items-center transition-transform duration-200", isOpen ? "rotate-180" : "")}> 
                                <ChevronUp size={21}/>
                            </div>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mb-0 pb-0"> 
                        <div className="mt-[15px] w-full">
                            <div className="flex items-center w-full">
                                <div className="flex flex-1">
                                    <span className="text-sm text-[#74767e] font-normal">Project:</span>
                                </div>
                                <div className="w-[150px] -mr-[2px]">
                                    <Link
                                        className="text-sm underline h-fit text-[#404145] line-clamp-1 font-semibold p-0 m-0"
                                        href={`/project-details/${proposal?.project?.slug}`}
                                    >
                                        {proposal?.project?.title}
                                    </Link>
                                </div>
                            </div> 
                        </div>
                        <div className="mt-[12px] w-full">
                            <div className="flex items-center w-full">
                                <div className="flex flex-1">
                                    <span className="text-sm text-[#74767e] font-normal">Price type:</span>
                                </div>
                                <div className="w-[150px] flex items-end justify-end">
                                    <span className="text-sm text-[#404145] font-semibold">
                                        {proposal?.project?.priceType}
                                    </span>
                                </div>
                            </div> 
                        </div>
                        <div className="mt-[12px] w-full flex items-center">
                            <div className="flex items-center w-full">
                                <div className="flex flex-1 items-center">
                                    <span className="text-sm text-[#74767e] font-normal">Budget:</span>
                                </div>
                                <div className="w-[150px] flex items-center justify-end">
                                    <span className="text-sm text-[#404145] font-semibold">
                                        {`$${proposal?.hourlyRate}.00/${proposal?.project?.priceType === "Hourly" ? "hr" : ""}`}
                                    </span>
                                </div>
                            </div> 
                        </div>

                        <div className="flex items-center w-full mt-[15px]">
                            <div className="flex flex-1">
                                <span className="text-sm text-[#74767e] font-normal">{"You'll do for:"}</span>
                            </div>
                            <div className="w-[150px] flex items-end justify-end">
                                <span className="text-sm text-[#404145] font-semibold">
                                    {`$${proposal?.hourlyRate}.00/${proposal?.project?.priceType === "Hourly" ? "hr" : ""}`}
                                </span>
                            </div>
                        </div> 

                        <div className="mt-[12px] w-full flex items-center">
                            <div className="flex items-center w-full">
                                <div className="flex flex-1 items-center">
                                    <span className="text-sm text-[#74767e] font-normal">Client level:</span>
                                </div>
                                <div className="w-[150px] flex items-center justify-end">
                                    <div className="bg-[#ffe0b3] w-[120px] flex items-center rounded-[5px] pl-[5px] pr-[5px]">
                                        <span className="text-[#804317] font-semibold text-sm tracking-wide">Top rated</span>
                                        <BsDiamondFill size={11} color="#804317" className="ml-[2px]"/>
                                        <BsDiamondFill size={11} color="#804317" className="ml-[2px]"/>
                                        <BsDiamondFill size={11} color="#804317" className="ml-[2px]"/>
                                    </div>
                                </div>
                            </div> 
                        </div>


                        <div className="mt-[12px] w-full flex items-center">
                            <div className="flex items-center w-full">
                                <div className="flex flex-1 items-center">
                                    <span className="text-sm text-[#74767e] font-normal">Response rate:</span>
                                </div>
                                <div className="w-[150px] flex items-center justify-end">
                                    <span className="text-sm text-[#404145] font-semibold">
                                        1h
                                    </span>
                                </div>
                            </div> 
                        </div>

                        <div className="mt-[12px] w-full flex items-center">
                            <div className="flex items-center w-full">
                                <div className="flex flex-1 items-center">
                                    <span className="text-sm text-[#74767e] font-normal">Raiting:</span>
                                </div>
                                <div className="w-[150px] flex items-center justify-end">
                                    <FaStar size={14} color="#404145"/>
                                    <span className="text-sm text-[#404145] font-semibold ml-[2px] pt-[1px]">5</span>
                                    <Link href="" className="flex items-center">
                                        <span className="text-sm text-[#404145] font-normal ml-[2px]">{"("}</span>
                                        <span className="text-sm text-[#404145] font-normal  pt-[1px] underline">{`4,322`}</span>
                                        <span className="text-sm text-[#404145] font-normal">{")"}</span>
                                    </Link>
                                </div>
                            </div> 
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </>
    );
}

export default ProjectDetailsCard;