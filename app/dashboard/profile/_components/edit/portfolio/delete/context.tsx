import EditModal from "../../../modals/edit-modal";
import { ModalForm } from "./form";

interface ContextProps {
    handleCloseCustom: () => void;
    profile:any;
    project:any;
}

const Context = ({ 
    handleCloseCustom,
    profile,
    project
}: ContextProps) => {
    return (
       <>
                {/* <span className="mt-[10px] text-[#676767] text-base font-normal">All fields are required unless otherwise indicated.</span> */}
                <div className="mt-[20px] flex flex-col h-full"> 
                        <ModalForm 
                            handleCloseCustom={handleCloseCustom}
                            profile={profile}
                            project={project}
                        />
                </div>
       </>
    );
};

export default Context;