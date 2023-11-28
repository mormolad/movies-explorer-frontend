export default function duration(durationInMinutes) {
  let hours = Math.floor(durationInMinutes / 60);
  let minutes = durationInMinutes - hours * 60;
  console.log(hours, 'h', minutes, 'm');
  return `${hours}ч ${minutes}м`;
}
