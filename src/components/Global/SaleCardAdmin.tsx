import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../Countdown";
import { Preloader, ThreeDots } from 'react-preloader-icon';


function SaleCardAdmin({ presale }: any) {
  const navigation = useNavigate();

  if (!presale) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <Preloader
          use={ThreeDots}
          size={60}
          strokeWidth={6}
          strokeColor="#5325A9"
          duration={2000}
        />
      </div>
    );
  }

  const totalRaised = parseFloat(presale.totalPaymentReceived || "0");
  const hardCap = parseFloat(presale.hardCap || "0");
  const progress = (totalRaised / hardCap) * 100;

  return (
    <div className="rounded-[10px] overflow-hidden relative bg-[#27272A] transition-all hover:scale-105 duration-1000">
      <div className="h-[150px] w-full border-b relative">
        <img
          src={presale?.presaleInfo?.images?.bg}
          className="h-full w-full object-cover"
          alt={presale?.presaleInfo?.projectName}
        />
        <div className="absolute top-0 right-0 bg-[#291254] px-4 py-1 rounded-bl-lg text-white">
          {presale.isPrivateSale ? "Private Sale" : "Public Sale"}
        </div>
      </div>

      <div className="absolute top-[8.8rem] w-[80px] left-0 h-[25px] bg-[#291254] z-0" />
      <div className="h-[88px] w-[88px] rounded-full absolute top-[100px] left-[20px] z-20 border-[#291254] border-[7px] bg-black p-3">
        <img src={presale?.presaleInfo?.images?.logo} className="h-full w-full object-contain" alt="" />
      </div>

      <div className="w-full">
        <div className="text-white w-full items-center flex justify-end">
          <p className="bg-[#291254] uppercase text-[14px] p-[5px_20px] rounded-bl-[5px]">
            Refundable IDO
          </p>
        </div>

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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#ACBBCC]">Progress</span>
                <span className="text-white">{progress.toFixed(2)}%</span>
              </div>
              <div className="h-2 w-full bg-[#3F3F46] rounded-full">
                <div
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  className="h-full bg-primary rounded-full transition-all"
                />
              </div>
            </div>

            {/* Sale Details */}
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#ACBBCC]">Raised</span>
                <span className="text-white">
                  {totalRaised.toLocaleString()} {presale.paymentToken?.symbol} / {hardCap.toLocaleString()} {presale.paymentToken?.symbol}
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
            </div>
          </div>
        </div>

        <button
          onClick={() => navigation(`/launchpad/${presale.id}`)}
          className="w-full bg-primary hover:bg-primary/90 transition-all mt-6 text-white py-3 uppercase flex items-center justify-center cursor-pointer max-h-[35px]"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}

export default SaleCardAdmin;
