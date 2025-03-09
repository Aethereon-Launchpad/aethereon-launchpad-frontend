// import React from 'react'

import { useNavigate } from "react-router-dom";
import SaleCard from "../Global/SaleCard";
import { usePresale } from "../../hooks/web3/usePresale";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useEffect } from "react";
import { getAllPresaleData } from "../../utils/web3/presale";

function FeaturedIdo() {
  const navigation = useNavigate()
  // const { data, error, loading } = usePresale();

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-[200px]">
  //       <Preloader
  //         use={ThreeDots}
  //         size={60}
  //         strokeWidth={6}
  //         strokeColor="#5325A9"
  //         duration={2000}
  //       />
  //     </div>
  //   );
  // }

  useEffect(() => {
    async function getIDOs() {
      const data = await getAllPresaleData();
      console.log(data)
    }


    getIDOs();
  }, [])


  return (
    <div className="p-[40px_20px] font-space lg:p-[40px] mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center">
        <p className="text-[25px] lg:text-[32px] text-[#FAFAFA]">
          Featured Upcoming IDO Sales
        </p>
        <p className="text-[14px] lg:text-[19px] text-[#A1A1AA]">
          Don’t Miss Out on the Next Big Project!
        </p>
      </div>
      <div className="grid gap-[40px] sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 mt-[40px]">
        {Array.from({ length: 1 }).map((_, i) => (
          <SaleCard key={i} />
        ))}
      </div>
      <button onClick={() => navigation("/explore")} className="text-[#FAFAFA] mt-[50px] rounded-full border border-[#98AAC033] p-[8px_20px]">
        Explore more IDO’s
      </button>
    </div>
  );
}

export default FeaturedIdo;
