"use client";

import { AdvancedChart, PieChartExample, SimpleChart } from "@/components/charts";
import useBodyBackground from "@/hooks/useBodyBackground";
import { formatAmount } from "@/utils/format-amount";
import { MoveDownRight, MoveUpRight } from "lucide-react";
import { DataTable } from "./works/_components/report/table/data-table";
import { WorksData, columns } from "./works/_components/report/table/columns";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

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

    const getAllWorks = useQuery(api.works.getAllWorks)
    const statsProposals = useQuery(api.dashboardStatistics.proposalStats);

    if(getAllWorks === undefined || getAllWorks === null || statsProposals === undefined || statsProposals === null){
        return <>Loading...</>;
    }

    const calculatePercentage = (count: number, total: number): number => {
        return total === 0 ? 0 : Math.round((count / total) * 100);
    };
    
    const acceptedCount = statsProposals.filter((proposal: any) => proposal.status === "Active").length;
    const pendingCount = statsProposals.filter((proposal: any) => proposal.status === "Pending").length;
    const rejectedCount = statsProposals.filter((proposal: any) => proposal.status === "Rejected").length;
    const totalCount = statsProposals.length;
    
    const acceptedPercentage = calculatePercentage(acceptedCount, totalCount);
    const pendingPercentage = calculatePercentage(pendingCount, totalCount);
    const rejectedPercentage = calculatePercentage(rejectedCount, totalCount);
    

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
                <h1 className="font-bold text-2xl mt-[20px]">Hello, Ilija 👋</h1>

                <div className="w-full flex items-center h-fit mt-[30px]">
                    <div className="w-[33.333%] h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm">
                        <div className="p-[20px] flex items-center">
                            <div className="flex flex-col flex-1">
                                <span className="text-base font-semibold">Revenue</span>
                                <span className="mt-[30px] font-bold text-3xl">{formatAmount(12.79)}</span>
                                <div className="mt-[10px] flex items-center">
                                    <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days</span>
                                    {upDownCompare("up", 100)}
                                </div>
                            </div>
                            <div className="w-[120px] h-[90px] flex justify-end mt-[30px]">
                                <SimpleChart />
                            </div>
                        </div>
                    </div>

                    <div className="w-[33.333%] h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm ml-[1%] mr-[1%]">
                        <div className="p-[20px] flex items-center">
                            <div className="flex flex-col flex-1">
                                <span className="text-base font-semibold">Works</span>
                                <span className="mt-[30px] font-bold text-3xl">{getAllWorks.filter(work => work.status === "inProgress").length}</span>
                                <div className="mt-[10px] flex items-center">
                                    {getAllWorks.filter(work => work.status === "inProgress").length !== 0 ?
                                        <>
                                            <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days</span>
                                            {upDownCompare("up", 100)}
                                        </>
                                    : <>
                                            <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days <span className="text-black">0%</span></span>
                                    </>}
                                </div>
                            </div>
                            <div className="w-[120px] h-[90px] flex justify-end mt-[30px]">
                                <SimpleChart />
                            </div>
                        </div>
                    </div>

                    <div className="w-[33.333%] h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm">
                        <div className="p-[20px] flex items-center">
                            <div className="flex flex-col flex-1">
                                <span className="text-base font-semibold">Finished</span>
                                <span className="mt-[30px] font-bold text-3xl">{getAllWorks.filter(work => work.status === "finished").length}</span>
                                <div className="mt-[10px] flex items-center">
                                    {getAllWorks.filter(work => work.status === "finished").length !== 0 ?
                                        <>
                                            <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days</span>
                                            {upDownCompare("up", 100)}
                                        </>
                                    : <>
                                            <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days <span className="text-black">0%</span></span>
                                    </>}
                                </div>
                            </div>
                            <div className="w-[120px] h-[90px] flex justify-end mt-[30px]">
                                <SimpleChart />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-[2%] w-full h-[300px] flex">
                    <div className="w-[50%] h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm">
                        <div className="p-[20px] flex flex-col h-full">
                            <div className="flex flex-col">
                                <span className="text-base font-semibold">Last week revenue</span>
                                <div className="flex items-center mt-[5px]">
                                    <span className="font-bold text-2xl">{formatAmount(23.11)}</span>
                                    <div className="ml-[5px] flex items-center mt-[5px]">
                                        {upDownCompare("down", 100)}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full justify-end mt-[30px] flex flex-1">
                                <AdvancedChart />
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%] h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm ml-[1%]">
                        <div className="p-[20px] flex h-full">
                            <div className="flex flex-col w-full">
                                <span className="text-base font-semibold">Proposals</span>
                                <div className="flex items-center mt-[5px]">
                                    <span className="font-bold text-2xl">{totalCount}</span>
                                    <div className="ml-[5px] flex items-center mt-[5px]">
                                        {upDownCompare("up", 100)}
                                    </div>
                                </div>

                                <div className="w-full h-full flex">
                                    <div className="flex flex-col flex-1 justify-center">
                                        <div className="flex items-start">
                                            <div className="w-[12px] h-[12px] bg-[#724169] rounded-full mt-[6px]"></div>
                                            <div className="flex flex-col ml-[10px]">
                                                <span className="text-base font-semibold">Accepted ({acceptedPercentage}%)</span>
                                                <span className="text-xs font-normal text-[#929292]">{acceptedCount} proposal{acceptedCount === 1 ? '' : 's'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start mt-[14px]">
                                            <div className="w-[12px] h-[12px] bg-[#f17574] rounded-full mt-[6px]"></div>
                                            <div className="flex flex-col ml-[10px]">
                                                <span className="text-base font-semibold">Pending ({pendingPercentage}%)</span>
                                                <span className="text-xs font-normal text-[#929292]">{pendingCount} proposal{pendingCount === 1 ? '' : 's'}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start mt-[14px]">
                                            <div className="w-[12px] h-[12px] bg-[#f7aa6e] rounded-full mt-[6px]"></div>
                                            <div className="flex flex-col ml-[10px]">
                                                <span className="text-base font-semibold">Rejected ({rejectedPercentage}%)</span>
                                                <span className="text-xs font-normal text-[#929292]">{rejectedCount} proposal{rejectedCount === 1 ? '' : 's'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[300px] h-full flex flex-end pb-[10px]">
                                        <PieChartExample 
                                            data={[
                                                { name: 'Accepted', value: acceptedPercentage },
                                                { name: 'Pending', value: pendingPercentage },
                                                { name: 'Rejected', value: rejectedPercentage },
                                            ]}
                                        />
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
                                <span className="text-base font-semibold">Works</span>
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
    );
};

export default Dashboard;