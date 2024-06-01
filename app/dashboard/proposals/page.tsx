"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import useBodyBackground from "@/hooks/useBodyBackground";
import { formatAmount } from "@/utils/format-amount";
import { MoveDownRight, MoveUpRight } from "lucide-react";
import { DataTable } from "./_components/table/data-table";
import { ProposalData, columns } from "./_components/table/columns"; 
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";

interface DashboardProps {};

const Dashboard = ({}: DashboardProps) => {
    useBodyBackground("#f4f4f4");
    const statsProposals = useQuery(api.dashboardStatistics.proposalStats);

   

    console.log("statsProposals")
    console.log(statsProposals)
    console.log(statsProposals)
    console.log(statsProposals)
    console.log(statsProposals)
    console.log(statsProposals)
    const [totalProposals, setTotalProposals] = useState(0);
    const [pendingProposals, setPendingProposals] = useState(0);
    const [activeProposals, setActiveProposals] = useState(0);
    const [totalChange, setTotalChange] = useState(0);
    const [pendingChange, setPendingChange] = useState(0);
    const [activeChange, setActiveChange] = useState(0);

    useEffect(() => {
        if (statsProposals) {
            const total = statsProposals.length;
            const pending = statsProposals.filter((proposal: any) => proposal.status === "Pending").length;
            const active = statsProposals.filter((proposal: any) => proposal.status === "Active").length;
            
            setTotalProposals(total);
            setPendingProposals(pending);
            setActiveProposals(active);
            
            // Dummy previous week data, replace this with actual logic to fetch last week's data
            const lastWeekTotal = 0; 
            const lastWeekPending = 0; 
            const lastWeekActive = 0;

            setTotalChange(calculatePercentageChange(total, lastWeekTotal));
            setPendingChange(calculatePercentageChange(pending, lastWeekPending));
            setActiveChange(calculatePercentageChange(active, lastWeekActive));
        }
    }, [statsProposals]);

    const calculatePercentageChange = (current: number, previous: number) => {
        if (previous === 0) return current === 0 ? 0 : 100;
        return ((current - previous) / previous) * 100;
    };

    const upDownCompare = (change: number) => {
        if (change > 0) {
            return (
                <div className="flex items-center">
                    <MoveUpRight color="green" size={14} className="-mb-[2px]" />
                    <span className="text-sm text-green-700 font-normal ml-[2px]">{change}%</span>
                </div>
            );
        }
        if (change < 0) {
            return (
                <div className="flex items-center">
                    <MoveDownRight color="red" size={14} className="-mb-[2px]" />
                    <span className="text-sm text-red-500 font-normal ml-[2px]">{change}%</span>
                </div>
            );
        }
        return <span className="text-sm text-gray-700 font-normal ml-[2px]">0%</span>;
    };

    if(statsProposals === undefined || statsProposals === null){
        return <>loading...</>;
    }

    const data: ProposalData[] = statsProposals.map(proposal => ({
        id: proposal._id,
        hourlyRate: proposal.hourlyRate,
        status: proposal.status,
        projectTitle: proposal.project.title,
        clientName: proposal.client.fullName,
        clientImageUrl: proposal.client.profileImageUrl!,
        submitTime: proposal._creationTime,
        priceType: proposal.project.priceType,
        projectSlug: proposal.project.slug,
    }));

    return (
        <>
            <div className="mt-[33px] container max-w-6xl px-4 w-full flex flex-col">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Proposals</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="font-bold text-2xl mt-[20px]">Proposals</h1>
                <div className="w-full mt-[0px]">
                    <div className="border border-[#e3e3e3] shadow-sm h-[150px] rounded-xl mt-[20px] w-full bg-white">
                        <div className="flex p-[20px] h-full items-center">
                            <div className="w-[33.333%] h-full">
                                <div className="pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Total</span>
                                    <span className="mt-[10px] font-bold text-3xl">{totalProposals}</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days</span>
                                        {upDownCompare(totalChange)}
                                    </div>
                                </div>
                            </div>

                            <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
                                <div className="pl-[30px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Pending</span>
                                    <span className="mt-[10px] font-bold text-3xl">{pendingProposals}</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days</span>
                                        {upDownCompare(pendingChange)}
                                    </div>
                                </div>
                            </div>

                            <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
                                <div className="pl-[30px] pr-[10px] flex flex-col">
                                    <span className="text-base font-semibold">Active</span>
                                    <span className="mt-[10px] font-bold text-3xl">{activeProposals}</span>
                                    <div className="mt-[10px] flex items-center">
                                        <span className="text-sm mr-[5px] text-[#7b7b7b]">last 30 days</span>
                                        {upDownCompare(activeChange)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="mt-[2%] w-full flex">
                    <div className="w-full h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm">
                        <div className="p-[20px] flex h-full">
                            <div className="flex flex-col w-full">
                                <span className="text-base font-semibold">Proposals</span>
                                <div className="mt-[20px]">
                                    <DataTable
                                        columns={columns}
                                        data={data}
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





// "use client"

// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
// import useBodyBackground from "@/hooks/useBodyBackground";
// import { formatAmount } from "@/utils/format-amount";
// import { MoveDownRight, MoveUpRight } from "lucide-react";
// import { DataTable } from "./_components/table/data-table";
// import { WorksData, columns } from "./_components/table/columns"; 
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useState, useEffect } from "react";

// interface DashboardProps {};

// const Dashboard = ({}: DashboardProps) => {
//     useBodyBackground("#f4f4f4");
//     const statsProposals = useQuery(api.dashboardStatistics.proposalStats);
    
//     console.log("statsProposals")
//     console.log(statsProposals)
//     console.log(statsProposals)
//     const [totalProposals, setTotalProposals] = useState(0);
//     const [pendingProposals, setPendingProposals] = useState(0);
//     const [activeProposals, setActiveProposals] = useState(0);
//     const [totalChange, setTotalChange] = useState(0);
//     const [pendingChange, setPendingChange] = useState(0);
//     const [activeChange, setActiveChange] = useState(0);

//     useEffect(() => {
//         if (statsProposals) {
//             const total = statsProposals.currentWeek.length;
//             const pending = statsProposals.currentWeek.filter(proposal => proposal.status === "Pending").length;
//             const active = statsProposals.currentWeek.filter(proposal => proposal.status === "Active").length;
            
//             setTotalProposals(total);
//             setPendingProposals(pending);
//             setActiveProposals(active);
            
//             // Dummy previous week data, replace this with actual logic to fetch last week's data
//             const lastWeekTotal = statsProposals.lastWeek.length; 
//             const lastWeekPending = statsProposals.lastWeek.filter(proposal => proposal.status === "Pending").length;
//             const lastWeekActive = statsProposals.lastWeek.filter(proposal => proposal.status === "Active").length;;

//             setTotalChange(calculatePercentageChange(total, lastWeekTotal));
//             setPendingChange(calculatePercentageChange(pending, lastWeekPending));
//             setActiveChange(calculatePercentageChange(active, lastWeekActive));
//         }
//     }, [statsProposals]);

//     const calculatePercentageChange = (current: number, previous: number) => {
//         if (previous === 0) return current === 0 ? 0 : 100;
//         return ((current - previous) / previous) * 100;
//     };

//     const upDownCompare = (change: number) => {
//         if (change > 0) {
//             return (
//                 <div className="flex items-center">
//                     <MoveUpRight color="green" size={14} className="-mb-[2px]" />
//                     <span className="text-sm text-green-700 font-normal ml-[2px]">{change}%</span>
//                 </div>
//             );
//         }
//         if (change < 0) {
//             return (
//                 <div className="flex items-center">
//                     <MoveDownRight color="red" size={14} className="-mb-[2px]" />
//                     <span className="text-sm text-red-500 font-normal ml-[2px]">{change}%</span>
//                 </div>
//             );
//         }
//         return <span className="text-sm text-gray-700 font-normal ml-[2px]">0%</span>;
//     };

//     return (
//         <>
//             <div className="mt-[33px] container max-w-6xl px-4 w-full flex flex-col">
//                 <Breadcrumb>
//                     <BreadcrumbList>
//                         <BreadcrumbItem>
//                             <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
//                         </BreadcrumbItem>
//                         <BreadcrumbSeparator>/</BreadcrumbSeparator>
//                         <BreadcrumbItem>
//                             <BreadcrumbLink>Proposals</BreadcrumbLink>
//                         </BreadcrumbItem>
//                     </BreadcrumbList>
//                 </Breadcrumb>
//                 <h1 className="font-bold text-2xl mt-[20px]">Proposals</h1>
//                 <div className="w-full mt-[0px]">
//                     <div className="border border-[#e3e3e3] shadow-sm h-[150px] rounded-xl mt-[20px] w-full bg-white">
//                         <div className="flex p-[20px] h-full items-center">
//                             <div className="w-[33.333%] h-full">
//                                 <div className="pr-[10px] flex flex-col">
//                                     <span className="text-base font-semibold">Total</span>
//                                     <span className="mt-[10px] font-bold text-3xl">{totalProposals}</span>
//                                     <div className="mt-[10px] flex items-center">
//                                         <span className="text-sm mr-[5px] text-[#7b7b7b]">1 week ago</span>
//                                         {upDownCompare(totalChange)}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
//                                 <div className="pl-[30px] pr-[10px] flex flex-col">
//                                     <span className="text-base font-semibold">Pending</span>
//                                     <span className="mt-[10px] font-bold text-3xl">{pendingProposals}</span>
//                                     <div className="mt-[10px] flex items-center">
//                                         <span className="text-sm mr-[5px] text-[#7b7b7b]">1 week ago</span>
//                                         {upDownCompare(pendingChange)}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="w-[33.333%] border-l border-[#e3e3e3] h-full">
//                                 <div className="pl-[30px] pr-[10px] flex flex-col">
//                                     <span className="text-base font-semibold">Active</span>
//                                     <span className="mt-[10px] font-bold text-3xl">{activeProposals}</span>
//                                     <div className="mt-[10px] flex items-center">
//                                         <span className="text-sm mr-[5px] text-[#7b7b7b]">1 week ago</span>
//                                         {upDownCompare(activeChange)}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div> 
//                 <div className="mt-[2%] w-full h-[300px] flex">
//                     <div className="w-full h-full rounded-xl bg-white border border-[#e3e3e3] shadow-sm">
//                         <div className="p-[20px] flex h-full">
//                             <div className="flex flex-col w-full">
//                                 <span className="text-base font-semibold">Proposals</span>
//                                 <div className="mt-[20px]">
//                                     <DataTable
//                                         columns={columns}
//                                         data={[]}
//                                     />
//                                 </div>
//                             </div> 
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Dashboard;
