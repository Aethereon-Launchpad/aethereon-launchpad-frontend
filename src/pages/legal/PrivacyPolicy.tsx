import Layout from "../../layout/Main";

export default function PrivacyPolicy() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-12 text-white">
                <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
                
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">1. Introduction</h2>
                        <p className="text-gray-300">
                            This Privacy Policy explains how we collect, use, process, and disclose your information when you use our platform and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">2. Information We Collect</h2>
                        <div className="space-y-3">
                            <p className="text-gray-300">We collect information that you provide directly to us:</p>
                            <ul className="list-disc pl-6 text-gray-300 space-y-2">
                                <li>Wallet addresses and transaction data</li>
                                <li>Communication data when you contact us</li>
                                <li>Technical data (IP address, browser type, device information)</li>
                                <li>Usage data related to your interactions with our platform</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>To provide and maintain our services</li>
                            <li>To process your transactions</li>
                            <li>To communicate with you about updates and changes</li>
                            <li>To detect and prevent fraud or unauthorized access</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">4. Information Sharing</h2>
                        <p className="text-gray-300">
                            We do not sell or rent your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-2">
                            <li>Service providers who assist in our operations</li>
                            <li>Law enforcement when required by law</li>
                            <li>Other parties with your consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">5. Security</h2>
                        <p className="text-gray-300">
                            We implement appropriate technical and organizational measures to protect your information. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">6. Updates to This Policy</h2>
                        <p className="text-gray-300">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">7. Contact Us</h2>
                        <p className="text-gray-300">
                            If you have any questions about this Privacy Policy, please contact us at support@derhex.com
                        </p>
                    </section>
                </div>
            </div>
        </Layout>
    );
} 