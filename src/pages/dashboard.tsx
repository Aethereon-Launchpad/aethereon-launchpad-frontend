// import React from 'react'
import DashComp from '../components/Dashboard'
import JoinedPool from '../components/Dashboard/JoinedPool'
import Reward from '../components/Dashboard/Reward'
import UpcomingIdo from '../components/Launchpad/UpcomingIdo'
import Layout from '../layout'

function Dashboard() {
  return (
    <Layout>
      <DashComp/>
      <Reward/>
      <JoinedPool/>
      <UpcomingIdo/>
    </Layout>
  )
}

export default Dashboard