// import React from 'react'
import Subscribe from '../components/Global/Subscribe'
import Funded from '../components/Launchpad/Funded'
import LaunchHero from '../components/Launchpad/LaunchHero'
import Multichain from '../components/Launchpad/Multichain'
import Secure from '../components/Launchpad/Secure'
import Trusted from '../components/Launchpad/Trusted'
import UpcomingIdo from '../components/Launchpad/UpcomingIdo'
import Layout from '../layout'

function Launchpad() {
  return (
    <Layout>
        <LaunchHero/>
          <Trusted/>
          <Secure/>
        <UpcomingIdo/>
        <Funded/>
        <Multichain/>
        <Subscribe/>
    </Layout>
  )
}

export default Launchpad