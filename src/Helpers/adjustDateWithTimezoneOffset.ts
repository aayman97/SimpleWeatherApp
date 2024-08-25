// Function to adjust Date with timezone offset and format the date
export function adjustDateWithTimezoneOffset(date: Date): {
  dateOnCalender: string;
} {
  // Convert timezone offset from seconds to milliseconds

  // Adjust the date with the timezone offset
  const adjustedDate = new Date(date);

  // Format the adjusted date into the desired format: dd.MM.yyyy - HH:mm
  const day = String(adjustedDate.getDate()).padStart(2, '0');
  const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
  const year = adjustedDate.getFullYear();

  return {
    dateOnCalender: `${day}.${month}.${year}`,
  };
}
