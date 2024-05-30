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
    pId: string;
    status: string,
}

const ProjectsActionsCell = ({ pId, status }: ProjectsActionsCellProps) => {
    const {
        mutate: cancel,
        pending: canclePending,
    } = useApiMutation(api.proposals.cancelProposal);

    // const handleDelete = () => {
    //     console.log("Delete", gigId)
    //     remove({ id: gigId });
    // }
    const onCancel = () => {
        console.log(pId)
        cancel({id: pId})
            .then(() => {
                toast.info("Proposal canceled");
                //form.setValue("title", "");
            })
            .catch(() => {
                toast.error("Failed to cancel proposal")
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
            <DropdownMenuContent align="end" className='flex items-center flex-col'> 
                <ConfirmModal
                    header="Cancel Proposal"
                    description="You can't undo this. Are you sure?"
                    disabled={canclePending}
                    onConfirm={onCancel}
                    
                >
                        <Button variant="outline" className='text-sm p-0 border-none m-0 items-center text-center w-auto hover:bg-transparent h-[30px]' >Cancel Proposal</Button>

                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProjectsActionsCell;