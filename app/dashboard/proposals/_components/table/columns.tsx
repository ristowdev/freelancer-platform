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
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type WorksData = {
    id: string, 
    projectTitle: string,
    
}

export const columns: ColumnDef<WorksData>[] = [
    {
        accessorKey: "projectTitle",
        header: () => <div className="text-left">Work</div>,
        cell: ({ row }) => {
            return(
                <div className="text-left">
                    <Link className="space-x-2" href={`/project-details`}>
                        {row.getValue("projectTitle")}
                    </Link>
                </div>
            ) 
        },
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
