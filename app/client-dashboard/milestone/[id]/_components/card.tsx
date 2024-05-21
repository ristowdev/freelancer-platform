import { TiArrowSortedDown } from "react-icons/ti";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuFileText } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import MoreDetailsModal from "./more-details/modal";

interface MilestoneProps {
}

const Card = ({

}: MilestoneProps) => {  

    return (
        <> 
            <div className="w-[full] bg-white mb-[10px] relative ml-[20px] rounded-md mt-[10px] min-h-[200px]">
                <div className="absolute w-[20px] h-[20px] bg-[#2E78FF] rounded-full border-[3px] border-[white] -ml-[35px] mt-[10px]"></div>
                <div className="absolute left-0 -ml-[24px] top-0 rotate-90"><TiArrowSortedDown size={40} color="white"/></div>


                <div className="flex h-full w-full">
                    <div className="flex flex-1">
                        <div className="p-[30px]">

                            <div className="flex items-center">
                                <span className="text-2xl font-semibold line-clamp-1 text-[#404145]">Create book: How to catch girls</span>

                                <div className="w-fit h-[25px] bg-[#28a746] rounded-full flex items-center justify-center ml-[10px]">
                                    <span className="text-base pl-[10px] pr-[10px] text-white">Active</span>
                                </div>
                            </div>
                            <div className="mt-[10px]">
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

                            <p className="text-base line-clamp-2 mt-[15px] leading-[1.5] text-[#62646a]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis</p>

                            

                            

                            <div className="mt-[20px] w-full">
                                <div className="flex items-start flex-col w-full">
                                    <div className="flex items-center">
                                        <span className="text-sm font-semibold">Attachemnts:</span>
                                    </div>
                                    <div className="flex items-center mt-[10px] w-full">
                                        <div className="w-fit h-[50px] rounded-[10px] bg-[#f0f0f0] flex items-center justify-center">
                                            <div className="p-[10px] flex items-center">
                                                <div className="w-[40px] h-[40px] rounded-full bg-[#e4e4e4] flex items-center justify-center">
                                                    <LuFileText size={21} color="#050505"/>
                                                </div>
                                                <div className="ml-[5px] mt-[5px]"> 
                                                    <span className="text-[13px] line-clamp-1 w-[100px]">JPS_dpspapfdssdoslslslls.png</span>
                                                    <span className="text-[10px] line-clamp-1 w-[100px] font-light">20 KB</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-fit h-[50px] rounded-[10px] bg-[#f0f0f0] flex items-center justify-center ml-[10px]">
                                            <div className="p-[10px] flex items-center">
                                                <div className="w-[40px] h-[40px] rounded-full bg-[#e4e4e4] flex items-center justify-center">
                                                    <LuFileText size={21} color="#050505"/>
                                                </div>
                                                <div className="ml-[5px] mt-[5px]"> 
                                                    <span className="text-[13px] line-clamp-1 w-[100px]">JPS_dpspapfdssdoslslslls.png</span>
                                                    <span className="text-[10px] line-clamp-1 w-[100px] font-light">20 KB</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-fit h-[50px] rounded-[10px] bg-[#f0f0f0] flex items-center justify-center ml-[10px]">
                                            <div className="p-[10px] flex items-center">
                                                <div className="w-[40px] h-[40px] rounded-full bg-[#e4e4e4] flex items-center justify-center">
                                                    <LuFileText size={21} color="#050505"/>
                                                </div>
                                                <div className="ml-[5px] mt-[5px]"> 
                                                    <span className="text-[13px] line-clamp-1 w-[100px]">JPS_dpspapfdssdoslslslls.png</span>
                                                    <span className="text-[10px] line-clamp-1 w-[100px] font-light">20 KB</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="w-full m-0 p-0 h-[50px] rounded-[10px] bg-[#f0f0f0] flex items-center justify-center ml-[10px] hover:underline hover:bg-[#f0f0f0] text-black">
                                            <div className="p-[10px] flex items-center">
                                                <span className="text-base font-semibold text-black">+2</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[30px] w-full">
                            <div className="mt-[10px] w-full flex items-center">
                                        <span className="text-xs text-[#44546f]">80%</span>
                                        <div className="w-full h-[8px] rounded-full bg-[#e4e6ea] relative ml-[8px]">
                                            <div className="absolute top-0 left-0 w-[78%] h-[8px] rounded-l-full bg-[#579dff] flex items-center justify-center"></div>
                                        </div>
                                    </div>
                                {/* <div className="w-full h-[20px] rounded-full bg-[#e7ebed] relative">
                                    <div className="absolute top-0 left-0 w-[78%] h-[20px] rounded-l-full bg-[#007afe] flex items-center justify-center">
                                        <span className="text-xs text-white">{'78% in progress'}</span>
                                    </div>
                                </div> */}
                            </div>

                            <div className="flex items-center mt-[30px] w-full">
                                <div className="flex flex-1">
                                    <Avatar className="w-[35px] h-[35px] border-[3px] border-white -ml-[10px]">
                                        <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZzNaMjYxbk10OGdKNVFmTFFYR2RwVlpGTEsifQ" />
                                        <AvatarFallback>RS</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="w-[35px] h-[35px] border-[3px] border-white -ml-[10px]">
                                        <AvatarImage src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZzNPVmszUzdSdjBUUlVmekFqU0ZiTHdVUFUifQ" />
                                        <AvatarFallback>ME</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div>
                                    <MoreDetailsModal>
                                        <Button
                                            className="bg-[#f0f0f0] hover:black hover:text-white text-black text-sm font-normal h-[35px]"
                                        >
                                            More details
                                        </Button>
                                    </MoreDetailsModal>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="border-l border-[#EAEAEA] w-[120px] h-full">
                        <div className="p-[15px] pt-[10px] pb-[10px] w-full flex flex-col items-center justify-center h-full">
                            <div className="flex flex-col items-center text-center justify-center h-full">
                                <span className="text-md">Oct</span>
                                <span className="text-4xl font-semibold tracking-wider">12</span>
                                <span className="text-md font-normal">2024</span>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;