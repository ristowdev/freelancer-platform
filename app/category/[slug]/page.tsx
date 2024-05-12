import ServicesFilters from '@/components/services-filters'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import React from 'react'
import ProjectsList from './_components/projects-list'


interface PageProps {
    params: {
        slug: string
    }
}

const CategoryPage = ({
    params
}: PageProps) => {



    return (
        <>

            <main className="container mx-auto">
                {/* Breadcrumb (replace with your implementation) */}
                <div className="mt-8">
                {/* ... your Breadcrumb component or logic */}
                </div>

                <div className="flex items-center mt-8">
                    <div className="flex w-full">
                        <div className="w-[23%]">
                        {/* ServicesFilters component (replace with your implementation) */}
                        <ServicesFilters />
                        </div>
                        <div className="w-[74%] ml-[3%]">
                            <div className="w-full flex items-center mb-[20px]">
                                {/* Project sorting and filtering (replace with your implementation) */}
                                <div className="flex flex-1">
                                <span className="text-[#222222] text-l">
                                    2 services available
                                </span>
                                </div>
                                <div className="flex items-center">
                                <span className="text-[#222222] text-sm">Sort by:</span>
                                <Select>
                                    <SelectTrigger className="w-auto ml-[10px]">
                                    <SelectValue placeholder="High payment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="light">High payment</SelectItem>
                                    <SelectItem value="dark">Best sellers</SelectItem>
                                    <SelectItem value="system">Trending</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                            </div>
                            <ProjectsList 
                                query={params}
                            />
                        </div>
                    </div>
                </div>
            </main>
        
        </>
    )
}


export default CategoryPage
