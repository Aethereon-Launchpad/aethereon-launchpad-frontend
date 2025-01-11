// import React from 'react'
import Subscribe from '../components/Global/Subscribe'
import GovHero from '../components/Governance/GovHero'
import VotingRewards from '../components/Governance/VotingRewards'
import Layout from '../layout'

function Governance() {
  return (
    <Layout>
        <GovHero/>
        <VotingRewards/>
        <Subscribe/>
    </Layout>
  )
}

export default Governance