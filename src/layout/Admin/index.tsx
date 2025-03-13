import { useEffect } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useWallets } from "@privy-io/react-auth";

function Layout({ children }: { children: ReactNode }) {
    const { wallets } = useWallets();
    const navigate = useNavigate();
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
            <nav className="p-4">
                <ul className="flex space-x-4">
                    <li>
                        <a href="/admin/dashboard" className="text-primary hover:text-primary/70">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/admin/dashboard/staking-pool" className="text-primary hover:text-primary/70">
                            Staking Pools
                        </a>
                    </li>
                    <li>
                        <a href="/admin/dashboard/lock-stake" className="text-primary hover:text-primary/70">
                            Lock & Stake
                        </a>
                    </li>
                    <li>
                        <a href="/admin/dashboard/presales" className="text-primary hover:text-primary/70">
                            Presales
                        </a>
                    </li>
                </ul>
            </nav>
            {children}
        </main>
    )
}

export default Layout;