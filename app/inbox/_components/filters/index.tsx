'use client'; 
import { ReactElement, RefObject, useEffect, useRef, useState } from "react";  
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Search, Sparkles } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import AllMessages from "./all-messages";
import { useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input";
import SearchMessages from "./search-messages";

interface SideBarWithFiltersProps{
    userConversations: any;
    currentUser: any;
    conversationsBelongsTo: any;
    favoriteConversations: any;
}

const SideBarWithFilters = ({
    userConversations,
    currentUser,
    conversationsBelongsTo,
    favoriteConversations
}:SideBarWithFiltersProps) => {
    const filterParams = useSearchParams();
    const filter = filterParams.get('f');
    const searchQuery = filterParams.get('s');
    const [filterMessages, setFilterMessages] = useState<string>(filter || "all-messages");
    const [filterAllMessagesConv, setFilterAllMessagesConv] = useState<any[]>([]);
    const [filterArchivedConv, setFilterArchivedConv] = useState<any[]>([]);
    const [filterSpamConv, setFilterSpamConv] = useState<any[]>([]);
    const [filterUnreadConv, setFilterUnreadConv] = useState<any[]>([]);
    const [filteretdFavroiteConvs, setFilteredFavoriteConvs] = useState<any[]>([]);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const searchInputRef: RefObject<HTMLInputElement> = useRef(null);
    const [inputSearchVal, setInputSearchVal] = useState<string>("");
    const [filteredConversations, setFilteredConversations] = useState<any[]>([]);

    useEffect(() => {
        const allMessagesConv: any[] = [];
        const archivedConv: any[] = [];
        const spamConv: any[] = [];
        const unreadConv: any[] = [];

        if(userConversations && conversationsBelongsTo){
            userConversations.forEach((userConv: any) => {
            const belongsTo = conversationsBelongsTo?.find((conv: any) => conv.conversationId === userConv._id)?.belongsTo;
            if (belongsTo) {
                if (belongsTo === 'allMessages') {
                allMessagesConv.push(userConv);
                } else if (belongsTo === 'archived') {
                archivedConv.push(userConv);
                } else if (belongsTo === 'spam') {
                spamConv.push(userConv);
                }
            }
            if (userConv.unReadMessages > 0) {
                unreadConv.push(userConv);
            }
            });
        
            setFilterAllMessagesConv(allMessagesConv);
            setFilterArchivedConv(archivedConv);
            setFilterSpamConv(spamConv);
            setFilterUnreadConv(unreadConv);
        }

    }, [userConversations, conversationsBelongsTo]);

    useEffect(() => {
        const favoriteConv: any[] = [];
    
        if(userConversations && favoriteConversations){
            userConversations.forEach((userConv: any) => {
            if (favoriteConversations.some((favConv: any) => favConv.conversationId === userConv._id)) {
                favoriteConv.push(userConv);
            }
            });
            setFilteredFavoriteConvs(favoriteConv);
        }
    
    }, [userConversations, favoriteConversations]);
    
    useEffect(() => {
        if (openSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [openSearch]);

    useEffect(() => {
        if (!inputSearchVal) {
            setFilteredConversations([]); // If search value is empty, show all conversations
            return;
        }

        const filteredConv = userConversations.filter((conv:any) =>
            conv.sender.fullName.toLowerCase().includes(inputSearchVal.toLowerCase()) ||
            conv.sender.username.toLowerCase().includes(inputSearchVal.toLowerCase())
        );
        setFilteredConversations(filteredConv);
    }, [inputSearchVal, userConversations, searchQuery]);

    useEffect(()=>{
        if(searchQuery){
            setOpenSearch(true);
            setInputSearchVal(searchQuery);
        }
    },[searchQuery])


    return (
        <>
            <div className="flex flex-col w-full">
                <div className="p-[5px] pr-[20px]">
                    <div className="flex w-full items-center">
                        {!openSearch && 
                            <>
                                <div className="flex flex-1">
                                    <Select onValueChange={(val)=>{setFilterMessages(val)}} value={filterMessages}>
                                        <SelectTrigger className="w-[130px] outline-none border-none ring-offset-0 text-base p-0">
                                            <SelectValue placeholder="All messages" />
                                        </SelectTrigger>
                                        <SelectContent className="w-[170px]">
                                            <SelectItem value="all-messages">All messages</SelectItem>
                                            <SelectItem value="unread">Unread {filterUnreadConv.length > 0 && `(${filterUnreadConv.length})`}</SelectItem>
                                            <SelectItem value="favorites">Favorites {filteretdFavroiteConvs.length > 0 && `(${filteretdFavroiteConvs.length})`}</SelectItem>
                                            <Separator className="w-full h-[1px] bg-[#f2f2f3] mt-[5px] mb-[5px]"/>
                                            <SelectItem value="archived">Archived {filterArchivedConv.length > 0 && `(${filterArchivedConv.length})`}</SelectItem>
                                            <SelectItem value="spam">Spam {filterSpamConv.length > 0 && `(${filterSpamConv.length})`}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="rounded-full p-0 m-0 w-auto h-auto hover:bg-transparent"
                                        onClick={()=>{setOpenSearch(true)}}
                                    > 
                                        <Search size={18} color="black"/>
                                    </Button>
                                </div>
                            </>
                        }

                        {openSearch && 
                            <div className="flex w-full items-center justify-center">
                                <div className="flex flex-1">
                                    <Input 
                                        className="text-xs outline-none focus-visible:bg-transparent h-[40px]"
                                        ref={searchInputRef}
                                        onChange={(e)=>{setInputSearchVal(e.target.value)}}
                                        value={inputSearchVal} 
                                    /> 
                                </div>
                                <div className="flex items-center justify-center ml-[30px]">
                                    <Button 
                                        variant="link" 
                                        className="w-auto m-0 p-0 flex items-center h-[40px] text-md font-light underline text-black"
                                        onClick={()=>{
                                            setOpenSearch(false)
                                            setInputSearchVal("");
                                        }}
                                    > 
                                        Close 
                                    </Button>
                                </div>
                            </div>
                        }

                    </div>
                    {!openSearch && 
                        <div className="mt-[20px]">
                            <Button className="w-full bg-gradient-to-l from-gray-800 via-gray-900 to-purple-800 text-white font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 h-[40px] rounded-[10px]">
                                <Sparkles size={14} className="mr-[10px]" />
                                Talk to RiseUpGram Guru
                            </Button>
                        </div>
                    }
                </div>
                {!openSearch && 
                    <ScrollArea className="h-calc-side-bar-inbox w-full mt-[20px]">
                        {filterMessages === "all-messages" &&
                            <AllMessages 
                                conversations={filterAllMessagesConv}
                                currentUser={currentUser}
                                displayOnlyConversations={false}
                                conversationsTitle="ALL CONVERSATIONS"
                                filterMessages={filterMessages}
                                emptyMessage="There is no conversations"
                            />
                        }
                        {filterMessages === "unread" &&
                            <AllMessages 
                                conversations={filterUnreadConv}
                                currentUser={currentUser}
                                displayOnlyConversations={true}
                                conversationsTitle="UNREAD CONVERSATIONS"
                                filterMessages={filterMessages}
                                emptyMessage="There is no unread conversations"
                            />
                        }
                        {filterMessages === "archived" &&
                            <AllMessages 
                                conversations={filterArchivedConv}
                                currentUser={currentUser}
                                displayOnlyConversations={true}
                                conversationsTitle="ARCHIVED CONVERSATIONS"
                                filterMessages={filterMessages}
                                emptyMessage="There is no archived conversations"
                            />
                        }
                        {filterMessages === "spam" &&
                            <AllMessages 
                                conversations={filterSpamConv}
                                currentUser={currentUser}
                                displayOnlyConversations={true}
                                conversationsTitle="SPAM CONVERSATIONS"
                                filterMessages={filterMessages}
                                emptyMessage="There is no spam conversations"
                            />
                        }
                        {filterMessages === "favorites" &&
                            <AllMessages 
                                conversations={filteretdFavroiteConvs}
                                currentUser={currentUser}
                                displayOnlyConversations={true}
                                conversationsTitle="FAVORITE CONVERSATIONS"
                                filterMessages={filterMessages}
                                emptyMessage="There is no favorite conversations"
                            />
                        }
                    </ScrollArea>
                }

                {openSearch && 
                <>
                    {!(filteredConversations.length > 0) && <>
                        <div className="h-search-sidebar mt-[40px]">
                            <div className="w-full flex flex-1 border border-[#e4e5e7] h-search-sidebar rounded-[12px] items-center justify-center flex-col p-[30px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="59.7" height="60.2" viewBox="0 0 59.7 60.2"><path fill="none" stroke="#555" stroke-width="3" stroke-miterlimit="10" d="M13.8 37.8l-5.6 9.7c-.4.7-1.3 1-2 .5-.7-.4-1-1.3-.5-2l5.5-9.5C5.7 33.2 2 27.2 2 20.5 2 10.2 10.3 1.9 20.5 1.9S39 10.2 39 20.5 30.6 39 20.4 39c-2.3 0-4.5-.5-6.6-1.2z"></path><path fill="#555" d="M42.6 22.4c0 .9.6 1.4 1.4 1.4 5.8.1 10.5 5.3 10.5 11.7 0 6.3-4.5 11.5-10.2 11.7-.7 0-1.4.7-1.4 1.4v4.6l-5.3-5.6c-.3-.3-.7-.4-1-.4H32c-3.3 0-6.3-1.7-8.3-4.6-.4-.7-1.3-.9-2-.4-.7.4-.9 1.3-.4 2C23.6 47.8 27.8 50 32 50h4l7.5 7.8c.3.3.7.4 1 .4.1 0 .4 0 .6-.1.6-.3.9-.7.9-1.3V50c6.6-1 11.7-7 11.7-14.4 0-7.9-6-14.5-13.5-14.5-1-.1-1.6.5-1.6 1.3z"></path><path fill="none" stroke="#555" stroke-width="3" stroke-linecap="round" stroke-miterlimit="10" d="M8.9 21v-.5c0-6.2 4.9-11.3 11-11.5"></path></svg>
                                <span className="text-2xl font-semibold text-black mt-[20px] text-center">No Matching Results</span>
                                <p className="text-[#62646a] text-md font-normal text-center mt-[10px]">Make sure you typed the username correctly.</p>
                            </div>
                        </div>
                    </>}
                    {filteredConversations.length > 0 &&
                        <ScrollArea className="h-calc-side-bar-inbox w-full mt-[20px]">
                            <SearchMessages 
                                conversations={filteredConversations}
                                currentUser={currentUser}
                                conversationsTitle="ALL CONVERSATIONS"
                                searchQuery={inputSearchVal}
                            />
                        </ScrollArea> 
                    }
                </>
                }
            </div>
        </>
    );
}

export default SideBarWithFilters;