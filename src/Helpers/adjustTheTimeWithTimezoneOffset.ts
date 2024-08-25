export function adjustTheTimeWithTimezoneOffset(date: Date): {
  hourAndMinute: string;
} {
  const currentTime = new Date(date);

  const formattedDate = currentTime.toISOString();
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  return {
    hourAndMinute: formatter.format(currentTime),
  };
}
