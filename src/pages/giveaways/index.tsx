import { usePageTitle } from "../../hooks/utils"
import Layout from '../../layout'
import Hero from "../../components/Giveaways/Hero"
import CompletedGiveaways from "../../components/Giveaways/CompletedGiveaway"

export default function Giveaways() {
    usePageTitle("Giveaways")
    return (
        <Layout>
            <Hero/>
            <CompletedGiveaways/>
        </Layout>
    )
}