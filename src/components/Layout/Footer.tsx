import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-[#12092B]/50 border-t border-primary/20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-primary font-semibold mb-4">About DerHex</h3>
                        <p className="text-gray-300 text-sm">
                            DerHex is a decentralized platform offering token launches, staking, and governance solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-primary font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link to="/launchpad" className="hover:text-primary transition-colors">
                                    Launchpad
                                </Link>
                            </li>
                            <li>
                                <Link to="/staking-pool" className="hover:text-primary transition-colors">
                                    Staking
                                </Link>
                            </li>
                            <li>
                                <Link to="/governance" className="hover:text-primary transition-colors">
                                    Governance
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="text-primary font-semibold mb-4">Community</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="https://twitter.com/derhex" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://t.me/derhex" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a href="https://discord.gg/derhex" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                    Discord
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-primary font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/cookies-policy" className="hover:text-primary transition-colors">
                                    Cookies Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/disclaimer" className="hover:text-primary transition-colors">
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-primary/20 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} DerHex. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 