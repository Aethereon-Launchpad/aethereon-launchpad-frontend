import Layout from "../../../layout/Admin"
import { usePrivy } from "@privy-io/react-auth"
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-hot-toast";
import { usePresale } from "../../../hooks/web3/usePresale";
import { getAllStakingPoolAddress } from "../../../utils/web3/actions";
import { useEffect, useState } from "react";
import { Preloader, ThreeDots } from 'react-preloader-icon';

export default function AdminDashboardPage() {
    const [noOfStakingPools, setNoOfStakingPools] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [adminAddress, setAdminAddress] = useState<`0x${string}`>("0x");
    const { logout, user } = usePrivy();
    const navigate = useNavigate();
    const { data, loading: loadingPresale } = usePresale();

    useEffect(() => {
        async function loadData() {
            try {
                const stakingPools = await getAllStakingPoolAddress()
                setNoOfStakingPools(stakingPools.length);
                if (user?.wallet?.address) {
                    setAdminAddress(user.wallet.address as `0x${string}`)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    function handleLogout() {
        logout();
        navigate("/admin")
        return;
    }


    if (loading || loadingPresale) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <Preloader
                    use={ThreeDots}
                    size={60}
                    strokeWidth={6}
                    strokeColor="#5325A9"
                    duration={2000}
                />
            </div>)
    }


    return (
        <Layout>
            <section className="p-8 text-white space-y-4">
                <img src="/der-mob.svg" alt="" />
                <h1 className="font-space text-xl font-semibold text-primary">Derhex Management Dashboard System</h1>
                <div className="flex gap-5 mb-4">
                    <button
                        className="px-4 py-2 bg-primary text-black rounded hover:bg-primary-300 transition-colors"
                    >
                        Update Settings ⚙
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-black transition-colors"
                    >
                        Logout
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* <DashboardCard title="Admin" value={adminAddress} /> */}
                    <DashboardCard title="No of Staking Pools" value={noOfStakingPools} />
                    <DashboardCard title="No of Presales" value={data.length} />
                    <DashboardCard title="No Of Voting Slots" value={1} />
                </div>
            </section>
        </Layout>
    )
}

function DashboardCard({ title, value }: { title: string; value: string | number | undefined }) {
    return (
        <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800 p-6 rounded-lg shadow-lg truncate">
            <h2 className="text-xl font-semibold mb-2 text-primary">{title}</h2>
            <p className="text-white">{value}</p>
        </motion.div>
    )
}

