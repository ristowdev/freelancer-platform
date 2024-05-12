"use client"
  
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"  
import { Button } from '@/components/ui/button'; 



import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import RenderSkeleton from './skeleton' 
import { useRouter } from 'next/navigation';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { GrUserExpert } from "react-icons/gr";
import { LuCircleDollarSign } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";


interface PageProps {
    query: {
        slug: string
    }
}


const FormSchema = z.object({
  your_hourly_rate: z
    .coerce
    .number(),
  cover_letter: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
})

const SubmitProposalCard = ({
  query
}: PageProps) => {
    const project = useQuery(api.projects.getDetails, { slug:query.slug });

    const router = useRouter();

    const {
      mutate,
      pending
    } = useApiMutation(api.proposals.create);
    
    console.log(project)



    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: "onChange",
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
      mutate({  
        projectId: project?._id as Id<"projects">,
        clientId: project?.sellerId as Id<"users">,
        hourlyRate: data.your_hourly_rate,
        coverLetter: data.cover_letter,
      })
        .then((proposalId: Id<"proposals">) => {
            toast.info("Proposal submited successfully");
            //form.setValue("title", "");
            router.push(`/proposals`)
        })
        .catch(() => {
            toast.error("Failed to submit proposal")
        })
    }

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
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/project-details/${project?._id}`}>{project?.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Submit a proposal</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">

          <div className='w-full flex mt-8 flex-col'>
            <h1 className='h1 font-semibold text-5xl'>Submit a proposal</h1>

            <div className='mt-[40px] border solid border-[#d9d9d9] rounded-[15px] flex flex-col'>
              <div className='p-[30px] pl-[40px] pr-[40px] flex flex-col'>
                <div className='flex w-full border-b solid border-[#d9d9d9] pb-[30px] mb-[30px]'>
                  <div className='w-[75%] flex flex-col'>
                    <span className='text-xl font-semibold'>Job details</span>
                    <span className='text-xl mt-[25px]'>{project.title}</span>
                    <p className='mt-[20px]'>{project.descriptionLong}</p>
                  </div>
                  <div className='w-[20%] ml-[5%] pl-[3%] border-l solid border-[#d9d9d9]'>
                    <div className='flex'>
                      <div className='pt-[5px]'>
                        <GrUserExpert size={20}/>
                      </div>
                      <div className='ml-[15px] flex flex-col'>
                        <span className='text-md font-semibold'>{project.experienceLevel}</span>
                        <label className='text-sm'>Experience level</label>
                      </div>
                    </div>
                    <div className='flex mt-[20px]'>
                      <div className='pt-[5px]'>
                        <LuCircleDollarSign size={20}/>
                      </div>
                      <div className='ml-[15px] flex flex-col'>
                        <span className='text-md font-semibold'>{'$'+project.price}{project.priceType == 'Hourly' && '/hr'}</span>
                        <label className='text-sm'>{project.priceType == 'Fixed' ? 'Fixed' : 'Hourly rate'}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>

                  <span className='text-xl font-semibold'>Skills and experience</span>

                  <div className='mt-[20px] flex flex-wrap'>
                  {project?.tags?.map((tag: any)=> (<>

                    <div className="pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-[#e9e9e9] flex items-center rounded-[50px] mr-[10px]">
                      <span className="text-sm text-[#676767]">{tag}</span>
                    </div> 
                    </>))}
                  </div>
                </div>
              </div>
            </div>



            <div className='mt-[40px] border solid border-[#d9d9d9] rounded-[15px] flex flex-col'>
              <div className='p-[30px] pl-[40px] pr-[40px] flex flex-col'>
                <div className='flex w-full flex-col'>
                  <span className='text-xl font-semibold'>Terms</span> 
                  <span className='text-xl mt-[25px]'>{"What is the rate you'd like to bid for this job?"}</span>
                  <div className='mt-[20px] flex w-full'>
                      <span className='flex flex-1 text-sm text-[#676767]'>Your profile rate: $45.50/hr</span>
                      <span className='text-sm text-[#676767]'>{"Client's budget:"} {'$'+project.price}</span>
                  </div>
                  <div className='mt-[30px] flex flex-col'>
                      <div className='flex border-b solid border-[#d9d9d9] pb-[30px] mb-[30px]'>
                        <div className='flex flex-col flex-1'>
                          <span className='text-base font-semibold'>Hourly rate</span>
                          <label className='text-sm text-[#676767]'>Total amount the client will see on your proposal</label>
                        </div>
                        <div className='flex items-center'>

                          <FormField
                            control={form.control}
                            name="your_hourly_rate"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    className='w-[300px] text-right h-[40px]' 
                                    type='number' 
                                    {...field} 
                                    placeholder="$14.50"
                                  />
                                </FormControl> 
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {project.priceType == 'Hourly' && <span className='ml-[10px] text-base text-black'>/hr</span>}
                        </div>
                      </div>

                      <div className='flex  items-center border-b solid border-[#d9d9d9] pb-[30px] mb-[30px]'>
                        <div className='flex flex-col flex-1'>
                          <span className='text-base font-semibold'>2% Freelancer Service Fee</span>
                          {/* <label className='text-sm text-[#676767]'>Total amount the client will see on your proposal</label> */}
                        </div>
                        <div className='flex items-center'>
                          <span className='text-base text-[#575757]'>-$13.50</span>
                          {project.priceType == 'Hourly' && <span className='ml-[10px] text-base text-black'>/hr</span>}
                        </div>
                      </div>

                      <div className='flex '>
                        <div className='flex flex-col flex-1'>
                          <span className='text-base font-semibold'>{"You'll receive"}</span>
                          <label className='text-sm text-[#676767]'>{"The estimated amount you'll receive after service fees"}</label>
                        </div>
                        <div className='flex items-center'>
                          <Input className='w-[300px] text-right h-[40px]' type='number' defaultValue={project.price} disabled/>
                          {project.priceType == 'Hourly' && <span className='ml-[10px] text-base text-black'>/hr</span>}
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>


            <div className='mt-[40px] border solid border-[#d9d9d9] rounded-[15px] flex flex-col'>
              <div className='p-[30px] pl-[40px] pr-[40px] flex flex-col'>
                <div className='flex w-full flex-col'>
                  <span className='text-xl font-semibold'>Cover letter</span> 
                  
                  <FormField
                    control={form.control}
                    name="cover_letter"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                        <Textarea className='w-full h-[120px] mt-[40px]' {...field}/>
                        </FormControl> 
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div className='flex items-center  mt-[30px]'>
              <Button 
                className='w-[200px] bg-[#108a00] text-white hover:bg-[#226419] text-base h-[40px]'
                type='submit'
              >
                Submit proposal
              </Button>
              <Button
                  variant="link" 
                  className='h-auto w-auto p-0 ml-[30px] text-base text-[#108a00]'
                  onClick={()=>{router.push(`/project-details/${project.slug}`)}}
              >
                Cancle
              </Button>
            </div>
          </div>

          </form>
        </Form>



      </main>

    </>
  )
}

export default SubmitProposalCard