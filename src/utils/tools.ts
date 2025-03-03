import { differenceInDays } from 'date-fns';

export function noOfDays(nextRewardDate: number, creationDate: number) {
    const futureDate = new Date(Number(nextRewardDate) * 1000)
    const blockTimestampDate = new Date(Number(creationDate) * 1000)

    return Math.round(differenceInDays(futureDate, blockTimestampDate))
}