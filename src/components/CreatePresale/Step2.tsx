import { } from 'date-fns';

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
        <label htmlFor="startTime">Presale Start Date</label>
        <div className="flex gap-x-3">
          <input
            value={startTime ? new Date(startTime * 1000).toISOString().split('T')[0] : ''}
            onChange={(e: any) =>
              setFormData({ ...formData, startTime: Math.floor(new Date(e.target.value).getTime() / 1000) })
            }
            id="startTime"
            type="date"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
          <input
            value={startTime ? new Date(startTime * 1000).toISOString().split('T')[1].substring(0, 5) : ''}
            onChange={(e: any) => {
              const timeValue = e.target.value;
              if (timeValue.length === 5) {
                const date = new Date(startTime * 1000);
                const [hours, minutes] = timeValue.split(':').map(Number);
                // Use UTC methods to avoid timezone issues
                const newDate = new Date(Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate(),
                  hours,
                  minutes
                ));
                setFormData({ ...formData, startTime: Math.floor(newDate.getTime() / 1000) });
              }
            }}
            onBlur={(e: any) => {
              const timeValue = e.target.value;
              if (timeValue.length === 5) {
                const date = new Date(startTime * 1000);
                const [hours, minutes] = timeValue.split(':').map(Number);
                const newDate = new Date(Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate(),
                  hours,
                  minutes
                ));
                setFormData({ ...formData, startTime: Math.floor(newDate.getTime() / 1000) });
              }
            }}
            id="startTime"
            type="time"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="startTime">Presale End Date</label>
        <div className="flex gap-x-3">
          <input
            value={endTime ? new Date(endTime * 1000).toISOString().split('T')[0] : ''}
            onChange={(e: any) =>
              setFormData({ ...formData, endTime: Math.floor(new Date(e.target.value).getTime() / 1000) })
            }
            id="endTime"
            type="date"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
          <input
            value={endTime ? new Date(endTime * 1000).toISOString().split('T')[1].substring(0, 5) : ''}
            onChange={(e: any) => {
              const timeValue = e.target.value;
              if (timeValue.length === 5) {
                const date = new Date(endTime * 1000);
                const [hours, minutes] = timeValue.split(':').map(Number);
                const newDate = new Date(Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate(),
                  hours,
                  minutes
                ));
                setFormData({ ...formData, endTime: Math.floor(newDate.getTime() / 1000) });
              }
            }}
            onBlur={(e: any) => {
              const timeValue = e.target.value;
              if (timeValue.length === 5) {
                const date = new Date(endTime * 1000);
                const [hours, minutes] = timeValue.split(':').map(Number);
                const newDate = new Date(Date.UTC(
                  date.getUTCFullYear(),
                  date.getUTCMonth(),
                  date.getUTCDate(),
                  hours,
                  minutes
                ));
                setFormData({ ...formData, endTime: Math.floor(newDate.getTime() / 1000) });
              }
            }}
            id="endTime"
            type="time"
            className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="metadataURI">Withdrawal Delay (No Of Days)</label>
        <input
          value={withdrawDelay ? withdrawDelay / (60 * 60 * 24) : 0}
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
