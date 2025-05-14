/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../Countdown";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useState, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { FaTools, FaCog, FaExternalLinkAlt } from "react-icons/fa";
import { GiStarFormation } from "react-icons/gi";


function CurrentChain({ chainId }: { chainId: string }) {
  switch (chainId) {
    case "57054":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          {/* Icon from Web3 Icons by 0xa3k5 - https://github.com/0xa3k5/web3icons/blob/main/LICENCE */}
          <path fill="#FFFFFF" d="m13.836 14.183l.002-.002l-.004.003zm-.002.001c-3.4 1.02-6.213 2.509-7.975 4.252l-.078.078c.469.443.982.84 1.538 1.176l.119-.146a22.5 22.5 0 0 1 6.396-5.36m.393-1.513H3a8.93 8.93 0 0 0 1.874 4.846l.048-.049c1.091-1.075 2.51-2.052 4.223-2.903c1.501-.747 3.224-1.388 5.082-1.894M9.923 5.192A20.9 20.9 0 0 0 21 10.985C20.492 6.493 16.666 3 12.016 3a9.1 9.1 0 0 0-3.467.686c.433.522.897 1.03 1.374 1.507zm-4.064.371c1.762 1.746 4.576 3.233 7.977 4.256A22.7 22.7 0 0 1 8.97 6.144c-.535-.532-1.05-1.1-1.534-1.688l-.119-.146a9 9 0 0 0-1.535 1.175zm4.064 13.244c-.48.477-.942.985-1.374 1.507a9.1 9.1 0 0 0 3.467.686c4.65 0 8.476-3.494 8.984-7.987a20.9 20.9 0 0 0-11.075 5.793zm-.78-9.375v.002c-1.711-.852-3.13-1.83-4.22-2.903l-.05-.048A8.93 8.93 0 0 0 3 11.328h11.225c-1.857-.506-3.579-1.147-5.082-1.896" />
        </svg>
      )
  }
}


