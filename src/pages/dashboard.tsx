// import React from 'react'
import DashComp from '../components/Dashboard'
import JoinedPool from '../components/Dashboard/JoinedPool'
import Reward from '../components/Dashboard/Reward'
import FeaturedIdo from '../components/Home/FeaturedIdo'
import Layout from '../layout'
import { usePageTitle } from '../hooks/utils'
import { usePrivy } from '@privy-io/react-auth'

function Dashboard() {
  usePageTitle("Your Dashboard")
  const { authenticated } = usePrivy();


  return (
    <Layout>
      <DashComp />
      {authenticated && (
        <>
          <Reward />
          <JoinedPool />
        </>
      )}
      <FeaturedIdo />
    </Layout>
  )
}

export default Dashboard