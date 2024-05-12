"use client"

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import RenderSkeleton from './skeleton'
import ServiceCard from '@/components/services/service-card'
import { FullProjectType } from '@/types' 
import { useEffect, useState } from "react";


interface PageProps {
    query: {
        slug: string
    }
}

const ProjectsList = ({
  query
}: PageProps) => {
    const projects: FullProjectType[] | undefined = useQuery(api.projects.get, { slug:query.slug });
    
    console.log(projects)

    if (projects === undefined || null) {
        return (
            <RenderSkeleton />
        )
    }   

     
  return (
    <div>  

      {projects?.map((project, index) => (
        <>
          <ServiceCard key={index} project={project} />
        </>
      ))}

    </div>
  )
}

export default ProjectsList