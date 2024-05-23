"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { FC } from "react";
import { CreateForm } from "./_components/create-form";
import { Id } from "@/convex/_generated/dataModel";

 

interface CreateMilestonePageProps {
    params: { workId: string };
};

const CreateMilestonePage = ({
    params
}: CreateMilestonePageProps) => {

    return (
         <> 
            <div className="mt-[20px] container max-w-7xl px-4 w-full flex flex-col h-full">
                <CreateForm 
                    workId={params.workId as Id<"works">}
                />
            </div>
         </>
    );
};

export default CreateMilestonePage;