import React from 'react'

import { Link, useLocation } from "react-router-dom";
import { IoWalletSharp } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { usePrivy } from '@privy-io/react-auth';
import toast from 'react-hot-toast';


function Navbar() {
  const [show, setShow] = React.useState(false);
  const { login, authenticated, logout, user, ready } = usePrivy();
  const location = useLocation();
  // const { connect, isConnecting, error } = useConnect();
  const links = [
    {
      title: "Launchpad",
      link: "/"
    },
    {
      title: "Giveaways",
      link: "/giveaways"
    },
    {
      title: "Staking & Farming",
      link: "/staking-pool",
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
      title: "Lock & Stake",
      link: "/lock-stake",
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.includes(path);
  };

  function handleWalletConnect() {
    if (authenticated) {
      logout();
      toast("Successfully logged out wallet")
      return;
    }

    login();
  }

  return (
    <div className="flex items-center font-space relative justify-between p-0  xl:p-[20px_40px] text-white">
      <div className="pl-[20px] py-[15px] xl:p-0">
        <Link to="/">
          <img src="/derhex-logo-sm.svg" className="hidden lg:block" alt="" />
          <img src="/der-mob.svg" className="block lg:hidden" alt="" />
        </Link>
      </div>
      <div className="hidden xl:flex items-center text-[#848895] space-x-[20px]">
        {links.map((link, index) => (
          <Link
            to={link.link}
            key={index}
            className={`relative hover:text-white transition-colors duration-200 ${isActive(link.link)
              ? "text-white after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-primary after:shadow-[0_0_8px_2px_rgba(83,37,169,0.8)]"
              : ""
              }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center space-x-[10px] lg:space-x-[20px] pr-[20px] py-[15px] lg:p-0">
        <Link to="/explore" className="hidden xl:flex items-center space-x-[5px]">
          <img src="/ido.svg" alt="" />
          <p>Join IDO</p>
        </Link>


        <button
          className="relative px-6 py-2 font-[500] text-white flex items-center space-x-[5px] overflow-hidden group"
          onClick={handleWalletConnect}
        >
          <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
          <span className="absolute inset-[2px] bg-black transition-all duration-300 clip-path-polygon"></span>
          <span className="relative flex items-center space-x-[5px]">
            <IoWalletSharp className="text-[12px] lg:text-[16px]" />
            {authenticated ? (
              <span className='truncate max-w-[100px]'>{user?.wallet?.address}</span>
            ) : (
              <p className="text-[12px] lg:text-[16px]">Connect Wallet</p>
            )}
          </span>
        </button>

        <button onClick={() => setShow(!show)} className="xl:hidden">
          <HiMenuAlt3 className="text-[30px]" />
        </button>
      </div>
      <div className={`${show ? "left-0" : "left-[-100%]"} fixed top-0 min-h-screen h-screen z-30 bg-black text-primary w-full p-[20px] transition-all duration-300`}>
        <div className='flex items-center justify-end'>
          <button className='h-[40px] w-[40px] flex items-center justify-center' onClick={() => setShow(!show)}>
            <LuPlus className='text-[30px] rotate-45' />
          </button>
        </div>
        <div className="flex flex-col mt-[20px] items-start space-y-[20px] text-[#848895] ">
          {links.map((link, index) => (
            <Link
              onClick={() => setShow(!show)}
              className={`text-[20px] font-[500] ${isActive(link.link) ? "text-white" : "text-primary"
                }`}
              to={link.link}
              key={index}
            >
              {link.title}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Navbar;
