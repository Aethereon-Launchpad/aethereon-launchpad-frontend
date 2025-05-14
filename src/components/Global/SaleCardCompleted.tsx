import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../Countdown";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import CurrentChain from "../Presale/CurrentChain";
import { motion } from "framer-motion";
import { SiSolana } from "react-icons/si";
import { FaCheckCircle, FaExternalLinkAlt, FaHistory } from "react-icons/fa";
import { GiStarFormation } from "react-icons/gi";

function SaleCardCompleted({ presale }: any) {
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
          <FaHistory className="text-4xl text-cosmic" />
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
      className="overflow-hidden relative bg-deepspace/30 border-t border-l border-r border-cosmic/20"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 25px rgba(108, 92, 231, 0.4)",
        borderColor: "rgba(108, 92, 231, 0.5)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => navigation(`/launchpad/${presale.presaleInfo.projectName.toLowerCase()}`)}
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

      <div className="w-full">

        <div className="p-[20px] mt-[10px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[28px] font-[500] text-[#FAFAFA]">
                {presale?.presaleInfo?.projectName || "Unknown Project"}
              </p>
            </div>
          </div>

          {/* Countdown Timer Section */}
          {/* <div className="mt-4 flex space-x-[10px] items-center justify-between">
            <p className="text-[#ACBBCC] text-start flex-1 text-[14px]">
              Sale Starts In
            </p>
            <div className="bg-primary w-[64px] h-[2px]" />
            <PresaleCountdownTimer time={presale.startTime} />
          </div> */}

          <div className="mt-6 space-y-4">
            {/* Progress Bar */}
            {/* <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#ACBBCC]">Progress</span>
                <span className="text-white">{progress.toFixed(2)}%</span>
              </div>
              <div className="h-2 w-full bg-[#3F3F46]">
                <div
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  className="h-full bg-primary transition-all"
                />
              </div>
            </div> */}

            {/* Sale Details */}
            <div className="grid gap-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Total Raise</span>
                <span className="text-white">
                  {totalRaised.toLocaleString()} {presale.paymentToken?.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Soft Cap</span>
                <span className="text-white">
                  {Number(presale.softCap).toLocaleString()} {presale.paymentToken?.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Hard Cap</span>
                <span className="text-white">
                  {Number(presale.hardCap).toLocaleString()} {presale.paymentToken?.symbol}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Token Price</span>
                <span className="text-white">
                  ${presale.salePrice}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Refund Period</span>
                <span className="text-white">
                  {Number(Number(presale.withdrawDelay) / 86400).toFixed(0)}
                  {Number(presale.withdrawDelay) / 86400 === 1 ? " Day" : " Days"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Status</span>
                <CountdownTimer
                  time={presale.startTime}
                  endTime={presale.endTime}
                  delayTime={Number(presale.endTime) + Number(presale.withdrawDelay)}
                />
              </div>
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Participants</span>
                <span className="text-white">{presale.purchaserCount ? presale.purchaserCount : 0}</span>
              </div>
              {presale.presaleInfo.hiddenData && (
                <>
                  {presale.presaleInfo?.hiddenData?.IMC === "TBA" ? (
                    <div className="flex justify-between">
                      <span title="Initial Market Cap (Excluding Liquidity)" className="text-[#ACBBCC] flex gap-x-1 items-center">IMC (Excl Liq) <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ACBBCC" d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" /></svg></span>
                      <span className="text-white">TBA</span>
                    </div>
                  )
                    :
                    (
                      <div className="flex justify-between">
                        <span title="Initial Market Cap (Excluding Liquidity)" className="text-[#ACBBCC] flex gap-x-1 items-center">IMC (Excl Liq) <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ACBBCC" d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" /></svg></span>
                        <span className="text-white">${presale.presaleInfo.hiddenData.IMC.toLocaleString()}</span>
                      </div>
                    )
                  }
                  {
                    presale.presaleInfo?.hiddenData?.totalIMC === "TBA" ? (
                      <div className="flex justify-between">
                        <span title="Total Initial Market Capitalization" className="text-[#ACBBCC] flex gap-x-1 items-center">Total IMC <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ACBBCC" d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" /></svg></span>
                        <span className="text-white">TBA</span>
                      </div>
                    ) :
                      (
                        <div className="flex justify-between">
                          <span title="Total Initial Market Capitalization" className="text-[#ACBBCC] flex gap-x-1 items-center">Total IMC <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ACBBCC" d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" /></svg></span>
                          <span className="text-white">${presale.presaleInfo.hiddenData.totalIMC.toLocaleString()}</span>
                        </div>
                      )
                  }
                  {
                    presale.presaleInfo?.hiddenData?.fdv === "TBA" ? (
                      <div className="flex justify-between">
                        <span title="Fully Diluted Valuation" className="text-[#ACBBCC] flex gap-x-1 items-center">FDV <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ACBBCC" d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" /></svg></span>
                        <span className="text-white">${presale.presaleInfo?.hiddenData?.fdv.toLocaleString()}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span title="Fully Diluted Valuation" className="text-[#ACBBCC] flex gap-x-1 items-center">FDV <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="#ACBBCC" d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709" /></svg></span>
                        <span className="text-white">${Number("290000").toLocaleString()}</span>
                      </div>
                    )
                  }
                </>
              )
              }
            </div>
          </div>
        </div>

        {/* View Sale button - Updated with non-angled design */}
        <motion.button
          onClick={() => navigation(`/launchpad/${presale.presaleInfo.projectName.toLowerCase()}`)}
          className="w-full bg-gradient-to-r from-cosmic/80 to-cosmic h-[50px] flex items-center justify-center gap-2 font-orbitron text-white border-t border-cosmic/30 mt-6"
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
            <FaHistory className="text-white" />
          </motion.div>
          <span>View Sale</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SaleCardCompleted;
