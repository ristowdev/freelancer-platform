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
                <span className="mt-[10px] text-black text-base font-normal">Use this space to show clients you have the skills and experience they're looking for.</span>
                <ul className="mt-[10px]">
                    <li className="text-black text-base">1. Describe your strengths and skills</li>
                    <li className="text-black text-base">2. Highlight projects, accomplishments and education</li>
                    <li className="text-black text-base">3. Keep it short and make sure it's error-free</li>
                </ul>
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