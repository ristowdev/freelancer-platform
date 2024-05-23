"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FaListCheck } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Brain, BriefcaseBusiness, CircleDollarSign, Home, Mail } from "lucide-react";
import { LuMilestone } from "react-icons/lu";

interface SidebarProps {
    
};

const iconStyles = {
    size:"22",
    color:"black"
}

const links = [
    {
        name: "Home",
        link: "/dashboard",
        icon: <Home {...iconStyles}/>
    },{
        name: "Works",
        link: "/dashboard/works",
        icon: <BriefcaseBusiness {...iconStyles}/>
    },{
        name: "Proposals",
        link: "/dashboard/proposals",
        icon: <FaListCheck {...iconStyles}/>
    },{
        name: "Inbox",
        link: "/inbox",
        icon: <Mail {...iconStyles}/>
    },{
        name: "Milestones",
        link: "/dashboard/milestones",
        icon: <LuMilestone {...iconStyles}/>
    },{
        name: "Payouts",
        link: "/dashboard/payouts",
        icon: <CircleDollarSign {...iconStyles}/>
    },{
        name: "Skills",
        link: "/dashboard/skills",
        icon: <Brain {...iconStyles}/>
    }
]

const Sidebar = ({
}: SidebarProps) => {

    const currentUser = useQuery(api.users.getCurrentUser);
    const router = useRouter();

    if(currentUser === undefined || currentUser === null){
        return <>Loading...</>
    }

    return (
         <>
            <div className="w-[300px] bg-white h-full fixed border-r border-[#e4e5e7] shadow-md">
                <div className="mt-[110px] p-[10px] flex flex-col">
                    <div className="flex pl-[15px]">
                        <Avatar className="w-[45px] h-[45px]">
                            <AvatarImage src={currentUser.profileImageUrl} alt={currentUser.username} />
                            <AvatarFallback>{currentUser.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-[10px]">
                            <span className="text-base font-semibold">{currentUser.fullName}</span>
                            <div className="w-fit h-[20px] rounded-full bg-[#108a0036] flex items-center justify-center mt-[5px]">
                                <span className="text-xs pl-[10px] pr-[10px]">$150.00</span>
                            </div>
                        </div>
                    </div>  

                    <div className="flex flex-col mt-[50px]">
                        {links.map((link)=>(<>
                            <Button 
                                variant="ghost"
                                className="flex items-center justify-start mb-[5px]"
                                onClick={()=>{router.push(`${link.link}`)}}
                            >
                                {link.icon}
                                <span className="text-base font-normal ml-[10px]">{link.name}</span>
                            </Button>
                        </>))}
                    </div>
                </div>
            </div>
         </>
    );
};

export default Sidebar;