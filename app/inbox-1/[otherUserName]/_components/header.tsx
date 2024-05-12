import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal } from "lucide-react";

 ;

interface HeaderProps {
    conversation?: any;
}

const Header = ({
    conversation
}: HeaderProps) => { 
    console.log("this is conversation"+ conversation)
    console.log(conversation)
    return (
        <div className="absolute top-0 left-0 h-[100px] border-b border-[#e4e5e7] w-full shadow-custom rounded-t-[24px] flex items-center z-10 bg-white">
            <div className="p-[24px] flex flex-col w-full">
                <div className="flex w-full items-center">

                    <div className="flex flex-1">
                        <div className="flex flex-col">
                            <div className="flex items-center">
                                <div className="w-[12px] h-[12px] bg-green-600 rounded-full"></div>
                                <div className="ml-[10px]">
                                    <span className="text-base underline text-black">{conversation.otherUser.fullName}</span>
                                </div>
                                <div className="ml-[10px]">
                                    <span className="text-base text-[#74767e]">{`@${conversation.otherUser.username}`}</span>
                                </div>
                            </div>
                            <div className="flex mt-[0px] items-center">
                                <div className="">
                                    <span className="text-xs text-[#62646a]">Last seen: 3 hours ago</span>
                                </div>

                                <Separator  orientation="vertical" className="bg-[#62646a] h-[15px] mr-[10px] ml-[10px] mt-[2px]"/>

                                <div className="">
                                    <span className="text-xs text-[#62646a]">Local time: 07 May 2024, 12:03</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <Button size="icon" className="rounded-full" variant="ghost">
                            <MoreHorizontal />
                        </Button>
                    </div>

                </div>
            </div>

        
        </div>
    );
}

export default Header;
