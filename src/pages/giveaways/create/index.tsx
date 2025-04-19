import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { Preloader, Oval } from 'react-preloader-icon';
import { toast } from 'react-hot-toast';
import { isBefore, isAfter } from 'date-fns';
import { ethers } from 'ethers';
import Layout from '../../../layout/Admin';
import { createViemWalletClient } from '../../../utils/web3/actions';
import { getContractAddress } from '../../../utils/source';
import AirdropFactoryABI from '../../../abis/AirdropFactory.json';
import { isValidERC20 } from '../../../utils/web3/actions';
import { useChain } from '../../../context/ChainContext';
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
    const { publicClient, selectedChain } = useChain();

    const navigate = useNavigate();

    // Helper function to get the chain name
    const getChainName = () => {
        return selectedChain === "84532" ? "Base Sepolia" :
            selectedChain === "57054" ? "Sonic" : "Rise";
    };

    // Log when the selected chain changes
    useEffect(() => {
        console.log(`GiveawayCreator: Chain changed to ${getChainName()} (${selectedChain})`);
    }, [selectedChain]);

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

            try {
                // Use the current chain's publicClient to validate the token
                console.log(`Validating ERC20 token ${airdropToken} on chain ${selectedChain}`);
                const isValidToken = await isValidERC20(airdropToken);

                if (!isValidToken) {
                    toast.error(`Make sure airdrop token is a valid ERC20 Token on ${getChainName()} Testnet`);
                    return;
                }
                console.log(`Token ${airdropToken} is valid on chain ${selectedChain}`);
            } catch (error) {
                console.error(`Error validating token on chain ${selectedChain}:`, error);
                toast.error(`Error validating token on ${getChainName()} Testnet`);
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

        console.log(`Creating giveaway on chain: ${selectedChain}`);

        try {
            const { metadataURI, funder, airdropToken, whitelistStartTime, whitelistEndTime, withdrawDelay } = formData;

            // Process Wallet
            const walletClient = await createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            if (!account) {
                toast("Connect Wallet");
                return;
            }

            // Verify the contract exists on the current chain
            if (!airdropFactoryCA) {
                toast.error(`Airdrop factory contract not available on ${getChainName()} Testnet`);
                return;
            }

            // Simulate the contract call
            console.log(`Simulating contract call on chain ${selectedChain} with factory address: ${airdropFactoryCA}`);
            const { request } = await publicClient.simulateContract({
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

            // Execute the transaction
            console.log(`Executing transaction on chain ${selectedChain}`);
            const hash = await walletClient.writeContract(request);
            console.log(`Transaction submitted with hash: ${hash}`);
            setTxHash(hash);
            setShowTxModal(true);

            toast.success("Successfully Created New Giveaway");

            // Wait for transaction confirmation
            setTimeout(async () => {
                try {
                    // Verify Transaction is Complete
                    console.log(`Checking transaction receipt on chain ${selectedChain}`);
                    const receipt = await publicClient.getTransactionReceipt({ hash });

                    if (receipt && receipt.status === "success") {
                        console.log(`Transaction confirmed successfully on chain ${selectedChain}`);
                        navigate("/admin/dashboard/giveaways");
                    } else {
                        console.warn(`Transaction failed or pending on chain ${selectedChain}`);
                        toast.error("Transaction may have failed. Please check your wallet for details.");
                    }
                } catch (receiptError) {
                    console.error(`Error getting transaction receipt on chain ${selectedChain}:`, receiptError);
                    toast.error("Unable to verify transaction status. Please check your wallet.");
                }
            }, 5000);
        } catch (error: any) {
            console.error(`Creating New Giveaway Failed on chain ${selectedChain}:`, error);

            if (error.message.includes("User rejected the request")) {
                toast("User rejected the request");
                return;
            }
            if (error.message.includes("end timestamp before start should be least 1 hour")) {
                toast("Increase time between start and end of giveaway");
                return;
            }
            if (error.message.includes("network disconnected") || error.message.includes("network error")) {
                toast.error(`Network error on ${getChainName()} Testnet. Please try again later.`);
                return;
            }
            if (error.message.includes("contract not deployed")) {
                toast.error(`Contract not deployed on ${getChainName()} Testnet. Please switch to a supported chain.`);
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
                        <div className="text-center">
                            <p className="text-[20px] lg:text-[36px] font-[500] mb-2">
                                DerHex Create Giveaway System
                            </p>
                            <div className="inline-flex items-center gap-2 bg-[#291254] px-4 py-2 rounded-full">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="text-sm font-medium">
                                    {getChainName()} Testnet
                                </span>
                            </div>
                        </div>
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
                                ) : currentPage === 3 ? `Create Giveaway on ${getChainName()} Testnet` : "Continue"}
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