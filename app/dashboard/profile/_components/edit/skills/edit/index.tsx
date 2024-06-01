import { useState } from "react";
import EditModal from "../../../modals/edit-modal"; 
import Context from "./context";

interface HoursePerWeekProps {
    children: React.ReactNode;
    profile: any;
}

const EditSkills = ({ 
    children,
    profile
}: HoursePerWeekProps) => {
    const [close, setClose] = useState<boolean>(false);
    const handleCloseCustom = () => {
        setClose(true);
    }
    return (
       <>
            <EditModal
                title="Edit skills"
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

export default EditSkills;