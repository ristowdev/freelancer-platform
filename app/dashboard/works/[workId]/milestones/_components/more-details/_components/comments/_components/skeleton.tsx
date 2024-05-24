import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
    return (
        <div className="h-fit overflow-y-scroll rounded-xl mt-[15px] flex flex-1 flex-col">
            {[1,2,3,4,5,6,7,8,9,10,11].map((index:number)=>(

                <Skeleton className="w-full rounded-xl bg-[#00000033] mb-[10px] p-[25px] pt-[15px] pb-[15px]  min-h-[120px]">
                    <div className="flex w-full"> 
                        <div className='flex'>
                            <Skeleton className="w-[38px] h-[38px]   -ml-[10px] rounded-full bg-[#00000033]" />
                        </div>
                        <div className="ml-[15px] w-full mt-[10px]">
                            <div className="flex items-center">
                                <Skeleton className="w-[100px] h-[16px] rounded-full bg-[#00000033] " />
                                <Skeleton className="w-[80px] h-[13px]  rounded-full bg-[#00000033] ml-[10px]" />
                            </div>
                            <div className='mt-[10px] '>
                                <Skeleton className="w-[full] h-[10px] rounded-full bg-[#00000033]" />
                                <Skeleton className="w-[full] h-[10px] rounded-full bg-[#00000033] mt-[7px]" />
                                <Skeleton className="w-[full] h-[10px] rouxnded-full bg-[#00000033] mt-[7px]" />
                            </div>

                        </div>
                    </div>
                </Skeleton> 
            ))}
        </div>
    )
}
