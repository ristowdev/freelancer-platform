"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"; 
import {
  Form,
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; 

import * as React from "react"; 
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
 
const FormSchema = z.object({
    skillName: z.string().max(70, "Skill name must be 70 characters or less"),
});

interface ModalFormProps {
  handleCloseCustom: () => void;
  profile: any;
}

export function ModalForm({
  handleCloseCustom,
  profile
}: ModalFormProps) {
    
    const {
        mutate: addNewTask,
        pending
    } = useApiMutation(api.profile.addNewTask)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        addNewTask({ 
            name: data.skillName 
        })
            .then(() => {
                handleCloseCustom()
                toast.info("Skill added successfully")
            })
            .catch((error) => {
                console.error(error);
            });
    }
 
  

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col h-full">
                <div className="flex space-x-4 flex-1">
                    <FormField
                        control={form.control}
                        name="skillName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel className="text-black text-base">Skill name</FormLabel>
                            <FormControl className="w-full mt-[10px]">
                                <Input
                                    placeholder="e.g., frontend, contnet writing, ai content" 
                                    {...field} 
                                    className="w-full text-black"
                                />
                            </FormControl> 
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex justify-end pb-[20px]">
                    <Button 
                        type="button" 
                        variant="link" 
                        className="text-base p-0 m-0 text-[#108A00] mr-[25px]"
                        onClick={handleCloseCustom}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={pending} className="bg-[#108A00] hover:bg-[#0c6300] rounded-xl text-base pl-[25px] pr-[25px]">Add</Button>
                </div>
            </form>
        </Form>
    );
}
