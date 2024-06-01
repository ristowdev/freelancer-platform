import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface EditModalProps {
    children: React.ReactNode;
    title: string;
    context: React.ReactNode;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    close: boolean;
    noSticky?: boolean;
    hFit?: boolean;
}

const EditModal = ({ 
    children,
    title,
    context,
    setClose,
    close,
    noSticky,
    hFit
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
                <DialogContent className={cn("max-w-[750px] sm:rounded-2xl sm:p-0 p-0", hFit === true ? "h-fit" : " h-[700px] ")}>
                    <div className="w-full h-full flex flex-1 flex-col overflow-y-scroll">
                        <DialogHeader>
                            {!noSticky &&
                            <DialogTitle className="text-4xl sticky top-0 left-0 bg-white pb-[20px] rounded-xl pl-[30px] pr-[30px] pt-[30px]">
                                {title}
                            </DialogTitle>}
                            {noSticky && 
                                <DialogTitle className="text-4xl p-[30px] pb-[0px]">
                                    {title}
                                </DialogTitle>
                            }
                            <DialogDescription className="h-full p-[30px] pt-0">
                                {context}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                </DialogContent>
            </Dialog>
       </>
    );
};

export default EditModal;