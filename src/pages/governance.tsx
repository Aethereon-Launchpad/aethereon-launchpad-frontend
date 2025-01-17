// import React from 'react'
import Subscribe from '../components/Global/Subscribe'
import ActiveProposal from '../components/Governance/ActiveProposal'
import GovHero from '../components/Governance/GovHero'
import GovModel from '../components/Governance/GovModel'
import VotingRewards from '../components/Governance/VotingRewards'
import Layout from '../layout'

function Governance() {
  return (
    <Layout>
        <GovHero/>
        <GovModel/>
        <ActiveProposal/>
        <VotingRewards/>
        <Subscribe/>
    </Layout>
  )
}

export default Governance