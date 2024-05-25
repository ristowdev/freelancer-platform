import { Button } from "@/components/ui/button";
import { formatTimestampToDateDefault } from "@/utils/formated-timestamp";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TiArrowSortedDown } from "react-icons/ti";

interface MilestoneProps {
    work: any;
}

const Card = ({
    work
}: MilestoneProps) => {
    const router = useRouter();

    return (
        <> 
            <Link href={`/dashboard/works/${work._id}/milestones`} >
                 
                <div className="w-[400px] bg-white mb-[10px] relative rounded-xl mt-[10px] border border-[#efefef] shadow-sm group hover:cursor-pointer">

                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-1">
                            <div className="p-[20px]">
                                <span className="text-xl font-semibold line-clamp-1 text-[#404145]">{work?.project?.title}</span>
                                <div className="mt-[2px]">
                                    <span className="text-sm text-[#62646a]">Created {formatTimestampToDateDefault(work?._creationTime)}</span>
                                </div>
                                <div className="mt-[10px]">
                                    {work.status === "inProgress" && 
                                        <div className="w-fit bg-green-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs pl-[10px] pr-[10px] pt-[3px] pb-[3px]">In Progress</span>
                                        </div>
                                    }
                                </div>

                                <div className="mt-[15px] flex items-center">
                                    <div className="w-[10px] h-[33px] bg-black flex"></div>
                                    <div className="ml-[10px] flex items-center">
                                        <p className="text-sm line-clamp-2 leading-[1.5] text-black ">{work?.project?.descriptionShort}</p>
                                    </div>
                                </div>

                                {/* <p className="text-sm line-clamp-2 mt-[10px] leading-[1.5] text-[#62646a] ">{work?.project?.descriptionShort}</p> */}
                            </div>
                        </div>
                        {/* <div className="border-t border-[#EAEAEA] w-full">
                            <div className="p-[15px] pt-[10px] pb-[10px] w-full flex items-center">
                                <div className="flex flex-1">
                                    <span className="text-sm font-normal">Oct 12 2024</span>
                                </div>
                                <div className="w-fit h-[30px] bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm pl-[15px] pr-[15px]">{work.status}</span>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card;