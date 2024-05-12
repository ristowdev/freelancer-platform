"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { DataTable } from "./_components/data-table";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { ProposalData, columns } from "./_components/columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"  

interface PageProps {
  
}

const ProposalsPage = ({
}: PageProps) => {

    const currentUser = useQuery(api.users.getCurrentUser);
    const proposals = useQuery(api.proposals.getClientProposals);

      console.log(proposals)
    if (proposals === undefined || currentUser === undefined) {
        return <Skeleton />
    }

    if (proposals === null || currentUser === null) {
        return <div>Not found</div>
    }

    const data: ProposalData[] = proposals.map(proposal => ({
      id: proposal._id,
      hourlyRate: proposal.hourlyRate,
      status: proposal.status,
      projectTitle: proposal.project.title,
      userName: proposal.user.fullName,
      submitTime: proposal._creationTime,
      priceType: proposal.project.priceType,
      projectSlug: proposal.project.slug,
    }));

   
    return (
      <> 
        <main className='container mx-auto flex items-center w-full flex-col max-w-7xl'> 

          <div className='mt-8 w-full'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Proposals</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="w-full mt-[30px]">
            <div className="flex items-center w-full">
                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold">Seller Proposals</h1>
                    <p className="text-muted-foreground">
                        Manage client proposals.
                    </p>
                </div>
            </div>
            <Separator className="my-6" />
            <DataTable columns={columns} data={data} />
          </div>
        </main>
      </> 
    );
} 

export default ProposalsPage