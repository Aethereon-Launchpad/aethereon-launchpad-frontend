import providers from "../chains.json";

/**
 * Retrieves the RPC URL for a given chain symbol
 * @param {string} symbol - The chain symbol to search for (e.g. "BNB", "BRISE")
 * @returns {string|null} The RPC URL for the chain, or null if not found
 */
export function getRpcUrlBySymbol(symbol) {
  for (const key in providers) {
    if (providers[key].symbol === symbol) {
      return providers[key].rpcUrl;
    }
  }
  return null; // Return null if symbol is not found
}

/**
 * Retrieves the chain ID in hexadecimal format for a given chain symbol
 * @param {string} symbol - The chain symbol to search for (e.g. "BNB", "BRISE")
 * @returns {string|null} The chain ID in hexadecimal format, or null if not found
 */
export function getChainHexBySymbol(symbol) {
  for (const key in providers) {
    if (providers[key].symbol === symbol) {
      return providers[key].chain_id.hex;
    }
  }
  return null;
}
