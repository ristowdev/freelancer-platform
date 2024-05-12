"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
// import GigActionsCell from "./actions"
import { Id } from "@/convex/_generated/dataModel"
import ProjectsActionsCell from "./actions"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProposalData = {
    id: string,
    hourlyRate: number,
    status: string,
    projectTitle: string,
    userName: string,
    submitTime: number,
    priceType: string,
    projectSlug: string,
}

export const columns: ColumnDef<ProposalData>[] = [
    {
        accessorKey: "projectTitle",
        header: () => <div className="text-left">Project</div>,
        cell: ({ row }) => {
            return(
                <div className="text-left">
                    <Link className="space-x-2 underline" href={`/project-details/${row.original.projectSlug}`}>
                        {row.getValue("projectTitle")}
                    </Link>
                </div>
            ) 
        },
    },
    {
        accessorKey: "userName",
        header: () => <div className="text-left">User</div>,
        cell: ({ row }) => {
            return(
                <div className="flex text-left items-center">
                    <Avatar className="w-[25px] h-[25px] bg-green-800 flex items-center justify-center mr-[10px]">
                        <AvatarFallback className="text-sm text-white">{row.original.userName[0]}</AvatarFallback>
                    </Avatar>
                    {row.getValue("userName")}
                </div>
            ) 
        },
    }, 
    {
        accessorKey: "hourlyRate",
        header: () => <div className="text-left">Cost</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("hourlyRate"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-left font-medium">
                {formatted}
                {row.getValue("priceType") === "Fixed" ? 
                    <span className="text-sm"> /fixed</span>
                    :
                    <span className="text-sm"> /hr</span>
                }
            </div>
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="text-left">Status</div>,
        cell: ({ row }) => {
            return(
                <div className="flex text-left items-center">
                    {row.original.status === "Pending" && <div className="w-[7px] h-[7px] rounded-full bg-yellow-600  mr-[10px] animate-pulse"></div>}
                    {row.original.status === "Canceled" && <div className="w-[7px] h-[7px] rounded-full  bg-red-600  mr-[10px]"></div>}
                    {row.original.status === "Active" && <div className="w-[7px] h-[7px] rounded-full  bg-green-600  mr-[10px] animate-pulse"></div>}
                    {row.getValue("status")}
                </div>
            ) 
        },
    },
    {
        accessorKey: "submitTime",
        header: () => <div className="text-right"></div>,
        cell: ({ row }) => {
            const elapsedTime = calculateElapsedTime(row.getValue("submitTime"));
            return <span className="text-right flex items-end justify-end text-md">{elapsedTime}</span>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <ProjectsActionsCell pId={row.original.id as Id<"proposals">}  status={row.original.status}/>
    },
]

function calculateElapsedTime(submitTime: number): string {
    const currentTime = Date.now();
    const timeDifference = currentTime - submitTime;
    const msInMinute = 60 * 1000;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInWeek = msInDay * 7;
    const msInMonth = msInDay * 30;

    if (timeDifference < msInMinute) {
        return `${Math.floor(timeDifference / 1000)} sec ago`;
    } else if (timeDifference < msInHour) {
        return `${Math.floor(timeDifference / msInMinute)} min ago`;
    } else if (timeDifference < msInDay) {
        return `${Math.floor(timeDifference / msInHour)} hr ago`;
    } else if (timeDifference < msInWeek) {
        return `${Math.floor(timeDifference / msInDay)} day ago`;
    } else if (timeDifference < msInMonth) {
        return `${Math.floor(timeDifference / msInWeek)} week ago`;
    } else {
        return `${Math.floor(timeDifference / msInMonth)} month ago`;
    }
}
