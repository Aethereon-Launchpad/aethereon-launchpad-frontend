// import React from 'react'
import Subscribe from '../components/Global/Subscribe'
import ActiveProposal from '../components/Governance/ActiveProposal'
import GovHero from '../components/Governance/GovHero'
import GovModel from '../components/Governance/GovModel'
import VotingRewards from '../components/Governance/VotingRewards'
import Layout from '../layout'
import { usePageTitle } from '../hooks/utils'

function Governance() {
  usePageTitle("Participate in Community Governance")
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