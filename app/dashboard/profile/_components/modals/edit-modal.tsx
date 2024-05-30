import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";

interface EditModalProps {
    children: React.ReactNode;
    title: string;
    context: React.ReactNode;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    close: boolean;
}

const EditModal = ({ 
    children,
    title,
    context,
    setClose,
    close
}: EditModalProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    useEffect(()=>{
        if(close===true){
            setIsOpen(false);
            setClose(false);
        }
    }, [close]);
    return (
       <>
            <Dialog onOpenChange={(o)=>{setIsOpen(o)}} open={isOpen} >
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="max-w-[750px] min-h-[700px] sm:rounded-2xl sm:p-[30px]">
                    <DialogHeader>
                        <DialogTitle className="text-4xl">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="h-full">
                            {context}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
       </>
    );
};

export default EditModal;