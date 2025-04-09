// import React from 'react'
import Subscribe from '../components/Global/Subscribe'
import Access from '../components/Launchpad/Access'
import Funded from '../components/Launchpad/Funded'
import HowTo from '../components/Launchpad/HowTo'
import LaunchHero from '../components/Launchpad/LaunchHero'
import Multichain from '../components/Launchpad/Multichain'
import Secure from '../components/Launchpad/Secure'
import StakingBadge from '../components/Launchpad/StakingBadge'
import Trusted from '../components/Launchpad/Trusted'
// import UpcomingIdo from '../components/Launchpad/UpcomingIdo'
import FeaturedIdo from '../components/Home/FeaturedIdo'
import Layout from '../layout'
import CompletedIDO from '../components/Home/CompletedIDO'
import FAQ from '../components/Home/FAQ'
import { usePageTitle } from '../hooks/utils'

function Launchpad() {
  usePageTitle("Discover and Invest in Early-Stage Blockchain Projects")
  return (
    <Layout>
      <LaunchHero />
      <HowTo />
      <StakingBadge />
      {/* <Trusted /> */}
      <Secure />
      {/* <Funded/> */}
      <FeaturedIdo />
      <CompletedIDO />
      <Access />
      {/* <Multichain/> */}
      <FAQ />
      <Subscribe />
    </Layout>
  )
}

export default Launchpad