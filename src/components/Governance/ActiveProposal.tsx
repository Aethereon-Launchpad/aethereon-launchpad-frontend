// import React from 'react'

import ProposalCard from "../Global/ProposalCard";
import { useQuery } from "@apollo/client";
import { GET_VOTES } from "../../graphql/queries";
import { Preloader, ThreeDots } from 'react-preloader-icon';

function ActiveProposal() {
  const { loading, error, data, refetch } = useQuery(GET_VOTES);

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

  if (error) {
    return <div className="text-red-500 text-center">Error loading proposals: {error.message}</div>;
  }

  const votingSlots = data?.votingSlots || [];

  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space flex items-center flex-col text-white my-[40px]">
      <div className="flex flex-col w-[90%]">
        <p className="text-[32px] font-[500]">Active Proposals</p>
        <p className="text-[18px]">Vote on important platform decisions and help shape the future of DerHex.</p>

        <div className="grid grid-cols-3 items-center overflow-scroll scrollbar-hide gap-[40px] mt-[40px]">
          {votingSlots.length > 0 ? (
            votingSlots.map((slot: any) => (
              <ProposalCard key={slot.id} item={slot} refetch={refetch} />
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