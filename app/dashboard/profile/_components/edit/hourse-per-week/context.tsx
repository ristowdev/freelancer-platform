import EditModal from "../../modals/edit-modal";
import { ModalForm } from "./form";

interface ContextProps {
    handleCloseCustom: () => void;
    profile:any;
}

const Context = ({ 
    handleCloseCustom,
    profile
}: ContextProps) => {
    return (
       <>
            <div className="mt-[20px] flex flex-col h-full">
                <span className="text-xl text-black font-semibold">Hours per week</span>
                <span className="mt-[10px] text-[#676767] text-base font-medium">Knowing how much you can work helps Upwork find the right jobs for you.</span>
                <div className="mt-[30px] h-full">
                    <span className="text-base font-medium text-black">I can currently work</span>
                    <div className="mt-[20px] h-full">
                        <ModalForm 
                            handleCloseCustom={handleCloseCustom}
                            profile={profile}
                        />
                    </div>
                </div>
            </div>
       </>
    );
};

export default Context;