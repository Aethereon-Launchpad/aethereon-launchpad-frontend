// import React from 'react'

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { format } from "date-fns";
import { CountdownTimer } from "../Countdown";

// interface SaleCardProps {
//   img: string;
//   projectName: string;
//   projectDescription: string;
//   saleStartTime: number;
//   whitelistStatus: boolean;
// }

function SaleCardCompleted({ presale }: any) {
  const navigation = useNavigate();

  if (!presale) {
    return <div>Loading...</div>;
  }

  const totalRaised = parseFloat(presale.totalPaymentReceived);

  return (
    <div className="rounded-[10px] overflow-hidden relative bg-[#27272A] transition-all hover:scale-105 duration-1000">
      <div className="h-[150px] w-full border-b">
        <img
          src={presale?.presaleInfo?.images?.bg}
          className="h-full w-full object-cover"
          alt=""
        />
      </div>

      <div className="absolute top-[8.8rem] w-[80px] left-0 h-[25px] bg-[#291254] z-0">

      </div>
      <div className="h-[88px] w-[88px] rounded-full absolute top-[100px] left-[20px] z-20  border-[#291254] border-[7px] bg-black p-3">
        <img src={presale?.presaleInfo?.images?.logo} className="h-full w-full" alt="" />
      </div>
      <div className="w-full">
        <div className=" text-white w-full items-center flex justify-end">
          <p className="bg-[#291254] uppercase text-[14px] p-[5px_20px] rounded-bl-[5px]">
            Refundable ido
          </p>
        </div>
        <div className="p-[10px_20px] mt-[10px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[28px] font-[500] text-[#FAFAFA]">
                {presale?.presaleInfo?.projectName || "Unknown Project"}
              </p>
              <Link to={`/launchpad/${presale.id}`} className="text-primary underline max-w-full" title={presale?.presaleInfo?.description}>
                {presale.isPrivateSale ? "Private Sale" : "Public Sale"}
              </Link>
            </div>
            <div className="h-[49px] w-[49px]  rounded-full">
              <img src={presale?.presaleInfo?.images?.logo} alt="" />
            </div>
          </div>

          {/* Fundraising Info */}
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#ACBBCC]">Amount Raised</span>
              <span className="text-white">
                {totalRaised.toLocaleString()} {presale.paymentToken.symbol}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#ACBBCC]">Participants</span>
              <span className="text-white">{presale.purchaserCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#ACBBCC]">Status</span>
              <span className="text-white">
                {presale.isSoftCapReached ? 'Success' : 'Failed'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#ACBBCC]">Ended</span>
              <span className="text-white">
                {format(new Date(Number(presale.endTime) * 1000), "dd/MM/yyyy")}
              </span>
            </div>
          </div>
        </div>
        <div onClick={() => navigation(`/launchpad/${presale.id}`)} className="bg-[#5325A9] mt-[20px] text-white h-[35px] uppercase flex items-center justify-center cursor-pointer">
          View Details
        </div>
      </div>
    </div>
  );
}

export default SaleCardCompleted;
