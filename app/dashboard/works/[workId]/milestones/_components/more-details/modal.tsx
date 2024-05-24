import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Clock, Download, File, Link, Send, } from "lucide-react"; 
import CollapsibleButtonArrow from "@/components/collapsible-button-arrow"; 
import Image from "next/image";
import ParsedContent from "@/components/parsed-content";
import Tasks from "./_components/tasks";
import { formatDate } from "./_components/time-format";
import { isFileImage } from "@/utils/is-file-image";
import InitFiles from "./_components/files";
import { toast } from "sonner";
import { formatAmount } from "@/utils/format-amount";
import { formatTimestampToDateDefault } from "@/utils/formated-timestamp";
import CommentsInit from "./_components/comments";

interface MoreDetailsModalProps {
    children: React.ReactNode;
    milestone: any;
    workId: string;
    openDetails: boolean;
}

const tasks = [
    {
        id: 1,
        name: "Create Book Overview and Outline"
    },
    {
        id: 2,
        name: "Write Introduction Chapter"
    },
    {
        id: 3,
        name: "Develop Main Plot and Story Arc"
    },
    {
        id: 4,
        name: "Write Character Descriptions and Development"
    },
    {
        id: 5,
        name: "Write Middle Chapters (Core Content)"
    },
    {
        id: 6,
        name: "Craft Climax and Resolution Chapters"
    },
    {
        id: 7,
        name: "Edit, Format, and Finalize Manuscript"
    }
];

