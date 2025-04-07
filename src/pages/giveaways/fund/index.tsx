import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { Preloader, Oval } from 'react-preloader-icon';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import Layout from '../../../layout/Main';
import { useGiveaway } from '../../../hooks/web3/useGiveaway';
import { publicClient } from '../../../config';
import { createViemWalletClient, getTokenAllowance } from '../../../utils/web3/actions';
import AirdropABI from '../../../abis/Airdrop.json';
import TxReceipt from '../../../components/TxReceipt';
import { Input } from '../../../components/Form';
import erc20Abi from '../../../abis/ERC20.json';

export default function FundGiveaway() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authenticated, login } = usePrivy();
    const { data: giveaway, loading: giveawayLoading, refetch } = useGiveaway(id as `0x${string}`);
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showTxModal, setShowTxModal] = useState<boolean>(false);
    const [txHash, setTxHash] = useState<`0x${string}`>("0x");

    async function handleFund() {
        if (!authenticated) {
            toast("Login Wallet");
            login();
            return;
        }

        if (!amount || Number(amount) <= 0) {
            toast("Please enter a valid amount");
            return;
        }

        setLoading(true);
        try {
            const walletClient = await createViemWalletClient();
            const [account] = await walletClient.getAddresses();

            if (!account) {
                toast("Connect Wallet");
                return;
            }

            const formattedAmount = ethers.parseUnits(amount, giveaway.airdropToken.decimals);

            // Check and approve token allowance
            const allowance = await getTokenAllowance(
                giveaway.airdropToken.id,
                giveaway.id,
                account
            );

            if (Number(allowance) < Number(formattedAmount)) {
                // Approve token spending
                const { request: approveRequest } = await publicClient.simulateContract({
                    address: giveaway.airdropToken.id as `0x${string}`,
                    abi: erc20Abi,
                    functionName: "approve",
                    account,
                    args: [giveaway.id, formattedAmount]
                });

                const approveHash = await walletClient.writeContract(approveRequest);
                await publicClient.waitForTransactionReceipt({ hash: approveHash });
            }

            // Fund the airdrop
            const { request: fundRequest } = await publicClient.simulateContract({
                address: giveaway.id as `0x${string}`,
                abi: AirdropABI,
                functionName: "fundAirdrop",
                account,
                args: [formattedAmount]
            });

            const hash = await walletClient.writeContract(fundRequest);
            setTxHash(hash);
            setShowTxModal(true);

            toast("Successfully Funded Giveaway");
            setTimeout(async () => {
                const receipt = await publicClient.waitForTransactionReceipt({ hash });
                if (receipt && receipt.status === "success") {
                    refetch();
                }
            }, 5000);
        } catch (error: any) {
            console.error("Funding Giveaway Failed", error);
            if (error.message.includes("User rejected the request")) {
                toast("User rejected the request");
                return;
            }
            toast.error("Funding Giveaway Failed");
        } finally {
            setLoading(false);
        }
    }

    if (giveawayLoading) {
        return (
            <Layout>
                <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
                    <div>Loading giveaway details...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <TxReceipt
                visible={showTxModal}
                onClose={() => setShowTxModal(false)}
                title="Successfully Funded Giveaway"
                txHash={txHash}
            />
            <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
                <div className="flex flex-col gap-[20px] text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-[24px] lg:text-[36px] font-[500]">
                            Fund Giveaway
                        </h1>
                        <button
                            onClick={() => navigate(`/admin/dashboard/giveaways/manage/${id}`)}
                            className="bg-transparent border border-white text-white px-4 py-2 rounded-lg"
                        >
                            Back to Giveaway
                        </button>
                    </div>

                    <div className="bg-[#17043B] p-6 rounded-lg space-y-6 max-w-xl">
                        <div className="space-y-2">
                            <p className="text-gray-400">Token</p>
                            <p className="text-white">{giveaway?.airdropToken.symbol}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-400">Current Balance</p>
                            <p className="text-white">{giveaway?.totalAvailableRewards}</p>
                        </div>
                        <Input
                            label="Amount to Fund"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <button
                            onClick={handleFund}
                            disabled={loading}
                            className="bg-primary text-white px-4 py-2 rounded-lg w-full h-[50px] flex items-center justify-center"
                        >
                            {loading ? (
                                <Preloader
                                    use={Oval}
                                    size={32}
                                    strokeWidth={8}
                                    strokeColor="#FFF"
                                    duration={800}
                                />
                            ) : (
                                "Fund Giveaway"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
} 