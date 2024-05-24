import Card from "./card";

interface MilestoneProps {
    milestones: any;
    workId: string;
}

const Timeline = ({
    milestones,
    workId
}: MilestoneProps) => {  

    return (
        <>
            <div className="flex h-fit w-full">
                <div className="w-[10px] bg-[#D6DADD] rounded-sm relative"></div>
                <div className="flex flex-col w-full">
                    {milestones.map((milestone: any)=> (<>
                        <Card 
                            milestone={milestone}
                            workId={workId}
                        />
                    </>))}
                </div>
            </div>

        </>
    )
}

export default Timeline;