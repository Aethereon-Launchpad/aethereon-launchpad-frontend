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


export default function CreatePresaleStep2({ formData, setFormData }: Props) {
  const { startTime, endTime, withdrawDelay } = formData;
  return (
    <div className="flex flex-col w-full space-y-[20px] lg:space-y-[80px] min-h-[600px]">
      <div className="w-full">
        <label htmlFor="startTime">Presale Start Time</label>
        <div className="flex gap-x-3">
          <input
            value={startTime}
            onChange={(e: any) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            id="startTime"
            type="date"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
          <input
            value={startTime}
            onChange={(e: any) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            id="startTime"
            type="time"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="startTime">Presale End Time</label>
        <div className="flex gap-x-3">
          <input
            value={endTime}
            onChange={(e: any) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
            id="endTime"
            type="date"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
          <input
            value={endTime}
            onChange={(e: any) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
            id="endTime"
            type="time"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="metadataURI">Withdrawal Delay (No Of Days)</label>
        <input
          value={withdrawDelay}
          onChange={(e: any) =>
            setFormData({ ...formData, withdrawDelay: Number(e.target.value * 60 * 60 * 24) })
          }
          id="metadataURI"
          type="url"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
    </div>
  );
}
