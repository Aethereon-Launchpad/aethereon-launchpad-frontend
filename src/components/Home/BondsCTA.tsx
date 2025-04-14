import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

function BondsCTA() {
  const navigate = useNavigate();

  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space">
      <div className="w-full lg:w-[95%] mx-auto rounded-[10px] grid lg:grid-cols-2 gap-[40px] items-center">
        <div className="flex justify-center lg:justify-start order-2 lg:order-1">
          <img src="/bondhero.svg" alt="Bonds illustration" className="max-w-[400px] w-full" />
        </div>
        <div className="space-y-[20px] order-1 lg:order-2">
          <p className="text-[28px] lg:text-[48px] font-[700] text-white leading-[35px] lg:leading-[55px]">
            Discover <span className="text-primary">Token Bonds</span> on DerHex
          </p>
          <p className="text-[16px] lg:text-[18px] text-[#CDCDCD]">
            Explore our innovative token bond offerings with competitive discounts and guaranteed returns.
            Unlike traditional IDOs, bonds provide predictable yields and lower risk exposure,
            perfect for investors seeking stability in the volatile crypto market.
          </p>
          <button
            onClick={() => navigate("/deals/bonds")}
            className="relative px-6 py-2 font-[500] text-[16px] lg:text-[18px] text-white flex items-center space-x-[5px] overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-black transition-all duration-300 clip-path-polygon"></span>
            <span className="relative flex items-center space-x-[5px]">
              <span>Explore Bonds</span>
              <FaArrowCircleRight className="text-white ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BondsCTA;
