/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { useWallets } from '@privy-io/react-auth';
import votingSlotAbi from "../../abis/VotingSlot.json"
import toast from 'react-hot-toast';
import { createWalletClient, custom } from 'viem';
import { publicClient } from '../../config';
import { useChain } from '../../context/ChainContext';
import ConfirmVoteModal from '../Modal/ConfirmVoteOption';
import { isAfter, isBefore } from 'date-fns';
import { motion } from "framer-motion";
import { FaVoteYea, FaCheck, FaTimes, FaClock } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

function CountdownTimer({ endDate }: { endDate: string }) {
  const calculateTimeLeft = () => {
    // Convert endDate to milliseconds (assuming it's in seconds)
    const endTime = parseInt(endDate) * 1000;
    const now = Date.now();

    // Ensure endTime is in the future
    if (endTime <= now) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    // Calculate differences using date-fns
    const days = differenceInDays(endTime, now);
    const hours = differenceInHours(endTime, now) % 24;
    const minutes = differenceInMinutes(endTime, now) % 60;

    return { days, hours, minutes };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  // Check if voting is closed
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return (
      <motion.div
        className="flex items-center gap-2 text-red-400"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaClock />
        <span className="font-orbitron">Voting Closed</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex items-center gap-2 text-cosmic"
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <FaClock />
      <span className="font-orbitron">
        {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
      </span>
    </motion.div>
  );
}

function calculateYesToNoPercentage(yesVotes: number, noVotes: number) {
  if (yesVotes === 0 && noVotes === 0) return 0;
  const total = yesVotes + noVotes;
  return Math.round((yesVotes / total) * 100);
}

// The createViemWalletClient function will be defined inside the component

function ProposalCard({ item, refetch }: any) {
  const { publicClient } = useChain();

  // Add this function to create wallet client
  const createViemWalletClient = () => {
    return createWalletClient({
      chain: publicClient.chain,
      transport: custom(window.ethereum)
    });
  };

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [voteOption, setVoteOption] = useState<"yes" | "no" | "">("")
  const [voting, setVoting] = useState<boolean>(false)
  const yesVotesPercentage = calculateYesToNoPercentage(Number(item.positiveVoteWeight), Number(item.negativeVoteWeight))
  const { wallets } = useWallets();
  const wallet = wallets[0];

  const handleVote = async () => {
    // await wallet.switchChain(sonic.id)
    try {
      setVoting(true)
      const walletClient = createViemWalletClient();
      const [account] = await walletClient.getAddresses();

      if (!account) {
        toast("Connect Wallet");
        setVoting(false)
        return;
      }


      const startDate = parseInt(item.voteStartDate) * 1000;
      const endDate = parseInt(item.voteEndDate) * 1000;
      const now = Date.now();

      if (isBefore(now, startDate)) {
        toast("Voting hasn't started yet")
        return;
      }

      if (isAfter(now, endDate)) {
        toast("Voting has ended");
        return;
      }

      const { request: simTransaction } = await publicClient.simulateContract({
        address: item.contractAddress,
        abi: votingSlotAbi,
        functionName: "voteYes",
        account,
        args: []
      })

      console.log("Simulate Transaction", simTransaction)

      const hash = await walletClient.writeContract(simTransaction);

      console.log(hash)

      toast.success('Vote submitted successfully!');
      refetch();
    } catch (error) {
      console.error('Voting failed:', error);
      toast.error('Voting failed. Please try again.');
    } finally {
      setVoting(false)
    }
  };

  const handleVoteOption = (voteType: 'yes' | 'no') => {
    setVoteOption(voteType);
    setShowConfirmModal(true)
  }

  const handleCloseConfirm = () => {
    setShowConfirmModal(false)
  }





  return (
    <motion.div
      className="sci-fi-panel border border-cosmic/30 p-6 rounded-lg relative"
      whileHover={{ scale: 1.02, borderColor: "rgba(108, 92, 231, 0.5)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

      {showConfirmModal &&
        <ConfirmVoteModal
          voteSelection={voteOption}
          onConfirm={handleVote}
          onClose={handleCloseConfirm}
          loading={voting}
          voteTitle={item.name}
        />
      }

      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="flex items-center gap-3"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Replace image with icon */}
          <motion.div
            className="bg-cosmic/20 p-3 rounded-full"
            animate={{
              boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SiSolana className="text-2xl text-cosmic" />
          </motion.div>

          <motion.div
            className="relative px-3 py-1 overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <span className="absolute inset-0 w-full h-full bg-cosmic/20 rounded-md"></span>
            <span className="relative text-sm font-orbitron text-cosmic">Active Proposal</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.h3
        className="text-2xl font-bold font-orbitron mb-3"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {item.name}
      </motion.h3>

      <motion.p
        className="text-gray-300 font-space mb-4 text-sm"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {item.description}
      </motion.p>

      <motion.div
        className="flex items-center justify-between mb-4 bg-deepspace/30 p-3 rounded-lg border border-cosmic/20"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="text-gray-300 font-space text-sm">Voting closes:</span>
        <CountdownTimer endDate={item.voteEndDate} />
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-3 mb-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          onClick={() => handleVoteOption('yes')}
          className="bg-gradient-to-r from-green-500/80 to-green-600 h-[45px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md"
          whileHover={{
            boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)",
            y: -1
          }}
          whileTap={{ y: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaCheck className="text-white" />
          </motion.div>
          <span>YES</span>
        </motion.button>

        <motion.button
          onClick={() => handleVoteOption('no')}
          className="bg-gradient-to-r from-red-500/80 to-red-600 h-[45px] flex items-center justify-center gap-2 font-orbitron text-white rounded-md"
          whileHover={{
            boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
            y: -1
          }}
          whileTap={{ y: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaTimes className="text-white" />
          </motion.div>
          <span>NO</span>
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300 font-space text-sm">Current Results:</span>
          <span className="text-cosmic font-orbitron">Yes: {yesVotesPercentage}%</span>
        </div>

        <div className="h-2 w-full rounded-full bg-deepspace/50 overflow-hidden border border-cosmic/20">
          <motion.div
            className="h-full bg-cosmic rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${yesVotesPercentage}%` }}
            transition={{ duration: 1, delay: 0.6 }}
          ></motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProposalCard;
