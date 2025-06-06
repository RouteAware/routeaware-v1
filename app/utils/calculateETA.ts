export function calculateETA(
  distance: string,
  pickupDate: string,
  pickupTime: string,
  dailyMiles: string
): string {
  const miles = parseFloat(distance.replace(/[^0-9.]/g, ''));
  const milesPerDay = parseFloat(dailyMiles);

  if (!pickupDate || !miles || !milesPerDay) return '';

  const daysRequired = Math.ceil(miles / milesPerDay);
  const start = new Date(`${pickupDate}T${pickupTime || '08:00'}`);

  start.setDate(start.getDate() + daysRequired - 1);

  return start.toLocaleString();
} // ← this closing brace was missing