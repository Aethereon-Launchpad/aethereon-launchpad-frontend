// import React from 'react'

import Subscribe from "../components/Global/Subscribe"
import Passive from "../components/Staking/Passive"
import Pools from "../components/Staking/Pools"
import StakeHero from "../components/Staking/StakeHero"
import Layout from "../layout"

function Staking() {
  return (
    <Layout>
        <StakeHero/>
        <Pools/>
        <Passive/>
        <Subscribe/>
    </Layout>
  )
}

export default Staking