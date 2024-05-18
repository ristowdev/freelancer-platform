"use client";

import { useQuery } from "convex/react";
import Navbar from "../(dashboardd)/_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { api } from "@/convex/_generated/api";
import ConversationList from "./_components/sidebar/conversation-list";

export default function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <> 
            <div className="pl-[40px] pr-[40px] mt-[50px] flex h-[80%] pb-[20px]">
                <Sidebar>
                    <div className="h-full">
                        <ConversationList />
                    </div>
                </Sidebar>
                <div className="h-full w-full">
                    {children}
                </div>
                <div className="w-[450px]">

                </div>
            </div>

        </>
    );
}