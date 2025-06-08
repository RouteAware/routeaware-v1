// Step 5/5: calculateETA.ts with 12/24h formatting support
export function calculateETA(
  distance: string,
  pickupDate: string,
  pickupTime: string,
  dailyMiles: string,
  use24Hour: boolean = false  // new flag for time format
): string {
  // Parse numeric values
  const miles = parseFloat(distance.replace(/[^0-9.]/g, ''));
  const milesPerDay = parseFloat(dailyMiles);

  // Ensure required inputs
  if (!pickupDate || !miles || !milesPerDay) return '';

  // Calculate days needed
  const daysRequired = Math.ceil(miles / milesPerDay);

  // Build start Date from pickup date/time (default to 08:00 if time missing)
  const startTimeStr = pickupTime || '08:00';
  const start = new Date(`${pickupDate}T${startTimeStr}`);

  // Advance date by daysRequired - 1 (first day counts as day 1)
  start.setDate(start.getDate() + daysRequired - 1);

  // Format options for date & time
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: !use24Hour
  };

  // Return formatted ETA string
  return start.toLocaleString(undefined, options);
}