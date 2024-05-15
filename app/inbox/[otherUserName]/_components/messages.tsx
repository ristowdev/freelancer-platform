import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageWithUserType } from "@/types";
import { MoreHorizontal } from "lucide-react";
import MessageBox from "./message-box";
import { useEffect, useRef, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface HeaderProps {
    messages: MessageWithUserType[];
    userId: Doc<"users">["_id"];
    onMessageReply: (message: any) => void;
}

const Messages = ({
    messages,
    userId,
    onMessageReply,
}: HeaderProps) => {  
    const bottomRef = useRef<HTMLDivElement>(null);
    const [scrollToMessage, setScrollToMessage] = useState<string | null>(null);
    const [animate, setAnimate] = useState<string | null>(null);

    const _scrollToMessage = (id: string) => {
        setScrollToMessage(id);
    }

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger the intersection callback when 50% of the target element is visible
        };

        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setAnimate(scrollToMessage);
                    setScrollToMessage(null); // Reset scrollToMessage after scrolling

                    setTimeout(() => {
                        setAnimate(null);
                    }, 1000);

                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        if (scrollToMessage !== null) {
            const messageRef = document.getElementById(`message-${scrollToMessage}`);
            if (messageRef) {
                observer.observe(messageRef);
                messageRef.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            }
        }

        return () => {
            observer.disconnect();
        };
    }, [scrollToMessage]);



    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">

            {messages.map((message, i) => (
                <div key={message._id} id={`message-${message._id}`} className="w-full relative">
                    <div className={animate === message._id ? "animate-scroll-to-message absolute top-0 left-0 w-[80%] h-full bg-white" : ""}></div>
                    <MessageBox 
                        message={message}
                        userId={userId}
                        onMessageReply={onMessageReply}
                        scrollToMessage={_scrollToMessage}
                    /> 
                </div>
            ))}
            <div className="" ref={bottomRef} />
        </div>
    );
}

export default Messages;
