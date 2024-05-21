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

interface DashboardProps {
    
};

const Dashboard = ({
}: DashboardProps) => {
     
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
                        <BreadcrumbLink >Milestones</BreadcrumbLink>
                    </BreadcrumbItem> 
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="h-1 font-bold text-2xl mt-[20px]">Milestones</h1>
                
                <div className="flex mt-[40px]">
                    {[1].map(()=>(<>
                        <Card />
                    </>))}
                </div>
            </div>
         </>
    );
};

export default Dashboard;