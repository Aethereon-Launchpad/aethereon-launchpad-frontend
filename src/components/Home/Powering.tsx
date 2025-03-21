// import React from 'react'
import { Link } from "react-router-dom";

const chains: string[] = [
  "/icons/blockchain/eth.svg",
  "/icons/blockchain/binance.svg",
  "/icons/blockchain/polygon.svg",
  "/icons/blockchain/avalanche.svg",
  "/icons/blockchain/sonic.svg"
]

function Powering() {
  return (
    <div className="p-[40px_20px] font-space flex flex-col items-center justify-center lg:p-[40px]">
      <div className="flex flex-col items-center justify-center py-[40px]">
        <p className="uppercase text-primary text-center">
          Supported Blockchains
        </p>
        <div className="flex flex-col lg:flex-row items-center space-y-[30px] lg:space-y-0 lg:space-x-[50px] mt-[20px] gap-[20px]">
          {chains.map((chain, index) => {
            return (
              <img
                src={chain}
                alt=""
                key={index}
                className="w-[40px] h-[40px] object-contain hover:scale-110 transition-transform duration-200 filter brightness-0 invert"
              />
            )
          })}
        </div>
      </div>
      <div className="w-full lg:w-[80%] grid lg:grid-cols-2 text-white gap-[20px] lg:gap-0 mt-[50px] rounded-[10px] overflow-hidden">
        <div className="w-full ">
          <img src="/eye.svg" className="rounded-[10px] lg:rounded-none min-h-full h-full object-cover  " alt="" />
        </div>
        <div className="bg-[#17043B] rounded-[10px] lg:rounded-r-[10px] p-[20px] lg:p-[40px]">
          <img src="/derhex-logo-sm.svg" className="h-[50px]" alt="" />
          <p className="text-[32px] text-[#FAFAFA] leading-[35px] mt-[20px]">
            How to Participate in <br className="hidden lg:block" /> Derhex IDO
          </p>
          <p className="text-[#C4C4C4] mt-[20px]">
            A good place to start is: what is Derhex? (We'll give you the brief
            version).Derhex is a platform that connects young projects with
            early community members through initial decentralized offerings or
            IDOs.…
          </p>
          <Link to="/https://timmyweb3.notion.site/DerHex-Documentation-1ba6e8fffcc5801b8a9dc1d73e7b15f9?pvs=4" className="mt-[20px] text-primary font-[500]" target="_blank">Learn More</Link>
        </div>
      </div>
    </div>
  );
}

export default Powering;
