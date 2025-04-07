import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountdownTimer } from "../Countdown";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";
import CurrentChain from "../Presale/CurrentChain";

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
    <div className="overflow-hidden relative bg-[#111115] border border-primary/20 transition-all hover:scale-[1.01] duration-300 hover:cursor-pointer shadow-[0_0_15px_2px_rgba(83,37,169,0.3)] hover:shadow-[0_0_25px_5px_rgba(83,37,169,0.5)]">
      <div className="h-[150px] w-full border-b relative">
        <img
          src={presale?.presaleInfo?.images?.bg}
          className="h-full w-full object-cover"
          alt={presale?.presaleInfo?.projectName}
        />
        <div className="absolute top-0 right-0 bg-[#291254] px-4 py-1 text-white">
          {presale.isPrivateSale ? "Standard IDO" : "Public IDO"}
        </div>
      </div>

      {/* <div className="absolute top-[8.8rem] w-[80px] left-0 h-[25px] bg-[#291254] z-0" /> */}
      <div className="h-[80px] w-[80px] absolute top-[110px] left-[20px] z-20 border-[#291254] border-[7px] bg-black p-3">
        <img src={presale?.presaleInfo?.images?.logo} className="h-full w-full object-contain" alt="" />
      </div>

      <div className="w-full">
        <div className="text-white w-full items-center flex justify-end">
          <div className="bg-[#291254] uppercase p-2">
            <CurrentChain chainId={currentChain} />
          </div>
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

        <button
          onClick={() => navigation(`/launchpad/${presale.id}`)}
          className="w-full bg-primary hover:bg-primary/90 transition-all mt-6 text-white py-3 uppercase flex items-center justify-center cursor-pointer max-h-[35px]"
        >
          View Sale
        </button>
      </div>
    </div>
  );
}

export default SaleCardCompleted;
