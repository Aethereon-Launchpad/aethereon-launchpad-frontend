// import React from 'react'

import { ReactNode, useEffect } from "react"
import Topbar from "../components/Global/Topbar"
import Navbar from '../components/Global/Navbar'
import Footer from "../components/Global/Footer"
import { useWallets, usePrivy } from '@privy-io/react-auth';
import toast from "react-hot-toast";


function Layout({ children }: { children: ReactNode }) {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();

  // useEffect(() => {
  //   if (authenticated) {
  //     if (wallets.length !== 0) {
  //       const wallet = wallets[0];
  //       const info = wallet.chainId;
  //       const id = info.split(":")[1]
  //       if (id !== "57054") {
  //         toast("Please connect your wallet to Sonic Chain Testnet")
  //       }
  //     }
  //   }

  // }, [authenticated, wallets])


  return (
    <div className="bg-[#000000]">
      <Topbar />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout