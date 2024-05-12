import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

type Props = { 
  message?: string 
};

const ServicesFilters = ({ message }: Props) => {
  return (
    <>
      <div className="w-full">

        <div className="">
            <span className="text-25">Experience level</span>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Entry level</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Intermediate</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Expert</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div> 
        </div>

        <div className="mt-[35px] border-t border-[#e4e5e7] pt-[30px]">
            <span className="text-25">Budget</span>
            <div className="mt-5">
              <Slider defaultValue={[25, 1050]} min={0} max={1500}/>
              <div className="flex items-center mt-6">
                <Input placeholder="min"/>
                <div className="flex items-center w-[100px] justify-center">
                   <div className="w-[10px] h-[2px] bg-black rounded-full"></div>
                </div>
                <Input placeholder="max"/>
              </div>
            </div>
        </div>

        <div className="mt-[35px] border-t border-[#e4e5e7] pt-[30px]">
            <span className="text-25">Number of proposals</span>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Less than 5</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">5 to 10</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">10 to 15</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">15 to 20</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>
        </div>


          <div className="mt-[35px] border-t border-[#e4e5e7] pt-[30px]">
              <span className="text-25">Project type</span>

              <div className="flex items-center mt-4">
                <div className="flex flex-1 items-center">
                  <Switch />
                  <label className="ml-3">Fixed</label>
                </div>
                <span className="text-[#6b7177]">{'(13)'}</span>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex flex-1 items-center">
                  <Switch />
                  <label className="ml-3">Hourly</label>
                </div>
                <span className="text-[#6b7177]">{'(2)'}</span>
              </div>
          </div>


        <div className="mt-[35px] border-t border-[#e4e5e7] pt-[30px]">
            <span className="text-25">English level</span>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Basic level</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Bilingual</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Native</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex flex-1 items-center">
                <Checkbox />
                <label className="ml-3">Flutten</label>
              </div>
              <span className="text-[#6b7177]">{'(13)'}</span>
            </div>
        </div>



      </div>
    </>
  );
};
export default ServicesFilters;
