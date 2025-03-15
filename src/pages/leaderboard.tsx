// import React from 'react'

import LeaderHero from "../components/Leaderboard/LeaderHero"
import LeaderTable from "../components/Leaderboard/LeaderTable"
import Layout from "../layout"
import { useState, useEffect } from 'react';

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-04-30T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center">
        <div className="bg-[#092143CC] p-6 rounded-lg">
          <p className="font-splash text-[40px] leading-[40px]">
            {String(timeLeft.days).padStart(2, '0')}
          </p>
          <p className="uppercase text-[#A5DEFF] text-[14px]">Days</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-[#092143CC] p-6 rounded-lg">
          <p className="font-splash text-[40px] leading-[40px]">
            {String(timeLeft.hours).padStart(2, '0')}
          </p>
          <p className="uppercase text-[#A5DEFF] text-[14px]">Hours</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-[#092143CC] p-6 rounded-lg">
          <p className="font-splash text-[40px] leading-[40px]">
            {String(timeLeft.minutes).padStart(2, '0')}
          </p>
          <p className="uppercase text-[#A5DEFF] text-[14px]">Minutes</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-[#092143CC] p-6 rounded-lg">
          <p className="font-splash text-[40px] leading-[40px]">
            {String(timeLeft.seconds).padStart(2, '0')}
          </p>
          <p className="uppercase text-[#A5DEFF] text-[14px]">Seconds</p>
        </div>
      </div>
    </div>
  );
}

function Leaderboard() {
  return (
    <Layout>
      <div className="p-[40px_20px] lg:p-[60px_40px] text-white font-space flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <p className="text-[30px] leading-[35px] lg:leading-[65px] lg:text-[60px] font-[700]">
            Leaderboard: Coming Soon!
          </p>
          <p className="text-[16px] lg:text-[22px] mt-4">
            We're preparing something exciting for you. Stay tuned!
          </p>
        </div>
        <CountdownTimer />
      </div>

      {/* Comment out the current implementation
      <LeaderHero/>
      <LeaderTable/>
      */}
    </Layout>
  )
}

export default Leaderboard