// import React from 'react'

import ProposalCard from "../Global/ProposalCard";

function ActiveProposal() {
    const items = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
      }));

  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space flex items-center flex-col text-white my-[40px]">
      <div className="flex flex-col w-[90%]">
      <p className="text-[32px] font-[500]">Active Proposals</p>
      <p className="text-[18px]">Vote on important platform decisions and help shape the future of DerHex.</p>

      <div className="flex items-center overflow-scroll scrollbar-hide gap-[40px] mt-[40px]">
        {items.map((item) => (
            <ProposalCard item={item}/>
        ))}
      </div>
      </div>
    </div>
  )
}

export default ActiveProposal