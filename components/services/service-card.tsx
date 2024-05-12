"use client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FiSend } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import Rating from "./rating";
import { useRouter } from "next/navigation";

type Props = { 
  project?: any
};

const ServiceCard = ({ project }: Props) => {
  const router = useRouter();

  const experienceLevelCal = (lvl: number) => {
    if(lvl == 1){
      return "Entry level";
    }else if(lvl == 2){
      return "Intermediate";
    }else if(lvl == 3){
      return "Expert";
    }
  }
  return (
    <>
        <div className="w-full border border-[#e9e9e9] rounded-[5px] min-h-[200px] mb-[20px] flex items-center">
          <div className="p-[30px] flex w-full">

            <div className="w-[65%] flex">

              <div className="">
                <Avatar className="w-[60px] h-[60px]">
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarImage src={project.seller.profileImageUrl} />
                  <AvatarFallback className="text-2xl bg-amber-600 text-white">{project?.seller?.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>

              <div className="ml-[20px] flex flex-col">
                  <h1 className="text-md">{project.title}</h1>
                  
                  <div className="mt-[10px]">
                    <span className="text-sm text-[#6b7177]">Experience level: <b>{experienceLevelCal(project.experienceLevel)}</b></span>
                  </div>

                  <div className="mt-[10px] flex items-center">
                      <div className="flex items-center">
                        <MdVerified color="#6b7177" size={18}/>
                        <span className="text-[#6b7177] text-sm ml-[5px]">Payment verified</span>
                      </div>
                      <div className="flex items-center ml-[10px] pl-[10px] border-l border-[#e9e9e9]">
                        <Rating rating={3}/>
                      </div>

                      <div className="flex items-center ml-[10px] pl-[10px] border-l border-[#e9e9e9]"> 
                        {/* <span className="text-sm text-black">{'$'+project.client.spent+'+'} spent</span> */}
                        <span className="text-sm text-black">$1,232 spent</span>
                      </div>
                  </div>

                  <div className="flex flex-row items-center mt-[10px]">
                    <div className="flex items-center">
                      <GrLocation color="#6b7177" size={18}/>
                      <span className="text-[#6b7177] text-sm ml-[5px]">{project.location}</span>
                    </div>
                    <div className="flex items-center ml-[10px] pl-[10px] border-l border-[#e9e9e9]">
                      <IoMdTime color="#6b7177" size={18}/>
                      <span className="text-[#6b7177] text-sm ml-[5px]">2 hours ago</span>
                    </div>
                    <div className="flex items-center ml-[10px] pl-[10px] border-l border-[#e9e9e9]">
                      <LuClipboardList color="#6b7177" size={18}/>
                      <span className="text-[#6b7177] text-sm ml-[5px]">147 Received</span>
                    </div>
                  </div>

                  <p className="mt-[20px]">{project.shortDescription}</p>

                  <div className="mt-[20px]">
                    <div className="flex items-center flex-wrap">
                        {project?.tags?.map((tag: any)=> (<>

                          <div className="pl-[15px] pr-[15px] pt-[5px] pb-[5px] bg-[#e9e9e9] flex items-center rounded-[50px] mr-[10px]">
                            <span className="text-sm text-[#676767]">{tag}</span>
                          </div> 
                        </>))}
                    </div>
                  </div>
              </div>

            </div>
            <div className="w-[35%] ml-[5%] pl-[5%] border-l border-[#e9e9e9] flex items-center flex-col justify-center">
              <div className="flex w-full">
                <div className="flex flex-1"></div>
                <div className="flex flex-col items-end justify-end">
                  <h1 className="h1 text-3xl black font-semibold">{'$'+project.price}{project.priceType == 'Hourly' && '/hr'} </h1>
                  <span className="text-sm mt-[10px]">{project.priceType == 'Fixed' ? 'Fixed' : 'Hourly rate'}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-[50px] text-base h-[50px] bg-[#5bbb7b1a] text-[#5bbb7b] outline-none border-none shadow-none hover:bg-[#5bbb7b] hover:text-white" variant="outline"
                onClick={()=>{router.push(`/project-details/${project.slug}`)}}
              >
                Send proposal <FiSend className="ml-[5px]" size={20}/>
              </Button>

            </div>
          </div>

        </div>
    </>
  );
};
export default ServiceCard;
