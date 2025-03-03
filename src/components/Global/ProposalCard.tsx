/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'
import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { useWallets } from '@privy-io/react-auth';
import votingSlotAbi from "../../abis/VotingSlot.json"
import toast from 'react-hot-toast';
import { createWalletClient, custom } from 'viem';
import { sonic } from 'viem/chains';
import { publicClient } from '../../config';

function CountdownTimer({ endDate }: { endDate: string }) {
  const calculateTimeLeft = () => {
    // Convert endDate to milliseconds (assuming it's in seconds)
    const endTime = parseInt(endDate) * 1000;
    const now = Date.now();

    // Ensure endTime is in the future
    if (endTime <= now) {
      console.error('End time is in the past:', {
        endTime: new Date(endTime).toISOString(),
        now: new Date(now).toISOString()
      });
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

  return (
    <p>
      {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
    </p>
  );
}

function calculateYesToNoPercentage(yesVotes: number, noVotes: number) {
  if (yesVotes === 0 && noVotes === 0) return 0;
  const total = yesVotes + noVotes;
  return Math.round((yesVotes / total) * 100);
}

// Add this function to create wallet client
const createViemWalletClient = () => {
  return createWalletClient({
    chain: sonic,
    transport: custom(window.ethereum)
  });
};

function ProposalCard({ item, refetch }: any) {
  const yesVotesPercentage = calculateYesToNoPercentage(Number(item.positiveVoteWeight), Number(item.negativeVoteWeight))
  const { wallets } = useWallets();
  const wallet = wallets[0];

  const handleVote = async (voteType: 'yes' | 'no') => {
    await wallet.switchChain(sonic.id)
    try {
      const walletClient = createViemWalletClient();
      const [account] = await walletClient.getAddresses();

      if (!account) {
        toast("Connect Wallet");
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
    }
  };

  useEffect(() => {

  }, [])

  return (
    <div className="p-[30px_20px] min-w-[400px] border border-primary rounded-[10px] col-span-1">
      <div className="flex items-center justify-between">
        <img src={item.image} className='
        h-[60px] w-[60px] border rounded-full border-white' alt="" />
        <p className="bg-primary p-[3px_8px] runded-[5px] w-fit text-[12px] rounded-[5px]">
          Submit Vote
        </p>
      </div>
      <p className="font-[500] text-[30px] leading-[35px] mt-[15px]">
        {item.name}
      </p>
      <p className="text-[16px] mt-[10px]">
        {item.description}
      </p>
      <div className="mt-[10px] flex items-center space-x-[5px]">
        <p>Voting closes</p>
        <hr className="w-[100px] bg-white" />
        <CountdownTimer endDate={item.voteEndDate} />
      </div>

      <div className="mt-[10px] flex items-center space-x-[10px]">
        <button
          className="bg-primary p-[4px_8px] rounded-[5px]"
          onClick={() => handleVote('yes')}
        >
          YES
        </button>
        <button
          className="border p-[4px_10px] rounded-[5px]"
          onClick={() => handleVote('no')}
        >
          NO
        </button>
      </div>

      <div className="mt-[15px] flex flex-col items-start space-y-[3px]">
        <p>Progress (Yes: {yesVotesPercentage}%)</p>
        <div className="h-[10px] w-full rounded-full bg-white">
          <div style={{ width: `${yesVotesPercentage}%` }} className="h-full bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ProposalCard;
