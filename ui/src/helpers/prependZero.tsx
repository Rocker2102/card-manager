export default function prependZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
