import { useState, useEffect } from 'react';

const ElapsedTimeComponent: React.FC<{ submitTime: number }> = ({ submitTime }) => {
    const [elapsedTime, setElapsedTime] = useState<string>('');

    useEffect(() => {
        const calculateElapsedTime = (submitTime: number): string => {
            const currentTime = Date.now();
            const timeDifference = currentTime - submitTime;
            const msInMinute = 60 * 1000;
            const msInHour = msInMinute * 60;
            const msInDay = msInHour * 24;
            const msInWeek = msInDay * 7;
            const msInMonth = msInDay * 30;

            if (timeDifference < msInMinute) {
                return `Now`;
            } else if (timeDifference < msInHour) {
                const minutes = Math.floor(timeDifference / msInMinute);
                return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
            } else if (timeDifference < msInDay) {
                const hours = Math.floor(timeDifference / msInHour);
                return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
            } else if (timeDifference < msInWeek) {
                const days = Math.floor(timeDifference / msInDay);
                return `${days} ${days === 1 ? 'day' : 'days'}`;
            } else if (timeDifference < msInMonth) {
                const weeks = Math.floor(timeDifference / msInWeek);
                return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
            } else {
                const months = Math.floor(timeDifference / msInMonth);
                return `${months} ${months === 1 ? 'month' : 'months'}`;
            }
        };

        const updateElapsedTime = () => {
            const elapsedTimeString = calculateElapsedTime(submitTime);
            setElapsedTime(elapsedTimeString);
        };

        // Update elapsed time every minute (you can adjust this interval)
        const intervalId = setInterval(updateElapsedTime, 60000);

        // Initial update
        updateElapsedTime();

        // Clean up interval
        return () => clearInterval(intervalId);
    }, [submitTime]);

    return elapsedTime;
};

export default ElapsedTimeComponent;
