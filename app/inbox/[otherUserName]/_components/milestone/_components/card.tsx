import { formatAmount } from "@/utils/format-amount";
import { formatTimestampToDateDefault } from "@/utils/formated-timestamp";
import { TiArrowSortedDown } from "react-icons/ti";

interface MilestoneProps {
    milestone: any;
}

const Card = ({
    milestone
}: MilestoneProps) => {  

    return (
        <> 
            <div className="w-full bg-white mb-[10px] relative ml-[20px] rounded-md mt-[10px]">
                <div className="absolute w-[20px] h-[20px] bg-[#2E78FF] rounded-full border-[3px] border-[white] -ml-[35px] mt-[10px]"></div>
                <div className="absolute left-0 -ml-[24px] top-0 rotate-90"><TiArrowSortedDown size={40} color="white"/></div>


                <div className="flex flex-col h-full w-full">
                    <div className="flex flex-1 flex-col">
                        <div className="p-[15px]">
                            <span className="text-sm font-semibold line-clamp-1 text-[#404145]">{milestone.title}</span>
                            <p className="text-xs line-clamp-2 mt-[2px] leading-[1.5] text-[#62646a]">{milestone.shortDescription}</p>
                            <div className="mt-[0px]">
                                <span className="text-black font-normal text-xs">Payment: <span className="font-semibold">{formatAmount(milestone.payment)}</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-[#EAEAEA] w-full">
                        <div className="p-[15px] pt-[10px] pb-[10px] w-full flex items-center">
                            <div className="flex flex-1">
                                <span className="text-xs font-normal">{formatTimestampToDateDefault(milestone.dueDate)}</span>
                            </div>
                            {milestone.status === "active" &&
                                <div className="w-fit h-[20px] bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs pl-[10px] pr-[10px]">Active</span>
                                </div>
                            }
                            {milestone.status === "inReview" &&
                                <div className="w-fit h-[20px] bg-[#ff9200] rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs pl-[10px] pr-[10px]">In Review</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;