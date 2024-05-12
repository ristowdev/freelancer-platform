'use client'; 
import { IconWithNewData } from '../icon-with-new-data';
import { Bell } from 'lucide-react';
import { PopoverContext } from '../popover-notification/popover-context';
import { NotificationCard } from '../popover-notification/notification-card';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import RenderSkeleton from './_components/skeleton';
import { useEffect, useState } from 'react';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';

const Notifications = () => { 

    const [newData, setNewData] = useState<boolean>(false);
    const [unreadCount, setUnreadCount] = useState<number>(0);

    const currentUser = useQuery(api.users.getCurrentUser);
    const notifications = useQuery(api.notifications.get);

    const {
        mutate: setReadUnRead,
    } = useApiMutation(api.notifications.markReadUnRead);

    useEffect(() => {
        if (notifications) {
            notifications.forEach(notification => {
                if (notification.isNew) {
                    new Audio("/sounds/new-notification-sound.mp3").play();
                }
            });
        }
    }, [notifications]);

    useEffect(() => {
        if (notifications) { 
            const unreadNotifications = notifications.filter(notification => !notification.read);
            setUnreadCount(unreadNotifications.length);
            setNewData(unreadNotifications.length > 0);
        }
    }, [notifications]);

    const markReadUnRead = (id: string, type: string) => { 
        setReadUnRead({id: id, type: type})
            .then(() => {
                toast.info(`Notification ${type==="read" ? "Readed" : "Unreaded"}`);
            })
            .catch(() => {
                toast.error("Something went wrong")
            })  
    } 
    
    if (notifications === undefined || currentUser === undefined) {
        return <RenderSkeleton />
    }

    return (
        <> 
            <IconWithNewData newData={newData}>  
                <PopoverContext 
                    title='Notifications'
                    icon={<Bell color='#404145' size={16}/>}
                    unreadNumber={unreadCount}
                    popoverIcon={<Bell size={20} color='#74767e'/>}
                    notifications={notifications.map((notification, index)=> (<>
                        <NotificationCard 
                            key={index}
                            id={notification._id}
                            icon={<Bell color='#565656' size={25}/>}
                            title={notification.title}
                            description={notification.message}
                            when={notification._creationTime}
                            markReadUnRead={markReadUnRead}
                            read={notification.read}
                            unReadMessages={0}
                        />
                    </>))}
                /> 
            </IconWithNewData>
        </>

    );
};
export default Notifications;
