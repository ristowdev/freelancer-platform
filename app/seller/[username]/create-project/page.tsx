"use client";

import { CreateForm } from "./_components/create-form";

interface CreateGigProps {
    params: {
        username: string;
    }
}

const CreateGig = ({
    params
}: CreateGigProps) => {
    return (
        <div className="flex justify-center mt-[50px] pb-[50px]">
            <CreateForm
                username={params.username}
            />
        </div>
    );
}
export default CreateGig;