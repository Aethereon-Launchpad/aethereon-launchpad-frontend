import { useState, useEffect } from 'react'
import { getAllBondData, getBondDataByAddress, getBondDataByProjectName } from '../../utils/web3/bond'
import { ensureRawGistURL } from '../../utils/tools';
import { CHAIN_ID } from '../../utils/source';
import { useChain } from '../../context/ChainContext';

interface UseBondReturn {
    loading: boolean;
    error: { message: string };
    data: any[] | any; // Can be array or single object depending on the query
    refetch: () => Promise<void>; // Refetch function to return type
}

interface UseBondOptions {
    polling?: boolean;
    projectName?: string; // Project name option
}

/**
 * Custom hook for handling bond data
 * @param {string | null} projectName - Optional project name to fetch specific bond data
 * @param {UseBondOptions} options - Options object with polling configuration
 * @param {`0x${string}` | null} id - Optional bond address to fetch specific bond data
 * @returns {UseBondReturn} Object containing loading state, error, and data
 */
export function useBond(projectName?: string | null, options?: UseBondOptions, id?: `0x${string}` | null): UseBondReturn {
    const { polling = true } = options || {};
    const { selectedChain } = useChain();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<{ message: string }>({ message: "" });
    const [data, setData] = useState<any[] | any>([]);
    const [currentChainId, setCurrentChainId] = useState<string>(CHAIN_ID);

    const fetchData = async () => {
        try {
            let result;
            if (projectName) {
                // Fetch by project name if provided
                result = await getBondDataByProjectName(projectName);
            } else if (id) {
                // Fetch single bond data if ID is provided
                result = await getBondDataByAddress(id);
                if (result) {
                    try {
                        const response = await fetch(ensureRawGistURL(result.metadataURI as string));
                        if (response.ok) {
                            const data = await response.json();
                            result = {
                                ...result,
                                bondInfo: data
                            };
                        } else {
                            console.error('Failed to fetch bond info:', response.statusText);
                        }
                    } catch (err) {
                        console.error('Error fetching metadata:', err);
                    }
                }
            } else {
                // Fetch all bond data if no ID is provided
                result = await getAllBondData();
                result = await Promise.all(result.map(async (bond, index) => {
                    // Add delay based on index (2 seconds between each request)
                    await new Promise(resolve => setTimeout(resolve, index * 2000));

                    try {
                        const response = await fetch(ensureRawGistURL(bond.metadataURI as string));
                        if (response.ok) {
                            const data = await response.json();
                            return {
                                ...bond,
                                bondInfo: data
                            };
                        } else {
                            console.error('Failed to fetch bond info:', response.statusText);
                            return bond;
                        }
                    } catch (err) {
                        console.error('Error fetching metadata:', err);
                        return bond;
                    }
                }));
            }
            setData(result);
        } catch (err: any) {
            setError({ message: err.message || "Failed to fetch bond data" });
        } finally {
            setLoading(false);
        }
    };

    // Effect to track global CHAIN_ID changes
    useEffect(() => {
        // Check if the chain has changed
        if (currentChainId !== CHAIN_ID) {
            console.log(`useBond: Global CHAIN_ID changed from ${currentChainId} to ${CHAIN_ID}, refetching...`);
            setCurrentChainId(CHAIN_ID);
            setLoading(true);
            // Clear any cached data
            setData([]);
            // Fetch new data with a slight delay to ensure chain change is complete
            setTimeout(() => {
                fetchData();
            }, 100);
        }
    }, [CHAIN_ID, currentChainId]);

    // Effect to track selectedChain from context
    useEffect(() => {
        console.log(`useBond: selectedChain changed to ${selectedChain}, refetching...`);
        setLoading(true);
        fetchData();
    }, [selectedChain]);

    // Listen for the chainChanged custom event
    useEffect(() => {
        const handleChainChanged = (event: any) => {
            console.log(`useBond: Received chainChanged event with chainId ${event.detail.chainId}`);
            setLoading(true);
            setData([]);
            setTimeout(() => {
                fetchData();
            }, 100);
        };

        window.addEventListener('chainChanged', handleChainChanged);

        return () => {
            window.removeEventListener('chainChanged', handleChainChanged);
        };
    }, []);

    useEffect(() => {
        // Initial fetch
        console.log(`useBond: Initial fetch with chain ${CHAIN_ID}`);
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
    }, [id, projectName, polling]);

    return {
        loading,
        error,
        data,
        refetch: fetchData
    };
}