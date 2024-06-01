"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import useBodyBackground from "@/hooks/useBodyBackground";
import { formatAmount } from "@/utils/format-amount";
import { Edit, LocateIcon, MapPin, MoveDownRight, MoveUpRight, Pencil, Plus, Trash } from "lucide-react";
import { DataTable } from "./_components/table/data-table";
import { WorksData, columns } from "./_components/table/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoLink } from "react-icons/io5";
import HoursePerWeek from "./_components/edit/hourse-per-week";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AddLanguage from "./_components/edit/languages/add";
import { cn } from "@/lib/utils";
import { getLanguageLabel } from "@/utils/languages";
import EditLanguages from "./_components/edit/languages/edit";
import EditTitle from "./_components/edit/title";
import EditHourlyRate from "./_components/edit/hourly-rate";
import ProfileOverview from "./_components/edit/profile-overview";
import ReadMore from "./_components/read-more";
import AddProjectInPortfolio from "./_components/edit/portfolio/add";
// import { ComboboxDemo } from "./_components/edit/languages/add/form";
import { MdOutlineWorkOutline } from "react-icons/md";
import Image from "next/image";
import PreviewProject from "./_components/edit/portfolio/preview";
import DeletePortfolioProject from "./_components/edit/portfolio/delete";
import AddSkill from "./_components/edit/skills/add";
import EditSkills from "./_components/edit/skills/edit";

interface DashboardProps {
    
};

const dataa: WorksData[] = [
    {
        id:"0",
        projectTitle:"Hello Wolrd"
    },
    {
        id:"0",
        projectTitle:"Amekw lmfkl mwefklm"
    },
]


