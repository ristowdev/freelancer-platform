import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function RenderSkeleton() {
  return (
    <>
      <Skeleton className="h-[300px] w-full rounded-xl" />
      <Skeleton className="h-[300px] w-full rounded-xl mt-[20px]" />
      <Skeleton className="h-[300px] w-full rounded-xl mt-[20px]" />
      <Skeleton className="h-[300px] w-full rounded-xl mt-[20px]" />
      <Skeleton className="h-[300px] w-full rounded-xl mt-[20px]" />
      <Skeleton className="h-[300px] w-full rounded-xl mt-[20px]" />
      <Skeleton className="h-[300px] w-full rounded-xl mt-[20px]" />
    </>
  )
}
