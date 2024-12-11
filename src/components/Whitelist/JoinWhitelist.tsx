// import React from 'react'
import { IoWalletSharp } from "react-icons/io5";
import { GoAlert } from "react-icons/go";
function JoinWhitelist() {
  return (
    <div className="text-white font-space flex items-center justify-center p-[40px_20px] lg:py-[80px]">
      <div className="w-full lg:w-[60%] border border-primary p-[20px] lg:p-[40px]">
        <div>
            <p className="text-white text-[16px] mb-[5px]">Whitelist</p>
          <div className="bg-[#291254] rounded-[8px] space-x-[10px] text-white p-[8px] flex items-center">
          <GoAlert className="text-[20px]" />
            <p className="text-[14px] leading-[16px]">
              $HEX is the native token of DerHex, designed to facilitate
              staking, governance, and access to exclusive token sales.
            </p>
          </div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          temporibus cupiditate velit quis aliquam distinctio eos voluptate,
          corporis nesciunt adipisci voluptas unde, ex, error fugit! Non nihil
          iure tenetur tempore?
        </div>
        <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] mt-[20px] w-full justify-center font-[500]">
          <IoWalletSharp className="text-[14px] lg:text-[16px]" />
          <p className="text-[14px] lg:text-[16px]">Connect Wallet to Join</p>
        </button>
      </div>
    </div>
  );
}

export default JoinWhitelist;
