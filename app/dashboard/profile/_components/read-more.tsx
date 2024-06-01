import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface ReadMoreProps {
    text: string;
    splitStart: number;
    splitEnd: number;
}

const ReadMore = ({
    text, 
    splitStart,
    splitEnd
 }: ReadMoreProps) => {
    const [textOpen, setTextOpen] = useState<boolean>(false);

    const handleOpenText = () => {
        setTextOpen(!textOpen)
    }

    return (
        <>
            <p className="text-base whitespace-pre-line">
                {
                    textOpen === true ? text : text.substring(splitStart, splitEnd)
                }
            </p>
            <Button
                variant="link"
                className="m-0 p-0 text-base text-[#108A00] underline h-fit w-fit"
                onClick={handleOpenText}
            >
                {textOpen ? "less" : "more"}
            </Button>
        </>

    );
};

export default ReadMore;