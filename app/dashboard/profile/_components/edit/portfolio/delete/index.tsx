import { useState } from "react";
import EditModal from "../../../modals/edit-modal";
import Context from "./context";

interface AddProjectInPortfolioProps {
    children: React.ReactNode;
    profile: any;
    project: any;
}

const DeletePortfolioProject = ({ 
    children,
    profile,
    project
}: AddProjectInPortfolioProps) => {
    const [close, setClose] = useState<boolean>(false);
    const handleCloseCustom = () => {
        setClose(true);
    }
    return (
       <>
            <EditModal
                title="Delete portfolio project"
                setClose={setClose}
                close={close}
                context={<Context 
                    handleCloseCustom={handleCloseCustom}
                    profile={profile}
                    project={project}
                />} 
                hFit={true}
            >
                {children}
            </EditModal>
       </>
    );
};

export default DeletePortfolioProject;