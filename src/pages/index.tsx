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
import FAQ from "../components/Home/FAQ"

function Home() {
  usePageTitle("Discover and Invest in Early-Stage Blockchain Projects")
  return (
    <Layout>
      <HomeHero />
      <Trusted />
      {/* <Unlock /> */}
      <HowTo />
      <FeaturedIdo />
      <CompletedIDO />
      <Guaranteed />
      <StakingCTA />
      <Community />
      <FAQ />
      <Subscribe />
    </Layout>
  )
}

export default Home
