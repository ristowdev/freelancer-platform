import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; 
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "convex/react";
import Image from "next/image";
import { isFileImage } from "@/utils/is-file-image";
import { Download, File, Link } from "lucide-react";
import { formatDate } from "@/app/dashboard/works/[workId]/milestones/_components/more-details/_components/time-format";

interface ModalFormProps { 
    handleCloseCustom: () => void;
    profile: any;
    project: any;
}

export function ModalForm({ 
    handleCloseCustom,
    profile,
    project
}:ModalFormProps) {
    
    const {
        mutate: deleteProject,
        pending
    } = useApiMutation(api.profile.deletePortfolioProject)

    const handleDelete = () => {
        deleteProject({  
            portfolioId: project._id
        })
            .then(() => {
                toast.info("Project deleted from portfolio.");
                handleCloseCustom()
            })
            .catch((err) => {
                console.log(err)
                toast.error("Failed to delete the project")
            })
    }
    
    return ( 
        <>
            <span className="text-base text-black">This action will delete "test test" from all of your profiles. Are you sure to want to delete this portfolio project?</span>
            <div className="w-full flex justify-end pb-[20px] sticky bottom-0 left-0 bg-white pt-[20px] mt-[40px]">
                <Button 
                    type="button" 
                    variant="link" 
                    className="text-base p-0 m-0 text-[#108A00] mr-[25px]"
                    onClick={handleCloseCustom}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    className="bg-[#108A00] hover:bg-[#0c6300] rounded-xl text-base pl-[25px] pr-[25px]"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div> 
        </>
    );
}
