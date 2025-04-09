import { useState, useEffect } from 'react';
import { getAllVotingSlotsData, getVotingSlotData } from '../../utils/web3/voting';

interface UseVotingReturn {
    loading: boolean;
    error: { message: string };
    data: any[] | any;
    refetch: () => Promise<void>;
}

interface UseVotingOptions {
    polling?: boolean;
}

/**
 * Custom hook for handling voting slot data
 * @param {`0x${string}` | null} id - Optional voting slot address to fetch specific data
 * @param {UseVotingOptions} options - Options object with polling configuration
 * @returns {UseVotingReturn} Object containing loading state, error, and data
 */
export function useVoting(id?: `0x${string}` | null, options?: UseVotingOptions): UseVotingReturn {
    const { polling = true } = options || {};
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string }>({ message: "" });
    const [data, setData] = useState<any[] | any>([]);

    const fetchData = async () => {
        try {
            let result;
            if (id) {
                result = await getVotingSlotData(id);
            } else {
                result = await getAllVotingSlotsData();
            }
            setData(result);
        } catch (err: any) {
            setError({ message: err.message || "Failed to fetch voting data" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        let interval: NodeJS.Timeout;
        if (polling) {
            interval = setInterval(fetchData, 10000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [id, polling]);

    return {
        loading,
        error,
        data,
        refetch: fetchData
    };
} 