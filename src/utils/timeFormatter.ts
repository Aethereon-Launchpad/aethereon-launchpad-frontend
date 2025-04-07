/**
 * Converts seconds into a human-readable time format
 * @param seconds - Number of seconds to convert
 * @returns String in format like "2 days 3 hours 15 minutes 30 seconds"
 */
export function formatSeconds(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return 'Invalid time';

    const timeUnits = [
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 }
    ];

    return timeUnits.reduce((acc, { unit, seconds: unitSeconds }) => {
        const value = Math.floor(seconds / unitSeconds);
        if (value > 0) {
            acc.push(`${value} ${unit}${value !== 1 ? 's' : ''}`);
            seconds %= unitSeconds;
        }
        return acc;
    }, [] as string[]).join(' ') || '0 seconds';
} 