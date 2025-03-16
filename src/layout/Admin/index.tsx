import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useWallets, usePrivy } from "@privy-io/react-auth";
import { FiHome, FiDatabase, FiLock, FiShoppingCart } from "react-icons/fi";
function Layout({ children }: { children: ReactNode }) {
    const { wallets } = useWallets();
    const { login, authenticated } = usePrivy();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const ADMIN_WALLET: `0x${string}` = "0x426DcF053185c099cbE05dcb23775544bbEe16d6"

    // useEffect(() => {
    //     const wallet = wallets[0];
    //     if (!wallet) {
    //         navigate("/admin")
    //         return;
    //     }

    //     if (wallet.address.toLowerCase() !== ADMIN_WALLET) {
    //         navigate("/admin")
    //         return;
    //     }
    // }, [wallets])



    return (
        <main className="bg-black min-h-screen">
            <div className="topbar-gradient py-[10px] font-space flex items-center justify-between uppercase text-white text-[12px] lg:text-[17px] px-4">
                <span>DerHex - Fueling the Future of Blockchain - Get In Early</span>
                {!authenticated ? (
                    <button
                        onClick={login}
                        className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Connect Wallet
                    </button>
                ) : (
                    <div className="text-sm">
                        Connected: {wallets[0]?.address.slice(0, 6)}...{wallets[0]?.address.slice(-4)}
                    </div>
                )}
            </div>
            <nav className="p-6 border-b border-gray-800">
                <div className="md:hidden flex justify-end">
                    <button
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-primary focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <ul className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex space-x-6`}>
                    <li>
                        <a href="/admin/dashboard" className="flex items-center text-primary hover:text-primary/70 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-800">
                            <FiHome className="mr-2" />
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/admin/dashboard/presales" className="flex items-center text-primary hover:text-primary/70 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-800">
                            <FiShoppingCart className="mr-2" />
                            Presales
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="p-8">
                {children}
            </div>
        </main>
    )
}

export default Layout;