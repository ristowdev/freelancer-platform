import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

interface MilestoneProps {
}

const Card = ({

}: MilestoneProps) => {  

    return (
        <> 
            <Link href="/dashboard/milestone/88siao0s-alxlalpsss" className="w-fit h-fit">
                <div className="w-[350px] h-[200px] bg-white mb-[10px] relative rounded-md mt-[10px] border border-[#EAEAEA] group hover:cursor-pointer">

                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-1">
                            <div className="p-[15px]">
                                <span className="text-xl font-semibold line-clamp-1 text-[#404145] group-hover:underline">Create book: How to catch girls</span>
                                <p className="text-sm line-clamp-2 mt-[10px] leading-[1.5] text-[#62646a] group-hover:underline">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis</p>
                                <span className="text-sm font-normal line-clamp-1 mt-[10px]">Project: How to catch girls</span>
                            </div>
                        </div>
                        <div className="border-t border-[#EAEAEA] w-full">
                            <div className="p-[15px] pt-[10px] pb-[10px] w-full flex items-center">
                                <div className="flex flex-1">
                                    <span className="text-sm font-normal">Oct 12 2024</span>
                                </div>
                                <div className="w-fit h-[30px] bg-green-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm pl-[15px] pr-[15px]">In progress</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card;