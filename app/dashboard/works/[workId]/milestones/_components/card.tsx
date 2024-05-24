import { TiArrowSortedDown } from "react-icons/ti";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuFileText } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import MoreDetailsModal from "./more-details/modal";
import DoneProgress from "./more-details/_components/tasks/done-progress";
import { BadgeCheck, CircleCheck, Clock } from "lucide-react";
import { formatAmount } from "@/utils/format-amount";
import { formatTimestampToDateDefault, formatTimestampToDateObject } from "@/utils/formated-timestamp";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface MilestoneProps {
    milestone:any;
    workId: string;
}

const Card = ({
    milestone,
    workId
}: MilestoneProps) => { 
    const router = useRouter();

    return (
        <> 
            <div className="w-[full] bg-white mb-[10px] relative ml-[20px] rounded-md mt-[10px] min-h-[200px]">
                <div className="absolute w-[20px] h-[20px] bg-[#2E78FF] rounded-full border-[3px] border-[white] -ml-[35px] mt-[10px]"></div>
                <div className="absolute left-0 -ml-[24px] top-0 rotate-90"><TiArrowSortedDown size={40} color="white"/></div>


                <div className="flex h-full w-full">
                     <div className="flex flex-1">
                        <div className="p-[30px]">

                            <div className="flex items-center">
                                <span className="text-2xl font-semibold line-clamp-1 text-[#404145]">{milestone.title}</span>
                                {milestone?.status === "inReview" &&
                                    <div className=" bg-[#ff9200] flex items-center justify-center w-fit h-[28px] rounded-full pl-[8px] pr-[8px] ml-[10px]">
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
                            <div className="mt-[10px]">
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

                            <p className="text-base line-clamp-2 mt-[15px] leading-[1.5] text-[#62646a]">{milestone.shortDescription}</p>

                            

                            

                            <div className="mt-[20px] w-full">
                                <div className="flex items-start flex-col w-full">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold">Attachemnts:</span>
                                    </div>
                                    <div className="flex items-center mt-[10px] w-full">

                                        {milestone?.clientFiles.slice(0, 3)?.map((file: any, index: number)=> (<>
                                            <div 
                                                className={cn("w-[30.66%] h-[50px] rounded-[10px] bg-[#f0f0f0] flex items-center justify-start cursor-pointer group", ((index+1) !== 3) ? "mr-[10px]": "")}
                                                onClick={()=>{
                                                    window.open(file.url);
                                                }}
                                            >
                                                <div className="p-[10px] flex items-center">
                                                    <div className="w-[40px] h-[40px] rounded-full bg-[#e4e4e4] flex items-center justify-center">
                                                        <LuFileText size={21} color="#050505"/>
                                                    </div>
                                                    <div className="ml-[5px] mt-[5px]"> 
                                                        <span className="text-[13px] line-clamp-1 w-[100px] group-hover:underline">{file.name}</span>
                                                        <span className="text-[10px] line-clamp-1 w-[100px] font-light">{file.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>))}


                                        {milestone?.clientFiles.length > 3 &&


                                            <MoreDetailsModal
                                                milestone={milestone}
                                                workId={workId}
                                                openDetails={true}
                                            >
                                                <Button className="w-full m-0 p-0 h-[50px] rounded-[10px] bg-[#f0f0f0] flex items-center justify-center ml-[10px] hover:underline hover:bg-[#f0f0f0] text-black">
                                                    <div className="p-[10px] flex items-center">
                                                        <span className="text-base font-semibold text-black">{`+${milestone.clientFiles.length-3}`}</span>
                                                    </div>
                                                </Button>
                                            </MoreDetailsModal>
                                            
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[20px] w-full">
                                <DoneProgress 
                                    tasks={milestone.tasks}
                                />
                            {/* <div className="mt-[10px] w-full flex items-center">
                                        <span className="text-xs text-[#44546f]">80%</span>
                                        <div className="w-full h-[8px] rounded-full bg-[#e4e6ea] relative ml-[8px]">
                                            <div className="absolute top-0 left-0 w-[78%] h-[8px] rounded-l-full bg-[#579dff] flex items-center justify-center"></div>
                                        </div>
                                    </div> */}
                                {/* <div className="w-full h-[20px] rounded-full bg-[#e7ebed] relative">
                                    <div className="absolute top-0 left-0 w-[78%] h-[20px] rounded-l-full bg-[#007afe] flex items-center justify-center">
                                        <span className="text-xs text-white">{'78% in progress'}</span>
                                    </div>
                                </div> */}
                            </div>

                            <div className="flex items-center mt-[30px] w-full">
                                <div className="flex flex-1">
                                    <Avatar className="w-[35px] h-[35px] border-[3px] border-white -ml-[10px]">
                                        <AvatarImage src={milestone?.members?.client?.profileImageUrl} />
                                        <AvatarFallback>{milestone?.members?.client?.fullName[0]}</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="w-[35px] h-[35px] border-[3px] border-white -ml-[10px]">
                                        <AvatarImage src={milestone?.members?.user?.profileImageUrl} />
                                        <AvatarFallback>{milestone?.members?.user?.fullName[0]}</AvatarFallback>
                                    </Avatar>  
                                </div>
                                <div>
                                    <MoreDetailsModal
                                        milestone={milestone}
                                        workId={workId}
                                        openDetails={false}
                                    >
                                        <Button
                                            className="bg-[#f0f0f0] hover:black hover:text-white text-black text-sm font-normal h-[35px]"
                                        >
                                            More details
                                        </Button>
                                    </MoreDetailsModal>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="border-l border-[#EAEAEA] w-[120px] h-full">
                        <div className="p-[15px] pt-[10px] pb-[10px] w-full flex flex-col items-center justify-center h-full">
                            <div className="flex flex-col items-center text-center justify-center h-full">
                                <span className="text-md">{formatTimestampToDateObject(milestone.dueDate).month}</span>
                                <span className="text-4xl font-semibold tracking-wider">{formatTimestampToDateObject(milestone.dueDate).day}</span>
                                <span className="text-md font-normal">{formatTimestampToDateObject(milestone.dueDate).year}</span>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;