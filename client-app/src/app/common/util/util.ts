export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString = time.getHours() + ":" + time.getMinutes() + ":00";
  const year = date.getFullYear();
  const mount = date.getMonth() + 1;
  const day = date.getDate(); // the day of the mount not the week

  const dateString = `${year}-${mount}-${day}`;

  return new Date(dateString + " " + timeString);
};
