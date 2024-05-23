'use client';
import CircularProgress from "@/components/circular-progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { File, X } from "lucide-react";
import Image from "next/image";
 
interface FileBoxProps {
    file: File,
    index: number;
    onRemoveFile: (index: number) => void;
    progress: number
}
// 1dbf73 upload color
const FileBox: React.FC<FileBoxProps> = ({
    file,
    index,
    onRemoveFile,
    progress
}) => {
    const formatFileSize = (size: number): string => {
        if (size === 0) return '0 Bytes';
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        return parseFloat((size / Math.pow(1024, i)).toFixed(2)) + ' ' + units[i];
    };

    const isImage = (file: File): boolean => {
      return file.type.startsWith('image/');
    };
 
    return (
       <div className="flex mr-[10px] group relative" key={index}>
            <div className={cn("w-[128px] h-[92px] rounded-[4px] bg-[#fafafa] flex items-end justify-center", isImage(file) ? "" : "border border-[#e4e5e7]")}>
                {(progress === undefined) ? <>
                    {isImage(file) ? <>
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={128}
                            height={92}
                            objectPosition='start'
                            className='w-[128px] h-[92px] object-cover object-center rounded-[5px]'
                        />
                    </> : <>
                        <div className="w-[100px] mb-[5px] flex flex-col text-center">
                            <div className="flex items-center justify-center">
                                <File size={22} color="black"/>
                            </div>
                            <div className="mt-[10px]">
                            
                                <span className="text-xs text-[#dadbdd] font-bold line-clamp-1">{file.name} {' .'}</span>
                                <span className="text-xs text-[#dadbdd] font-light mt-[5px]">{formatFileSize(file.size)}</span>
                            </div>
                        </div>
                    </>} 
                </>
                :
                <>
                    <div className="w-[100px] mb-[5px] flex flex-col text-center">
                            <div className="flex items-center justify-center">
                                <CircularProgress value={progress} />
                            </div>
                            <div className="mt-[7px]">
                            
                                <span className="text-xs text-[#dadbdd] font-bold line-clamp-1">{file.name} {' .'}</span>
                                <span className="text-xs text-[#dadbdd] font-light mt-[5px]">{formatFileSize(file.size)}</span>
                            </div>
                        </div>
                </>
                }

            </div>
            <div className="group-hover:flex hidden absolute top-0 left-0 rounded-[4px] bg-[#0000008c] w-[128px] h-[92px] z-40 items-center justify-end flex-col">
                <div className="w-[100px] flex pb-[12px] flex-col text-center">
                    <span className="text-xs text-[#dadbdd] font-bold line-clamp-1">{file.name} {' .'}</span>
                    <span className="text-xs text-[#dadbdd] font-light mt-[5px]">{formatFileSize(file.size)}</span>
                </div>
            </div>
            <div className="absolute top-0 right-0 z-50 pt-[5px] pr-[5px]">
                <Button 
                    className="hover:bg-transparent m-0 p-0 w-auto h-auto"
                    size="icon"
                    variant="ghost"
                    onClick={()=>{onRemoveFile(index)}}
                    type="button"
                >
                    <X color="#e4e5e7" size={17}/>
                </Button>
            </div>
       </div>
    )
}

export default FileBox;