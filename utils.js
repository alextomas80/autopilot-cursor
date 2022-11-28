function timeWithZero(time) {
  return String(time).padStart(2, "0");
}

export function getTime() {
  const date = new Date();

  // prettier-ignore
  return `${timeWithZero(date.getHours())}:${timeWithZero(date.getMinutes())}:${timeWithZero(date.getSeconds())}`;
}

export function formatMilisecondsToDate(millis) {
  const date = new Date(millis);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
