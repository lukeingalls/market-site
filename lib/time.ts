export function getTimeString(time: string | Date) {
  const oneHour = 1000 * 60 * 60;
  const now = new Date();
  const then = new Date(time);
  const start = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes()
  );
  const end = Date.UTC(
    then.getFullYear(),
    then.getMonth(),
    then.getDate(),
    then.getHours(),
    then.getMinutes()
  );

  const numHours = Math.floor(Math.abs(start - end) / oneHour);
  let timeString;
  if (numHours === 0) {
    const numMinutes = Math.floor(Math.abs(start - end) / (1000 * 60));
    if (numMinutes === 0) {
      timeString = "now";
    } else {
      timeString = `${numMinutes} minute${numMinutes === 1 ? "" : "s"} ago`;
    }
  } else if (numHours < 24) {
    timeString = `${numHours} hour${numHours === 1 ? "" : "s"} ago`;
  } else if (numHours / 24 < 7) {
    timeString = `${Math.round(numHours / 24)} days ago`;
  } else {
    timeString = `${Math.round(numHours / 24 / 7)} weeks ago`;
  }

  return timeString;
}
