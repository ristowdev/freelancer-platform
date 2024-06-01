import { useState } from "react";
import EditModal from "../../modals/edit-modal";
import Context from "./context";

interface EditTitleProps {
    children: React.ReactNode;
    profile: any;
}

const ProfileOverview = ({ 
    children,
    profile
}: EditTitleProps) => {
    const [close, setClose] = useState<boolean>(false);
    const handleCloseCustom = () => {
        setClose(true);
    }
    return (
       <>
            <EditModal
                title="Profile overview"
                setClose={setClose}
                close={close}
                context={<Context 
                    handleCloseCustom={handleCloseCustom}
                    profile={profile}
                />}
                noSticky={true}
                hFit={true}
            >
                {children}
            </EditModal>
       </>
    );
};

export default ProfileOverview;