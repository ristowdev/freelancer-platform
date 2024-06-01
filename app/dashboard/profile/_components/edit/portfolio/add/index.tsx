import { useState } from "react";
import EditModal from "../../../modals/edit-modal";
import Context from "./context";

interface AddProjectInPortfolioProps {
    children: React.ReactNode;
    profile: any;
}

const AddProjectInPortfolio = ({ 
    children,
    profile
}: AddProjectInPortfolioProps) => {
    const [close, setClose] = useState<boolean>(false);
    const handleCloseCustom = () => {
        setClose(true);
    }
    return (
       <>
            <EditModal
                title="Add a new portfolio project"
                setClose={setClose}
                close={close}
                context={<Context 
                    handleCloseCustom={handleCloseCustom}
                    profile={profile}
                />} 
            >
                {children}
            </EditModal>
       </>
    );
};

export default AddProjectInPortfolio;