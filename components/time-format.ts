import { format } from 'date-fns';

export const formatTime = (timestamp: number): string => {
  const formattedDate = format(new Date(timestamp), 'dd MMM yyyy, HH:mm');
  return formattedDate;
};
