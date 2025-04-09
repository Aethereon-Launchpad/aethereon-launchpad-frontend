import { Link } from 'react-router-dom';
import { usePrivy } from "@privy-io/react-auth";
import { IoWalletSharp } from "react-icons/io5";

export default function Navbar() {
    const { authenticated, login, logout } = usePrivy();

    return (
        <nav className="bg-[#12092B]/50 border-b border-primary/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src="/der-mob.svg" alt="DerHex" className="h-8" />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/launchpad" className="text-gray-300 hover:text-primary transition-colors">
                            Launchpad
                        </Link>
                        <Link to="/giveaway" className="text-gray-300 hover:text-primary transition-colors">
                            Giveaway
                        </Link>
                        <Link to="/staking-pool" className="text-gray-300 hover:text-primary transition-colors">
                            Staking
                        </Link>
                        <Link to="/governance" className="text-gray-300 hover:text-primary transition-colors">
                            Governance
                        </Link>
                        <Link to="/dashboard" className="text-gray-300 hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                    </div>

                    {/* Wallet Connection */}
                    <div>
                        {authenticated ? (
                            <button
                                onClick={() => logout()}
                                className="bg-primary/90 hover:bg-primary px-4 py-2 rounded-[8px] text-white font-medium flex items-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                            >
                                <IoWalletSharp className="w-5 h-5" />
                                <span>Disconnect</span>
                            </button>
                        ) : (
                            <button
                                onClick={() => login()}
                                className="bg-primary/90 hover:bg-primary px-4 py-2 rounded-[8px] text-white font-medium flex items-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                            >
                                <IoWalletSharp className="w-5 h-5" />
                                <span>Connect Wallet</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
} 