import { useState } from 'react';
import { useChain, supportedChains } from '../../context/ChainContext';
import { FaChevronDown } from 'react-icons/fa6';
import CurrentChain from '../Presale/CurrentChain';
import { getChainName, setCurrentChainId, CHAIN_ID } from '../../utils/source';
import { toast } from 'react-hot-toast';
import { clearClientCache } from '../../config/publicClient';

export default function ChainSelector() {
  const { selectedChain, setSelectedChain } = useChain();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChainSelect = (chainId: string) => {
    // Only update if it's a different chain
    if (chainId !== selectedChain) {
      console.log(`Switching chain from ${selectedChain} to ${chainId}`);

      try {
        // Clear the client cache to force new clients to be created
        clearClientCache();

        // Update the global CHAIN_ID directly
        setCurrentChainId(chainId as keyof typeof supportedChains);
        console.log(`Global CHAIN_ID updated to: ${CHAIN_ID}`);

        // Then update the context state
        setSelectedChain(chainId as keyof typeof supportedChains);

        // Show feedback to the user
        toast.success(`Switched to ${getChainName(chainId)}`);
      } catch (error) {
        console.error('Error switching chain:', error);
        toast.error('Failed to switch chain. Please try again.');
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-3 py-2 rounded-lg transition-all duration-300"
      >
        <CurrentChain chainId={selectedChain} />
        <span className="text-sm font-medium">{getChainName(selectedChain)}</span>
        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A1A] rounded-lg shadow-lg z-[100]">
          {Object.keys(supportedChains).map((chainId) => (
            <button
              key={chainId}
              onClick={() => handleChainSelect(chainId)}
              className={`flex items-center gap-2 w-full px-4 py-3 text-left hover:bg-[#2A2A2A] transition-colors duration-200 ${selectedChain === chainId ? 'bg-[#2A2A2A]' : ''
                }`}
            >
              <CurrentChain chainId={chainId} />
              <span className="text-sm font-medium">{getChainName(chainId)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
