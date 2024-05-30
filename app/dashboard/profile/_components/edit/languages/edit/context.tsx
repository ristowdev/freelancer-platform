import EditModal from "../../../modals/edit-modal";
import LanguageList from "./language-list";

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
                <LanguageList
                    handleCloseCustom={handleCloseCustom}
                    profile={profile}
                />
            </div>
       </>
    );
};

export default Context;