function SaleCardAdmin({ presale }: any) {
  const navigation = useNavigate();
  const [currentChain, setCurrentChain] = useState<string>("57054")
  const { wallets } = useWallets();
  const { authenticated } = usePrivy();

  useEffect(() => {
    if (authenticated) {
      if (wallets.length !== 0) {
        const wallet = wallets[0];
        const info = wallet.chainId;
        const id = info.split(":")[1];
        setCurrentChain(id);
      }
    }
  }, [authenticated, wallets]);


  if (!presale) {
    return (
      <motion.div
        className="overflow-hidden relative bg-deepspace/30 border border-cosmic/20 h-[400px] flex items-center justify-center"
        animate={{
          boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'],
          borderColor: ['rgba(108, 92, 231, 0.2)', 'rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0.2)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <FaCog className="text-4xl text-cosmic" />
          <motion.div
            className="absolute -top-1 -right-1 text-xs text-skyblue"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <GiStarFormation />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  const totalRaised = parseFloat(presale.totalPaymentReceived || "0");
  const hardCap = parseFloat(presale.hardCap || "0");
  const progress = (totalRaised / hardCap) * 100;

  return (
    <motion.div
      className="overflow-hidden relative bg-deepspace/30 border border-cosmic/20 rounded-lg"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 25px rgba(108, 92, 231, 0.4)",
        borderColor: "rgba(108, 92, 231, 0.5)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => navigation(`/admin/dashboard/presales/manage/${presale.presaleInfo.projectName.toLowerCase()}`)}
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

      {/* Admin badge */}
      <motion.div
        className="absolute top-2 left-2 bg-cosmic/80 px-3 py-1 z-30 clip-path-polygon"
        animate={{
          boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div className="flex items-center gap-1">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <FaCog className="text-xs text-white" />
          </motion.div>
          <span className="font-orbitron text-xs">Admin</span>
        </motion.div>
      </motion.div>

      {/* Background image with overlay */}
      <div className="h-[150px] w-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-cosmic/20 to-deepspace/80 z-10"
          whileHover={{ opacity: 0.7 }}
        ></motion.div>

        <motion.img
          src={presale?.presaleInfo?.images?.bg}
          className="h-full w-full object-cover"
          alt={presale?.presaleInfo?.projectName}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="absolute top-0 right-0 bg-cosmic/80 px-4 py-1 text-white z-20 clip-path-polygon"
          whileHover={{ backgroundColor: "rgba(108, 92, 231, 1)" }}
        >
          <motion.span
            animate={{ textShadow: ['0 0 0px rgba(255, 255, 255, 0)', '0 0 10px rgba(255, 255, 255, 0.5)', '0 0 0px rgba(255, 255, 255, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-orbitron text-sm"
          >
            {presale.isPrivateSale ? "Standard IDO" : "Giveaway"}
          </motion.span>
        </motion.div>
      </div>

      {/* Project logo with animation */}
      <div className="relative">
        <motion.div
          className="h-[80px] w-[80px] absolute -top-10 left-4 z-20 border-cosmic border-[3px] bg-deepspace/90 p-2 rounded-full overflow-hidden"
          whileHover={{ scale: 1.05, borderColor: "rgba(108, 92, 231, 1)" }}
          animate={{
            boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 15px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
          }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          <img src={presale?.presaleInfo?.images?.logo} className="h-full w-full object-contain" alt="" />

          {/* Orbiting element */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center center" }}
          >
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 bg-cosmic/10 p-1 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SiSolana className="text-xs text-cosmic" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Chain indicator */}
        <div className="flex justify-end">
          <motion.div
            className="bg-cosmic/80 clip-path-polygon px-3 py-1"
            whileHover={{ scale: 1.05 }}
          >
            <CurrentChain chainId={currentChain} />
          </motion.div>
        </div>
      </div>

      <div className="p-5 mt-4">
        {/* Project name */}
        <motion.h3
          className="text-2xl font-bold text-white font-orbitron mb-4"
          whileHover={{ textShadow: "0 0 8px rgba(108, 92, 231, 0.8)" }}
        >
          {presale?.presaleInfo?.projectName || "Unknown Project"}
        </motion.h3>

        {/* Sale details */}
        <motion.div
          className="bg-deepspace/50 p-4 rounded-lg border border-cosmic/20 space-y-3"
          whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
        >
          {/* Status */}
          <div className="flex justify-between items-center mb-2 border-b border-cosmic/10 pb-2">
            <span className="text-skyblue font-space text-sm">Status</span>
            <motion.div
              whileHover={{ scale: 1.05 }}
            >
              <CountdownTimer
                time={presale.startTime}
                endTime={presale.endTime}
                delayTime={Number(presale.endTime) + Number(presale.withdrawDelay)}
              />
            </motion.div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-gray-400 font-space">Total Raise</p>
              <p className="text-white font-orbitron">
                {totalRaised.toLocaleString()} {presale.paymentToken?.symbol}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 font-space">Token Price</p>
              <p className="text-white font-orbitron">
                ${presale.salePrice}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 font-space">Participants</p>
              <p className="text-white font-orbitron">
                {presale.purchaserCount ? presale.purchaserCount : 0}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 font-space">Refund Period</p>
              <p className="text-white font-orbitron">
                {Number(Number(presale.withdrawDelay) / 86400).toFixed(0)}
                {Number(presale.withdrawDelay) / 86400 === 1 ? " Day" : " Days"}
              </p>
            </div>
          </div>

          {/* Additional metrics */}
          <div className="border-t border-cosmic/10 pt-2 mt-2">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-gray-400 font-space flex items-center gap-1">
                  IMC <span className="text-xs text-cosmic">ⓘ</span>
                </p>
                <p className="text-white font-orbitron">
                  ${Number("290000").toLocaleString()}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-gray-400 font-space flex items-center gap-1">
                  Total IMC <span className="text-xs text-cosmic">ⓘ</span>
                </p>
                <p className="text-white font-orbitron">
                  ${Number("1200000").toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Manage button - Updated with non-angled design */}
      <motion.button
        onClick={() => navigation(`/admin/dashboard/presales/manage/${presale.presaleInfo.projectName.toLowerCase()}`)}
        className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white border-t border-cosmic/30 mt-4"
        whileHover={{
          boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)",
          y: -1
        }}
        whileTap={{ y: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, 0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaTools className="text-white" />
        </motion.div>
        <span>Manage Sale</span>
      </motion.button>
    </motion.div>
  );
}

export default SaleCardAdmin;
