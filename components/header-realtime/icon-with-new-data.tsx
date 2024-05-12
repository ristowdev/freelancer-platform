"use client";
 

interface IconWithNewDataPropos {
    children: React.ReactNode;
    newData: boolean;
};

export const IconWithNewData = ({
    children,
    newData, 
}: IconWithNewDataPropos) => { 

    return ( 
        <>
            <div className="relative">
                {newData && <div className="absolute bg-red-600 w-[6px] h-[6px] rounded-full right-[5px] top-[5px]"></div> }
                {children}
            </div>
        </>
    );
};