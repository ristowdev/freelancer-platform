import Card from "./card";

interface MilestoneProps {
}

const Timeline = ({

}: MilestoneProps) => {  

    return (
        <>
            <div className="flex h-fit w-full">
                <div className="w-[10px] bg-[#D6DADD] rounded-sm relative"></div>
                <div className="flex flex-col w-full">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(()=> (<>
                        <Card />
                    </>))}
                </div>
            </div>

        </>
    )
}

export default Timeline;