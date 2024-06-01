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
import FileUpload from "./_components/files/file-upload";
import ListFiles from "./_components/files/list-files";
import SkillsCRUD from "./_components/skills/CRUD";
import { generateTemporaryId } from "@/utils/temporary-id";
import { useMutation } from "convex/react";
import { formatFileSize } from "@/utils/format-file-size";

interface ModalFormProps { 
    handleCloseCustom: () => void;
    profile: any;
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
    profile
}:ModalFormProps) {


    const [fileList, setFileList] = useState<FileList | null>(null);
    const [filesUploadProgress, setFilesUploadProgress] = useState<UploadProgress>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const generateUploadUrl = useMutation(api.profile.generateUploadUrl);

    const {
        mutate: createFile,
        pending
    } = useApiMutation(api.profile.createFile)

    const {
        mutate: insertProject,
        pending: ipPending
    } = useApiMutation(api.profile.addProjectInPortfolio)
        
    // const form = useForm<z.infer<typeof FormSchema>>({
    //     resolver: zodResolver(FormSchema),
    // });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (isSubmitted || pending || ipPending) return;
        if(fileList?.length){
            setIsSubmitted(true);
            const uploadPromises: Promise<void>[] = [];
            const temporaryId = generateTemporaryId(); 

            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const postUrl = await generateUploadUrl();
        
                const promise = new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener('progress', (event) => {
                        if (event.lengthComputable) {
                            const uploadProgress = Math.round((event.loaded / event.total) * 100);
                            setFilesUploadProgress(prevProgress => ({
                                ...prevProgress,
                                [i]: uploadProgress
                            }));
                        }
                    });
                    xhr.open('POST', postUrl);
                    xhr.setRequestHeader('Content-Type', file.type);
                    xhr.onload = () => {
                        if(xhr.status === 200){
                            const response = JSON.parse(xhr.responseText);
                            const storageId = response.storageId; 
                            createFile({
                                name: file.name,
                                type: file.type,
                                size: formatFileSize(file.size),
                                fileId: storageId,
                                temporaryId,
                            })
                                .then(() => { 
                                    resolve();
                                    handleCloseCustom()
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        }else{
                            reject(new Error('Error: Non-200 status code received'));
                        }
                    };
                    xhr.onerror = (error) => reject(error);
                    xhr.send(file);
                });
                uploadPromises.push(promise);
            }
        
            try {
                await Promise.all(uploadPromises); 
                 
                insertProject({ 
                    projectTitle: data.title,
                    role: data.role,
                    description: data.description,
                    skills: data.skills,
                    temporaryId
                })
                    .then(() => {
                        toast.info("Project successfully added to the portfolio.");
                        //form.setValue("title", "");
                        // router.push(`/seller/${username}/manage-gigs/edit/${projectId}`)
                    })
                    .catch((err) => {
                        console.log(err)
                        toast.error("Failed to add the project")
                    })
                
            } catch (error) {
                console.error('Error uploading files:', error);
            }
            console.log(data)
        }else{
            toast.error("Add at least one file.")
        }
    }


    const onFileSelect = (files: FileList | null) => {
        if (!files) return;
      
        if (!fileList) {
          setFileList(files);
        } else {
          const updatedFiles: File[] = [];
          Array.from(fileList).forEach((file) => updatedFiles.push(file));
          Array.from(files).forEach((file) => updatedFiles.push(file));
          const updatedFileList = new DataTransfer();
          updatedFiles.forEach((file) => updatedFileList.items.add(file));
          setFileList(updatedFileList.files);
        }
    };

    const handleOnRemoveFile = (index: number) => {
        if (fileList) {
          const updatedFiles = Array.from(fileList);
          updatedFiles.splice(index, 1);
          const updatedFileList = new DataTransfer();
          updatedFiles.forEach((file) => updatedFileList.items.add(file));
          setFileList(updatedFileList.files);
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
                                    />
                                </FormControl> 
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-[30px]">
                        {fileList && fileList?.length > 0 &&
                            <>
                                <div className="w-full flex pr-[25px] pl-[15px] pt-[6px]">
                                    <div className="flex flex-1"></div>
                                    <span className="text-xs font-light text-[#95979d]">{fileList.length == 1 ? fileList.length+" File" : fileList.length+" Files"}</span>
                                </div>
                                <div className="bottom-0 left-0 w-full p-[15px] pt-0 mt-[10px] ">
                                    <div className="pt-[10px] pb-[0px] border-t border-[#dadbdd]">
                                        <ListFiles
                                            fileList={fileList}
                                            onRemoveFile={handleOnRemoveFile}
                                            filesUploadProgress={filesUploadProgress}
                                        />
                                    </div>
                                </div>
                            </>
                        }

                        <FileUpload
                            onFileSelect={onFileSelect}
                        />
                    </div>

                    <div className="mt-[20px]">
                        <Controller
                            name="skills"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base text-black">Skills</FormLabel>
                                <FormControl>
                                    <SkillsCRUD onChange={field.onChange} />
                                </FormControl> 
                                <FormMessage />
                            </FormItem>
                            )}
                        />

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
                    <Button type="submit" disabled={pending} className="bg-[#108A00] hover:bg-[#0c6300] rounded-xl text-base pl-[25px] pr-[25px]">Save</Button>
                </div>
            </form>
        </Form>
    );
}
