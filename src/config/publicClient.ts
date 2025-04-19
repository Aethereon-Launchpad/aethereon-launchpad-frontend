import { createPublicClient, http, HttpTransport } from 'viem';
import { chainMapping } from './index';
import { CHAIN_ID } from '../utils/source';

/**
 * Creates a public client for the current chain
 * This function is used by components that don't have access to the context
 * It uses the global CHAIN_ID variable which is kept in sync with the context
 */
// Cache the client instances to avoid unnecessary recreation
const clientCache: Record<string, any> = {};

// Function to clear the client cache
export function clearClientCache() {
  console.log(`Clearing public client cache`);
  Object.keys(clientCache).forEach(key => delete clientCache[key]);
}

export function getPublicClient() {
  // Always use the global CHAIN_ID which is kept in sync with the context
  const currentChainId = CHAIN_ID;
  console.log(`getPublicClient: Using chain ID ${currentChainId}`);

  // Check if we already have a client for this chain
  if (!clientCache[currentChainId]) {
    // Log for debugging
    console.log(`Creating new public client for chain: ${currentChainId}`);

    try {
      // Create a custom HTTP transport with improved retry logic
      const customHttpTransport = http(undefined, {
        retryCount: 5, // Increased from 3 to 5
        retryDelay: 1000, // Base delay of 1 second (will use exponential backoff automatically)
        timeout: 30000, // 30 second timeout (increased from default)
      });

      // Create a new client and cache it
      clientCache[currentChainId] = createPublicClient({
        chain: chainMapping[currentChainId],
        transport: customHttpTransport,
        batch: {
          multicall: true
        },
        pollingInterval: 4000, // Increase polling interval to reduce requests
      });
    } catch (error) {
      console.error(`Error creating public client for chain ${currentChainId}:`, error);
      // Fallback to default chain
      if (currentChainId !== "11155931") {
        console.log(`Falling back to default chain (Rise Testnet)`);
        return getPublicClient();
      }
      throw error;
    }
  } else {
    console.log(`Using cached public client for chain: ${currentChainId}`);
  }

  // Return the client for the current chain
  return clientCache[currentChainId];
}
