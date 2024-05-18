import Link from "next/link";
import Card from "./_components/card";
import Timeline from "./_components/timeline";

interface MilestoneProps {
}

const Milestone = ({

}: MilestoneProps) => {  

    return (
        <>
            <div className="w-full flex items-start">
                <div className="flex flex-1">
                    <span className="text-base font-semibold text-[#222325]">Milestone</span>
                </div>
                <div>
                    <Link href="/milestone" className="underline text-sm">View Detailed</Link>
                </div>
            </div>
            <div className="h-full bg-[#EFF0F4] w-full flex flex-1 rounded-[10px] mt-[15px]  p-[15px] pr-[40px] overflow-y-scroll"> 
                <div className="flex flex-1 w-full h-full">    
                    <Timeline />
                </div>
            </div>
        </>
    )
}

export default Milestone;