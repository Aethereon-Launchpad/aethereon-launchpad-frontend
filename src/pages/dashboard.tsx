// import React from 'react'
import DashComp from '../components/Dashboard'
import JoinedPool from '../components/Dashboard/JoinedPool'
import Reward from '../components/Dashboard/Reward'
import FeaturedIdo from '../components/Home/FeaturedIdo'
import Layout from '../layout'

function Dashboard() {
  return (
    <Layout>
      <DashComp />
      <Reward />
      <JoinedPool />
      <FeaturedIdo />
    </Layout>
  )
}

export default Dashboard