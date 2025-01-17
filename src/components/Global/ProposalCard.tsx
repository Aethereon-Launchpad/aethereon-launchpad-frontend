/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

function ProposalCard({ item }: any) {
    console.log(item)
  return (
    <div className="p-[30px_20px] min-w-[400px] border border-primary rounded-[10px]">
      <div className="flex items-center justify-between">
        <div className="h-[60px] w-[60px] border rounded-full border-white"></div>
        <p className="bg-primary p-[3px_8px] runded-[5px] w-fit text-[12px] rounded-[5px]">
          Submit Vote
        </p>
      </div>
      <p className="font-[500] text-[30px] leading-[35px] mt-[15px]">
        Expand IDO Access Tiers
      </p>
      <p className="text-[16px] mt-[10px]">
        Proposal to create additional access tiers for token sale participants,
        improving inclusion
      </p>
      <div className="mt-[10px] flex items-center space-x-[5px]">
        <p>Voting closes</p>
        <hr className="w-[100px] bg-white" />
        <p>3D 4H 21M</p>
      </div>

      <div className="mt-[10px] flex items-center space-x-[10px]">
        <button className="bg-primary p-[4px_8px] rounded-[5px]">YES</button>
        <button className="border p-[4px_10px] rounded-[5px]">NO</button>
      </div>

      <div className="mt-[15px] flex flex-col items-start space-y-[3px]">
        <p>Progress (Yes: 60%)</p>
        <div className="h-[10px] w-full rounded-full bg-white">
            <div className="h-full w-[60%] bg-primary rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ProposalCard;
