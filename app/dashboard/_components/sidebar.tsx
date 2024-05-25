"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FaListCheck } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Brain, BriefcaseBusiness, CircleDollarSign, Home, Mail } from "lucide-react";
import { LuMilestone } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface SidebarProps {
    
};

const iconStyles = {
    size:"22",
    color:"#868b8f"
}

const links = [
    {
        name: "Home",
        link: "/dashboard",
        icon: Home
    },
    {
        name: "Works",
        link: "/dashboard/works",
        icon: BriefcaseBusiness
    },
    {
        name: "Proposals",
        link: "/dashboard/proposals",
        icon: FaListCheck
    },
    {
        name: "Inbox",
        link: "/inbox",
        icon: Mail
    },
    {
        name: "Milestones",
        link: "/dashboard/milestones",
        icon: LuMilestone
    },
    {
        name: "Payouts",
        link: "/dashboard/payouts",
        icon: CircleDollarSign
    },
    {
        name: "Skills",
        link: "/dashboard/skills",
        icon: Brain
    }
];


const useIconColor = (link: string) => {
    const pathname = usePathname();
    return pathname === link ? "text-white" : "text-[#868b8f]";
};

const Sidebar = ({
}: SidebarProps) => {

    const currentUser = useQuery(api.users.getCurrentUser);
    const router = useRouter(); 
    const pathname = usePathname();

    if(currentUser === undefined || currentUser === null){
        return <>Loading...</>
    }

    return (
         <>
            <div className="w-[300px] bg-[#1b1d1f] h-full fixed border-r border-[#e4e5e7] shadow-md">
                <div className="mt-[110px] p-[10px] flex flex-col">
                    <div className="flex pl-[15px]">
                        <Avatar className="w-[45px] h-[45px]">
                            <AvatarImage src={currentUser.profileImageUrl} alt={currentUser.username} />
                            <AvatarFallback>{currentUser.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="ml-[10px]">
                            <span className="text-base font-semibold text-white">{currentUser.fullName}</span>
                            <div className="w-fit h-[20px] rounded-full bg-[#108a0036] flex items-center justify-center mt-[5px]">
                                <span className="text-xs pl-[10px] pr-[10px]">$150.00</span>
                            </div>
                        </div>
                    </div>  

                    <div className="flex flex-col mt-[50px]">
                        {links.map((link) => {
                            const IconComponent = link.icon;
                            return (
                                <Button
                                    key={link.link}
                                    variant="ghost"
                                    className={cn("flex items-center justify-start mb-[15px] hover:bg-[#272b31] hover:text-white text-[#868b8f] group", pathname === link.link ? "bg-[#272b31] text-white" : "")}
                                    // className={`flex items-center justify-start mb-[15px] hover:bg-[#272b31] hover:text-white text-[#868b8f] ${pathname === link.link ? "bg-[#272b31] text-white" : ""}`}
                                    onClick={() => { router.push(link.link); }}
                                >
                                    <IconComponent className={`w-6 h-6 ${useIconColor(link.link)} group-hover:text-white`} />
                                    <span className="text-base font-normal ml-[10px]">{link.name}</span>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
         </>
    );
};

export default Sidebar;