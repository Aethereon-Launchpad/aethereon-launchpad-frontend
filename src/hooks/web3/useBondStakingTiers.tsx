import { useState, useEffect, useCallback } from 'react';
import { getBondDataByAddress } from '../../utils/web3/bond';

interface StakingTier {
    threshold: string;
    multiplier: number;
}

interface UseBondStakingTiersReturn {
    loading: boolean;
    error: { message: string };
    data: StakingTier[];
    refetch: () => Promise<void>;
}

interface UseBondStakingTiersOptions {
    polling?: boolean;
}

/**
 * Custom hook for fetching and monitoring bond staking tiers
 * @param {`0x${string}`} bondAddress - Bond contract address
 * @param {UseBondStakingTiersOptions} options - Options object with polling configuration
 * @returns {UseBondStakingTiersReturn} Object containing loading state, error, and staking tier data
 */
export function useBondStakingTiers(
    bondAddress: `0x${string}`,
    options?: UseBondStakingTiersOptions
): UseBondStakingTiersReturn {
    const { polling = true } = options || {};
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string }>({ message: "" });
    const [data, setData] = useState<StakingTier[]>([]);

    const fetchData = useCallback(async () => {
        try {
            if (!bondAddress) {
                setLoading(false);
                return;
            }

            const bondData = await getBondDataByAddress(bondAddress);
            if (bondData && bondData.stakingTiers) {
                setData(bondData.stakingTiers);
            } else {
                setData([]);
            }
        } catch (err: any) {
            setError({ message: err.message || "Failed to fetch bond staking tiers" });
        } finally {
            setLoading(false);
        }
    }, [bondAddress]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        // Initial fetch
        fetchData();

        // Set up polling if enabled
        if (polling) {
            interval = setInterval(fetchData, 30000); // Check every 30 seconds, as tiers change less frequently
        }

        // Cleanup interval on unmount
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [bondAddress, polling, fetchData]);

    return {
        loading,
        error,
        data,
        refetch: fetchData
    };
} 