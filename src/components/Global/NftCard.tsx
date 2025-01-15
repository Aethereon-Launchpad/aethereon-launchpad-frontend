// import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NftCard({item}: any) {
  console.log(item)
  return (
    <div className="p-[20px] min-w-[350px] rounded-[10px] bg-[#000027]">
      <img src="./nft.svg" className="w-full" alt="" />
      <div className="mt-[20px] w-full">
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-[500]">Ethereal Helm</p>
          <p>🥈 2</p>
        </div>
        <div className="mt-[10px] space-y-[5px]">
          <p className="text-[14px]">A rare artifact of immense power and prestige</p>
          <p className="text-[12px] text-[#F3BA2F]">Awarded to top 3 stakers during the seasonal event</p>
        </div>
        <button className="bg-[#5325A9] text-white mt-[20px] p-[4px_20px] rounded-full">Claim Now</button>
      </div>
    </div>
  )
}

export default NftCard