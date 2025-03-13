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

function SaleCardAdmin({ presale }: any) {
  const navigation = useNavigate();

  // Check if presale is undefined or not loaded
  if (!presale) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  console.log(presale);

  return (
    <div className=" rounded-[10px] overflow-hidden relative bg-[#27272A] transition-all hover:scale-105 duration-1000">
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
              <div className="flex flex-col gap-y-3">
                <Link to={`/launchpad/${presale.id}`} className="text-[#A1A1AA] underline max-w-full" title={presale?.presaleInfo?.description}>
                  View Project Page
                </Link>
                <Link to={`/admin/dashboard/presales/fund/${presale.id}`}
                  target="_blank"
                  className="text-primary underline max-w-full" title={presale?.presaleInfo?.description}>
                  Fund Project
                </Link>
              </div>
            </div>
            <div className="h-[49px] w-[49px]  rounded-full">
              <img src={presale?.presaleInfo?.images?.logo} alt="" />
            </div>
          </div>
          <div className="mt-[10px] flex flex-col w-full space-y-[5px]">
            <div className="flex space-x-[10px] items-center justify-between ">
              <p className="text-[#ACBBCC] flex-1 text-start text-[14px]">
                Token Sale Date
              </p>
              <div className="bg-primary w-[64px]  h-[2px]" />
              <p className="text-[14px] flex-1 text-end text-[#FAFAFA]" title={format(new Date(Number(presale.startTime) * 1000), "dd/MM/yyyy")}>
                {format(new Date(Number(presale.startTime) * 1000), "dd/MM/yyyy")}
              </p>
            </div>
            <div className="flex space-x-[10px] items-center justify-between ">
              <p className="text-[#ACBBCC] text-start flex-1 text-[14px]">
                Sale Starts In
              </p>
              <div className="bg-primary w-[64px] h-[2px]" />
              <CountdownTimer time={presale.startTime} endTime={presale.endTime} key={'sdsdsds'} />
            </div>
            <div className="flex space-x-[10px] items-center justify-between ">
              <p className="text-[#ACBBCC] flex-1 text-start text-[14px]">
                Ticker
              </p>
              <div className="bg-primary w-[64px]  h-[2px]" />
              <p className="text-[14px] flex-1 text-end text-[#FAFAFA]">
                {presale?.saleToken?.symbol}
              </p>
            </div>
          </div>
        </div>
        <Link to={`/admin/dashboard/presales/manage/${presale.id}`} className="bg-[#5325A9] mt-[20px] text-white h-[35px] uppercase flex items-center justify-center cursor-pointer">
          Manage Project
        </Link>
      </div>
    </div>
  );
}

export default SaleCardAdmin;
