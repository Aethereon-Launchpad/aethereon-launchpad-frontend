import Layout from "../../layout/Main";

export default function Disclaimer() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-12 text-white">
                <h1 className="text-3xl font-bold text-primary mb-8">Disclaimer</h1>
                
                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">1. Nature of Information</h2>
                        <p className="text-gray-300">
                            The information provided in our roadmap and documentation is based on projections and estimates. It is not a guaranteed schedule. All information is for informational purposes only and should not be considered financial advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-primary mb-4">2. No Investment Advice</h2>
                        <p className="text-gray-300">
                            The content provided should not be interpreted as an inducement to participate in any token sales or investments. Our platform's tokens are intended primarily for utility within our ecosystem.
                        </p>
                    </section>

                    {/* Additional sections based on ChainGPT's disclaimer... */}
                </div>
            </div>
        </Layout>
    );
} 