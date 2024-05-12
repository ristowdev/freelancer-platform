"use client"
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Rating from "@/components/services/rating";

type Props = { 
  message?: string 
};

const ReviewCard = ({ message }: Props) => {
  const router = useRouter();

  return (
    <>
        <div className="w-full border border-[#e9e9e9] rounded-[5px] mb-[20px] flex">
          <div className="p-[20px] flex">
            <div className="flex">
                <Avatar className="w-[32px] h-[32px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col ml-[15px]">
              <div className="flex">
                <span className="mt-0 pt-0 text-base">awildarodrigue8</span>
                <div className="flex ml-[10px] items-center h-[23px]">
                  <span className="text-[#62646a] text-sm">United States</span>
                </div>

                <div className="flex items-center ml-[10px] pl-[10px] border-l border-[#e9e9e9] h-[20px]">
                  <Rating rating={3}/>
                </div>
              </div>
              <div className="mt-[10px]">
                <p className="text-base text-[#62646a] line-clamp-2">{"Amazing increase DR services! She is really good at getting high-quality, legit, and follow-backlinks that boosted my website's ranking a lot. I totally recommend her if you're looking for the best authority SEO backlinks or SEO help."}</p>
              </div>
              <span className="text-[#95979d] text-sm mt-[10px]">1 month ago</span>
            </div>
          </div>
        </div>
    </>
  );
};
export default ReviewCard;
