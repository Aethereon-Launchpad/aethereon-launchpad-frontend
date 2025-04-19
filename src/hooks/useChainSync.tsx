import { useEffect, useRef } from 'react';
import { useChain } from '../context/ChainContext';
import { setCurrentChainId, CHAIN_ID } from '../utils/source';

/**
 * Hook to synchronize the selected chain from context with the global CHAIN_ID variable
 * This ensures that components that don't have access to the context can still use the correct chain
 */
export function useChainSync() {
  const { selectedChain } = useChain();
  const initializedRef = useRef(false);
  const prevChainRef = useRef<string | null>(null);

  // Run this effect immediately and whenever selectedChain changes
  useEffect(() => {
    // Only update if the chain has actually changed
    if (prevChainRef.current !== selectedChain) {
      // Update the global CHAIN_ID variable when the selected chain changes
      setCurrentChainId(selectedChain);

      // Log the change for debugging
      console.log(`useChainSync: Chain switched from ${prevChainRef.current || 'initial'} to ${selectedChain} (Global CHAIN_ID: ${CHAIN_ID})`);

      // Update the previous chain reference
      prevChainRef.current = selectedChain;
    }

    // Mark as initialized
    initializedRef.current = true;
  }, [selectedChain]);

  // Return the current chain ID for convenience
  return CHAIN_ID;
}