const Dashboard = ({
}: DashboardProps) => {
    useBodyBackground("#f4f4f4");

    const profile = useQuery(api.profile.getDetails);

    if(profile === undefined || profile === null){
        return <>Loading ...</>;
    }

    return (
        <>
            <div className="mt-[33px] container max-w-6xl px-4 w-full flex flex-col">
        {/* <ComboboxDemo /> */}

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
                        <BreadcrumbLink>Profile</BreadcrumbLink>
                    </BreadcrumbItem> 
                    </BreadcrumbList>
                </Breadcrumb>
                <h1 className="font-bold text-2xl mt-[20px]">Profile</h1>
                <div className="w-full mt-[0px]">
                    <div className="border border-[#e3e3e3] shadow-sm h-fit rounded-xl mt-[20px] w-full bg-white ">
                        {/* <div className="p-[30px] border-b border-[#e3e3e3] w-full flex items-start"> */}
                        <div className="p-[30px] w-full flex items-start">
                            <div className="flex flex-1">
                                <div>
                                    <Avatar className="w-[80px] h-[80px]">
                                        <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZzNPVmszUzdSdjBUUlVmekFqU0ZiTHdVUFUifQ?width=160" />
                                        <AvatarFallback>IR</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="ml-[20px]">
                                    <span className="text-3xl font-semibold">Ilija Ristov</span>
                                    <div className="mt-[10px] flex items-center">
                                        <MapPin size={20} color="#676767" />
                                        <span className="text-base text-[#676767] font-medium ml-[5px]">Skopje, Macedonia – 6:33 pm local time</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    className="rounded-full border-[2px] border-[#118a00] text-base pl-[25px] pr-[25px] text-[#118a00] hover:text-[#118a00]"
                                >
                                    See public view
                                </Button>
                            </div>
                        </div> 
                    </div>

                    <div className="w-full flex mt-[20px]">
                        <div className="w-[35%] bg-white border border-[#e3e3e3] shadow-sm rounded-xl">
                            <div className="p-[30px]">
                                <div className="flex flex-col">
    
                                    <div className="flex items-center">
                                        <div className="flex flex-1">
                                            <span className="text-xl font-medium">Hours per week</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <HoursePerWeek
                                                profile={profile}
                                            >
                                                <Button 
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px]"   
                                                >
                                                    <Pencil color="#118a00" size={30}/>
                                                </Button>
                                            </HoursePerWeek>
                                        </div>
                                    </div>
                                    <div className="mt-[10px]">
                                        <span className="text-base font-medium">{profile.hoursePerWeek}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-[40px]">
    
                                    <div className="flex items-center">
                                        <div className="flex flex-1">
                                            <span className="text-xl font-medium">Languages</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <AddLanguage
                                                profile={profile}
                                            >
                                                <Button 
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                                >
                                                    <Plus color="#118a00" size={30}/>
                                                </Button>
                                            </AddLanguage>

                                            {profile?.languages.length > 0 &&
                                            <EditLanguages
                                                profile={profile}
                                            >
                                                <Button 
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[15px]"   
                                                >
                                                    <Pencil color="#118a00" size={30}/>
                                                </Button>
                                            </EditLanguages> }
                                        </div>
                                    </div>
                                    <div className="mt-[10px] flex flex-col">

                                        {profile?.languages?.map((language: any, index: number)=> (
                                            <span className={cn("text-base font-medium text-[#181818]", index+1 === profile?.languages.length ? "" : "mb-[10px]")}>{getLanguageLabel(language.language)}: <span className="text-[#676767]">{language.proficiencyLevel}</span></span>
                                        ))}
                                    </div>
                                </div>

                                {/* <div className="flex flex-col mt-[40px]">
    
                                    <div className="flex items-center">
                                        <div className="flex flex-1">
                                            <span className="text-xl font-medium">Licenses</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Button 
                                                variant="outline"
                                                size="icon"
                                                className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                            >
                                                <Plus color="#118a00" size={30}/>
                                            </Button> 
                                        </div>
                                    </div> 
                                </div> */}

                                {/* <div className="flex flex-col mt-[40px]">
    
                                    <div className="flex items-center">
                                        <div className="flex flex-1">
                                            <span className="text-xl font-medium">Education</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Button 
                                                variant="outline"
                                                size="icon"
                                                className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                            >
                                                <Plus color="#118a00" size={30}/>
                                            </Button> 
                                        </div>
                                    </div>
                                    <div className="mt-[10px] flex items-start">
                                        <div className="flex flex-1 flex-col">
                                            <span className="text-xl font-medium">Faculty of Computer Science & Engineering</span>
                                            <span className="text-[#676767]">Bachelor's degree</span>
                                            <span className="text-[#676767]">2021-2025 (expected)</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                            >
                                                <Plus color="#118a00" size={30}/>
                                            </Button> 
                                            <Button 
                                                variant="outline"
                                                size="icon"
                                                className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[15px]"   
                                            >
                                                <Trash color="#118a00" size={30}/>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-[10px] flex items-start">
                                        <div className="flex flex-1 flex-col">
                                            <span className="text-xl font-medium">Faculty of Computer Science & Engineering</span>
                                            <span className="text-[#676767]">Native or Bilingual</span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                            >
                                                <Plus color="#118a00" size={30}/>
                                            </Button> 
                                            <Button 
                                                variant="outline"
                                                size="icon"
                                                className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[15px]"   
                                            >
                                                <Trash color="#118a00" size={30}/>
                                            </Button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="w-[65%] ml-[20px] bg-white border border-[#e3e3e3] shadow-sm rounded-xl">
                            <div className="p-[30px] w-full flex flex-col">
                                <div className="flex">
                                    
                                    <div className="flex flex-1 items-center relative">
                                        <span className="text-2xl font-medium w-[90%] pl-[5px]">{profile.title}
                                        <span className="absolute pl-[7px]">

                                            <EditTitle
                                                profile={profile}
                                            >
                                                <Button 
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px]"   
                                                >
                                                    <Pencil color="#118a00" size={30}/>
                                                </Button>
                                            </EditTitle>
                                        </span>

                                        </span>
                                        
                                    </div>
                                    <div className="flex items-start">
                                    <span className="text-xl font-medium">{formatAmount(profile.hourlyRate)}/hr</span>
                                    <EditHourlyRate
                                        profile={profile}
                                    >
                                        <Button 
                                            variant="outline"
                                            size="icon"
                                            className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[10px]"   
                                        >
                                            <Pencil color="#118a00" size={30}/>
                                        </Button>
                                    </EditHourlyRate>
                                    <Button 
                                        variant="outline"
                                        size="icon"
                                        className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[30px]"   
                                    >
                                        <IoLink color="#118a00" size={30}/>
                                    </Button>
                                   </div>
                                </div>

                                <div className="mt-[40px] flex">
                                    <div>

                                        <ReadMore 
                                            text={profile.description}
                                            splitStart={0}
                                            splitEnd={500}
                                        />
                                    
                                    </div>
                                    <div className="ml-[5px]">
                                        <ProfileOverview
                                            profile={profile}
                                        >
                                            <Button 
                                                variant="outline"
                                                size="icon"
                                                className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[10px]"   
                                            >
                                                <Pencil color="#118a00" size={30}/>
                                            </Button>
                                        </ProfileOverview>
                                    </div>
                                </div>


                            </div>

                            <div className="mt-[10px] border-t border-[#e3e3e3]">
                                <div className="p-[30px]">
                                    <div className="flex">
                                        <div className="flex flex-1 items-center">
                                            <span className="text-2xl font-medium">Portfolio</span>
                                             
                                        </div>
                                        <div className="flex items-center">
                                            <AddProjectInPortfolio
                                                profile={profile}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                                >
                                                    <Plus color="#118a00" size={30}/>
                                                </Button> 
                                            </AddProjectInPortfolio>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[15px]">
                                        {profile?.portfolioProjects?.map((project: any)=> (
                                            <div className="flex flex-col w-[200px]">
                                                <div className="w-full h-[180px] rounded-xl bg-[#f0f0f0] flex items-center justify-center group relative">
                                                    <Image 
                                                        width={100}
                                                        height={100}
                                                        src="/to-do-list.png"
                                                        alt={project.projectTitle}
                                                    />
                                                    <div className="absolute top-0 left-0 rounded-xl bg-[#000000b3] hidden group-hover:flex items-center justify-center w-full h-full flex-col">
                                                        <DeletePortfolioProject
                                                            profile={profile}
                                                            project={project}
                                                        >
                                                            <Button 
                                                                variant="outline"
                                                                size="icon"
                                                                className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[35px] h-[35px] bg-white"   
                                                            >
                                                                <Trash color="#118a00" size={30}/>
                                                            </Button>
                                                        </DeletePortfolioProject>
                                                        <PreviewProject
                                                            profile={profile}
                                                            project={project}
                                                        >
                                                            <Button 
                                                                className="w-[80px] h-fit p-0 m-0 mt-[10px] text-sm bg-white border border-[#118a00] text-[#118a00] hover:bg-slate-100 pt-[5px] pb-[5px]"
                                                            >
                                                                Preview
                                                            </Button>
                                                        </PreviewProject>

                                                    </div>
                                                </div>
                                                <span className="mt-[10px] text-[#108a00] font-medium">{project.projectTitle}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>


                            <div className="mt-[10px] border-t border-[#e3e3e3]">
                                <div className="p-[30px]">
                                    <div className="flex">
                                        <div className="flex flex-1 flex-col">
                                            <span className="text-2xl font-medium">Work history</span>
                                            <p className="text-sm mt-[10px]">No work history yet.</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] border-t border-[#e3e3e3]">
                                <div className="p-[30px] flex flex-col">
                                    <div className="flex">
                                        <div className="flex flex-1 items-center">
                                            <span className="text-2xl font-medium">Skills</span>
                                             
                                        </div> 
                                        <div className="flex items-center">
                                            <AddSkill 
                                                profile={profile}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                                >
                                                    <Plus color="#118a00" size={30}/>
                                                </Button> 
                                            </AddSkill>

                                            <EditSkills
                                                profile={profile}
                                            >
                                                <Button 
                                                    variant="outline"
                                                    size="icon"
                                                    className="border-[2px] border-[#118a00] rounded-full p-[6px] m-0 w-[32px] h-[32px] ml-[10px]"   
                                                >
                                                    <Pencil color="#118a00" size={30}/>
                                                </Button>
                                            </EditSkills>

                                        </div>
                                    </div>
                                    <div className="mt-[15px]">
                                        <div className="flex flex-wrap">
                                            {profile?.skills.map((skill: any)=> (<>
                                                <div className="p-[4px] pl-[12px] pr-[12px] rounded-full bg-[#E9E9E9] mr-[5px] mb-[10px]">
                                                    <span className="text-sm text-[#676767] font-medium">
                                                        {skill.name}
                                                    </span>    
                                                </div>
                                            </>))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="w-full mt-[20px] bg-white border border-[#e3e3e3] shadow-sm rounded-xl">
                        <div className="p-[30px] flex flex-col">
                            <div className="flex">
                                <div className="flex flex-1 items-center w-full">
                                    <div className="flex flex-col w-full">
                                        <span className="text-2xl font-medium">Testimonials</span>
                                        <span className="text-base font-medium">Endorsements from past clients</span>

                                        <div className="w-full mt-[70px] flex justify-center items-center flex-col">
                                            <Image 
                                                src="/notestimonials.png"
                                                width={170}
                                                height={170}
                                                alt=""
                                            />
                                            <span className="text-base text-black font-medium mt-[30px]">Here, you will see testimonials from your clients.</span>
                                        </div>
                                    </div>
                                </div> 
                                <div className="flex items-start">
                                    {/* <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                    >
                                        <Plus color="#118a00" size={30}/>
                                    </Button>  */}
                                </div>
                            </div>
                            <div className="mt-[15px]">
                               
                            </div>
                        </div>
                    </div>

                    {/* <div className="w-full mt-[20px] bg-white border border-[#e3e3e3] shadow-sm rounded-xl">
                        <div className="p-[30px] flex flex-col">
                            <div className="flex">
                                <div className="flex flex-1 items-center">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-medium">Certifications</span>
                                    </div>
                                </div> 
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                    >
                                        <Plus color="#118a00" size={30}/>
                                    </Button> 
                                </div>
                            </div>
                            <div className="mt-[15px]">
                               
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="w-full mt-[20px] bg-white border border-[#e3e3e3] shadow-sm rounded-xl">
                        <div className="p-[30px] flex flex-col">
                            <div className="flex">
                                <div className="flex flex-1 items-center">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-medium">Employment history</span>
                                    </div>
                                </div> 
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                    >
                                        <Plus color="#118a00" size={30}/>
                                    </Button> 
                                </div>
                            </div>
                            <div className="mt-[15px]">
                               
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="w-full mt-[20px] bg-white border border-[#e3e3e3] shadow-sm rounded-xl">
                        <div className="p-[30px] flex flex-col">
                            <div className="flex">
                                <div className="flex flex-1 items-center">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-medium">Other experiences</span>
                                    </div>
                                </div> 
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-[2px] border-[#118a00] rounded-full p-[4px] m-0 w-[32px] h-[32px]"   
                                    >
                                        <Plus color="#118a00" size={30}/>
                                    </Button> 
                                </div>
                            </div>
                            <div className="mt-[15px]">
                               
                            </div>
                        </div>
                    </div> */}

                </div> 
            </div>
        </>
    )
}

export default Dashboard;