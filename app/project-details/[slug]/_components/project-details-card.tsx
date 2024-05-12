"use client"
 
import { Poppins } from 'next/font/google'; 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GrLocation } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { RiCoinsLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ReviewCard from '@/components/services/details/review-card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FiSend } from 'react-icons/fi';
import Rating from '@/components/services/rating';



import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import RenderSkeleton from './skeleton'
import { FullProjectType } from '@/types' 
import { useRouter } from 'next/navigation';


interface PageProps {
    query: {
        slug: string
    }
}

const ProjectDetailsCard = ({
  query
}: PageProps) => {
    const project = useQuery(api.projects.getDetails, { slug:query.slug });

    const router = useRouter();
    
    console.log(project)

    if (project === undefined || null) {
        return (
            <RenderSkeleton />
        )
    }   

     
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
                {/* <Slash /> */}
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/components">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                {/* <Slash /> */}
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Digital marketing</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='w-full flex mt-8'>
          <div className='w-[60%] mr-[10%]'>
            <h1 className='text-3xl text-[#404145] font-bold leading-1'>{project.title}</h1>
            <div className='mt-[20px]'>
              <Rating rating={4.5}/>
            </div>

            <div className='mt-[40px] flex'>
                <div className='flex'>
                  <Avatar className="w-[120px] h-[120px] border border-solid border-[#e4e5e7]">
                    <AvatarImage src={project?.seller?.profileImageUrl} />
                    <AvatarFallback className="text-2xl bg-amber-600 text-white">{project?.seller?.fullName[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className='flex ml-[30px] flex-col'>
                    <h3 className='text-2xl text-[#222325]'>{project?.seller?.fullName}</h3>
                    <div className="flex mt-[10px]">
                      <div className="flex">
                        <GrLocation color="#6b7177" size={18}/>
                        <span className="text-[#6b7177] text-sm ml-[5px]"> </span>
                      </div>
                      <div className="flex ml-[10px]">
                        <IoMdTime color="#6b7177" size={18}/>
                        <span className="text-[#6b7177] text-sm ml-[5px]">2 hours ago</span>
                      </div>
                    </div>

                    <div className="flex items-center mt-[10px]"> 
                        <RiCoinsLine color='#6b7177' size={18}/>
                        <span className="text-sm text-[#6b7177] ml-2">$1,231 spent</span> 
                        
                    </div>

                    <Button variant="outline" className='mt-4 w-[120px]'>Apply now</Button>

                </div>
            </div>

            <div className='mt-[40px]'>
              <p className='leading-[1.6] text-[#404145]'>{project.descriptionLong}</p>
              <Button variant="link" className='text-black underline pl-0 pr-0 text-base'>Read more</Button>
            </div>

            <div className='mt-[20px] flex flex-wrap'>
                {project?.tags?.map((text: string)=>(
                  <>
                    <div className='flex items-center bg-[#f5f5f5] rounded-[50px] h-[40px]  pl-[15px] pr-[15px] pt-[8px] pb-[8px] mr-[10px]'>
                        <span className='text-sm text-[#404145] text-'>{text}</span>
                    </div>
                  </>
                ))}
            </div>

            <div className='mt-[80px]'>
                <span className='text-black text-xl'>What people say about this client</span>
                <div className='mt-[20px]'>
                  <Carousel>
                    <CarouselContent>
                      <CarouselItem> <ReviewCard /> </CarouselItem>
                      <CarouselItem> <ReviewCard /> </CarouselItem>
                      <CarouselItem> <ReviewCard /> </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
            </div>

            <div className='mt-[50px]'>
              <span className='text-black text-xl'>FAQ</span>
              <Accordion type="single" collapsible className='w-full mt-[10px]'>
                <AccordionItem value="item-1">
                  <AccordionTrigger className='text-base '>Is it accessible?</AccordionTrigger>
                  <AccordionContent className='text-base '>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </div>
          </div>

          <div className='w-[40%] h-auto relative'>
              <div className='border border-solid border-[#e9e9e9] w-full shadow-sm rounded-md sticky top-[20px] bp-white'>
                  <div className='p-[20px]'>
                    <h1 className='h1 text-3xl black font-semibold mb-[10px]'>{'$'+project.price}{project.priceType == 'Hourly' && '/hr'}</h1>
                    <span className='text-base text-[#6b7177]'>{project.priceType == 'Fixed' ? 'Fixed' : 'Hourly rate'}</span>
                    <div className='mt-[30px]'>
                      <Button 
                        className="w-full text-base h-[50px] bg-[#5bbb7b] text-white outline-none border-none shadow-none hover:bg-[#1f4b3f] hover:text-white" variant="outline"
                        onClick={()=>{router.push(`/submit-proposal/${project.slug}`)}}
                      >
                        Send proposal <FiSend className="ml-[5px]" size={20}/>
                      </Button>
                    </div>
                  </div>
              </div>
          </div>
        </div>
    
      </main>

    </>
  )
}

export default ProjectDetailsCard