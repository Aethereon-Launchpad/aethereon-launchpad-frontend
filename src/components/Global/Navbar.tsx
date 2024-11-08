// import React from 'react'

import { Link } from "react-router-dom";
import { IoWalletSharp } from "react-icons/io5";

function Navbar() {
  const links = [
    { title: "Launchpad", link: "/launchpad" },
    {
      title: "Staking & Farming",
      link: "/stake-farm",
    },
    {
      title: "Governance",
      link: "/governance",
    },
    {
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "Community",
      link: "/community",
    },
  ];
  return (
    <div className="flex items-center justify-between p-[20px] lg:p-[20px_40px] text-white">
      <div>
        <Link to="/">
          <img src="/derhex-logo-sm.svg" alt="" />
        </Link>
      </div>
      <div className="hidden lg:flex items-center text-[#848895] space-x-[20px]">
        {links.map((link) => (
          <Link to={link.link}>{link.title}</Link>
        ))}
      </div>
      <div className="flex items-center space-x-[20px]">
        <button className="hidden lg:flex items-center space-x-[5px]">
            <img src="/ido.svg" alt="" />
          <p>Join IDO</p>
        </button>
        <button className="bg-primary flex items-center space-x-[5px] p-[10px_20px] rounded-[8px] font-[500]">
          <IoWalletSharp className="text-[20px]" />
          <p>Connect Wallet</p>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
