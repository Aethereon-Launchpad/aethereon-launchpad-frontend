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
import { sonic } from "viem/chains";
import { publicClient } from "../../../config";
import { createWalletClient, custom } from "viem";
import { BaseError, ContractFunctionRevertedError } from 'viem';
import { toast } from 'react-hot-toast';

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
            setCurrentPage(2)
            return;
        }


        if (currentPage === 2) {
            setCurrentPage(3)
            return
        }

        if (currentPage === components.length - 1) {
            await createPresale()
        }
    }


    async function createPresale() {
        setLoading(true)
        try {

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    return (
        <Layout>
            <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
                <div className="flex flex-col lg:flex-row items-start gap-[20px] text-white">
                    <div className="w-full h-full lg:w-[30%] ">
                        <p className="text-[20px] lg:text-[36px] font-[500]">
                            DerHex Create Presale System
                        </p>
                        <div className="w-full flex items-center lg:hidden mt-[40px]  justify-between">
                            <div className="flex   w-full items-center">
                                <div className="w-fit  flex flex-col lg:flex-row items-center space-x-[5px]">
                                    <div
                                        className={`${currentPage > 0 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                                            } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                                    >
                                        {currentPage > 0 ? (
                                            <FaCheck className="text-white text-[20px]" />
                                        ) : (
                                            <p className="text-white text-[20px] font-[600]">1</p>
                                        )}
                                    </div>
                                    <p className="font-[500] text-[#848895] text-[14px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                                        Token Information
                                    </p>
                                </div>
                                <div
                                    className={` ${currentPage > 0 ? "border-[#28C76B]" : "border-[#5325A9] "
                                        } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
                                ></div>
                            </div>
                            <div className="flex w-full items-center">
                                <div className="w-fit  flex flex-col lg:flex-row items-center space-x-[5px]">
                                    <div
                                        className={`${currentPage > 1 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                                            } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                                    >
                                        {currentPage > 1 ? (
                                            <FaCheck className="text-white text-[20px]" />
                                        ) : (
                                            <p className="text-white text-[20px] font-[600]">1</p>
                                        )}
                                    </div>
                                    <p className="font-[500] text-[#848895] text-[14px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                                        Staking Information
                                    </p>
                                </div>
                                <div
                                    className={` ${currentPage > 1 ? "border-[#28C76B]" : "border-[#5325A9] "
                                        } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
                                ></div>
                            </div>
                            <div className="flex  flex-col lg:mt-[20px] items-center">
                                <div className="flex flex-col lg:flex-row items-center space-x-[5px]">
                                    <div
                                        className={`${currentPage > 2 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                                            } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                                    >
                                        {currentPage > 2 ? (
                                            <FaCheck className="text-white text-[20px]" />
                                        ) : (
                                            <p className="text-white text-[20px] font-[600]">3</p>
                                        )}
                                    </div>
                                    <p className="font-[500] text-[#848895] text-[14px] w-[100px]   text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                                        Review & Submit
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden w-full lg:flex flex-row lg:flex-col mt-[20px] items-start justify-start">
                            <div className="flex-1 flex flex-row lg:flex-col lg:space-y-[10px] items-start">
                                <div className="flex flex-col lg:flex-row items-center lg:space-x-[5px]">
                                    <div
                                        className={`${currentPage > 0 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                                            } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                                    >
                                        {currentPage > 0 ? (
                                            <FaCheck className="text-white text-[20px]" />
                                        ) : (
                                            <p className="text-white text-[20px] font-[600]">1</p>
                                        )}
                                    </div>
                                    <p className="font-[500] text-[#848895] text-[12px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                                        Presale Details
                                    </p>
                                </div>
                                <div className="w-full lg:w-[40px] min-h-full flex justify-center items-center">
                                    <div
                                        className={` ${currentPage > 0 ? "border-[#28C76B]" : "border-[#5325A9] "
                                            } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex-1  flex flex-vrow lg:flex-col lg:mt-[20px] space-y-[10px] items-start">
                                <div className="w-full flex flex-col lg:flex-row items-center space-x-[5px]">
                                    <div
                                        className={`${currentPage > 1 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                                            } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                                    >
                                        {currentPage > 1 ? (
                                            <FaCheck className="text-white text-[20px]" />
                                        ) : (
                                            <p className="text-white text-[20px] font-[600]">2</p>
                                        )}
                                    </div>
                                    <p className="font-[500] text-[#848895] text-[12px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                                        Timing Configuration
                                    </p>
                                </div>
                                <div className="w-[40px] flex justify-center items-center">
                                    <div className="w-full lg:w-[40px] min-h-full flex justify-center items-center">
                                        <div
                                            className={` ${currentPage > 1 ? "border-[#28C76B]" : "border-[#5325A9] "
                                                } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
                                        ></div>
                                    </div>{" "}
                                </div>
                            </div>
                            <div className="flex-1  flex flex-vrow lg:flex-col lg:mt-[20px] space-y-[10px] items-start">
                                <div className="w-full flex flex-col lg:flex-row items-center space-x-[5px]">
                                    <div
                                        className={`${currentPage > 2 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                                            } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                                    >
                                        {currentPage > 2 ? (
                                            <FaCheck className="text-white text-[20px]" />
                                        ) : (
                                            <p className="text-white text-[20px] font-[600]">3</p>
                                        )}
                                    </div>
                                    <p className="font-[500] text-[#848895] text-[12px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                                        Payment Configuration
                                    </p>
                                </div>
                                <div className="w-[40px] flex justify-center items-center">
                                    <div className="w-full lg:w-[40px] min-h-full flex justify-center items-center">
                                        <div
                                            className={` ${currentPage > 2 ? "border-[#28C76B]" : "border-[#5325A9] "
                                                } w-full lg:w-fit  lg:h-[150px] border border-dotted"`}
                                        ></div>
                                    </div>{" "}
                                </div>
                            </div>
                            <div className="flex flex-col mt-[20px] items-center">
                                <div className="flex items-center space-x-[5px]">
                                    <div
                                        className={`${currentPage > 3 ? "bg-[#28C76B]" : "border-[#8949FF] bg-[#291254]"
                                            } h-[40px] w-[40px] border rounded-full flex items-center justify-center`}
                                    >
                                        {currentPage > 2 ? (
                                            <FaCheck className="text-white text-[20px]" />
                                        ) : (
                                            <p className="text-white text-[20px] font-[600]">4</p>
                                        )}
                                    </div>
                                    <p className="font-[500] text-[#848895] text-[12px] text-center leading-[15px] lg:leading-[20px] mt-[5px] lg:mt-0 lg:text-[16px]">
                                        Review & Submit
                                    </p>
                                </div>
                            </div>
                        </div>
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