import { getPublicClient, clearClientCache } from "../../config/publicClient";
import { CHAIN_ID } from "../source";

/**
 * Helper function to get the public client
 * This ensures that all web3 utilities use the same client instance
 * and that the client is always up-to-date with the selected chain
 */
// Keep track of the last chain ID used
let lastChainId: string | null = null;

export function getClient() {
  try {
    // Check if the chain has changed
    if (lastChainId !== CHAIN_ID) {
      console.log(`Chain changed from ${lastChainId || 'initial'} to ${CHAIN_ID}, getting new client`);
      // Clear the client cache when the chain changes
      clearClientCache();
      lastChainId = CHAIN_ID;
    }

    // Get the client for the current chain
    return getPublicClient();
  } catch (error) {
    console.error('Error getting client:', error);
    // If there's an error, clear the cache and try again
    clearClientCache();
    lastChainId = null;
    return getPublicClient();
  }
}
