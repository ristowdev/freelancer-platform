import { useState } from "react";
import EditModal from "../../../modals/edit-modal";
import Context from "./context";

interface HoursePerWeekProps {
    children: React.ReactNode;
    profile: any;
}

const AddLanguage = ({ 
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
                title="Add language"
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

export default AddLanguage;