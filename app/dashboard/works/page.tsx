"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" 
import Card from "./_components/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { MoveDownRight, MoveUpRight } from "lucide-react";
import { formatAmount } from "@/utils/format-amount";
import useBodyBackground from "@/hooks/useBodyBackground";

interface DashboardProps {
    
};

const Dashboard = ({
}: DashboardProps) => {
    useBodyBackground("#f4f4f4");

    const getAllWorks = useQuery(api.works.getAllWorks)

    if(getAllWorks === undefined || getAllWorks === null){
        return <>Loading...</>;
    }

    const upDownCompare = (positon: string, value: number) => {
        if(positon === "up"){
            return <div className="flex items-center">
                <MoveUpRight color="green" size={14} className="-mb-[2px]"/>
                <span className="text-sm text-green-700 font-normal ml-[2px]">{value}%</span>
            </div>;
        }
        if(positon === "down"){
            return <div className="flex items-center">
                <MoveDownRight color="red" size={14} className="-mb-[2px]"/>
                <span className="text-sm text-red-500 font-normal ml-[2px]">{value}%</span>
            </div>;
        }
    }

    return (
         <>
            <div className="mt-[33px] container max-w-6xl px-4 w-full flex flex-col">
                <Breadcrumb>
                    <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        {/* <Slash /> */}
                        /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink >Works</BreadcrumbLink>
                    </BreadcrumbItem> 
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="h-1 font-bold text-2xl mt-[20px]">Works</h1>
                <div className="w-full mt-[10px]">
                    <div className="border border-[#e3e3e3] shadow-sm h-[150px] rounded-xl mt-[40px] w-full bg-white">
                        <div className="flex p-[20px] h-full items-center">
                            <div className="w-[33.333%]">
                                <div className="pl-[10px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Revenue</span>
                                    <span className="mt-[10px] font-bold text-3xl">{formatAmount(2740.79)}</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">1 week ago</span>
                                        {upDownCompare("down", 100)}
                                    </div>
                                </div>
                                

                            </div>

                            <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
                                <div className="pl-[30px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">In Progress</span>
                                    <span className="mt-[10px] font-bold text-3xl">1</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">1 week ago</span>
                                        {upDownCompare("up", 100)}
                                    </div>
                                </div>
                            </div>

                            <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
                                <div className="pl-[30px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Done</span>
                                    <span className="mt-[10px] font-bold text-3xl">0</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">1 week ago</span>
                                        {upDownCompare("up", 100)}
                                    </div>
                                </div>
                            </div>
                            <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
                                <div className="pl-[30px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Total works</span>
                                    <span className="mt-[10px] font-bold text-3xl">1</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">1 week ago</span>
                                        {upDownCompare("up", 100)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-[50px] w-full ">
                    {getAllWorks.map((work: any)=>(<>
                        <Card 
                            work={work}
                        />
                    </>))}
                </div>
            </div>
         </>
    );
};

export default Dashboard;