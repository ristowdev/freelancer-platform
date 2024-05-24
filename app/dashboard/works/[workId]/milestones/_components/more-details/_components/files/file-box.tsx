'use client';
import CircularProgress from "@/components/circular-progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isFileImage } from "@/utils/is-file-image";
import { Clock, File, X } from "lucide-react";
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
       <div className="flex mr-[10px] group relative w-full" key={index}>
            <div className="flex flex-1">
                {(progress === undefined) ? <>
                    <div className="w-full flex group">
                        <div className="flex w-[112px] bg-[#dadfe3] rounded-sm h-[80px] mb-[20px] items-center justify-center">
                            {isFileImage(file.type) ? 
                                <Image
                                    src={URL.createObjectURL(file)}
                                    width={100}
                                    height={100}
                                    alt="meharba"
                                    className="w-full h-full object-contain"
                                />
                            : <>
                                <File size={27} color="#172b4d"/>
                            </>}
                        </div>
                        <div className="ml-[20px] flex flex-col w-full">
                            <div className="w-[65%]">
                                <span className="text-sm text-[#172b4d] font-bold line-clamp-1">{file.name} <span className="opacity-0"> dm.</span></span>
                            </div>
                            <span className="font-normal text-sm text-[#44546f] mt-[2px]">{formatFileSize(file.size)}</span>
                            {/* <div className="mt-[5px] bg-[#ff9200] flex items-center justify-center w-fit h-[25px] rounded-full pl-[8px] pr-[8px]">
                                <Clock size={14} color="white"/>
                                <span className="text-xs text-white  font-semibold ml-[4px]">In review</span>
                            </div> */}
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="w-full flex group cursor-pointer">
                        <div className="flex w-[112px] bg-[#dadfe3] rounded-sm h-[80px] mb-[20px] items-center justify-center">
                            <CircularProgress value={progress} />
                        </div>
                        <div className="ml-[20px] flex flex-col">
                            <span className="text-sm text-[#172b4d] font-bold group-hover:underline">{file.name}</span>
                            <span className="font-normal text-sm text-[#44546f] mt-[2px]">{formatFileSize(file.size)}</span>
                            {/* <div className="mt-[5px] bg-[#ff9200] flex items-center justify-center w-fit h-[25px] rounded-full pl-[8px] pr-[8px]">
                                <Clock size={14} color="white"/>
                                <span className="text-xs text-white  font-semibold ml-[4px]">In review</span>
                            </div> */}
                        </div>
                    </div> 
                </>
                }

            </div> 
            <div className="">
                <Button 
                    className="m-0 w-auto h-auto bg-[#ff6c6c38] p-[5px] rounded-full hover:bg-[#ff6c6c4f] mt-[2px]"
                    size="icon"
                    variant="ghost"
                    onClick={()=>{onRemoveFile(index)}}
                    type="button"
                >
                    <X color="red" size={17}/>
                </Button>
            </div>
       </div>
    )
}

export default FileBox;