import React from 'react';
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Id } from '@/convex/_generated/dataModel';
import { ConfirmModal } from '@/components/confirm-modal';
import { toast } from 'sonner';

interface ProjectsActionsCellProps {
    pId: Id<"proposals">;
    status: string,
}

const ProjectsActionsCell = ({ pId, status }: ProjectsActionsCellProps) => {
    const {
        mutate: accept,
    } = useApiMutation(api.proposals.acceptProposalClient);

    const {
        mutate: setPending,
        pending: canclePending,
    } = useApiMutation(api.proposals.setPendingProposalClient);
    

    // const handleDelete = () => {
    //     console.log("Delete", gigId)
    //     remove({ id: gigId });
    // }
    const onAccept = () => {
        console.log(pId)
        accept({id: pId})
            .then(() => {
                toast.info("Proposal accepted");
                //form.setValue("title", "");
            })
            .catch(() => {
                toast.error("Failed to accept proposal")
            })
    };

    const onPending = () => {
        console.log(pId)
        setPending({id: pId})
            .then(() => {
                toast.info("Proposal set to pending");
                //form.setValue("title", "");
            })
            .catch(() => {
                toast.error("Failed to set pending to proposal")
            })
    };

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0"  disabled={status==="Canceled"}>
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className=''> 
                <DropdownMenuItem
                    onClick={onAccept}
                >
                    <span>Accept proposal</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onPending}
                >
                    <span>Set pending proposal</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProjectsActionsCell;