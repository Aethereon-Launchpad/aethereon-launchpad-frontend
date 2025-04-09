import { useEffect, useState } from "react";
import { getTokenSymbol } from "../../utils/web3/actions";
import toast from "react-hot-toast";
import { Preloader, Oval } from 'react-preloader-icon';


interface Presale {
  metadataURI: `https://${string}`;
  funder: `0x${string}`;
  salePrice: number;
  paymentToken: `0x${string}`;
  saleToken: `0x${string}`;
  softCap: number;
  hardCap: number;
  startTime: number;
  endTime: number;
  minTotalPayment: number;
  maxTotalPayment: number;
  withdrawDelay: number;
}


interface Props {
  formData: Presale;
}


export default function CreatePresaleStep4({ formData }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [tokenData, setTokenData] = useState<{ saleToken: `0x${string}`, paymentToken: `0x${string}` }>({
    paymentToken: "0x",
    saleToken: "0x"
  })

  async function getTokenInfo() {
    try {
      setLoading(true)
      const [saleTokenSymbol, paymentTokenSymbol] = await Promise.all([
        getTokenSymbol(formData.saleToken),
        getTokenSymbol(formData.paymentToken)
      ])
      if (saleTokenSymbol && paymentTokenSymbol) {
        setTokenData({
          paymentToken: paymentTokenSymbol as `0x${string}`,
          saleToken: saleTokenSymbol as `0x${string}`
        })
      }
    } catch (error) {
      console.log(error);
      toast("Failed to get token data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTokenInfo()
  }, [])

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Preloader
          use={Oval}
          size={32}
          strokeWidth={8}
          strokeColor="#FFF"
          duration={800}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full space-y-[20px] lg:space-y-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField label="Metadata URI" value={formData.metadataURI} />
        <DataField label="Funder Address" value={formData.funder} />
        <DataField label="Sale Price" value={`${formData.salePrice} ${tokenData.paymentToken}`} />
        <DataField label="Payment Token" value={tokenData.paymentToken} />
        <DataField label="Sale Token" value={tokenData.saleToken} />
        <DataField label="Soft Cap" value={formData.softCap} />
        <DataField label="Hard Cap" value={formData.hardCap} />
        <DataField label="Start Time" value={new Date(formData.startTime * 1000).toLocaleString()} />
        <DataField label="End Time" value={new Date(formData.endTime * 1000).toLocaleString()} />
        <DataField label="Min Payment" value={formData.minTotalPayment} />
        <DataField label="Max Payment" value={formData.maxTotalPayment} />
        <DataField label="Withdraw Delay" value={`${formData.withdrawDelay / (24 * 60 * 60)} ${formData.withdrawDelay / (24 * 60 * 60) === 1 ? "Day" : "Days"}`} />
      </div>
    </div>
  );
}

interface DataFieldProps {
  label: string;
  value: string | number;
}

function DataField({ label, value }: DataFieldProps) {
  return (
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base font-medium break-all">{value}</span>
    </div>
  );
}
