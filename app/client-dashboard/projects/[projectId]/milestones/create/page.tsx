"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { FC } from "react";
import { CreateForm } from "./_components/create-form";

 

interface CreateMilestonePageProps {
    
};

const CreateMilestonePage: FC<CreateMilestonePageProps> = () => {

    const params = useParams();
    const searchParams = useSearchParams();

    // Extract the projectId from params and proposalId from searchParams
    const projectId = params.projectId;
    const proposalId = searchParams.get('proposalId');
     
    return (
         <> 
            <div className="mt-[20px] container max-w-7xl px-4 w-full flex flex-col h-full">
                <CreateForm />
            </div>
         </>
    );
};

export default CreateMilestonePage;