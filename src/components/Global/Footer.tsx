// import React from 'react'

import { Link } from "react-router-dom";

function Footer() {
  const footerLinks = [
    {
      name: "Launchpad",
      link: "/launchpad",
    },
    {
      name: "Staking & Farming",
      link: "/staking-pool",
    },
    {
      name: "Governance",
      link: "/governance",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Community",
      link: "/lunchpad",
    },
    {
      name: "Customer Support",
      link: "/support",
    },
    {
      name: "Terms and Condition",
      link: "/terms",
    },
    {
      name: "Privacy Policy",
      link: "/privacy",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Telegram",
      link: "https://t.me/derhex",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/derhex",
    },
    {
      name: "Facebook",
      link: "https://facebook.com/derhex",
    },
    {
      name: "LinkedIn",
      link: "https://linkedin.com/in/derhex",
    },
  ];

  const footerSocials = [
    {
      url: "https://linkedIn.com",
      img: "/footer/socials/linkedin.svg"
    },
    {
      url: "https://twitter.com",
      img: "/footer/socials/twitter.svg"
    },
    {
      url: "https://instagram.com",
      img: "/footer/socials/ig.svg"
    },
    {
      url: "https://facebook.com",
      img: "/footer/socials/facebook.svg"
    }
  ]
  return (
    <div className="flex flex-col w-full font-space p-[20px] lg:p-[40px]">
      <div className="bg-[#000508] text-white lg:p-[40px] grid lg:grid-cols-2 gap-[40px]">
        <div>
          <img src="/derhex-logo.svg" className="h-[26px] lg:h-[38px]" alt="" />
          <p className="w-full lg:w-[50%] text-[14px] lg:text-[16px] mt-[15px] lg:mt-[25px]">
            Derhex Pad is a leading decentralized fundraising platform on @soniclabs, incubating the next generation of web3 startups, fueled by $D & $S
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
              {footerLinks.slice(5, 9).map((link, index) => (
                <Link className="text-[14px] lg:text-[16px]" to={link.link} key={index}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[16px] font-[600] lg:text-[20px]">Community</p>
            <div className="flex flex-col items-start mt-[10px] lg:mt-[20px] space-y-[10px]">
              {footerLinks.slice(9, footerLinks.length).map((link, index) => (
                <a className="text-[14px] lg:text-[16px]" target="_blank" href={link.link} key={index}>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#797979] mt-[20px] pt-[20px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between text-white">
          <div>Copyright derhex {new Date().getFullYear()}. All Rights Reserved.</div>
          <div className="flex gap-x-8 mt-[20px] lg:mt-0">
            {footerSocials.map((sm: { url: string, img: string }, index: number) => {
              return (
                <Link to={sm.url} key={index}>
                  <img src={sm.img} alt="" />
                </Link>
              )
            })}</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
