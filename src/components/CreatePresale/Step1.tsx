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

export default function CreatePresaleStep1({ formData, setFormData }: Props) {
  const { metadataURI, funder, salePrice, paymentToken, saleToken } = formData;

  return (
    <div className="flex flex-col w-full space-y-[20px] lg:space-y-[80px]">
      <div className="w-full">
        <label htmlFor="metadataURI">Project Metadata URI</label>
        <input
          value={metadataURI}
          onChange={(e: any) =>
            setFormData({ ...formData, metadataURI: e.target.value as `https://${string}` })
          }
          id="metadataURI"
          type="url"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
      <div className="w-full">
        <label htmlFor="funder">Funder Address</label>
        <input
          value={funder}
          onChange={(e) =>
            setFormData({ ...formData, funder: e.target.value as `0x${string}` })
          }
          id="funder"
          type="text"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
      <div className="w-full">
        <label htmlFor="salePrice">Sale Price (Amount in Ether) </label>
        <input
          value={salePrice}
          onChange={(e) =>
            setFormData({ ...formData, salePrice: Number(e.target.value) })
          }
          id="salePrice"
          type="number"
          step={0.01}
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
      <div className="w-full">
        <label htmlFor="funder">Payment Token</label>
        <input
          value={paymentToken}
          onChange={(e) =>
            setFormData({ ...formData, paymentToken: e.target.value as `0x${string}` })
          }
          id="paymentToken"
          type="text"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
      <div className="w-full">
        <label htmlFor="funder">Sale Token</label>
        <input
          value={saleToken}
          onChange={(e) =>
            setFormData({ ...formData, saleToken: e.target.value as `0x${string}` })
          }
          id="saleToken"
          type="text"
          className="mt-[8px] outline-none px-[10px] rounded-[8px] h-[50px] w-full bg-[#291254]"
        />
      </div>
    </div>
  );
}
