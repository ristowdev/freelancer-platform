import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageWithUserType } from "@/types";
import { MoreHorizontal } from "lucide-react";
import MessageBox from "./message-box";
import { useEffect, useRef } from "react";
import { Doc } from "@/convex/_generated/dataModel";

interface HeaderProps {
    messages: MessageWithUserType[];
    userId: Doc<"users">["_id"];
}

const Messages = ({
    messages,
    userId
}: HeaderProps) => {  
    const bottomRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); 

    return (
        <ScrollArea className="w-full flex-col h-[330px]">
            {messages.map((message, i) => (
                <>
                    <MessageBox 
                        message={message}
                        userId={userId}
                    /> 
                </>
            ))}
            <div className="" ref={bottomRef} />
        </ScrollArea>
    );
}

export default Messages;
