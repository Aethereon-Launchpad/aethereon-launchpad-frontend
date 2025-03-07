import IDOInfo from "../../components/IDO/IDOInfo"
import IDOStats from "../../components/IDO/IDOStats"
import Layout from "../../layout"

export default function IDO() {
    return (
        <Layout>
            <div className="w-full grid md:grid-cols-6 grid-cols-1 min-h-screen gap-3 my-20 xl:p-[20px_40px]">
                <div className="col-span-4 md:order-1 order-2">
                    <IDOInfo />
                </div>
                <div className="md:col-span-2 md:order-2 order-1 col-span-4">
                    <IDOStats />
                </div>
            </div>
        </Layout>
    )
}