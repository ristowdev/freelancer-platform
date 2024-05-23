import Card from "./card";

interface MilestoneProps {
    milestones: any;
}

const Timeline = ({
    milestones
}: MilestoneProps) => {  

    return (
        <>
            <div className="flex h-fit w-full">
                <div className="w-[10px] bg-[#D6DADD] rounded-sm relative"></div>
                <div className="flex flex-col w-full">
                    {milestones.map((milestone: any)=> (<>
                        <Card 
                            milestone={milestone}
                        />
                    </>))}
                </div>
            </div>

        </>
    )
}

export default Timeline;