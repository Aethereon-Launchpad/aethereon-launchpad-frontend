import Layout from "../../layout/Main";

export default function Disclaimer() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-12 text-white">
                <h1 className="text-3xl font-bold text-primary mb-8">Disclaimer</h1>
                
                <div className="space-y-6">
                    <p className="text-gray-300">
                        This document is a legal notice for users of DerHex's materials, including the whitepaper, roadmap, and related content.
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">Nature of Information</h2>
                        <p className="text-gray-300">
                            The information provided in our roadmap is based on projections and estimates. It is not a guaranteed release schedule. All information within our whitepaper and roadmap is for informational purposes only and should not be considered financial advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">No Inducement for Token Purchase</h2>
                        <p className="text-gray-300">
                            The content herein should not be interpreted as an inducement to purchase DerHex's utility token ($DRX). $DRX is intended primarily for interaction with the DerHex platform, as available at the time of the token sale.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">Limited Use of $DRX</h2>
                        <p className="text-gray-300">
                            $DRX is designed exclusively for use within the DerHex ecosystem. We make no representations or warranties about the value, security, or suitability of $DRX for any other purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">No Guarantee of Value</h2>
                        <p className="text-gray-300">
                            The value of $DRX may fluctuate, and there is no guarantee of its value. Users should exercise caution and not assume any promise of financial gain.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">Due Diligence and Professional Advice</h2>
                        <p className="text-gray-300">
                            Prospective investors are strongly encouraged to perform due diligence and consult with professional advisors before making any investment decisions related to $DRX.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">Release of Liability</h2>
                        <p className="text-gray-300">
                            By accessing, reading, or using the information in our whitepaper, website, and roadmap, you agree to release and hold harmless DerHex, its affiliates, and respective officers, directors, employees, agents, and successors from any claims, losses, liabilities, damages, costs, and expenses, including reasonable attorneys' fees, arising from or related to the use of the information provided.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">Acknowledgment of Risk</h2>
                        <p className="text-gray-300">
                            Investing in cryptocurrency tokens like $DRX involves a high degree of risk, including the potential loss of your entire investment.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">Governing Law and Dispute Resolution</h2>
                        <p className="text-gray-300">
                            This disclaimer is governed by the laws of the State of Delaware, United States. Any disputes arising from or in connection with this disclaimer shall be resolved through arbitration in Delaware in accordance with the rules of the American Arbitration Association.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">Modification and Notice</h2>
                        <p className="text-gray-300">
                            DerHex reserves the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on our website.
                        </p>
                    </section>

                    <p className="text-gray-300 mt-8">
                        By continuing to access or use our information, you acknowledge and accept this disclaimer.
                    </p>

                    <p className="text-gray-300">
                        In addition, please read our Agreement for Sale of Tokens.
                    </p>
                </div>
            </div>
        </Layout>
    );
} 