import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import FileUpload from "./file-upload";
import ListFiles from "./list-files";
import { generateTemporaryId } from "@/utils/temporary-id";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { formatFileSize } from "@/utils/format-file-size";
import { toast } from "sonner";
 
interface UploadProgress {
    [key: number]: number;  
}

interface InitFilesProps {
    setIsReadyForSubmit: (t: boolean) => void;
    milestoneStatus: string;
    submitForReview: boolean;
    updateSubmitForReview: (value: boolean) => void;
    milestone: any;
    workId: string;
}

const InitFiles = ({
    setIsReadyForSubmit,
    milestoneStatus,
    submitForReview,
    updateSubmitForReview,
    milestone,
    workId
}: InitFilesProps) => {
    const [fileList, setFileList] = useState<FileList | null>(null);
    const [filesUploadProgress, setFilesUploadProgress] = useState<UploadProgress>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const generateUploadUrl = useMutation(api.milestones.generateUploadUrl);
    
    const {
        mutate: createFile,
    } = useApiMutation(api.milestones.createFile);

    const {
        mutate: _submitForReview,
    } = useApiMutation(api.milestones.submitForReview);

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

    const handleSubmitForReview = async () => {
        if(fileList){
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
                                variant: "fromUser",
                                status:"inReview"
                            })
                                .then(() => { 
                                    resolve();
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
                _submitForReview({ 
                    workId: workId,
                    milestoneId: milestone._id,
                    temporaryId
                })
                    .then(() => {
                        toast.info("Submitted for review successfully");
                        setFileList(null);
                        //form.setValue("title", "");
                        // router.push(`/seller/${username}/manage-gigs/edit/${projectId}`)
                    })
                    .catch((err) => {
                        console.log(err)
                        toast.error("Failed to create gig")
                    })
                
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }
    }

    useEffect(()=>{
        if(fileList){
            if(fileList?.length > 0){
                setIsReadyForSubmit(true)
            }else{
                setIsReadyForSubmit(false);
            }
        }
    }, [fileList]);

    useEffect(()=>{

        if(submitForReview === true){
            handleSubmitForReview().then(()=>{
                updateSubmitForReview(false);
            });
 
        }
    }, [submitForReview])

    return (
        <> 
            <div className="mt-[20px] border-t border-[#EAEAEA] pt-[20px]">
                <div className="flex items-center">
                    <div className="flex items-center flex-1">
                        <GrAttachment size={18} color="#172B4D" />
                        <span className="text-base font-semibold text-[#172B4D] ml-[5px]">Work attachemnts</span>
                    </div>
                    {(milestoneStatus === "active" || milestoneStatus === "rejected") &&
                        <FileUpload 
                            onFileSelect={onFileSelect}
                        />
                    }
                </div>
                <div className="mt-[15px] flex flex-col w-full">
                    <ListFiles
                        onRemoveFile={handleOnRemoveFile}
                        fileList={fileList}
                        filesUploadProgress={filesUploadProgress}
                    />
                </div>
                 
            </div>
        </>
    )
}

export default InitFiles;