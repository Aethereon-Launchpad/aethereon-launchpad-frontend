// import React from 'react'

import NftCard from "../Global/NftCard";

function SeasonNfts() {
    const items = Array.from({ length: 4 }, (_, index) => ({
        id: index + 1,
        name: `Item ${index + 1}`,
      }));
  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space text-white flex flex-col items-center w-full">
        <p className="text-[30px] text-center lg:text-[50px] text-white">Win Exclusive NFTs!</p>
        <p className="text-[16px] leading-[22px] text-center">Compete in the seasonal challenge and unlock rare collectibles. The <br className="hidden lg:block" /> rarer the NFT, the greater the bragging rights!</p>

        {/* ultr-rare */}
        <div className="flex flex-col items-start w-full mt-[50px]">
            <p className="font-[500] text-[25px] lg:text-[30px] leading-[30px] lg:leading-[35px]">Special edition NFTs for the top 10 participants.</p>

            <div className="flex scrollbar-hide items-center w-full overflow-scroll lg:grid lg:grid-cols-4 gap-[20px] mt-[30px]">
                {items.map((item, index) => (
                    <NftCard item={item} key={index}/>
                ))}
            </div>
        </div>
        {/* ultr-rare */}
        <div className="flex flex-col items-start w-full mt-[50px]">
            <p className="font-[500] text-[25px] lg:text-[30px] leading-[30px] lg:leading-[35px]">NFTs for Eligible Participants</p>

            <div className="flex scrollbar-hide items-center w-full overflow-scroll lg:grid lg:grid-cols-4 gap-[20px] mt-[30px]">
                {items.map((item, index) => (
                    <NftCard item={item} key={index}/>
                ))}
            </div>
        </div>
        {/* ultr-rare */}   
        <div className="flex flex-col items-start w-full mt-[50px]">
            <p className="font-[500] text-[25px] lg:text-[30px] leading-[30px] lg:leading-[35px]">Ultra-rare NFTs awarded to the top 3 stakers</p>

            <div className="flex scrollbar-hide items-center w-full overflow-scroll lg:grid lg:grid-cols-4 gap-[20px] mt-[30px]">
                {items.map((item, index) => (
                    <NftCard item={item} key={index}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default SeasonNfts