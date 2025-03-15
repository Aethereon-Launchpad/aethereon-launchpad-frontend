import { useState, useEffect } from 'react'
import { getLockAndStake, getUserLockStakeData } from '../../utils/web3/stakeLock'

interface UseLockStakeReturn {
    loading: boolean;
    error: { message: string };
    data: any;
    refetch: () => Promise<void>;
}

interface UseLockStakeOptions {
    userAddress?: `0x${string}` | null;
    polling?: boolean;
}

/**
 * Custom hook for handling lock stake data
 * @param {UseLockStakeOptions} options - Options object with user address and polling configuration
 * @returns {UseLockStakeReturn} Object containing loading state, error, and data
 */
export function useLockStake(options?: UseLockStakeOptions): UseLockStakeReturn {
    const { userAddress = null, polling = true } = options || {};
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string }>({ message: "" });
    const [data, setData] = useState<any>({});

    const fetchData = async () => {
        try {
            const [contractData, userData] = await Promise.all([
                getLockAndStake(),
                userAddress ? getUserLockStakeData(userAddress) : Promise.resolve(null)
            ]);

            setData({
                ...contractData,
                userData
            });
        } catch (err: any) {
            setError({ message: err.message || "Failed to fetch lock stake data" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchData();

        // Set up polling every 10 seconds if enabled
        let interval: NodeJS.Timeout;
        if (polling) {
            interval = setInterval(fetchData, 10000);
        }

        // Cleanup interval on unmount
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [userAddress, polling]);

    return {
        loading,
        error,
        data,
        refetch: fetchData
    };
}
