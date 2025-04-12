import { format } from 'date-fns';

export function noOfDays(nextWithdrawalTime: number) {
    return nextWithdrawalTime / (24 * 60 * 60);
}

export function ensureRawGistURL(url: string): string {
    if (url.includes('gist.github.com')) {
        // Convert it to the raw.githubusercontent.com format
        const match = url.match(/gist\.github\.com\/([^/]+)\/([a-f0-9]+)/);
        if (match) {
            const [, user, id] = match;
            return `https://gist.githubusercontent.com/${user}/${id}/raw`;
        }
    }
    return url;
}
