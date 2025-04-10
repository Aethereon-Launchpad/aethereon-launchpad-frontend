import { useState, useEffect } from 'react'
import { getAmountPaid, getClaimableTokensAmount, isUserWhitelisted } from '../../utils/web3/bond'

interface UseBondUserReturn {
    loading: boolean;
    error: { message: string };
    data: {
        amountPaid: number;
        claimableTokens: number;
        isWhitelisted: boolean;
    };
    refetch: () => Promise<void>;
}

interface UseBondUserOptions {
    polling?: boolean;
}

/**
 * Custom hook for handling user-specific bond data
 * @param {`0x${string}`} bondAddress - Bond contract address
 * @param {`0x${string}`} walletAddress - User wallet address
 * @param {UseBondUserOptions} options - Options object with polling configuration
 * @returns {UseBondUserReturn} Object containing loading state, error, and user data
 */
export function useBondUser(
    bondAddress: `0x${string}`,
    walletAddress: `0x${string}`,
    options?: UseBondUserOptions
): UseBondUserReturn {
    const { polling = true } = options || {};
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string }>({ message: "" });
    const [data, setData] = useState<UseBondUserReturn['data']>({
        amountPaid: 0,
        claimableTokens: 0,
        isWhitelisted: false
    });

    const fetchData = async () => {
        try {
            if (!bondAddress || !walletAddress) {
                setLoading(false);
                return;
            }

            const [
                amountPaid,
                claimableTokens,
                isWhitelisted
            ] = await Promise.all([
                getAmountPaid(bondAddress, walletAddress),
                getClaimableTokensAmount(bondAddress, walletAddress),
                isUserWhitelisted(bondAddress, walletAddress)
            ]);

            setData({
                amountPaid,
                claimableTokens,
                isWhitelisted
            });
        } catch (err: any) {
            setError({ message: err.message || "Failed to fetch user bond data" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchData();

        // Set up polling if enabled
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
    }, [bondAddress, walletAddress, polling]);

    return {
        loading,
        error,
        data,
        refetch: fetchData
    };
} 