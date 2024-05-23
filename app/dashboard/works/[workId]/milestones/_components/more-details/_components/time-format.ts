export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formattedDate: string = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
  
  return formattedDate;
};
 
