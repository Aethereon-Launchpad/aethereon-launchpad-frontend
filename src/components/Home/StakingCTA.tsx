import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

function StakingCTA() {
  const navigate = useNavigate();
  
  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space">
      <div className="w-full lg:w-[95%] mx-auto rounded-[10px] grid lg:grid-cols-2 gap-[40px] items-center">
        <div className="space-y-[20px]">
          <p className="text-[28px] lg:text-[48px] font-[700] text-white leading-[35px] lg:leading-[55px]">
            Start Earning Through <span className="text-primary">Staking Pools</span>
          </p>
          <p className="text-[16px] lg:text-[18px] text-[#CDCDCD]">
            Join our staking pools to earn passive income and unlock exclusive platform benefits. 
            Stake tokens and maximize your rewards with competitive APY rates.
          </p>
          <button 
            onClick={() => navigate("/staking-pool")} 
            className="bg-primary p-[8px_20px] font-[500] text-[16px] lg:text-[18px] text-white rounded-full flex items-center space-x-[5px]"
          >
            <span>Explore Staking Pools</span>
            <FaArrowCircleRight className="text-white ml-2" />
          </button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img src="/stakehero.svg" alt="Staking illustration" className="max-w-[400px] w-full" />
        </div>
      </div>
    </div>
  );
}

export default StakingCTA;