import { useState, useEffect } from 'react';
import { useChain, supportedChains } from '../../context/ChainContext';
import { useWallets } from '@privy-io/react-auth';
import { toast } from 'react-hot-toast';
import CurrentChain from '../Presale/CurrentChain';
import { getChainName, setCurrentChainId } from '../../utils/source';

interface NetworkSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredChainId: string;
}

export default function NetworkSwitchModal({ isOpen, onClose, requiredChainId }: NetworkSwitchModalProps) {
  const { selectedChain, setSelectedChain } = useChain();
  const { wallets } = useWallets();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(wallets && wallets.length > 0);
  }, [wallets]);

  if (!isOpen) return null;

  const handleAddNetwork = async () => {
    try {
      if (!wallets || wallets.length === 0) {
        toast.error('Please connect your wallet first');
        return;
      }

      const wallet = wallets[0];
      const chain = supportedChains[requiredChainId as keyof typeof supportedChains].viemChain;

      try {
        // Request the wallet to switch to the network
        await wallet.switchChain(chain.id);
        console.log(`Successfully switched wallet to chain ID: ${chain.id}`);
      } catch (switchError: any) {
        // If the chain hasn't been added to the wallet yet, try to add it
        if (switchError.code === 4902 || switchError.message.includes('Unrecognized chain')) {
          try {
            console.log(`Chain not found in wallet, attempting to add it...`);
            // Add the network to the wallet
            // This method doesn't exist in the current Privy version
            // We'll need to handle this differently
            console.log('Adding chain not supported in this wallet version');



            // Try switching again after adding
            await wallet.switchChain(chain.id);
            console.log(`Successfully added and switched to chain ID: ${chain.id}`);
          } catch (addError: any) {
            throw new Error(`Failed to add network: ${addError.message}`);
          }
        } else {
          throw switchError;
        }
      }

      // Update the global CHAIN_ID directly
      setCurrentChainId(requiredChainId as keyof typeof supportedChains);

      // Update the context state
      setSelectedChain(requiredChainId as keyof typeof supportedChains);

      toast.success(`Switched to ${getChainName(requiredChainId)}`);
      onClose();
    } catch (error: any) {
      console.error('Failed to switch network:', error);
      toast.error(`Failed to switch network: ${error.message || 'Unknown error'}`);
    }
  };

  const handleSwitchInApp = () => {
    try {
      // Just switch the app's chain without changing the wallet
      setCurrentChainId(requiredChainId as keyof typeof supportedChains);

      // Update the context state
      setSelectedChain(requiredChainId as keyof typeof supportedChains);

      // Show feedback to the user
      toast.success(`Switched to ${getChainName(requiredChainId)}`);

      onClose();
    } catch (error) {
      console.error('Error switching chain in app:', error);
      toast.error('Failed to switch chain. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1A1A1A] rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Network Mismatch</h2>

        <div className="mb-6">
          <p className="mb-4">
            This application requires you to be on the {getChainName(requiredChainId)} network, but you are currently on {getChainName(selectedChain)}.
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Current:</span>
              <CurrentChain chainId={selectedChain} />
              <span className="text-sm">{getChainName(selectedChain)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Required:</span>
              <CurrentChain chainId={requiredChainId} />
              <span className="text-sm">{getChainName(requiredChainId)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {isConnected && (
            <button
              onClick={handleAddNetwork}
              className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Switch Network in Wallet
            </button>
          )}

          <button
            onClick={handleSwitchInApp}
            className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white py-2 px-4 rounded-lg transition-colors"
          >
            Switch Only in App
          </button>

          <button
            onClick={onClose}
            className="bg-transparent border border-gray-600 hover:bg-[#2A2A2A] text-white py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
