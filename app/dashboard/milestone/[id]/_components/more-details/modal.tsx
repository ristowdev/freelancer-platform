import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Download, Plus, Send, SquareCheckBig } from "lucide-react";
import { LuFileText } from "react-icons/lu";
import CollapsibleButtonArrow from "@/components/collapsible-button-arrow";
import { Checkbox } from "@/components/ui/checkbox";
import { GrAttachment } from "react-icons/gr";
import Image from "next/image";

interface MoreDetailsModalProps {
    children: React.ReactNode;
}

const tasks = [
    {
        id: 1,
        name: "Create Book Overview and Outline"
    },
    {
        id: 2,
        name: "Write Introduction Chapter"
    },
    {
        id: 3,
        name: "Develop Main Plot and Story Arc"
    },
    {
        id: 4,
        name: "Write Character Descriptions and Development"
    },
    {
        id: 5,
        name: "Write Middle Chapters (Core Content)"
    },
    {
        id: 6,
        name: "Craft Climax and Resolution Chapters"
    },
    {
        id: 7,
        name: "Edit, Format, and Finalize Manuscript"
    }
];

const MoreDetailsModal = ({
    children
}: MoreDetailsModalProps) => { 
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog onOpenChange={(o)=>{setIsOpen(o)}} open={isOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-transpraent p-0 rounded-none border-none flex items-center justify-center max-w-fit gap-0 shadow-xl">
                <div className="w-[700px] h-[700px] bg-[#f1f2f4] rounded-l-md">
                    <div className="w-full h-full flex flex-1 flex-col overflow-y-scroll">
                        <div className="flex flex-1">
                            <div className="p-[40px] pt-[20px] w-full h-full relative">

                                <div className="flex items-center sticky top-0 left-0 bg-[#f1f2f4] pt-[15px] pb-[10px] z-50 ">
        
                                    <span className="text-2xl font-semibold line-clamp-1 text-[#404145]">Create book: How to catch girls</span>

                                    <div className="w-fit h-[20px] bg-[#28a746] rounded-full flex items-center justify-center ml-[10px]">
                                        <span className="text-base pl-[10px] pr-[10px] text-white">Active</span>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="flex items-start">
                                        <div className="flex items-center pr-[10px] mr-[10px] border-r border-[#EAEAEA]">
                                            <span className="text-sm">Due date: <span className="font-semibold">May 20, 2024</span></span>
                                        </div>
                                        <div className="flex items-center pr-[10px] mr-[10px] border-r border-[#EAEAEA]">
                                            <span className="text-sm">Payment: <span className="font-bold ">$350.00</span></span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm">Tasks: <span className="font-bold">8</span></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-[20px]">
                                    <span className="text-base font-semibold">Members</span>
                                    <div className="flex flex-1 mt-[5px]">
                                        <Avatar className="w-[40px] h-[40px] border-2 border-transparent">
                                            <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZzNaMjYxbk10OGdKNVFmTFFYR2RwVlpGTEsifQ" />
                                            <AvatarFallback>RS</AvatarFallback>
                                        </Avatar>
                                        <Avatar className="w-[40px] h-[40px] -ml-[12px] border-[2px] border-white">
                                            <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZzNPVmszUzdSdjBUUlVmekFqU0ZiTHdVUFUifQ" />
                                            <AvatarFallback>ME</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>

                                <div className="w-full mt-[20px]">
                                    <CollapsibleButtonArrow
                                        buttonTitle="What you need to do:"
                                    >
                                        <div className="mt-[10px]">
                                            <span className="text-base font-semibold text-[#172B4D]">Description</span>
                                            <p className="text-sm mt-[5px] leading-[1.5] text-[#172B4D]">

                                            What is facebook post?<br/>
            - Facebook Posts are public messages posted to a Facebook users entire audience or on a specific persons profile page . Businesses utilize posts to continually provide a presence to their audience and potentially attract new followers.
            <br/><br/>
            What is facebook ad?<br/>
            - Facebook ads refer to online advertisements that are created and published on the Facebook platform to be targeted to its users.
            <br/><br/>
            Simple example of facebook ad:<br/>
            Attachment 1,2,3,4.
            <br/><br/>
            Facebook post must have:<br/>
            1. Introduction simple description about product. Short and clean!<br/>
            2. Main text. Comes after introduction and he must have long description about product, features and what the product fixes.<br/>
            3. Tell customers that shipping is absolutely free.<br/>
            <br/><br/>
            Just to know: We just work in United Stats.
            <br/><br/>
            Text limits:<br/>
            1. Length of text up to 2000 words.
            <br/><br/>
            Write 4 examples, with diffirent words and with diffirent brainstorming.
                                            </p>
                                        </div>

                                        <div className="mt-[20px] w-full">
                                        <div className="flex items-start flex-col w-full">
                                            <div className="flex items-center">
                                                <span className="text-base font-semibold text-[#172B4D]">Attachemnts:</span>
                                            </div>
                                            <div className="mt-[15px] flex flex-col w-full">
                                                {[1,2,3,1,2,2,].map(()=>(<>
                                                    <div className="w-full flex">
                                                        <div className="flex w-[112px] bg-[#dadfe3] rounded-sm h-[80px] mb-[20px]">
                                                            <Image
                                                                src="https://charming-clownfish-726.convex.cloud/api/storage/e09d731b-32ef-437d-8904-61831f0db7eb"
                                                                width={100}
                                                                height={100}
                                                                alt="meharba"
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>

                                                        <div className="ml-[20px] flex flex-col">
                                                            <span className="text-sm text-[#172b4d] font-bold hover:underline cursor-pointer">greenpeace-facebook-ad-example-2.png</span>
                                                            <span className="font-normal text-sm text-[#44546f] mt-[2px]">Added Aug 27, 2022 at 3:44 PM</span>
                                                            <Button variant="link" className="w-fit p-0 m-0 text-xs text-[#172b4d] font-normal flex items-center">
                                                                <Download size={12} color="#172b4d" className="mr-[3px]"/>
                                                                Download
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>))}
                                            </div>
                                        </div>
                                    </div>
                                    </CollapsibleButtonArrow>
                                </div>


                                <div className="mt-[20px] border-t border-[#EAEAEA] pt-[20px]">
                                    <div className="flex items-center">
                                        <SquareCheckBig size={18} color="#172B4D" />
                                        <span className="text-base font-semibold text-[#172B4D] ml-[5px]">Tasks</span>
                                    </div>
                                    <div className="mt-[10px] w-full flex items-center">
                                        <span className="text-xs text-[#44546f]">80%</span>
                                        <div className="w-full h-[8px] rounded-full bg-[#e4e6ea] relative ml-[8px]">
                                            <div className="absolute top-0 left-0 w-[78%] h-[8px] rounded-l-full bg-[#579dff] flex items-center justify-center"></div>
                                        </div>
                                    </div>
                                    <div className="mt-[15px]">
                                        {tasks.map((task: any, index: number)=>(<>
                                            <div className="flex items-start mb-[15px]">
                                                <Checkbox className="w-[16px] h-[16px] mt-[1.5px]" id={`cb-${task.id}`}/>
                                                <label className="text-sm ml-[12px] text-[#172B4D]" id={`cb-${task.id}`}>{task.name}</label>
                                            </div>
                                        </>))}
                                    </div>
                                </div>

                                <div className="mt-[20px] border-t border-[#EAEAEA] pt-[20px]">
                                    <div className="flex items-center">
                                        <div className="flex items-center flex-1">
                                            <GrAttachment size={18} color="#172B4D" />
                                            <span className="text-base font-semibold text-[#172B4D] ml-[5px]">Work attachemnts</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            className="h-[33px] text-sm text-[#172b4d] font-normal bg-[#e4e6ea] hover:bg-[#d0d4dc] m-0 "
                                        >Upload
                                            <Plus size={15} color="#172b4d" className="ml-[5px]"/>
                                        </Button>
                                    </div>

                                    <div className="mt-[15px] flex flex-col w-full">
                                        {[1,2,3,1,2,2,].map(()=>(<>
                                            <div className="w-full flex group cursor-pointer">
                                                <div className="flex w-[112px] bg-[#dadfe3] rounded-sm h-[80px] mb-[20px]">
                                                    <Image
                                                        src="https://charming-clownfish-726.convex.cloud/api/storage/e09d731b-32ef-437d-8904-61831f0db7eb"
                                                        width={100}
                                                        height={100}
                                                        alt="meharba"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>

                                                <div className="ml-[20px] flex flex-col">
                                                    <span className="text-sm text-[#172b4d] font-bold group-hover:underline">greenpeace-facebook-ad-example-2.png</span>
                                                    <span className="font-normal text-sm text-[#44546f] mt-[2px]">Added Aug 27, 2022 at 3:44 PM</span>
                                                    <div className="mt-[5px] bg-[#ff9200] flex items-center justify-center w-fit h-[25px] rounded-full pl-[8px] pr-[8px]">
                                                        <Clock size={14} color="white"/>
                                                        <span className="text-xs text-white  font-semibold ml-[4px]">In review</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>))}
                                    </div>
                                     
                                </div>
                                

                                {/* <div className="mt-[15px] w-full">
                                    <div className="w-full h-[20px] rounded-full bg-[#e7ebed] relative">
                                        <div className="absolute top-0 left-0 w-[78%] h-[20px] rounded-l-full bg-[#007afe] flex items-center justify-center">
                                            <span className="text-xs text-white">{'78% in progress'}</span>
                                        </div>
                                    </div>
                                </div> */}

                                

                                

                                 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[410px] h-[700px] bg-[#0000001f] rounded-r-md backdrop-blur-md">
                    <div className="w-full h-full p-[20px] pt-[30px] flex flex-1 flex-col">
                        <span className="text-xl text-white">Comments</span>
                        <div className="h-fit overflow-y-scroll rounded-xl mt-[15px] flex flex-1 flex-col">
                            {[1,11,2,3,12,3,12,3,12,3123,1,3,21,3,12,2,2,12,,2].map(()=>(<>
                                <div className="w-full rounded-xl bg-[#00000033] mb-[10px] p-[25px] pt-[15px] pb-[15px] border border-[#343434]">
                                    <div className="flex">
                                        <Avatar className="w-[38px] h-[38px]  border-[1.5px] border-[#343434] -ml-[10px]">
                                            <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZzNaMjYxbk10OGdKNVFmTFFYR2RwVlpGTEsifQ" />
                                            <AvatarFallback>ME</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-[10px]">
                                            <div className="flex items-center">
                                                <span className="text-base font-semibold text-white">Ristowsoft</span>
                                                <span className="text-xs text-[#7d7d7d] ml-[7px]">19 May 2024, 10:43</span>
                                            </div>

                                            <p className="text-sm text-[#c4c4c4] mt-[3px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur.</p>
                                        </div>
                                    </div>
                                </div>
                            </>))}
                        </div>
                        <div className="flex items-center mt-[20px]">
                            <div className="w-full h-[45px] bg-[#00000033] rounded-full border border-[#343434] flex items-center justify-center">
                                <Input 
                                    placeholder="Add comment..."
                                    className="rounded-full outline-none focus-visible:ring-0 bg-transparent pl-[20px] pr-[20px] text-base  text-white border-none placeholder:text-[#c4c4c4]"
                                />
                            </div>

                            <div className="flex ml-[10px]">
                                <Button 
                                    variant="ghost"
                                    size="icon"
                                    className="bg-[#1dbf73] hover:bg-[#1dbf73] rounded-full flex items-center justify-center border border-[#343434] h-[45px] w-[45px]"
                                >
                                    <Send size={21} color="white" className="-mb-[3px] -ml-[1px]"/>
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MoreDetailsModal;