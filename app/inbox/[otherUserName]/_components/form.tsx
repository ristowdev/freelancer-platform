'use client';
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useEffect, useRef, useState } from "react";
import PickEmoji from "./emoji-system/pick-emoji";
import FileUpload from "./file-system/file-upload";
import ListFiles from "./file-system/list-files";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { generateTemporaryId } from "@/utils/temporary-id";
import { formatFileSize } from "@/utils/format-file-size";
import { File, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { isFileImage } from "@/utils/is-file-image";

interface FormProps {
    userId: Doc<"users">["_id"];
    conversationId: Doc<"conversations">["_id"];
    unReadMessages: number;
    onReplyToMessage: any;
    cancleReplyToMessage: () => void;
}

interface UploadProgress {
    [key: number]: number;  
}
  
const Form = ({
    userId,
    conversationId,
    unReadMessages,
    onReplyToMessage,
    cancleReplyToMessage
}: FormProps) => {
    const [text, setText] = useState<string>("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [fileList, setFileList] = useState<FileList | null>(null);
    const [filesUploadProgress, setFilesUploadProgress] = useState<UploadProgress>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const {
        mutate,
        pending
    } = useApiMutation(api.messages.send);

    const {
        mutate: readAllMessages,
    } = useApiMutation(api.messages.readAllMessages);

    const {
        mutate: createFile,
    } = useApiMutation(api.files.createFile);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    
    const handleSubmit = async () => {
        if ((!fileList?.length && !text) || isSubmitted || pending) return;

        if(!fileList?.length && text){
            mutate({
                text: text,
                userId,
                seen: false,
                conversationId,
                type: "onlyMessage",
                replayToMessageId: onReplyToMessage ? onReplyToMessage._id : ""
            })
                .then(() => {
                    setText("");
                    if(onReplyToMessage){
                        cancleReplyToMessage();
                    }
                    if (inputRef.current) {
                        inputRef.current.style.height = '46px';
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }else{
            if (fileList?.length) {
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

                    mutate({
                        text: text ? text : "",
                        userId,
                        seen: false,
                        conversationId,
                        type: text ? "messageWithFiles" : "onlyFiles",
                        temporaryId,
                        replayToMessageId: onReplyToMessage ? onReplyToMessage._id : ""
                    })
                        .then(() => {
                            setText("");
                            setFileList(null);
                            setIsSubmitted(false);
                            if(onReplyToMessage){
                                cancleReplyToMessage();
                            }
                            if (inputRef.current) {
                                inputRef.current.style.height = '46px';
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                    
                } catch (error) {
                    console.error('Error uploading files:', error);
                }
            } else {  
                
            }
        }
    }; 

    const handleReadAllMessages = () => {
        if(unReadMessages > 0){
            readAllMessages({ 
                conversationId,
            })
                .then(() => {
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const onEmojiSelect = (emoji: any) => {
        if (!inputRef.current) return;
        const startPos = inputRef.current.selectionStart ?? 0;
        const endPos = inputRef.current.selectionEnd ?? 0;
        const newText =
            text.substring(0, startPos) +
            emoji.emoji +
            text.substring(endPos, text.length);
        setText(newText);
        inputRef.current.selectionStart = startPos + emoji.length;
        inputRef.current.selectionEnd = startPos + emoji.length;
        inputRef.current.focus();
    };

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

    useEffect(() => {
        if(text){
            adjustTextareaHeight(text);
        }
    }, [text]);

    const adjustTextareaHeight = (text: string) => {
        if (inputRef.current) {
            if (text === "") {
                inputRef.current.style.height = '46px'; // Reset height to 46px when text is empty
                return;
            }

            const lineHeight = parseInt(getComputedStyle(inputRef.current).lineHeight);
            const numberOfLines = Math.floor(inputRef.current.scrollHeight / lineHeight);
            const maxLines = 6; // Maximum number of lines before auto-resizing

            if (numberOfLines <= maxLines) {
                inputRef.current.style.height = `${lineHeight * numberOfLines}px`;
                inputRef.current.style.overflowY = 'hidden';
            } else {
                inputRef.current.style.height = `${lineHeight * maxLines}px`;
                inputRef.current.style.overflowY = 'auto';
            }
        }
    };

    return (
        <>
            {onReplyToMessage && 
                <div className="border-t border-[#e4e5e7] w-full">
                    <div className="pl-[24px] pr-[24px] pt-[18px] pb-[24px]" >
                        <div className="flex w-full">
                            <div className="flex flex-1 flex-col">
                                <div className="flex items-start">
                                    <span className="text-sm font-normal text-[#404145]">Replying to</span>
                                    <span className="text-sm font-semibold text-[#62646a] ml-[4px]">{onReplyToMessage?.user?._id === userId ? "your message" : onReplyToMessage?.user?.fullName}</span>
                                </div>
                                <div className="w-[60%]">
                                    <p className="mt-[5px] font-normal text-sm text-[#74767e] line-clamp-1">
                                        { 
                                            onReplyToMessage?.type === "onlyMessage" ?    
                                            onReplyToMessage?.text :
                                            onReplyToMessage?.text === "" ?
                                            onReplyToMessage?.files?.length === 1 ? "1 File" :
                                            onReplyToMessage?.files?.length + " Files" :
                                            onReplyToMessage?.text
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                {onReplyToMessage?.type !== "onlyMessage" && <>
                                    {onReplyToMessage?.files?.length === 1 ? <>
                                        {isFileImage(onReplyToMessage?.files[0]?.type) ? <>
                                            <div className="relative w-[45px] h-auto flex items-center justify-center mr-[10px]">
                                                <div className="w-[45px] h-[45px] flex items-center justify-center rounded-[4px]">
                                                    <Image
                                                        src={onReplyToMessage?.files[0].url}
                                                        alt={onReplyToMessage?.files[0].name}
                                                        width={45}
                                                        height={45}
                                                        objectPosition='start'
                                                        className='w-[45px] h-[45px] object-cover object-center rounded-[4px]'
                                                    />
                                                </div>
                                            </div>
                                        </> : <>
                                        
                                            <div className="relative w-[45px] h-auto flex items-center justify-center mr-[10px]">
                                                <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#ffffff] border solid border-[#e4e5e7] rounded-[4px]">
                                                    <File size={22} color="#74767e"/>
                                                </div>
                                                <div className="w-[45px] h-[45px] bg-[#000000b3] rounded-[4px] flex items-center justify-center absolute top-0 left-0">
                                                    <span className="text-base text-white">{`+1`}</span>
                                                </div>
                                            </div>
                                        </>}     
                                
                                    </> : <>
                                        <div className="relative w-[45px] h-auto flex items-center justify-center mr-[10px]">
                                            <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#ffffff] border solid border-[#e4e5e7] rounded-[4px]">
                                                <File size={22} color="#74767e"/>
                                            </div>
                                            <div className="w-[45px] h-[45px] bg-[#000000b3] rounded-[4px] flex items-center justify-center absolute top-0 left-0">
                                                <span className="text-base text-white">{`+${onReplyToMessage?.files?.length}`}</span>
                                            </div>
                                        </div>
                                    </>}
                                </>}  

                                <Button 
                                    variant="ghost"
                                    className="hover:bg-transparent m-0 p-0 w-auto h-[25px]"
                                    onClick={cancleReplyToMessage}
                                >
                                    <X size={22} color="#95979d"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="pl-[24px] pr-[24px]" >
                <div className="flex items-center gap-2 lg:gap-4 w-full flex-col">
                    <div className={
                                cn(
                                    "relative w-full bg-white border border-[#e4e5e7] rounded-xl",
                                    fileList && fileList?.length > 0 && "h-auto"
                                )
                            }>
                            <Textarea
                                ref={inputRef}
                                placeholder={"Send message..."}
                                className="text-[#404145] font-light text-base py-2 px-4 bg-transparent w-full focus:outline-none resize-none flex min-h-[46px] h-[46px] border-none"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                                onFocus={(e)=>{
                                    handleReadAllMessages()
                                }}
                                maxLength={2000}
                            />

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
                    </div>

                    <div className="w-full flex items-center">
                        <div className="flex flex-1">
                            <PickEmoji 
                                onEmojiSelect={onEmojiSelect}
                            />
                            <FileUpload
                                onFileSelect={onFileSelect}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="hover:bg-transparent p-0 m-0 w-auto h-auto text-sm"
                                onClick={handleSubmit}
                                disabled={pending || isSubmitted} 
                                variant="ghost"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>    
    );
}

export default Form;