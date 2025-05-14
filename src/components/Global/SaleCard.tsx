/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../Countdown";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useState, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import CurrentChain from "../Presale/CurrentChain";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { FaRocket, FaExternalLinkAlt } from "react-icons/fa";
import { GiStarFormation } from "react-icons/gi";

function SaleCard({ presale }: any) {
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
          <SiSolana className="text-4xl text-cosmic" />
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
  // const hardCap = parseFloat(presale.hardCap || "0");
  // const progress = (totalRaised / hardCap) * 100;

  return (
    <motion.div
      className="overflow-hidden relative bg-deepspace/30 border-t border-l border-r border-cosmic/20"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 25px rgba(108, 92, 231, 0.4)",
        borderColor: "rgba(108, 92, 231, 0.5)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => navigation(`/deals/launchpad/${presale.presaleInfo.projectName.toLowerCase()}`)}
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

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
            {presale.isPrivateSale ? "Standard IDO" : "Public IDO"}
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
              {presale.presaleInfo.hiddenData && presale.presaleInfo.hiddenData.startTime === "TBA" ? (
                <motion.span
                  className="text-cosmic font-orbitron text-sm"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Coming Soon
                </motion.span>
              ) : (
                <CountdownTimer
                  time={presale.startTime}
                  endTime={presale.endTime}
                  delayTime={Number(presale.endTime) + Number(presale.withdrawDelay)}
                />
              )}
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
                {presale.presaleInfo.hiddenData && presale.presaleInfo.hiddenData.tokenPrice === "TBA"
                  ? "TBA"
                  : `$${presale.salePrice}`
                }
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 font-space">Hard Cap</p>
              <p className="text-white font-orbitron">
                {Number(presale.hardCap).toLocaleString()} {presale.paymentToken?.symbol}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400 font-space">Participants</p>
              <p className="text-white font-orbitron">
                {presale.purchaserCount ? presale.purchaserCount : 0}
              </p>
            </div>
          </div>

          {/* Additional metrics */}
          {(presale.presaleInfo.hiddenData && (
            presale.presaleInfo.hiddenData.IMC ||
            presale.presaleInfo.hiddenData.totalIMC ||
            presale.presaleInfo.hiddenData.fdv
          )) && (
              <div className="border-t border-cosmic/10 pt-2 mt-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {presale.presaleInfo.hiddenData.IMC && (
                    <div className="space-y-1">
                      <p className="text-gray-400 font-space flex items-center gap-1">
                        IMC <span className="text-xs text-cosmic">ⓘ</span>
                      </p>
                      <p className="text-white font-orbitron">
                        {presale.presaleInfo.hiddenData.IMC === "TBA"
                          ? "TBA"
                          : `$${Number(presale.presaleInfo.hiddenData.IMC).toLocaleString()}`
                        }
                      </p>
                    </div>
                  )}

                  {presale.presaleInfo.hiddenData.totalIMC && (
                    <div className="space-y-1">
                      <p className="text-gray-400 font-space flex items-center gap-1">
                        Total IMC <span className="text-xs text-cosmic">ⓘ</span>
                      </p>
                      <p className="text-white font-orbitron">
                        {presale.presaleInfo.hiddenData.totalIMC === "TBA"
                          ? "TBA"
                          : `$${Number(presale.presaleInfo.hiddenData.totalIMC).toLocaleString()}`
                        }
                      </p>
                    </div>
                  )}

                  {presale.presaleInfo.hiddenData.fdv && (
                    <div className="space-y-1">
                      <p className="text-gray-400 font-space flex items-center gap-1">
                        FDV <span className="text-xs text-cosmic">ⓘ</span>
                      </p>
                      <p className="text-white font-orbitron">
                        {presale.presaleInfo.hiddenData.fdv === "TBA"
                          ? "TBA"
                          : `$${Number(presale.presaleInfo.hiddenData.fdv).toLocaleString()}`
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
        </motion.div>
      </div>

      {/* Join button - Updated with non-angled design */}
      <motion.button
        onClick={() => navigation(`/deals/launchpad/${presale.presaleInfo.projectName.toLowerCase()}`)}
        className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white border-t border-cosmic/30"
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
          <FaRocket className="text-white" />
        </motion.div>
        <span>Join IDO</span>
      </motion.button>
    </motion.div>
  );
}

export default SaleCard;
