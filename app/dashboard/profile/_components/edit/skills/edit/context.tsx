import EditModal from "../../../modals/edit-modal";
import SkillsList from "./skills-list";

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
                <SkillsList
                    handleCloseCustom={handleCloseCustom}
                    profile={profile}
                />
            </div>
       </>
    );
};

export default Context;