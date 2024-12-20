import React from 'react'

import { Link } from "react-router-dom";
import { IoWalletSharp } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";

function Navbar() {
  const [show, setShow] = React.useState(false);
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
    <div className="flex items-center font-space relative justify-between p-0  lg:p-[20px_40px] text-white">
      <div className="pl-[20px] py-[15px] lg:p-0">
        <Link to="/">
          <img src="/derhex-logo-sm.svg" className="hidden lg:block" alt="" />
          <img src="/der-mob.svg" className="block lg:hidden" alt="" />
        </Link>
      </div>
      <div className="hidden lg:flex items-center text-[#848895] space-x-[20px]">
        {links.map((link, index) => (
          <Link to={link.link} key={index}>{link.title}</Link>
        ))}
      </div>
      <div className="flex items-center space-x-[10px] lg:space-x-[20px] pr-[20px] py-[15px] lg:p-0">
        <button className="hidden lg:flex items-center space-x-[5px]">
            <img src="/ido.svg" alt="" />
          <p>Join IDO</p>
        </button>
       
        <button className="bg-primary flex items-center space-x-[5px] p-[10px] lg:p-[10px_20px] rounded-[8px] font-[500]">
          <IoWalletSharp className="text-[12px] lg:text-[16px]" />
          <p className="text-[12px] lg:text-[16px]">Connect Wallet</p>
        </button>
        <button onClick={()=> setShow(!show)} className="lg:hidden">
        <HiMenuAlt3 className="text-[30px]" />
        </button>
      </div>
      <div className={`${show ? "left-0" : "left-[-100%]"} fixed top-0 min-h-screen h-screen z-30 bg-black text-primary w-full p-[20px] transition-all duration-300`}>
        <div className='flex items-center justify-end'>
          <button className='h-[40px] w-[40px] border' onClick={()=> setShow(!show)}></button>
        </div>
      <div className="flex flex-col mt-[20px] items-start space-y-[20px] text-[#848895] ">
        {links.map((link, index) => (
          <Link to={link.link} key={index}>{link.title}</Link>
        ))}
      </div>
        
      </div>
    </div>
  );
}

export default Navbar;
