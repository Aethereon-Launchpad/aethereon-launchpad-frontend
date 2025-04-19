import { useState, useEffect } from 'react';
import { useChain } from '../context/ChainContext';
import { useWallets } from '@privy-io/react-auth';
import { CHAIN_ID } from '../utils/source';

/**
 * Hook to check if the user is on the required network
 * @param requiredChainId - The chain ID that is required for the current page/feature
 * @returns An object with the modal state and functions to control it
 */
export function useNetworkCheck(requiredChainId: string = CHAIN_ID) {
  const { selectedChain } = useChain();
  const { wallets } = useWallets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if the current chain matches the required chain
  useEffect(() => {
    // Only show the modal if the chains don't match and the user has a wallet connected
    if (selectedChain !== requiredChainId && wallets && wallets.length > 0) {
      console.log(`Network mismatch: Current ${selectedChain}, Required: ${requiredChainId}`);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [selectedChain, requiredChainId, wallets]);

  // Listen for global chain change events instead of wallet events
  useEffect(() => {
    const handleChainChanged = (event: any) => {
      // The chain has changed, check if we need to show the modal
      const newChainId = event.detail?.chainId || selectedChain;
      if (newChainId !== requiredChainId) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    };

    // Add event listener for our custom chain changed event
    window.addEventListener('chainChanged', handleChainChanged);

    return () => {
      // Remove event listener on cleanup
      window.removeEventListener('chainChanged', handleChainChanged);
    };
  }, [selectedChain, requiredChainId]);

  return {
    isModalOpen,
    closeModal: () => setIsModalOpen(false),
    openModal: () => setIsModalOpen(true),
    requiredChainId
  };
}
