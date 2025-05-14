import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { isBefore } from 'date-fns';
import CurrentChain from '../Presale/CurrentChain';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import {
  FaDiscord,
  FaGlobe,
  FaTelegram,
  FaTwitter,
  FaRocket,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { SiSolana } from 'react-icons/si';
import { GiStarFormation } from 'react-icons/gi';

function CountdownTimer({ time, endTime }: { time: number, endTime: number }) {
  const calculateTimeLeft = () => {
    const targetTime = parseInt(time.toString()) * 1000;
    const now = Date.now();

    if (targetTime <= now) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor((targetTime - now) / (1000 * 60 * 60 * 24));
    const hours = Math.floor(((targetTime - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor(((targetTime - now) % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const startTimeUnix = time * 1000;
  const endTimeUnix = endTime * 1000;
  const now = Date.now();

  if (isBefore(new Date(startTimeUnix), new Date()) && isBefore(new Date(endTimeUnix), new Date())) {
    return (
      <motion.div
        className="bg-red-500/20 px-3 py-1 rounded-md inline-flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <FaRocket className="text-cosmic text-sm" />
        <span className="text-white font-orbitron text-sm">Bond Sale Ended</span>
      </motion.div>
    );
  }

  if (isBefore(new Date(startTimeUnix), new Date()) && !isBefore(new Date(endTimeUnix), new Date())) {
    return (
      <motion.div
        className="bg-cosmic/20 px-3 py-1 rounded-md inline-flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: ['0 0 0px rgba(108, 92, 231, 0.3)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0.3)']
        }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <FaRocket className="text-cosmic text-sm" />
        <span className="text-white font-orbitron text-sm">Bond Sale Live</span>
      </motion.div>
    );
  }

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return (
      <motion.div
        className="bg-yellow-500/20 px-3 py-1 rounded-md inline-flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
      >
        <FaRocket className="text-yellow-500 text-sm" />
        <span className="text-white font-orbitron text-sm">Bond Sale Starting</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-deepspace/50 px-3 py-1 rounded-md inline-flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
    >
      <FaRocket className="text-cosmic text-sm" />
      <span className="text-white font-orbitron text-sm">
        {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
      </span>
    </motion.div>
  );
}

function BondCard({ bond }: { bond: any }) {
  const navigate = useNavigate();
  const [currentChain, setCurrentChain] = useState<string>("56");
  const { wallets } = useWallets();
  const { authenticated } = usePrivy();

  useEffect(() => {
    if (authenticated && wallets.length !== 0) {
      const wallet = wallets[0];
      const info = wallet.chainId;
      const id = info.split(":")[1];
      setCurrentChain(id);
    }
  }, [authenticated, wallets]);

  if (!bond) {
    return (
      <motion.div
        className="h-full overflow-hidden relative bg-deepspace/30 border border-cosmic/20 rounded-lg flex items-center justify-center p-6"
        animate={{
          boxShadow: ['0 0 0px rgba(108, 92, 231, 0.1)', '0 0 15px rgba(108, 92, 231, 0.2)', '0 0 0px rgba(108, 92, 231, 0.1)'],
          borderColor: ['rgba(108, 92, 231, 0.2)', 'rgba(108, 92, 231, 0.4)', 'rgba(108, 92, 231, 0.2)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Decorative corner accents */}
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

  const totalSold = parseFloat(bond.totalSold || "0");
  const bondSize = parseFloat(bond.bondSize || "0");
  const progress = (totalSold / bondSize) * 100;
  const projectUrl = bond?.bondInfo?.projectName?.toLowerCase() || 'unknown';

  return (
    <motion.div
      className="overflow-hidden relative bg-deepspace/30 border border-cosmic/20 rounded-lg"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 20px rgba(108, 92, 231, 0.4)",
        borderColor: "rgba(108, 92, 231, 0.6)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => navigate(`/deals/bonds/${projectUrl}`)}
    >
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

      <div className="h-[150px] w-full relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-cosmic/20 to-deepspace/80 z-10"
          whileHover={{ opacity: 0.7 }}
        ></motion.div>

        <motion.img
          src={bond?.bondInfo?.images?.bg}
          className="h-full w-full object-cover"
          alt={bond?.bondInfo?.projectName}
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
            {bond.isPrivateBond ? "Private Bond" : "Public Bond"}
          </motion.span>
        </motion.div>
      </div>

      <motion.div
        className="h-[80px] w-[80px] absolute top-[110px] left-[20px] z-20 border-[5px] rounded-full border-cosmic bg-deepspace/80 p-2 flex items-center justify-center overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.2 }}
        whileHover={{ scale: 1.1, borderColor: "#8B5CF6" }}
      >
        <motion.img
          src={bond?.bondInfo?.images?.logo}
          className="h-full w-full object-contain"
          alt={bond?.bondInfo?.projectName}
          whileHover={{ rotate: 10 }}
        />
      </motion.div>

      <div className="w-full p-6 pt-12">
        <div className="flex justify-between items-center mb-4">
          <CountdownTimer
            time={bond.saleStartTime}
            endTime={bond.saleEndTime}
          />
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CurrentChain chainId={currentChain} />
          </motion.div>
        </div>

        <motion.h3
          className="text-2xl font-bold text-white font-orbitron mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ color: "#8B5CF6" }}
        >
          {bond?.bondInfo?.projectName || "Unknown Project"}
        </motion.h3>

        <motion.p
          className="text-white/80 text-sm font-space mb-4 line-clamp-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {bond?.bondInfo?.description || "No description available"}
        </motion.p>

        <motion.div
          className="bg-deepspace/50 p-4 rounded-lg border border-cosmic/20 space-y-3 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ borderColor: "rgba(108, 92, 231, 0.5)" }}
        >
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <p className="text-gray-400 font-space">Discount Rate</p>
              <p className="text-white font-orbitron">
                {(bond.initialDiscountPercentage).toFixed()}% to {(bond.finalDiscountPercentage).toFixed()}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-400 font-space">Vesting</p>
              <p className="text-white font-orbitron">
                {bond.linearVestingEndTime && bond.linearVestingEndTime > 0 ? (
                  differenceInDays(new Date(bond.linearVestingEndTime * 1000), new Date(bond.withdrawTime * 1000))
                ) : (
                  0
                )} days
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-skyblue font-space">Progress</span>
              <motion.span
                className="text-cosmic font-orbitron"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {progress.toFixed(1)}%
              </motion.span>
            </div>
            <div className="h-2 w-full bg-deepspace/70 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cosmic/80 to-cosmic rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {bond?.bondInfo?.website && (
            <motion.a
              href={bond.bondInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic hover:text-cosmic/80 transition-all"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGlobe className="w-5 h-5" />
            </motion.a>
          )}
          {bond?.bondInfo?.socials?.twitter && (
            <motion.a
              href={bond.bondInfo.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic hover:text-cosmic/80 transition-all"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter className="w-5 h-5" />
            </motion.a>
          )}
          {bond?.bondInfo?.socials?.telegram && (
            <motion.a
              href={bond.bondInfo.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic hover:text-cosmic/80 transition-all"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTelegram className="w-5 h-5" />
            </motion.a>
          )}
          {bond?.bondInfo?.socials?.discord && (
            <motion.a
              href={bond.bondInfo.socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cosmic hover:text-cosmic/80 transition-all"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaDiscord className="w-5 h-5" />
            </motion.a>
          )}
        </motion.div>

        <motion.div
          className="mt-5 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <Link
            to={`/deals/bonds/${projectUrl}`}
            className="text-cosmic font-orbitron text-sm flex items-center justify-center gap-1 hover:underline"
          >
            View Details <FaExternalLinkAlt size={12} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BondCard;