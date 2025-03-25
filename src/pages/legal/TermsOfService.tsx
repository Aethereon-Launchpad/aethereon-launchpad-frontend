import Layout from "../../layout/Main";

export default function TermsOfService() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-12 text-white">
                <h1 className="text-3xl font-bold text-primary mb-8">Terms of Service</h1>
                
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-300">
                            By accessing and using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">2. Platform Services</h2>
                        <p className="text-gray-300">
                            Our platform provides decentralized services including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
                            <li>Token presales and launches</li>
                            <li>Staking pools</li>
                            <li>Governance voting</li>
                            <li>Other blockchain-based services</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">3. User Responsibilities</h2>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>You are responsible for maintaining the security of your wallet</li>
                            <li>You agree not to use the platform for any illegal activities</li>
                            <li>You must comply with all applicable laws and regulations</li>
                            <li>You are responsible for paying all applicable taxes</li>
                        </ul>
                    </section>

                    {/* Additional sections... */}
                </div>
            </div>
        </Layout>
    );
} 