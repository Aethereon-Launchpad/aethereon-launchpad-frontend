import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { Preloader, Oval } from 'react-preloader-icon';
import { toast } from 'react-hot-toast';
import { isBefore, isAfter } from 'date-fns';
import { ethers } from 'ethers';
import Layout from '../../../layout/Admin';
import { publicClient } from '../../../config';
import { createViemWalletClient } from '../../../utils/web3/actions';
import { getContractAddress } from '../../../utils/source';
import AirdropFactoryABI from '../../../abis/AirdropFactory.json';
import { isValidERC20 } from '../../../utils/web3/actions';
import CreateGiveawayStep1 from './Step1';
import CreateGiveawayStep2 from './Step2';
import CreateGiveawayStep3 from './Step3';
import CreateGiveawayStep4 from './Step4';
import TxReceipt from '../../../components/TxReceipt';

interface Giveaway {
    metadataURI: string;
    funder: string;
    airdropToken: string;
    whitelistStartTime: number;
    whitelistEndTime: number;
    withdrawDelay: number;
}

export default function GiveawayCreator() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [formData, setFormData] = useState<Giveaway>({
        metadataURI: "https://",
        funder: "0x",
        airdropToken: "0x",
        whitelistStartTime: 0,
        whitelistEndTime: 0,
        withdrawDelay: 60 * 20,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const { authenticated, login } = usePrivy();
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txReceiptTitle] = useState<string>("Successfully Created New Giveaway");
    const [txHash, setTxHash] = useState<`0x${string}`>("0x");

    const navigate = useNavigate();

    const components = [
        <CreateGiveawayStep1 formData={formData} setFormData={setFormData} />,
        <CreateGiveawayStep2 formData={formData} setFormData={setFormData} />,
        // <CreateGiveawayStep3 formData={formData} setFormData={setFormData} />,
        <CreateGiveawayStep4 formData={formData} />,
    ];

    async function handleNext() {
        if (!authenticated) {
            toast("Login Wallet");
            login();
            return;
        }

        if (currentPage === 0) {
            const { metadataURI, funder, airdropToken } = formData;
            if (metadataURI === "https://") {
                toast("Please include metadata URI to provide project information");
                return;
            }

            const isValidToken = await isValidERC20(airdropToken);

            if (!isValidToken) {
                toast("Make sure airdrop token is a valid ERC20 Token");
                return;
            }

            if (funder === "0x" || airdropToken === "0x") {
                toast("Please provide valid addresses");
                return;
            }

            setCurrentPage(1);
            return;
        }

        if (currentPage === 1) {
            const { withdrawDelay, whitelistStartTime, whitelistEndTime } = formData;

            if (isBefore(new Date(whitelistStartTime * 1000), new Date())) {
                toast("Start time cannot be in the past");
                return;
            }

            if (isAfter(new Date(whitelistStartTime * 1000), new Date(whitelistEndTime * 1000))) {
                toast("End time must be after start time");
                return;
            }

            if (withdrawDelay === 0) {
                toast("Withdrawal delay can't be set to zero days");
                return;
            }

            setCurrentPage(2);
            return;
        }

        // if (currentPage === 2) {
        //     setCurrentPage(3);
        //     return;
        // }

        if (currentPage === (components.length - 1)) {
            await createGiveaway();
        }
    }

    async function createGiveaway() {
        setLoading(true);
        const airdropFactoryCA = getContractAddress('airdropFactory');

        if (!authenticated) {
            login();
            return;
        }

        try {
            const { metadataURI, funder, airdropToken, whitelistStartTime, whitelistEndTime, withdrawDelay } = formData;

            // Process Wallet
            const walletClient = await createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            if (!account) {
                toast("Connect Wallet");
                return;
            }

            const { request, result } = await publicClient.simulateContract({
                address: airdropFactoryCA,
                abi: AirdropFactoryABI,
                functionName: "createAirdrop",
                account,
                args: [
                    metadataURI,
                    funder,
                    airdropToken,
                    whitelistStartTime,
                    whitelistEndTime,
                    withdrawDelay
                ]
            });

            const hash = await walletClient.writeContract(request);
            console.log(hash, result);
            setTxHash(hash);
            setShowTxModal(true);

            toast("Successfully Created New Giveaway");
            setTimeout(async () => {
                // Verify Transaction is Complete
                const receipt = await publicClient.getTransactionReceipt({ hash });
                if (receipt && receipt.status === "success") {
                    navigate("/admin/dashboard/giveaways");
                }
            }, 5000);
        } catch (error: any) {
            console.error("Creating New Giveaway Failed", error);
            if (error.message.includes("User rejected the request")) {
                toast("User rejected the request");
                return;
            }
            if (error.message.includes("end timestamp before start should be least 1 hour")) {
                toast("Increase time between start and end of giveaway");
                return;
            }
            toast.error("Creating New Giveaway Failed");
        } finally {
            setLoading(false);
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
                            DerHex Create Giveaway System
                        </p>
                    </div>
                    <div className="w-full h-full lg:w-[70%] bg-[#17043B] p-[20px] lg:p-[40px] flex flex-col items-center justify-center rounded-[16px] space-y-[20px] lg:space-y-[80px]">
                        {components[currentPage]}
                        <div className='mt-[20px] space-y-3 w-full'>
                            <button
                                onClick={handleNext}
                                className={`bg-primary text-white p-[10px_20px] rounded-[8px] w-full h-[50px] flex items-center justify-center`}
                            >
                                {!authenticated ? "Connect Wallet" : loading ? (
                                    <Preloader
                                        use={Oval}
                                        size={32}
                                        strokeWidth={8}
                                        strokeColor="#FFF"
                                        duration={800}
                                    />
                                ) : currentPage === 3 ? "Create Giveaway" : "Continue"}
                            </button>
                            {currentPage !== 0 && (
                                <button
                                    className={`bg-transparent border-2 border-white text-white p-[10px_20px] rounded-[8px] w-full h-[50px] flex items-center justify-center`}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Back
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 