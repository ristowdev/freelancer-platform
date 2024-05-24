"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { BsDiamondFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import Timeline from "./_components/timeline";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

 

interface DashboardProps {
    params: { workId: string };
};

const Dashboard = ({
     params
}: DashboardProps) => {

     const milestones = useQuery(api.milestones.get, { workId: params.workId as Id<"works"> })
     
     if(milestones === undefined || milestones === null){
          return <>Loading...</>;
     }

     return (
         <>
          <div className="mt-[20px] container max-w-7xl px-4 w-full flex flex-col h-full">
               <h1 className="h-1 font-bold text-3xl mt-[20px]">Milestone</h1>
               <div className="flex relative mt-[60px] h-full">
                    <div className="bg-[#EFF0F4] w-full min-h-[1500px] rounded-[10px]">
                         <div className="p-[30px] pr-[50px]">
                              <Timeline 
                                   milestones={milestones}
                                   workId={params.workId}
                              />
                         </div>
                    </div>
                    
                    <div className="w-fit h-full relative">
                         <div className="w-[350px] sticky ml-[30px] top-[120px] left-0">
                              <div className="p-[20px] w-full border bg-white shadow-sm rounded-[10px] mb-[20px]">
                                   <span className="text-xl font-semibold text-[#222325]">Client details</span>

                                   <div className="flex items-center mt-[15px]">
                                        <Avatar className="w-[35px] h-[35px]">
                                             <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZzNPVmszUzdSdjBUUlVmekFqU0ZiTHdVUFUifQ" />
                                             <AvatarFallback>ME</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-[10px]">
                                             <span className="text-base font-semibold">Ilija Holly</span>
                                        </div>
                                   </div>  
                                   <div className="mt-[15px] w-full">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1">
                                                  <span className="text-sm text-[#74767e] font-normal">Location:</span>
                                             </div>
                                             <div className="">
                                                  <span className="text-sm text-[#404145] font-semibold">
                                                       United Kingdom
                                                  </span>
                                             </div>
                                        </div> 
                                   </div>

                                   <div className="mt-[10px] w-full">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1">
                                                  <span className="text-sm text-[#74767e] font-normal">Local time:</span>
                                             </div>
                                             <div className="">
                                                  <span className="text-sm text-[#404145] font-semibold">
                                                       07 May 2024, 12:03
                                                  </span>
                                             </div>
                                        </div> 
                                   </div>
                                   <div className="mt-[10px] w-full">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1">
                                                  <span className="text-sm text-[#74767e] font-normal">Spent:</span>
                                             </div>
                                             <div className="">
                                                  <span className="text-sm text-[#404145] font-semibold">
                                                       +$15,500.00
                                                  </span>
                                             </div>
                                        </div> 
                                   </div>

                              </div>
                              <div className="p-[20px] w-full border bg-white shadow-sm rounded-[10px]">

                                   <span className="text-xl font-semibold text-[#222325]">Project details</span>
                                   <div className="mt-[15px] w-full">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1">
                                                  <span className="text-sm text-[#74767e] font-normal">Project:</span>
                                             </div>
                                             <div className="w-[150px] -mr-[2px]">
                                                  <Link
                                                       className="text-sm underline h-fit text-[#404145] line-clamp-1 font-semibold p-0 m-0"
                                                       href=""
                                                  >
                                                       Website developmet for flwp lfwlp lfelp fwe
                                                  </Link>
                                             </div>
                                        </div> 
                                   </div>
                                   <div className="mt-[12px] w-full">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1">
                                                  <span className="text-sm text-[#74767e] font-normal">Price type:</span>
                                             </div>
                                             <div className="w-[150px] flex items-end justify-end">
                                                  <span className="text-sm text-[#404145] font-semibold">
                                                       Hourly
                                                  </span>
                                             </div>
                                        </div> 
                                   </div>
                                   <div className="mt-[12px] w-full flex items-center">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1 items-center">
                                                  <span className="text-sm text-[#74767e] font-normal">Budget:</span>
                                             </div>
                                             <div className="w-[150px] flex items-center justify-end">
                                                  <span className="text-sm text-[#404145] font-semibold">
                                                  $94.00/hr
                                                  </span>
                                             </div>
                                        </div> 
                                   </div>
                                   <div className="flex items-center w-full mt-[15px]">
                                        <div className="flex flex-1">
                                             <span className="text-sm text-[#74767e] font-normal">{"You'll do for:"}</span>
                                        </div>
                                        <div className="w-[150px] flex items-end justify-end">
                                             <span className="text-sm text-[#404145] font-semibold">
                                                  Hourly
                                             </span>
                                        </div>
                                   </div> 
                                   <div className="mt-[12px] w-full flex items-center">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1 items-center">
                                                  <span className="text-sm text-[#74767e] font-normal">Client level:</span>
                                             </div>
                                             <div className="w-[150px] flex items-center justify-end">
                                                  <div className="bg-[#ffe0b3] w-[120px] flex items-center rounded-[5px] pl-[5px] pr-[5px]">
                                                  <span className="text-[#804317] font-semibold text-sm tracking-wide">Top rated</span>
                                                  <BsDiamondFill size={11} color="#804317" className="ml-[2px]"/>
                                                  <BsDiamondFill size={11} color="#804317" className="ml-[2px]"/>
                                                  <BsDiamondFill size={11} color="#804317" className="ml-[2px]"/>
                                                  </div>
                                             </div>
                                        </div> 
                                   </div>
                                   <div className="mt-[12px] w-full flex items-center">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1 items-center">
                                                  <span className="text-sm text-[#74767e] font-normal">Response rate:</span>
                                             </div>
                                             <div className="w-[150px] flex items-center justify-end">
                                                  <span className="text-sm text-[#404145] font-semibold">
                                                  1h
                                                  </span>
                                             </div>
                                        </div> 
                                   </div>
                                   <div className="mt-[12px] w-full flex items-center">
                                        <div className="flex items-center w-full">
                                             <div className="flex flex-1 items-center">
                                                  <span className="text-sm text-[#74767e] font-normal">Raiting:</span>
                                             </div>
                                             <div className="w-[150px] flex items-center justify-end">
                                                  <FaStar size={14} color="#404145"/>
                                                  <span className="text-sm text-[#404145] font-semibold ml-[2px] pt-[1px]">5</span>
                                                  <Link href="" className="flex items-center">
                                                  <span className="text-sm text-[#404145] font-normal ml-[2px]">{"("}</span>
                                                  <span className="text-sm text-[#404145] font-normal  pt-[1px] underline">{`4,322`}</span>
                                                  <span className="text-sm text-[#404145] font-normal">{")"}</span>
                                                  </Link>
                                             </div>
                                        </div> 
                                   </div> 
                              </div>
                              <div className="w-full mt-[20px]">
                                   <Button className="w-full text-base">Chat with Ilija Holly</Button>
                              </div>
                         </div>  
                    </div>

               </div>
            </div>
         </>
    );
};

export default Dashboard;