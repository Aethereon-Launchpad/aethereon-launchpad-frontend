import Layout from "../../layout/Main";

export default function CookiesPolicy() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-12 text-white">
                <h1 className="text-3xl font-bold text-primary mb-8">Cookies Policy</h1>
                
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">1. What Are Cookies</h2>
                        <p className="text-gray-300">
                            Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">2. How We Use Cookies</h2>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Essential cookies: Required for the platform to function properly</li>
                            <li>Analytics cookies: Help us understand how visitors use our platform</li>
                            <li>Preference cookies: Remember your settings and choices</li>
                            <li>Wallet connection cookies: Maintain your Web3 wallet connection</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">3. Managing Cookies</h2>
                        <p className="text-gray-300">
                            You can control and manage cookies in your browser settings. Please note that removing or blocking cookies may impact your experience on our platform, particularly for features requiring wallet connection.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">4. Third-Party Cookies</h2>
                        <p className="text-gray-300">
                            We may use third-party services that also set cookies. These services include analytics providers and wallet connection services. Each third-party service has its own cookie and privacy policies.
                        </p>
                    </section>
                </div>
            </div>
        </Layout>
    );
} 