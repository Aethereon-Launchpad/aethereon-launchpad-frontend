import { useState, useEffect } from 'react'
import { getAllPresaleData, getPresaleDataByAddress } from '../../utils/web3/presale'

interface UsePresaleReturn {
    loading: boolean;
    error: { message: string };
    data: any[] | any; // Can be array or single object depending on the query
    refetch: () => Promise<void>; // Add refetch function to return type
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

    const fetchData = async () => {
        try {
            let result;
            if (id) {
                // Fetch single presale data if ID is provided
                result = await getPresaleDataByAddress(id);
                if (result) {
                    const response = await fetch(result.metadataURI as string, {
                        headers: {
                            "X-Master-Key": "$2b$10$PjHjTea8i.l7eowYv.06HOljwmxG/y2RiI7ruhUVr6LJBcA3abVq2",
                            "X-Access-Key": "$2a$10$uNs7S5lYHo7PjziwmscVIehwIi66ZN3mhSaNOoLiTehdxo/LYBVoy"
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        result = {
                            ...result,
                            presaleInfo: data.record
                        };
                    } else {
                        console.error('Failed to fetch presale info:', response.statusText);
                    }
                }
            } else {
                // Fetch all presale data if no ID is provided
                result = await getAllPresaleData();
                result = await Promise.all(result.map(async (presale) => {
                    const response = await fetch(presale.metadataURI as string, {
                        headers: {
                            "X-Master-Key": "$2b$10$PjHjTea8i.l7eowYv.06HOljwmxG/y2RiI7ruhUVr6LJBcA3abVq2",
                            "X-Access-Key": "$2a$10$uNs7S5lYHo7PjziwmscVIehwIi66ZN3mhSaNOoLiTehdxo/LYBVoy"
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        return {
                            ...presale,
                            presaleInfo: data.record
                        };
                    } else {
                        console.error('Failed to fetch presale info:', response.statusText);
                        return presale;
                    }
                }));
            }
            setData(result);
        } catch (err: any) {
            setError({ message: err.message || "Failed to fetch presale data" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        return () => {
            // Cleanup logic here
        };
    }, [id]); // Add id to dependency array to refetch when id changes

    return {
        loading,
        error,
        data,
        refetch: fetchData // Expose the fetch function
    };
}