const MoreDetailsModal = ({
    children,
    milestone,
    workId,
    openDetails
}: MoreDetailsModalProps) => { 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isReadyForSubmit, setIsReadyForSubmit] = useState<boolean>(false);
    const [submitForReview, setSubmitForReview] = useState<boolean>(false);

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

    const checkIfAllTasksAreDone = (): boolean => {
        for (let task of milestone.tasks) {
            if (!task.done) {
                return false;
            }
        }
        return true;
    }


    return (
        <Dialog onOpenChange={(o)=>{setIsOpen(o); if(o===false){setIsReadyForSubmit(false)}}} open={isOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-transpraent p-0 rounded-none border-none flex items-center justify-center max-w-fit gap-0 shadow-xl">
                <div className="w-[700px] h-[700px] bg-[#f1f2f4] rounded-l-md">
                    <div className="w-full h-full flex flex-1 flex-col overflow-y-scroll">
                        <div className="flex flex-1">
                            <div className="p-[40px] pt-[20px] w-full h-full relative">

                                <div className="flex items-center sticky top-0 left-0 bg-[#f1f2f4] pt-[15px] pb-[10px] z-50 ">
        
                                    <span className="text-2xl font-semibold line-clamp-1 text-[#404145]">{milestone.title}</span>
                                    {milestone?.status === "inReview" &&
                                        <div className="bg-[#ff9200] flex items-center justify-center w-fit h-[28px] rounded-full pl-[8px] pr-[8px] ml-[10px]">
                                            <Clock size={16} color="white"/>
                                            <span className="text-sm text-white  font-semibold ml-[4px]">In Review</span>
                                        </div>
                                    } 
                                    {milestone?.status === "active" &&
                                        <div className=" bg-[#28a746] flex items-center justify-center w-fit h-[28px] rounded-full pl-[8px] pr-[8px] ml-[10px]">
                                            <CircleCheck size={16} color="white"/>
                                            <span className="text-sm text-white  font-semibold ml-[4px]">Active</span>
                                        </div>
                                    }
                                </div>

                                <div className="">
                                    <div className="flex items-start">
                                        <div className="flex items-center pr-[10px] mr-[10px] border-r border-[#EAEAEA]">
                                            <span className="text-sm">Due date: <span className="font-semibold">{formatTimestampToDateDefault(milestone.dueDate)}</span></span>
                                        </div>
                                        <div className="flex items-center pr-[10px] mr-[10px] border-r border-[#EAEAEA]">
                                            <span className="text-sm">Payment: <span className="font-bold ">{formatAmount(milestone.payment)}</span></span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm">Tasks: <span className="font-bold">{milestone.tasks.length}</span></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-[20px]">
                                    <span className="text-base font-semibold">Members</span>
                                    <div className="flex flex-1 mt-[5px]">
                                        <Avatar className="w-[40px] h-[40px] border-2 border-transparent">
                                            <AvatarImage src={milestone?.members?.client?.profileImageUrl} />
                                            <AvatarFallback>{milestone?.members?.client?.fullName[0]}</AvatarFallback>
                                        </Avatar>
                                        <Avatar className="w-[40px] h-[40px] -ml-[12px] border-[2px] border-white">
                                            <AvatarImage src={milestone?.members?.user?.profileImageUrl} />
                                            <AvatarFallback>{milestone?.members?.user?.fullName[0]}</AvatarFallback>
                                        </Avatar> 
                                    </div>
                                </div>

                                <div className="w-full mt-[20px]">
                                    <CollapsibleButtonArrow
                                        buttonTitle="What you need to do:"
                                        openDetails={openDetails}
                                    >
                                        <div className="mt-[10px]">
                                            <span className="text-base font-semibold text-[#172B4D]">Description</span>
                                            <p className="text-sm mt-[5px] leading-[1.5] text-[#172B4D]">
                                                <ParsedContent
                                                    content={milestone.longDescription}
                                                />
                                            </p>
                                        </div>

                                        <div className="mt-[20px] w-full">
                                        <div className="flex items-start flex-col w-full">
                                            <div className="flex items-center">
                                                <span className="text-base font-semibold text-[#172B4D]">Attachemnts:</span>
                                            </div>
                                            <div className="mt-[15px] flex flex-col w-full">
                                                {milestone?.clientFiles?.map((file:any)=>(<>
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
                                        </div>
                                    </div>
                                    </CollapsibleButtonArrow>
                                </div>

                                <Tasks
                                    tasks={milestone.tasks}
                                    canUpdate={milestone.status==="active"}
                                />
                                
                                <InitFiles
                                    setIsReadyForSubmit={(t)=>{setIsReadyForSubmit(t)}}
                                    milestoneStatus={milestone.status}
                                    submitForReview={submitForReview}
                                    updateSubmitForReview={setSubmitForReview}
                                    workId={workId}
                                    milestone={milestone}
                                />

                                {milestone?.userFiles?.map((file:any)=>(<>
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
                                            <span className="text-sm text-[#172b4d] font-bold hover:underline cursor-pointer"
                                                onClick={()=>{window.open(file.url)}}
                                            >{file.name}</span>
                                            <span className="font-normal text-sm text-[#44546f] mt-[2px]">Added {formatDate(file._creationTime)}</span>

                                            {file?.status === "inReview" &&
                                                <div className="mt-[5px] bg-[#ff9200] flex items-center justify-center w-fit h-[25px] rounded-full pl-[8px] pr-[8px]">
                                                    <Clock size={14} color="white"/>
                                                    <span className="text-xs text-white  font-semibold ml-[4px]">In Review</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </>))}
                                    
                                {(milestone.status === "active" && isReadyForSubmit) &&
                                    <div className="w-full bottom-[20px] left-0 bg-[#e4e6ea] sticky mt-[20px] rounded-[10px] border border-[#d6d6d6]">
                                        <div className="p-[20px] flex items-center">
                                            <div className="flex flex-1 pr-[70px]">
                                                <p className="text-sm font-normal">Before submiting for review please be sure that you included all files of your finished work.</p>
                                            </div>
                                            <div className="flex items-center">
                                                <Button
                                                    onClick={()=>{
                                                        if(checkIfAllTasksAreDone() === true){
                                                            setSubmitForReview(true)
                                                        }else{
                                                            toast.error("You need to mark as done all tasks to submit for review.")
                                                        }
                                                    }}
                                                >
                                                    Submit for review
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                <CommentsInit 
                    milestoneId={milestone?._id}
                    members={milestone?.members}
                />

            </DialogContent>
        </Dialog>
    )
}

export default MoreDetailsModal;