export function formatHoursDecimalToHHMM(decimal: number): string {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  const paddedMinutes = minutes.toString().padStart(2, "0");
  return `${hours}:${paddedMinutes}`;
}
