// import React from 'react'

import Community from "../components/Global/Community"
import Subscribe from "../components/Global/Subscribe"
import FeaturedIdo from "../components/Home/FeaturedIdo"
import Guaranteed from "../components/Home/Guaranteed"
import HomeHero from "../components/Home/HomeHero"
import Unlock from "../components/Home/Unlock"
import Layout from "../layout"
import Trusted from "../components/Launchpad/Trusted"
import HowTo from "../components/Launchpad/HowTo"
import CompletedIDO from "../components/Home/CompletedIDO"
import { usePageTitle } from "../hooks/utils"
import StakingCTA from "../components/Home/StakingCTA"
import BondsCTA from "../components/Home/BondsCTA"
import FAQ from "../components/Home/FAQ"
import Access from "../components/Launchpad/Access"
import StakingBadge from "../components/Launchpad/StakingBadge"
import SupportedBy from "../components/Home/SupportedBy"
// import CompletedGiveaways from "../components/Giveaways/CompletedGiveaway"
import LaunchProject from "../components/Launchpad/LaunchProject"
import UpComingGiveaways from "../components/Giveaways/UpComingGiveaway"

function Home() {
  usePageTitle("Aethereon | The Premier Solana Launchpad for Next-Generation Blockchain Projects")
  return (
    <Layout>
      <HomeHero />
      <Trusted />
      <SupportedBy />
      {/* <Unlock /> */}
      <HowTo />
      <StakingBadge />
      <FeaturedIdo />
      <CompletedIDO />
      <BondsCTA />
      <Guaranteed />
      <UpComingGiveaways />
      <StakingCTA />
      <LaunchProject />
      {/* <Community /> */}
      <Access />
      <FAQ />
      <Subscribe />
    </Layout>
  )
}

export default Home
