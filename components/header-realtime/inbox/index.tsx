'use client'; 
import { IconWithNewData } from '../icon-with-new-data';
import { Mail } from 'lucide-react';
import { PopoverContext } from '../popover-notification/popover-context';
import { NotificationCard } from '../popover-notification/notification-card';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import RenderSkeleton from './_components/skeleton';
import { useEffect, useState } from 'react';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { isFileImage } from '@/utils/is-file-image';

const InboxNotifications = () => { 

    const [newData, setNewData] = useState<boolean>(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);


    const pathname = usePathname()

     
    const openedUserName = pathname.substring('/inbox/'.length);
    // console.log(otherUserName)
    // Check if the current route is '/inbox' or starts with '/inbox/'
    const isInboxPage = pathname.startsWith('/inbox');

    // Set hasCategories based on whether it's the inbox page or not

    const currentUser = useQuery(api.users.getCurrentUser);
    const conversations = useQuery(api.conversations.getConversations);

    useEffect(() => {
        if (conversations && !isInboxPage) {
          conversations.forEach(conversation => {
            const { isNew, playSound, lastMessageUserId } = conversation.message[0];
            if (isNew && playSound && lastMessageUserId !== currentUser?._id) {
              new Audio("/sounds/new-message-notification-sound.mp3").play();
            }
          });
        }
    }, [conversations, isInboxPage, currentUser]);


    const {
        mutate: setReadUnRead,
    } = useApiMutation(api.messages.markReadUnRead);

    // useEffect(() => {
    //     if (notifications) {
    //         notifications.forEach(notification => {
    //             if (notification.isNew) {
    //                 new Audio("/sounds/new-message-notification-sound.mp3").play();
    //             }
    //         });
    //     }
    // }, [notifications]);

    // useEffect(() => {
    //     if (notifications) { 
    //         const unreadNotifications = notifications.filter(notification => !notification.read);
    //         setUnreadCount(unreadNotifications.length);
    //         setNewData(unreadNotifications.length > 0);
    //     }
    // }, [notifications]);

    useEffect(() => {
        if (conversations) {
          const unreadConversations = conversations.filter(conversation => {
            const isCurrentUserLastMessage = conversation.message[0].lastMessageUserId === currentUser?._id;
            return !isCurrentUserLastMessage && !conversation.message[0].read;
          });
    
          const unreadCount = unreadConversations.length;
          const hasNewData = unreadCount > 0;
     
          setUnreadCount(unreadCount);
          setNewData(hasNewData);
        }
    }, [conversations, currentUser]);


    console.log("DA")
    console.log(conversations)

    const markReadUnRead = (id: string, type: string) => { 
        setReadUnRead({conversationId: id, type: type})
            .then(() => {
                toast.info(`Message ${type==="read" ? "Readed" : "Unreaded"}`);
            })
            .catch(() => {
                toast.error("Something went wrong")
            })  
    } 
    
    if (conversations === undefined || currentUser === undefined) {
        return <RenderSkeleton />
    }

    const messageFormation = (message: any, files:any) => {
        if(message.type !== "onlyMessage"){
            if(message.type === "onlyFiles"){
                if(files.length === 1){
                    return isFileImage(files[0].type) ? "Sent a photo" : "Sent a file"
                }else{
                    return files.length + " files"
                }
            }else{
                return message.text;
            }
        }else{
            return message.text;
        }
    }
    return (
        <> 
            <IconWithNewData newData={newData}>
                <PopoverContext 
                    title='Messages'
                    icon={<Mail color='#404145' size={16}/>}
                    unreadNumber={unreadCount}
                    popoverIcon={<Mail size={20} color='#74767e'/>}
                    notifications={conversations.map((conversation, index)=> (<>
                        <NotificationCard
                            key={index}
                            id={conversation._id}
                            title={conversation?.sender?.fullName+" @"+conversation?.sender?.username}
                            description={
                                conversation?.message[0]?.lastMessageUserId == currentUser?._id ? 
                                "Me: " + messageFormation(conversation?.message[0], conversation?.files)! : 
                                messageFormation(conversation?.message[0], conversation?.files)!
                            }
                            when={conversation?.message[0]?._creationTime!}
                            markReadUnRead={markReadUnRead}
                            read={
                                conversation?.message[0]?.lastMessageUserId === currentUser?._id ? 
                                true :
                                conversation?.message[0]?.read!
                            }
                            avatar={
                                <Avatar className="w-[60px] h-[60px] bg-green-800 flex items-center justify-center mr-[7px]">
                                    <AvatarImage src={conversation?.sender?.profileImageUrl} />
                                    <AvatarFallback className="text-sm text-white">{conversation?.sender?.fullName[0]}</AvatarFallback>
                                </Avatar>
                            }
                            onClickRedirect={`/inbox/${conversation?.sender?.username}`}
                            lastMessageUserId={conversation?.message[0]?.lastMessageUserId}
                            currentUserId={currentUser?._id}
                            unReadMessages={conversation?.unReadMessages}
                        />
                    </>))}
                /> 
            </IconWithNewData>
        </>

    );
};
export default InboxNotifications;
