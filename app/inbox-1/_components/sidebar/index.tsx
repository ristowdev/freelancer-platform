"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

interface SidebarProps {
    children: React.ReactNode;
}

export const Sidebar = ({
    children
}: SidebarProps) => {
    return (
        <aside className="flex flex-col w-[450px]">
            <div className="">
                {children}
            </div>
        </aside>
    );
};