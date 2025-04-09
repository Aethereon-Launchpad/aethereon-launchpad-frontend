// import React from 'react'
import { Link } from "react-router-dom";

function Guaranteed() {
  return (
    <div className="p-[40px_20px] justify-center flex items-center w-full lg:p-[40px] font-space text-white">
      <div className="relative w-full lg:w-[90%] p-[20px] lg:p-[50px_40px] grid lg:grid-cols-2 overflow-hidden group">
        {/* Background angled effect */}
        <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-[2px] bg-[#17043B] clip-path-polygon transition-all duration-300"></span>

        <div className="relative">
          <p className="font-[700] text-[32px]">Guaranteed Refunds</p>
          <p className="text-[#C4C4C4] text-[18px] mt-[10px]">
            Participate in token sales with complete confidence. Our guaranteed
            refund policy ensures that if a token sale doesn't meet its goals or
            terms, your funds are promptly returned. No risks, just transparency
            and trust.
          </p>
        </div>
        <div className="relative mt-[20px] lg:mt-0 flex items-center justify-start lg:justify-end">
          <Link
            to="https://timmyweb3.notion.site/DerHex-Documentation-1ba6e8fffcc5801b8a9dc1d73e7b15f9?pvs=4"
            target="_blank"
            className="relative text-white p-[10px_30px] overflow-hidden group-button"
          >
            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
            <span className="relative">Learn More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Guaranteed;
