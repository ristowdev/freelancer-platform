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

interface UploadProgress {
    [key: number]: number;  
}

const SkillSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Task name is required"),
});

const FormSchema = z.object({
    title: z.string().max(70, "Title must be 70 characters or less"),
    role: z.string().max(100, "Role must be 100 characters or less"),
    description: z.string().max(600, "Description must be 70 characters or less"),
    skills: z.array(SkillSchema),
})

export function ModalForm({ 
    handleCloseCustom,
    profile,
    project
}:ModalFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: project.projectTitle || "",
            role: project.role || "",
            description: project.description || "",
        }
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
    }
 

    const handleDownload = async (fileUrl: string, fileName: string) => {
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.click();
    
            // Cleanup
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col h-full">
                <div className="flex flex-1 w-full flex-col">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                            <FormLabel className="text-black text-base">Project title</FormLabel>
                            <FormControl className="w-full mt-[10px]">
                                <Input 
                                    placeholder="Enter a brief but descriptive title" 
                                    {...field} 
                                    className="w-full text-black"
                                    readOnly
                                />
                            </FormControl> 
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-[20px]">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel className="text-black text-base">Your role (optional)</FormLabel>
                                <FormControl className="w-full mt-[10px]">
                                    <Input 
                                        placeholder="e.g., Front-end engineer or Marketing analyst" 
                                        {...field} 
                                        className="w-full text-black"
                                        readOnly
                                    />
                                </FormControl> 
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mt-[20px]">

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel className="text-black text-base">Project description</FormLabel>
                                <FormControl className="w-full mt-[10px]">
                                    <Textarea 
                                        placeholder="Briefly describe the project's goals, your solution and the impact you made here" 
                                        {...field} 
                                        className="w-full text-black max-h-[150px]"
                                        readOnly
                                    />
                                </FormControl> 
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-[30px]">
                        {project?.files?.map((file:any)=>(<>
                            <div className="w-full flex">
                                <div className="flex w-[112px] bg-[#dadfe3] rounded-sm h-[80px] mb-[20px] items-center justify-center">
                                    {isFileImage(file.type) ? 
                                        <Image
                                            src={file.url}
                                            width={100}
                                            height={100}
                                            alt="meharba"
                                            className="w-full h-full object-contain"
                                        />
                                    : <>
                                        <File size={27} color="#172b4d"/>
                                    </>}
                                </div>
                                <div className="ml-[20px] flex flex-col">
                                    <div className="w-full flex items-center cursor-pointer"
                                        onClick={()=>{window.open(file.url)}}
                                    >
                                        <Link className="mr-[4px]" size={16} color="#172b4d"/>
                                        <div className="max-w-[65%] flex items-center">
                                            <span className="text-sm text-[#172b4d] font-bold hover:underline cursor-pointer line-clamp-1 w-full"
                                            >
                                                {file.name} .dm
                                            </span>
                                        </div>
                                    </div>
                                    <span className="font-normal text-sm text-[#44546f] mt-[2px]">Added {formatDate(file._creationTime)}</span>
                                    <Button 
                                        variant="link" 
                                        className="w-fit p-0 m-0 text-xs text-[#172b4d] font-normal flex items-center"
                                        onClick={(e)=>{
                                            handleDownload(file.url, file.name);
                                        }} 
                                    >
                                        <Download size={12} color="#172b4d" className="mr-[3px]"/>
                                        Download
                                    </Button>
                                </div>
                            </div>
                        </>))}
 
                    </div>

                    <div className="mt-[20px]">
                   
                        <span className="text-base text-black">Skills</span>
                        <div className="flex flex-wrap mt-[15px]">
                            {project.skills.map((skill: any)=> (<>
                                <div className="p-[4px] pl-[12px] pr-[12px] rounded-full bg-[#E9E9E9] mr-[10px]">
                                    <span className="text-sm text-[#676767] font-medium">
                                        {skill.name}
                                    </span>
                                </div>
                            </>))}
                        </div>     

                    </div>

                </div>
                <div className="w-full flex justify-end pb-[20px] sticky bottom-0 left-0 bg-white pt-[20px]">
                    <Button 
                        type="button" 
                        variant="link" 
                        className="text-base p-0 m-0 text-[#108A00] mr-[25px]"
                        onClick={handleCloseCustom}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
