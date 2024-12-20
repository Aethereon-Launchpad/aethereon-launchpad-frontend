// import React from 'react'

import Subscribe from "../components/Global/Subscribe"
import Pools from "../components/Staking/Pools"
import StakeHero from "../components/Staking/STakeHero"
import Layout from "../layout"

function Staking() {
  return (
    <Layout>
        <StakeHero/>
        <Pools/>
        <Subscribe/>
    </Layout>
  )
}

export default Staking