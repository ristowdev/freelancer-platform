'use client';
import { formatTime } from "@/components/time-format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Download, File, Flag, MoreHorizontal, Reply, Smile } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuFileText } from "react-icons/lu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import EmojiPicker from "emoji-picker-react";
import ReactionPickEmoji from "../emoji-system/reaction-pick-emoji";
import MessageReactionsModal from "../reactions-system/message-reactions-modal";
import { FaReply } from "react-icons/fa";
import ReportMessage from "../report-message";
import { IoFlagSharp } from "react-icons/io5";

interface MessagesCardProps {
    message: any;
    userId: Doc<"users">["_id"];
    onMessageReply: (message: any) => void;
    scrollToMessage: (id: string) => void;
    proposal: any;
}

const MessageBox = ({
    message, 
    userId,
    onMessageReply,
    scrollToMessage,
    proposal
}: MessagesCardProps) => { 
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
    console.log(message.messageReply)
 
    return (
        <>
            <div className="flex w-[80%] pl-[24px] pr-[24px] mt-[0px] hover:bg-[#fafafa] pt-[20px] pb-[20px] group/message relative" >
                <div className="mr-[15px]">
                    <Avatar className="w-[32px] h-[32px]">
                        <AvatarImage src={message.user.profileImageUrl} alt={message.user.username} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex items-center flex-col w-full ">
                    <div className="flex flex-col w-full">
                        <div className="flex items-center mb-[15px]">
                            <span className="text-sm font-semibold">{message.userId === userId ? "Me" : message.user.fullName}</span>
                            <span className="text-xs ml-[5px] text-[#62646a]">{formatTime(message._creationTime)}</span>
                            {message.reported && 
                                <div className="flex items-center ml-[10px]">
                                    <div className="flex items-center mr-[5px]">
                                        <IoFlagSharp size={16} color="#c43333" />
                                    </div>
                                    <span className="text-base text-[#c43333] font-light">Reported</span>
                                </div>
                            }
                        </div>
                        {message?.firstMessage && message?.firstMessage === true && <>
                            <div className="mb-[10px] ">
                                <span className="text-sm text-[#62646a] font-normal">Proposal Request Accepted</span>
                            </div>
                            <div className="w-full bg-white min-h-[200px] border border-solid border-[#e4e5e7] rounded-[5px] mb-[20px]">
                                <div className="flex p-[20px] w-full flex-col h-full">
                                    <div className="flex flex-1">
                                        <div className="flex flex-col">
                                            <div className="flex w-[150px] flex-col">
                                                <span className="text-sm font-semibold text-[#62646a]">Details</span>
                                            </div>
                                            <div className="mt-[5px]">
                                                <span className="text-sm font-normal text-[#62646a]">Project:</span>
                                            </div> 
                                            <div className="mt-[5px]">
                                                <span className="text-sm font-normal text-[#62646a]">Price type:</span>
                                            </div> 
                                            <div className="mt-[5px]">
                                                <span className="text-sm font-normal text-[#62646a]">{"You'll do for:"}</span>
                                            </div> 
                                            {/* <div className="mt-[5px]">
                                                <span className="text-sm font-normal text-[#62646a]"></span>
                                            </div>  */}
                                        </div>
                                        <div className="ml-[30px] w-full flex mt-[25px] flex-col items-end">
                                            <div className="flex">
                                                <Link
                                                    className="text-sm underline h-fit text-[#62646a]"
                                                    href={`/project-details/${proposal?.project?.slug}`}
                                                >
                                                    {proposal?.project?.title}
                                                </Link>
                                            </div> 
                                            <div className="mt-[10px]">
                                                <span className="text-sm font-normal text-[#62646a]">{proposal?.project?.priceType}</span>
                                            </div> 
                                            <div className="mt-[10px]">
                                                <span className="text-sm font-normal text-[#62646a]">{`$${proposal?.hourlyRate}.00/${proposal?.project?.priceType === "Hourly" ? "hr" : ""}`}</span>
                                            </div> 
                                            {/* <div className="flex mt-[10px]">
                                                <Link
                                                    className="text-sm underline h-fit text-[#1dbf73]"
                                                    href={`/project-details/${proposal?.project?.slug}`}
                                                >
                                                    View proposal
                                                </Link>
                                            </div>  */}
                                        </div>
                                    </div>
                                    <div className="border-t border-[#e4e5e7] w-full pt-[10px] flex mt-[10px]">
                                        <div className="flex w-full">
                                            <p className="text-sm font-normal text-[#62646a] line-clamp-2">Cover letter: <br/>{proposal?.coverLetter} j eiowjo fiewjoi fjeowi jfoiew j eiowjo fiewjoi fjeowi jfoiew j eiowjo fiewjoi fjeowi jfoiew</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                        {message?.messageReply && <>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center mb-[10px]">
                                    <FaReply color="#74767e" size={12}/>
                                    <span className="text-[#74767E] text-sm ml-[5px]">Replied</span>
                                </div>
                                <div 
                                    className="w-full border-l-[3px] border-l-[#95979d] bg-[#fafafa] group-hover/message:bg-[#efeff0] rounded-[4px] mb-[15px] cursor-pointer"
                                    onClick={()=>{scrollToMessage(message?.messageReply?._id)}}
                                >
                                    <div className="pl-[17px] pr-[12px] pt-[10px] pb-[10px] w-[full]">
                                        <div className="flex w-full">
                                            <div className="flex flex-1 flex-col w-full">                   
                                                <div className="flex items-center mb-[5px]">
                                                    <span className="text-sm font-semibold text-[#95979d]">{message?.messageReply?.toUser?._id === userId ? "Me" : message?.messageReply?.toUser?.fullName}</span>
                                                    <span className="text-xs ml-[5px] text-[#95979d]">{formatTime(message?.messageReply?._creationTime)}</span>
                                                </div>
                                                <div className="w-[65%]">
                                                    <p className="text-sm text-[#95979d] font-normal line-clamp-1">
                                                        { 
                                                            message?.messageReply?.type === "onlyMessage" ?    
                                                            message?.messageReply?.text :
                                                            message?.messageReply?.text === "" ?
                                                            message?.messageReply?.files?.length === 1 ? "1 File" :
                                                            message?.messageReply?.files?.length + " Files" :
                                                            message?.messageReply?.text
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            {message?.messageReply?.type !== "onlyMessage" && <>
                                                {message?.messageReply?.files?.length === 1 ? <>
                                                    {isFileImage(message?.messageReply?.files[0]?.type) ? <>
                                                        <div className="relative w-[45px] h-auto flex items-center justify-center">
                                                            <div className="w-[45px] h-[45px] flex items-center justify-center rounded-[4px]">
                                                                <Image
                                                                    src={message?.messageReply?.files[0].url}
                                                                    alt={message?.messageReply?.files[0].name}
                                                                    width={45}
                                                                    height={45}
                                                                    objectPosition='start'
                                                                    className='w-[45px] h-[45px] object-cover object-center rounded-[4px]'
                                                                />
                                                            </div>
                                                        </div>
                                                    </> : <>
                                                    
                                                        <div className="relative w-[45px] h-auto flex items-center justify-center">
                                                            <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#ffffff] border solid border-[#e4e5e7] rounded-[4px]">
                                                                <File size={22} color="#74767e"/>
                                                            </div>
                                                            <div className="w-[45px] h-[45px] bg-[#000000b3] rounded-[4px] flex items-center justify-center absolute top-0 left-0">
                                                                <span className="text-base text-white">{`+1`}</span>
                                                            </div>
                                                        </div>
                                                    </>}     
                                            
                                                </> : <>
                                                    <div className="relative w-[45px] h-auto flex items-center justify-center">
                                                        <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#ffffff] border solid border-[#e4e5e7] rounded-[4px]">
                                                            <File size={22} color="#74767e"/>
                                                        </div>
                                                        <div className="w-[45px] h-[45px] bg-[#000000b3] rounded-[4px] flex items-center justify-center absolute top-0 left-0">
                                                            <span className="text-base text-white">{`+${message?.messageReply?.files?.length}`}</span>
                                                        </div>
                                                    </div>
                                                </>}
                                            </>} 
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>}
                        {message.text !== "" &&
                            <p className="text-sm text-[#62646a] leading-[1.6]">
                                {message.text}
                            </p>
                        }
                        {(message.type === "onlyFiles" || message.type === "messageWithFiles") &&
                            <>
                                {(message.text === "" && message?.files) &&
                                    <p className="text-sm text-[#62646a] leading-[1.6]">
                                        {message?.files?.length === 1 ? "1 File" : message?.files?.length + " Files"}
                                    </p>
                                }
                                <div className="mt-[15px] grid grid-cols-[repeat(auto-fill,minmax(170px,0fr))] gap-4">
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

                        {message?.reactions && message?.reactions?.length > 0  &&
                            <div className="flex">
                                <MessageReactionsModal
                                    message={message}
                                    currentUserId={userId}
                                >
                                    <Button 
                                        variant="ghost"
                                        className="hover:bg-transparent m-0 p-0 w-auto h-auto flex items-start justify-start"
                                    >
                                        <div className="mt-[10px] border border-[#e4e4e4] rounded-[25px] flex bg-white pl-[10px] pr-[10px] items-center pt-[2px] pb-[2px] justify-center">
                                            {message?.reactions?.map((reaction: any, index: number)=> (<>
                                                <div className="flex items-center w-[13px] justify-center" key={index}>
                                                    <span className={cn("text-[13px]", index+1 !== message?.reactions?.length && "mr-[5px]")}>{reaction.reaction}</span>
                                                </div>
                                            </>))}
                                            {message?.reactions?.length > 1 &&
                                                <div className="flex items-center ml-[5px] w-[5px]  justify-center ">
                                                    <span className="text-[13px] font-light">{message?.reactions?.length}</span>
                                                </div>
                                            }
                                        </div>
                                    </Button>
                                </MessageReactionsModal>
                            </div>
                        }
                    </div> 
                </div>

                <div className="group-hover/message:flex hidden top-0 right-0 mt-[15px] mr-[20px] absolute z-10">
                    <div className="">
                        <ReactionPickEmoji 
                            message={message}
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
                                        onClick={()=>{onMessageReply(message)}}
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
                    {message.userId !== userId &&
                        <ReportMessage 
                            message={message}
                            userId={userId}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default MessageBox;