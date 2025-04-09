import { format } from 'date-fns';

export function noOfDays(nextWithdrawalTime: number) {
    return nextWithdrawalTime / (24 * 60 * 60);
}