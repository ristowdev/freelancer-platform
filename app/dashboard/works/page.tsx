"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" 
import Card from "./_components/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

interface DashboardProps {
    
};

const Dashboard = ({
}: DashboardProps) => {

    const getAllWorks = useQuery(api.works.getAllWorks)

    if(getAllWorks === undefined || getAllWorks === null){
        return <>Loading...</>;
    }

    return (
         <>
            <div className="mt-[33px] container max-w-6xl px-4 w-full flex flex-col">
                <Breadcrumb>
                    <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        {/* <Slash /> */}
                        /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink >Works</BreadcrumbLink>
                    </BreadcrumbItem> 
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="h-1 font-bold text-2xl mt-[20px]">Works</h1>
                
                <div className="flex mt-[40px]">
                    {getAllWorks.map((work: any)=>(<>
                        <Card 
                            work={work}
                        />
                    </>))}
                </div>
            </div>
         </>
    );
};

export default Dashboard;