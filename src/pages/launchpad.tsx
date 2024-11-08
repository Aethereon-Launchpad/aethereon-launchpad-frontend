// import React from 'react'
import Funded from '../components/Launchpad/Funded'
import LaunchHero from '../components/Launchpad/LaunchHero'
import UpcomingIdo from '../components/Launchpad/UpcomingIdo'
import Layout from '../layout'

function Launchpad() {
  return (
    <Layout>
        <LaunchHero/>
        <UpcomingIdo/>
        <Funded/>
    </Layout>
  )
}

export default Launchpad