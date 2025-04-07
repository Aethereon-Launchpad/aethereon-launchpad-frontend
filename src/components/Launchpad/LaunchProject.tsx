import { useNavigate } from "react-router-dom";

function LaunchProject() {
  const navigate = useNavigate();

  return (
    <div className="relative font-space overflow-hidden bg-gradient-to-r from-[#17043B] to-[#291254] rounded-[20px] my-[40px] mx-[20px] lg:mx-[40px]">
      <div className="flex flex-col lg:flex-row items-center justify-between p-[30px] lg:p-[40px] gap-8">
        {/* Left Section with Text and Button */}
        <div className="flex-1">
          <h2 className="text-[28px] lg:text-[42px] text-white font-[600] leading-tight mb-6">
            Want to launch your <br />
            project on DerHex Pad?
          </h2>
          <button
            onClick={() => navigate("/apply")}
            className="relative px-8 py-3 text-white font-[500] overflow-hidden group"
          >
            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
            <span className="absolute inset-[2px] bg-[#17043B] transition-all duration-300 clip-path-polygon"></span>
            <span className="relative">APPLY TO LAUNCH</span>
          </button>
        </div>

        {/* Right Section with Features */}
        <div className="flex-1">
          <div className="space-y-4">
            <Feature text="Powered by DerHex AI" />
            <Feature text="Unique frictionless token sale process" />
            <Feature text="Tier-1 marketing partners and support" />
            <Feature text="Security audit, Pentest & Incident Response Powered by DerHex" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/20 rounded-full blur-[80px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary/20 rounded-full blur-[80px] -z-10"></div>
    </div>
  );
}

// Feature component with checkmark
function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-white">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6666 5L7.49992 14.1667L3.33325 10"
          stroke="#8949FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[14px] lg:text-[16px]">{text}</span>
    </div>
  );
}

export default LaunchProject;
