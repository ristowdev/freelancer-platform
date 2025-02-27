"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import useBodyBackground from "@/hooks/useBodyBackground";
import { formatAmount } from "@/utils/format-amount";
import { MoveDownRight, MoveUpRight } from "lucide-react";
import { DataTable } from "./_components/table/data-table";
import { WorksData, columns } from "./_components/table/columns";

interface DashboardProps {
    
};

const dataa: WorksData[] = [
    {
        id:"0",
        projectTitle:"Hello Wolrd"
    },
    {
        id:"0",
        projectTitle:"Amekw lmfkl mwefklm"
    },
]


const Dashboard = ({
}: DashboardProps) => {
    useBodyBackground("#f4f4f4");

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
                        <BreadcrumbLink>Payouts</BreadcrumbLink>
                    </BreadcrumbItem> 
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="font-bold text-2xl mt-[20px]">Payouts</h1>
                <div className="w-full mt-[0px]">
                    <div className="border border-[#e3e3e3] shadow-sm h-[150px] rounded-xl mt-[20px] w-full bg-white">
                        <div className="flex p-[20px] h-full items-center">

                            <div className="w-[33.333%] h-full">
                                <div className="pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Balance</span>
                                    <span className="mt-[10px] font-bold text-3xl">{formatAmount(23)}</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">Apr 2, 2024</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
                                <div className="pl-[30px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Next payout</span>
                                    <div className="flex items-center">
                                        <span className="mt-[10px] font-bold text-3xl">{formatAmount(950)}</span>
                                        <div className="w-fit h-[25px] bg-[#FFF7ED] flex items-center justify-center ml-[10px] mt-[10px] rounded-sm">
                                            <span className="text-[#FF9219] text-sm font-semibold pl-[10px] pr-[10px]">
                                                Pending
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">Apr 10, 2024</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
                                <div className="pl-[30px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Previus payout</span>
                                    <div className="flex items-center">
                                        <span className="mt-[10px] font-bold text-3xl">{formatAmount(0)}</span>
                                        <div className="w-fit h-[25px] bg-[#E2FFEA] flex items-center justify-center ml-[10px] mt-[10px] rounded-sm opacity-0">
                                            <span className="text-[#4BCC69] text-sm font-semibold pl-[10px] pr-[10px]">
                                                Paid
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b] opacity-0">Apr 10, 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="mt-[2%] w-full h-[300px] flex">
                    <div className="w-full h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm">
                        <div className="p-[20px] flex h-full">
                            <div className="flex flex-col w-full">
                                <span className="text-base font-semibold">Proposals</span>
                                <div className="mt-[20px]">
                                    <DataTable
                                        columns={columns}
                                        data={dataa}
                                    />
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;