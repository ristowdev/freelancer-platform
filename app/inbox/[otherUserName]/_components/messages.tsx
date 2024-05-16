import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageWithUserType } from "@/types";
import { MoreHorizontal } from "lucide-react";
import MessageBox from "./messages/message-box";
import { useEffect, useRef, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { BiSolidCheckShield } from "react-icons/bi";
import Link from "next/link";

interface HeaderProps {
    messages: MessageWithUserType[];
    userId: Doc<"users">["_id"];
    onMessageReply: (message: any) => void;
    proposal: any;
}

const Messages = ({
    messages,
    userId,
    onMessageReply,
    proposal
}: HeaderProps) => {  
    const bottomRef = useRef<HTMLDivElement>(null);
    const [scrollToMessage, setScrollToMessage] = useState<string | null>(null);
    const [animate, setAnimate] = useState<string | null>(null);
    const [lastReceivedMessage, setLastReceivedMessage] = useState<any | null>(null);
    

    const _scrollToMessage = (id: string) => {
        setScrollToMessage(id);
    }

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    useEffect(()=>{
        const messagesLength = messages.length-1;
        const lastMessage = messages[messagesLength];
        if(lastReceivedMessage !== null) {
            if(lastMessage._id !== lastReceivedMessage._id){
                if (bottomRef.current) {
                    bottomRef.current.scrollIntoView({ behavior: "smooth" });
                    setLastReceivedMessage(lastMessage);
                }
            }
        }else{
            setLastReceivedMessage(lastMessage);
        }
    },[messages, lastReceivedMessage]);

    

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
            <div className="w-full flex items-center justify-center">
                <div className="w-[80%] flex flex-col items-center justify-center pl-[24px] pr-[24px] mt-[20px] mb-[10px] text-center">
                    <div className="flex items-center w-full">
                        <div className="w-[100%] h-[1px] bg-[#e4e5e7]"></div>
                        <div className="w-[420px] flex justify-center items-center ml-[10px] mr-[10px]">
                            <BiSolidCheckShield size={18} color="#404145"/>
                            <span className="text-xs font-bold text-[#404145] ml-[3px]">WE HAVE YOUR BACK</span>
                        </div>
                        <div className="w-[100%] h-[1px] bg-[#e4e5e7]"></div>
                    </div>
                    <div className="w-full flex items-center justify-center mt-[5px]">
                        <div className="w-[90%] text-center flex items-center justify-center">
                            <p className="text-[#74767e] text-sm font-normal text-center">For added safety and your protection, keep payments and communications within RiseUpGram. <Link href="" className="text-[#222325] ml-[2px] underline">Learn more</Link></p>
                        </div>
                    </div>
                </div>
            </div>

            {messages.map((message, i) => (
                <div key={message._id} id={`message-${message._id}`} className="w-full relative">
                    <div className={animate === message._id ? "animate-scroll-to-message absolute top-0 left-0 w-[80%] h-full bg-white" : ""}></div>
                    <MessageBox 
                        message={message}
                        userId={userId}
                        onMessageReply={onMessageReply}
                        scrollToMessage={_scrollToMessage}
                        proposal={proposal}
                    /> 
                </div>
            ))}
            <div className="" ref={bottomRef} />
        </div>
    );
}

export default Messages;
