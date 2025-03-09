import { useState, useEffect } from 'react'
import { getAllPresaleData, getPresaleDataByAddress } from '../../utils/web3/presale'

interface UsePresaleReturn {
    loading: boolean;
    error: { message: string };
    data: any[] | any; // Can be array or single object depending on the query
}

/**
 * Custom hook for handling presale data
 * @param {`0x${string}` | null} id - Optional presale address to fetch specific data
 * @returns {UsePresaleReturn} Object containing loading state, error, and data
 */
export function usePresale(id?: `0x${string}` | null): UsePresaleReturn {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string }>({ message: "" });
    const [data, setData] = useState<any[] | any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result;
                if (id) {
                    // Fetch single presale data if ID is provided
                    result = await getPresaleDataByAddress(id);
                } else {
                    // Fetch all presale data if no ID is provided
                    result = await getAllPresaleData();
                }
                setData(result);
            } catch (err: any) {
                setError({ message: err.message || "Failed to fetch presale data" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function if needed
        return () => {
            // Cleanup logic here
        };
    }, [id]); // Add id to dependency array to refetch when id changes

    return {
        loading,
        error,
        data
    };
}