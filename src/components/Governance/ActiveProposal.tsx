// import React from 'react'

import ProposalCard from "../Global/ProposalCard";
import { useQuery } from "@apollo/client";
import { GET_VOTES } from "../../graphql/queries";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { getVotingSlotData } from "../../utils/web3/actions";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

function ActiveProposal() {
  const { authenticated } = usePrivy();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<{ message: string }>({ message: "" });
  // const {loading, error, data, refetch} = useQuery(GET_VOTES, {
  //   context: {clientName: 'voting' }
  // });



  useEffect(() => {
    getAllVotingData()
  }, [authenticated])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Preloader
          use={ThreeDots}
          size={60}
          strokeWidth={6}
          strokeColor="#5325A9"
          duration={2000}
        />
      </div>
    );
  }

  async function getAllVotingData() {
    setLoading(true)
    try {
      const votingSlotData = await getVotingSlotData();
      console.log(votingSlotData)
      setData(votingSlotData)
    } catch (error) {
      console.error(error)
      setError((prevError) => ({ ...prevError, message: "Failed to retrieve voting slot data" }))
    } finally {
      setLoading(false)
    }
  }

  if (error.message) {
    return <div className="text-red-500 text-center">Error loading proposals: {error.message}</div>;
  }

  const votingSlots = data;

  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space flex items-center flex-col text-white my-[40px]" id="currentProposals">
      <div className="flex flex-col w-[90%]">
        <p className="text-[32px] font-[500]">Active Proposals</p>
        <p className="text-[18px]">Vote on important platform decisions and help shape the future of DerHex.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-[40px] mt-[40px]">
          {votingSlots.length > 0 ? (
            votingSlots.map((slot: any) => (
              <ProposalCard key={slot.id} item={slot} refetch={getAllVotingData} />
            ))
          ) : (
            <p className="text-gray-400">No active proposals available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveProposal