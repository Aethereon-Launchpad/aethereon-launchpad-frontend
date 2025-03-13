import { useState } from "react";
import Layout from "../../../../layout/Admin"
import { usePresale } from "../../../../hooks/web3/usePresale";
import SaleCardAdmin from "../../../../components/Global/SaleCardAdmin";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { Link } from "react-router-dom";

export default function AdminManagePresales() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data, error, loading, refetch } = usePresale();

    const filteredData = data.filter((presale: any) => {
        const projectName = presale?.presaleInfo?.projectName?.toLowerCase() || '';
        const contractAddress = presale.id?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        return projectName.includes(search) || contractAddress.includes(search);
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <Preloader
                    use={ThreeDots}
                    size={60}
                    strokeWidth={6}
                    strokeColor="#5325A9"
                    duration={2000}
                />
            </div>
        )
    }

    if (error.message) {
        return (
            <div className="flex items-center justify-center">
                <h3 className="text-red-600 text-xl">{error.message}</h3>
            </div>
        )
    }


    return (
        <Layout>
            <section className="p-8 text-white space-y-8">
                <img src="/der-mob.svg" alt="" />
                <h1 className="font-space text-xl font-semibold text-primary">Manage Existing Presales</h1>
                <div className="flex gap-5 mb-4">
                    <Link
                        to="/admin/dashboard/presale/create"
                        className="px-4 py-2 bg-primary text-black rounded hover:bg-primary-300 transition-colors"
                    >
                        Create New Presale
                    </Link>
                </div>
                <div className="space-y-5">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="searchTerm" className="text-sm font-medium">Search by Presale CA or Project Name</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter contract address or project name..."
                            className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="grid gap-[40px] sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 mt-[40px]">
                        {filteredData.map((presale: any, i: number) => {
                            return (
                                <SaleCardAdmin presale={presale} key={i} />
                            )
                        })}
                    </div>
                </div>
            </section>
        </Layout>

    )
}