import { useState } from 'react';
import Layout from '../../../layout';
import CreatePresaleStep1 from "../../../components/CreatePresale/Step1.tsx"
import CreatePresaleStep2 from "../../../components/CreatePresale/Step2.tsx"
import CreatePresaleStep3 from "../../../components/CreatePresale/Step3.tsx"
import CreatePresaleStep4 from "../../../components/CreatePresale/Step4.tsx"
import { FaCheck } from "react-icons/fa6";
import { usePrivy } from '@privy-io/react-auth';
import { Preloader, Oval } from 'react-preloader-icon';
import PresaleFactoryABI from '../../../abis/PresaleFactory.json';
import { sonicTestnet } from '../../../config/chain/index.ts';
import { publicClient } from "../../../config";
import { createWalletClient, custom } from "viem";
import { BaseError, ContractFunctionRevertedError } from 'viem';
import { toast } from 'react-hot-toast';
import { isBefore, isAfter, isValid } from 'date-fns';
import { ethers } from 'ethers'
import { isValidERC20 } from '../../../utils/web3/actions.ts';
import TxReceipt from '../../../components/Modal/TxReceipt/index.tsx';

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

// Add this function to create wallet client
const createViemWalletClient = () => {
    return createWalletClient({
        chain: sonicTestnet,
        transport: custom(window.ethereum)
    });
};


export default function PresaleCreator() {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [formData, setFormData] = useState<Presale>({
        metadataURI: "https://",
        funder: "0x",
        salePrice: 0,
        paymentToken: "0x",
        saleToken: "0x",
        softCap: 0,
        hardCap: 0,
        startTime: 0,
        endTime: 0,
        minTotalPayment: 0,
        maxTotalPayment: 0,
        withdrawDelay: 0,
    })
    const [loading, setLoading] = useState<boolean>(false)
    const { authenticated, login } = usePrivy();
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle] = useState<string>("Successfully Created New Presale");
    const [txHash, setTxHash] = useState<`0x${string}`>("0x");


    const components = [
        <CreatePresaleStep1 formData={formData} setFormData={setFormData} />,
        <CreatePresaleStep2 formData={formData} setFormData={setFormData} />,
        <CreatePresaleStep3 formData={formData} setFormData={setFormData} />,
        <CreatePresaleStep4 formData={formData} />,
    ]


    async function handleNext() {
        if (!authenticated) {
            toast("Login Wallet")
            login()
            return
        }

        if (currentPage === 0) {
            const { metadataURI, funder, salePrice, paymentToken, saleToken } = formData;
            if (metadataURI === "https://") {
                toast("Please include metadata URI to provide project information")
                return;
            }

            const isValidPaymentToken = await isValidERC20(paymentToken);
            const isValidSaleToken = await isValidERC20(saleToken);

            if (!isValidPaymentToken || !isValidSaleToken) {
                toast("Make sure sale token and sale tokens are valid ERC20 Tokens")
                return;
            }

            if (funder === "0x" || paymentToken === "0x" || saleToken === "0x") {
                toast("Please provide a valid address")
                return;
            }

            if (salePrice === 0) {
                toast("Presale is a giveaway")
            }

            setCurrentPage(1)
            return;
        }

        if (currentPage === 1) {
            const { withdrawDelay, startTime, endTime } = formData;

            if (isBefore(new Date(startTime * 1000), new Date())) {
                toast("Start time cannot be in the past");
                return;
            }

            if (isAfter(new Date(startTime * 1000), new Date(endTime * 1000))) {
                toast("End time must be after start time");
                return;
            }

            if (withdrawDelay === 0) {
                toast("Withdrawal delay can't be set to zero days")
                return;
            }

            setCurrentPage(2)
            return;
        }


        if (currentPage === 2) {
            const { softCap, hardCap, minTotalPayment, maxTotalPayment } = formData;

            if (!softCap) {
                toast("Soft Cap can't be zero")
                return;
            }

            if (!hardCap) {
                toast("Hard Cap can't be zero")
                return;
            }

            if (!minTotalPayment) {
                toast("Min Total Payment can't be zero")
                return;
            }

            if (!maxTotalPayment) {
                toast("Max Total Payment can't be zero")
                return
            }


            setCurrentPage(3)
            return
        }

        if (currentPage === (components.length - 1)) {
            await createPresale()
        }
    }


    async function createPresale() {
        setLoading(true)
        const formatEthValues = (amount: string) => ethers.parseEther(amount);
        const presaleFactoryCA = "0x76bDcdCc41285C9dD6a22b29c2c70810e3Dc26Ca"

        try {
            const { metadataURI, startTime, endTime, withdrawDelay, funder, paymentToken, saleToken } = formData;
            const salePrice = formatEthValues(formData.salePrice.toString());
            const softCap = formatEthValues(formData.softCap.toString());
            const hardCap = formatEthValues(formData.hardCap.toString());
            const minTotalPayment = formatEthValues(formData.minTotalPayment.toString())
            const maxTotalPayment = formatEthValues(formData.maxTotalPayment.toString())

            // Process Wallet
            const walletClient = await createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            if (!account) {
                toast("Connect Wallet");
                return;
            }

            const { request, result } = await publicClient.simulateContract({
                address: presaleFactoryCA,
                abi: PresaleFactoryABI,
                functionName: "initialize",
                account,
                args: [
                    metadataURI,
                    funder,
                    salePrice,
                    paymentToken,
                    saleToken,
                    softCap,
                    hardCap,
                    startTime,
                    endTime,
                    minTotalPayment,
                    maxTotalPayment,
                    withdrawDelay
                ]
            })

            const hash = await walletClient.writeContract(request);
            console.log(hash, result)
            setTxHash(hash);
            setShowTxModal(true)

            toast("Successfully Created New Presale")
        } catch (error) {
            console.error("Creating New Presale Failed", error)
            toast.error("Creating New Presale Failed")
        } finally {
            setLoading(false)
        }
    }


    return (
        <Layout>
            <TxReceipt
                visible={showTxModal}
                onClose={() => setShowTxModal(false)}
                title={txReceiptTitle}
                txHash={txHash}
            />
            <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
                <div className="flex flex-col items-center justify-center gap-[20px] text-white">
                    <div className="w-full h-full lg:w-[30%] ">
                        <p className="text-[20px] lg:text-[36px] font-[500] text-center">
                            DerHex Create Presale System
                        </p>
                    </div>
                    <div className="w-full h-full lg:w-[70%]  bg-[#17043B] p-[20px] lg:p-[40px] flex flex-col items-center justify-center rounded-[16px] space-y-[20px] lg:space-y-[80px]">
                        {components[currentPage]}
                        <button
                            onClick={handleNext}
                            className={` bg-primary text-white p-[10px_20px] mt-[20px] rounded-[8px] w-full h-[50px] flex items-center justify-center`}
                        >
                            {!authenticated ? "Connect Wallet" : loading ? (
                                <Preloader
                                    use={Oval}
                                    size={32}
                                    strokeWidth={8}
                                    strokeColor="#FFF"
                                    duration={800}
                                />
                            ) : currentPage === 2 ? "Create Presale" : "Continue"}

                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}