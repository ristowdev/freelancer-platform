export const formatTimestampToDateDefault = (timestamp: number): string => {
    const date = new Date(timestamp);
    
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };
    
    return date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
};

export const formatTimestampToDateObject = (timestamp: number): { month: string, day: number, year: number } => {
    const date = new Date(timestamp);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short' };
    const month = date.toLocaleDateString('en-US', options);
    
    const day = date.getDate();
    const year = date.getFullYear();
    
    return { month, day, year };
};