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
            <div className="flex flex-col h-full"> 
                <span className="mt-[10px] text-[#676767] text-base font-medium">Please note that your new hourly rate will only apply to new contracts.</span>
                <div className="mt-[20px] h-fit"> 
                    <div className="mb-[50px] h-full"> 
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