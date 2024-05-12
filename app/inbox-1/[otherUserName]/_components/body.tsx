import { useEffect, useRef, useState } from "react";
import MessageBox from "./message-box";
import { MessageWithUserType } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BodyProps {
    messages: MessageWithUserType[];
}

const Body = ({
    messages
}: BodyProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-full">
            <ScrollArea className="h-[380px]">
                {messages.map((message, i) => (
                    <MessageBox
                        isLast={i === messages.length - 1}
                        key={message._id}
                        message={message}
                    />
                ))}
            </ScrollArea>
            <div className="pt-24" ref={bottomRef} />
        </div>
    );
}

export default Body;
