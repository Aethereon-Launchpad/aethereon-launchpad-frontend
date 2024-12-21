// import React from 'react'

import { Link } from "react-router-dom";

function Footer() {
  const footerLinks = [
    {
      name: "Lunchpad",
      link: "/lunchpad",
    },
    {
      name: "Staking & Farming",
      link: "/lunchpad",
    },
    {
      name: "Governance",
      link: "/lunchpad",
    },
    {
      name: "Dashboard",
      link: "/lunchpad",
    },
    {
      name: "Community",
      link: "/lunchpad",
    },
  ];
  return (
    <div className="flex flex-col w-full font-space p-[20px] lg:p-[40px]">
      <div className="bg-[#000508] text-white lg:p-[40px] grid lg:grid-cols-2 gap-[40px]">
        <div>
          <img src="/derhex-logo.svg" className="h-[26px] lg:h-[38px]" alt="" />
          <p className="w-full lg:w-[50%] text-[14px] lg:text-[16px] mt-[15px] lg:mt-[25px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat,
            doloremque beatae. Dolorem rerum blanditiis qui quisquam saepe sed,
            neque asperiores eius tempora dolores suscipit quo possimus earum
            expedita sequi ducimus?
          </p>
        </div>
        <div className="grid gap-[30px] lg:gap-0 lg:grid-cols-3">
          <div>
            <p className="text-[16px] font-[600] lg:text-[20px]">Products</p>
            <div className="flex flex-col items-start mt-[10px] lg:mt-[20px] space-y-[10px]">
              {footerLinks.slice(0, 5).map((link, index) => (
                <Link className="text-[14px] lg:text-[16px]" to={link.link} key={index}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[16px] font-[600] lg:text-[20px]">Help</p>
            <div className="flex flex-col items-start mt-[10px] lg:mt-[20px] space-y-[10px]">
              {footerLinks.slice(0, 5).map((link, index) => (
                <Link className="text-[14px] lg:text-[16px]" to={link.link} key={index}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[16px] font-[600] lg:text-[20px]">Community</p>
            <div className="flex flex-col items-start mt-[10px] lg:mt-[20px] space-y-[10px]">
              {footerLinks.slice(0, 5).map((link, index) => (
                <Link className="text-[14px] lg:text-[16px]" to={link.link} key={index}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#797979] mt-[20px] pt-[20px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between text-white">
          <div>loll</div>
          <div>loll</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
