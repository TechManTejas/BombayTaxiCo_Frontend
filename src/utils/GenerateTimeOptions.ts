export const generateTimeOptions = (): { label: string; key: string }[] => {
  const timeOptions: { label: string; key: string }[] = [];
  const startTime = new Date();
  startTime.setHours(startTime.getHours(), 0, 0, 0);

  const currentTime = new Date();
  const twoHoursLater = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);

  console.log(startTime, twoHoursLater)
  
  for (let i = 0; i < 96; i++) {
      const time = new Date(startTime.getTime() + i * 15 * 60 * 1000);

      console.log(time.toString());

      // Only include times greater than 2 hours from the current time
      if (time > twoHoursLater) {
          const hours = time.getHours();
          const minutes = time.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';

          const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
          const formattedMinutes = minutes === 0 ? '00' : minutes;

          const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

          console.log(timeString)

          timeOptions.push({ label: timeString, key: timeString });
      }
  }

  return timeOptions;
};
