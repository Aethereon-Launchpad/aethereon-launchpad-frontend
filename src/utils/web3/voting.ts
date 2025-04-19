import { getClient } from "./client";
import { ethers } from 'ethers';
import VotingSlotFactory from "../../abis/VotingSlotFactory.json";
import VotingSlot from "../../abis/VotingSlot.json";

export const getAllVotingSlots = async () => {
    const votingSlotFactory = '0xDEb50f80349B5159D058e666134E611C99006b3a';
    try {
        const client = await getClient();
        let addressList: `0x${string}`[] = [];
        let index = 0;

        while (true) {
            try {
                const address: any = await client.readContract({
                    address: votingSlotFactory,
                    abi: VotingSlotFactory,
                    functionName: "allSlots",
                    args: [index]
                });

                if (address) {
                    addressList.push(address);
                    index++;
                } else {
                    break;
                }
            } catch (error) {
                break;
            }
        }

        return addressList;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve voting slots");
    }
};

export const getVotingSlotData = async (votingSlotAddress: `0x${string}`) => {
    try {
        const client = await getClient();
        const [
            name,
            description,
            image,
            voteStartDate,
            voteEndDate,
            maxFreeVotesPerDay,
            stakingPool,
            positiveVoteWeight,
            negativeVoteWeight,
            owner,
            paused
        ] = await Promise.all([
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "name"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "description"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "image"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "voteStartDate"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "voteEndDate"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "maxFreeVotesPerDay"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "stakingPool"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "positiveVoteWeight"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "negativeVoteWeight"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "owner"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: VotingSlot,
                functionName: "paused"
            })
        ]);

        return {
            id: votingSlotAddress,
            name,
            description,
            image,
            voteStartDate: Number(voteStartDate),
            voteEndDate: Number(voteEndDate),
            maxFreeVotesPerDay: Number(maxFreeVotesPerDay),
            stakingPool,
            positiveVoteWeight: Number(positiveVoteWeight),
            negativeVoteWeight: Number(negativeVoteWeight),
            owner,
            paused
        };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve voting slot data");
    }
};

export const getAllVotingSlotsData = async () => {
    try {
        const slots = await getAllVotingSlots();
        const slotsData = await Promise.all(
            slots.map(async (slot) => await getVotingSlotData(slot))
        );
        return slotsData;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve all voting slots data");
    }
}; 