'use client';
 
import { formatTime } from "@/components/time-format";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";

interface MessagesCardProps {
    message: any;
    userId: Doc<"users">["_id"];
}

const MessageBox = ({message, userId}: MessagesCardProps) => {

    const isFileImage = (fileType: string): boolean => {
        return fileType.startsWith('image/');
    };

    return (
        <>
            <div className="flex w-[640px] pl-[24px] pr-[24px] mt-[40px]">
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
                        <p className="text-sm text-[#62646a] leading-[1.6]">
                            {message.text}
                        </p>
                        {(message.type === "onlyFiles" || message.type === "messageWithFiles") &&
                            <div className="mt-[10px] flex">
                                {message?.files?.map((file: any)=> (
                                    <>
                                        {isFileImage(file.type) ? <>
                                            <Link href={file.url} target="_blank">
                                                <Image
                                                    src={file.url}
                                                    alt={file.name}
                                                    width={128}
                                                    height={92}
                                                    objectPosition='start'
                                                    className='w-[128px] h-[92px] object-cover object-center rounded-[5px]'
                                                />
                                            </Link>
                                        </> : <>
                                            {file.url}
                                        </>}
                                    </>
                                ))}
                            </div>
                        }
                    </div>
                    {/* <div className="flex items-center gap-1">
                        <div className="text-xs text-gray-400">
                            {format(new Date(message._creationTime), 'p')}
                        </div>
                    </div> */}
                    {/* {isLast && isOwn && message.seen && (
                        <div
                            className="
                            text-xs 
                            font-light 
                            text-gray-500
                            "
                        >
                            {`Seen`}
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
}

export default MessageBox;