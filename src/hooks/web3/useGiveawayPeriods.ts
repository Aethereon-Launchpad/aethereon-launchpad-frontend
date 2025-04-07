import { useState, useEffect } from 'react';
import { isBefore, isAfter } from 'date-fns';

export const useGiveawayPeriods = (giveawayData: {
    whitelistStartTime: number;
    whitelistEndTime: number;
    withdrawDelay: number;
}) => {
    const [isBeforeWhitelist, setIsBeforeWhitelist] = useState(false);
    const [isWhitelistPeriod, setIsWhitelistPeriod] = useState(false);
    const [isWithdrawDelayPeriod, setIsWithdrawDelayPeriod] = useState(false);
    const [isClaimPeriod, setIsClaimPeriod] = useState(false);

    useEffect(() => {
        if (!giveawayData) return;

        const whitelistStartTimeUnix = giveawayData.whitelistStartTime * 1000;
        const whitelistEndTimeUnix = giveawayData.whitelistEndTime * 1000;
        const withdrawTimeUnix = (giveawayData.whitelistEndTime + Number(giveawayData.withdrawDelay)) * 1000;

        const currentTime = new Date();

        // Reset all states first
        setIsBeforeWhitelist(false);
        setIsWhitelistPeriod(false);
        setIsWithdrawDelayPeriod(false);
        setIsClaimPeriod(false);

        // Before Whitelist Period
        if (isBefore(currentTime, new Date(whitelistStartTimeUnix))) {
            setIsBeforeWhitelist(true);
            return;
        }

        // During Whitelist Period
        if (isAfter(currentTime, new Date(whitelistStartTimeUnix)) &&
            isBefore(currentTime, new Date(whitelistEndTimeUnix))) {
            setIsWhitelistPeriod(true);
            return;
        }

        // During Withdraw Delay Period (after whitelist ends, before claim starts)
        if (isAfter(currentTime, new Date(whitelistEndTimeUnix)) &&
            isBefore(currentTime, new Date(withdrawTimeUnix))) {
            setIsWithdrawDelayPeriod(true);
            return;
        }

        // During Claim Period (after withdraw delay)
        if (isAfter(currentTime, new Date(withdrawTimeUnix))) {
            setIsClaimPeriod(true);
        }

    }, [giveawayData]);

    return {
        isBeforeWhitelist,
        isWhitelistPeriod,
        isWithdrawDelayPeriod,
        isClaimPeriod
    };
}; 