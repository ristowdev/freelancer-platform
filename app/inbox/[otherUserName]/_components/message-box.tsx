'use client';
import { formatTime } from "@/components/time-format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Download, MoreHorizontal, Reply, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuFileText } from "react-icons/lu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import EmojiPicker from "emoji-picker-react";
import ReactionPickEmoji from "./reaction-pick-emoji";

interface MessagesCardProps {
    message: any;
    userId: Doc<"users">["_id"];
}

const MessageBox = ({message, userId}: MessagesCardProps) => {

    const isFileImage = (fileType: string): boolean => {
        return fileType.startsWith('image/');
    }; 

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
        <>
            <div className="flex w-[640px] pl-[24px] pr-[24px] mt-[0px] hover:bg-[#fafafa] pt-[20px] pb-[20px] group/message relative"
            >
                <div className="mr-[10px]">
                    <Avatar className="w-[32px] h-[32px]">
                        <AvatarImage src={message.user.profileImageUrl} alt={message.user.username} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center flex-col">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-[10px]">
                            <span className="text-sm font-semibold">{message.userId === userId ? "Me" : message.user.fullName}</span>
                            <span className="text-xs ml-[5px] text-[#62646a]">{formatTime(message._creationTime)}</span>
                        </div>
                        {message.text !== "" &&
                        <p className="text-sm text-[#62646a] leading-[1.6]">
                            {message.text}
                        </p>}
                        {(message.type === "onlyFiles" || message.type === "messageWithFiles") &&
                            <>
                                {(message.text === "" && message?.files) &&
                                    <p className="text-sm text-[#62646a] leading-[1.6]">
                                        {message?.files?.length === 1 ? "1 File" : message?.files?.length + " Files"}
                                    </p>
                                }
                                <div className="mt-[15px] flex">
                                    {message?.files?.map((file: any, index: number)=> (
                                        <>
                                            {isFileImage(file.type) ? <>
                                                <div className={cn("flex flex-col", index+1 !== message?.files?.length && "mr-[15px]" )}>
                                                    <Link href={file.url} target="_blank">
                                                        <Image
                                                            src={file.url}
                                                            alt={file.name}
                                                            width={160}
                                                            height={110}
                                                            objectPosition='start'
                                                            className='w-[160px] h-[110px] object-cover object-center rounded-[5px]'
                                                        />
                                                    </Link>
                                                    <div className="mt-[10px] w-[160px] flex">
                                                        <div className="flex items-center mr-[3px]">
                                                            <div className="w-[100px]">
                                                                <Button
                                                                    variant="ghost"
                                                                    className="group/download m-0 p-0 w-full flex h-auto hover:bg-transparent"
                                                                    onClick={(e)=>{
                                                                        handleDownload(file.url, file.name);
                                                                    }} 
                                                                >
                                                                    <div className="w-[20px] mr-[3px] flex items-center mb-[1px]">
                                                                        <Download size={12} color="#74767e" className="group-hover/download:stroke-[#1dbf73]"/>   
                                                                    </div>
                                                                    <span className="text-[12px] text-[#74767e] font-normal group-hover/download:text-[#1dbf73]">{file.name.substring(0, 12)}</span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-[10px] font-normal text-[#95979d]">{`(${file?.size})`}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </> : <> 
                                            <div className={cn("flex flex-col", index+1 !== message?.files?.length && "mr-[15px]" )}>
                                                    <Link href={file.url} target="_blank">
                                                        <div className="w-[160px] h-[110px] rounded-[10px] bg-[#f0f0f0] flex items-center flex-col justify-center">
                                                            <div className="p-[10px] flex items-center flex-col text-center justify-center">
                                                                <div className="w-[40px] h-[40px] rounded-full bg-[#e4e4e4] flex items-center justify-center">
                                                                    <LuFileText size={21} color="#050505"/>
                                                                </div>
                                                                <div className="ml-[5px] mt-[5px]"> 
                                                                    <span className="text-[14px] line-clamp-1 w-[100px]">{file.name}</span>
                                                                    <span className="text-[11px] line-clamp-1 w-[100px] font-light">{file.size}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div className="mt-[10px] w-[160px]">
                                                        <div className="flex">
                                                                <Button
                                                                    variant="ghost"
                                                                    className="group/download m-0 p-0 w-auto flex h-auto hover:bg-transparent ml-0 pl-0"
                                                                    onClick={(e)=>{
                                                                        handleDownload(file.url, file.name);
                                                                    }} 
                                                                >
                                                                    <div className="w-auto mr-[3px] flex items-center mb-[1px]">
                                                                        <Download size={12} color="#74767e" className="group-hover/download:stroke-[#1dbf73]"/>   
                                                                    </div>
                                                                    <span className="text-[12px] text-[#74767e] font-normal group-hover/download:text-[#1dbf73]">Download</span>
                                                                </Button>
                                                        </div> 
                                                    </div> 
                                                </div>
                                            </>}
                                        </>
                                    ))}
                                </div>
                            </>
                        }
                    </div> 
                </div>

                <div className="group-hover/message:flex hidden top-0 right-0 mt-[20px] mr-[20px] absolute">
                    <div className="">
                        <ReactionPickEmoji 
                            onEmojiSelect={(emoji)=>{
                                console.log(emoji)
                            }}
                        />
                    </div>
                    <div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button 
                                        size="icon"
                                        variant="ghost"
                                        className="p-0 m-0 w-[32px] h-[32px] hover:bg-[#efeff0] rounded-full"
                                    >
                                        <Reply size={20} color="#74767e"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#404145] h-[41px] rounded-[10px] flex items-center justify-center" side="bottom">
                                    <p className="text-md font-normal text-white">Reply</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button 
                                        size="icon"
                                        variant="ghost"
                                        className="p-0 m-0 w-[32px] h-[32px] hover:bg-[#efeff0] rounded-full"
                                    >
                                        <MoreHorizontal size={20} color="#74767e"/>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#404145] h-[41px] rounded-[10px] flex items-center justify-center" side="bottom">
                                    <p className="text-md font-normal text-white">More actions</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MessageBox;