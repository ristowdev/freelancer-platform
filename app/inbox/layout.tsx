"use client";

export default function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <> 
            <div className="pl-[40px] pr-[40px] pt-[24px]">
                {children}
            </div>
        </>
    );
}