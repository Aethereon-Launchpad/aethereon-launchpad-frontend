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
  return (
    <div className="flex flex-col w-full space-y-[20px] lg:space-y-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DataField label="Metadata URI" value={formData.metadataURI} />
        <DataField label="Funder Address" value={formData.funder} />
        <DataField label="Sale Price" value={formData.salePrice} />
        <DataField label="Payment Token" value={formData.paymentToken} />
        <DataField label="Sale Token" value={formData.saleToken} />
        <DataField label="Soft Cap" value={formData.softCap} />
        <DataField label="Hard Cap" value={formData.hardCap} />
        <DataField label="Start Time" value={new Date(formData.startTime * 1000).toLocaleString()} />
        <DataField label="End Time" value={new Date(formData.endTime * 1000).toLocaleString()} />
        <DataField label="Min Payment" value={formData.minTotalPayment} />
        <DataField label="Max Payment" value={formData.maxTotalPayment} />
        <DataField label="Withdraw Delay" value={`${formData.withdrawDelay} seconds`} />
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
