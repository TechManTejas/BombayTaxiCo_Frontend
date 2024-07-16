import dayjs, { Dayjs } from "dayjs";

export const generateTimeOptions = (date: Dayjs): { label: string; key: string }[] => {
  const timeOptions: { label: string; key: string }[] = [];
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0);

  const currentTime = new Date();
  const twoHoursLater = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);

  for (let i = 0; i < 96; i++) {
    const time = new Date(startTime.getTime() + i * 15 * 60 * 1000);
    
    // Only include times greater than 2 hours from the current time if today is selected
    if (date.isSame(dayjs(), "day") && time <= twoHoursLater) {
      continue;
    }
    
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes === 0 ? '00' : minutes;

    const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

    timeOptions.push({ label: timeString, key: timeString });
  }

  return timeOptions;
};
