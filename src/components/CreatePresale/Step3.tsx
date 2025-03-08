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
  setFormData: (prevState: Presale) => void;
}


export default function CreatePresaleStep3({ formData, setFormData }: Props) {
  const { softCap, hardCap, minTotalPayment, maxTotalPayment } = formData;
  return (
    <div className="flex flex-col w-full space-y-[20px] lg:space-y-[80px]">
      <div className="w-full">
        <label htmlFor="softCap">Soft Cap</label>
        <input
          value={softCap}
          onChange={(e: any) =>
            setFormData({ ...formData, softCap: e.target.value })
          }
          id="softCap"
          type="number"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
      <div className="w-full">
        <label htmlFor="hardCap">Hard Cap</label>
        <input
          value={hardCap}
          onChange={(e: any) =>
            setFormData({ ...formData, hardCap: e.target.value })
          }
          id="hardCap"
          type="number"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
      <div className="w-full">
        <label htmlFor="minTotalPayment">Min Total Payment</label>
        <input
          value={minTotalPayment}
          onChange={(e: any) =>
            setFormData({ ...formData, minTotalPayment: e.target.value })
          }
          id="minTotalPayment"
          type="number"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
      <div className="w-full">
        <label htmlFor="maxTotalPayment">Max Total Payment</label>
        <input
          value={maxTotalPayment}
          onChange={(e: any) =>
            setFormData({ ...formData, maxTotalPayment: e.target.value })
          }
          id="maxTotalPayment"
          type="number"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
    </div>
  );
}
