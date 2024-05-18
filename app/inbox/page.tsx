"use client";

import Image from "next/image";
import { EmptyFavorites } from "../(dashboardd)/_components/empty-favorites";
import SideBar from "./_components/side-bar";
// import useStoreUserEffect from "@/hooks/use-store-user-effect";

const InboxPage = () => {
    // const userId = useStoreUserEffect();
    // if (userId === null) {
    //     return <div>Storing user...</div>;
    // }
    return (
        <div className="w-full flex h-calc-80px overflow-hidden">
            <div className="w-[20.1%] ">
                <SideBar />
            </div>
            <div className="w-[79%] ml-[1%] mt-[10px] flex items-center justify-center flex-col border border-[#dadbdd] rounded-[24px]">
                <div className=" h-full w-full flex items-center flex-col justify-center">
                    <Image
                        src="/empty-inbox-pro.svg"
                        alt="Empty"
                        width={230}
                        height={230}
                    />
                    <h2 className="text-2xl font-semibold mt-6 text-black">
                        Pick up where you left off
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2">
                        Select a conversation and chat away.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InboxPage;