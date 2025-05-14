import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBond } from "../../hooks/web3/useBond";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore } from "date-fns";
import { FaDiscord, FaGlobe, FaTelegram, FaTwitter } from "react-icons/fa6";
import { differenceInDays } from "date-fns";
import CurrentChain from "../Presale/CurrentChain";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from 'framer-motion';
import { SiSolana } from 'react-icons/si';
import { FaExclamationCircle, FaRocket } from 'react-icons/fa';
import { GiStarFormation } from 'react-icons/gi';
import BondCard from './BondCard';

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
    return <p className='text-white'>Bond Sale Ended</p>
  }

  if (isBefore(new Date(startTimeUnix), new Date()) && !isBefore(new Date(endTimeUnix), new Date())) {
    return <p className='text-white'>Bond Sale Live</p>
  }

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
    return <p className='text-white'>Bond Sale Starting</p>;
  }

  return (
    <p className='text-white'>
      {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
    </p>
  );
}

function LiveAndUpcoming() {
  const { data, error, loading } = useBond(null, { polling: false });
  const [filteredBonds, setFilteredBonds] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const currentTime = Date.now();
      const filtered = data.filter((bond: any) => {
        const endTime = Number(bond.saleEndTime) * 1000;
        return isBefore(currentTime, endTime);
      });
      setFilteredBonds(filtered);
    }
  }, [data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <motion.div
        className="flex flex-col justify-center items-center h-[400px] bg-deepspace/30 border border-cosmic/20 rounded-lg p-8 relative m-[40px_20px] lg:m-[40px]"
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
          className="mb-6"
        >
          <SiSolana className="text-5xl text-cosmic" />
        </motion.div>

        <motion.h3
          className="text-xl font-orbitron text-white mb-2"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Bond Campaigns
        </motion.h3>

        <motion.div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-cosmic"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-skyblue/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 10 + 5}px`
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              <GiStarFormation />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error.message) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center space-y-6 p-8 text-center bg-deepspace/30 border border-red-500/30 rounded-lg relative m-[40px_20px] lg:m-[40px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-red-500/50 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-red-500/50 rounded-bl-lg"></div>

        <motion.div
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-red-500 text-5xl"
        >
          <FaExclamationCircle />
        </motion.div>

        <div className="space-y-2">
          <motion.h3
            className="text-2xl font-orbitron text-white"
            animate={{ textShadow: ['0 0 0px rgba(255, 255, 255, 0)', '0 0 10px rgba(255, 255, 255, 0.5)', '0 0 0px rgba(255, 255, 255, 0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Houston, We Have a Problem
          </motion.h3>

          <p className="text-white/80 font-space">
            {error.message || "Failed to load bond campaigns. Please try again later."}
          </p>
        </div>

        <motion.button
          className="bg-gradient-to-r from-cosmic/80 to-cosmic px-6 py-3 rounded-md text-white font-orbitron flex items-center gap-2"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(108, 92, 231, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
        >
          <FaRocket className="text-white" />
          <span>Retry Launch</span>
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="font-space p-[40px_20px] lg:p-[40px] bg-gradient-to-b from-deepspace/0 to-deepspace/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-40 right-20 w-[300px] h-[300px] bg-cosmic/5 rounded-full blur-[100px] -z-10"></div>

      {/* Decorative grid lines */}
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 top-[120px]"></div>
      <div className="absolute left-0 right-0 h-[1px] bg-cosmic/10 bottom-[120px]"></div>

      <motion.div
        className="flex flex-col items-center gap-3 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <FaRocket className="text-cosmic text-4xl mb-2" />
          <motion.div
            className="absolute inset-0 bg-cosmic rounded-full blur-md -z-10"
            animate={{
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          ></motion.div>
        </motion.div>

        <motion.h1
          className="text-[32px] lg:text-[56px] text-primary font-bold leading-[36px] lg:leading-[60px] font-orbitron text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Live & Upcoming <span className="text-cosmic">Bond Campaigns</span>
        </motion.h1>

        <motion.div
          className="w-[100px] h-[3px] bg-gradient-to-r from-transparent via-cosmic to-transparent mb-6"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100px", opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        ></motion.div>

        <motion.p
          className="text-lg text-white/80 max-w-2xl text-center font-space"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Participate in these exclusive bond campaigns to acquire tokens at a discount and support the growth of promising projects.
        </motion.p>
      </motion.div>

      <motion.div
        className="w-full mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid gap-[40px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[40px]">
          {filteredBonds.length > 0 ? (
            filteredBonds.map((bond: any, index: number) => (
              <motion.div
                key={`${bond.id}-${index}`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <BondCard bond={bond} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12 bg-deepspace/30 border border-cosmic/20 rounded-lg relative p-8"
              variants={itemVariants}
            >
              {/* Decorative corner accents */}
              <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cosmic/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-2 border-l-2 border-cosmic/50 rounded-bl-lg"></div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative inline-block mb-4"
              >
                <SiSolana className="text-6xl text-cosmic" />
              </motion.div>

              <motion.h3
                className="text-2xl font-orbitron text-white mb-4"
                animate={{ textShadow: ['0 0 0px rgba(108, 92, 231, 0)', '0 0 10px rgba(108, 92, 231, 0.5)', '0 0 0px rgba(108, 92, 231, 0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                No Upcoming Bonds
              </motion.h3>

              <motion.p
                className="text-white/70 max-w-md mx-auto font-space"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                There are no upcoming bond opportunities at the moment. Please check back later for exciting new campaigns.
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default LiveAndUpcoming;