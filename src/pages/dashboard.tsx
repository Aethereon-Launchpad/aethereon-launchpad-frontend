// import React from 'react'
import DashComp from '../components/Dashboard'
import UpcomingIdo from '../components/Launchpad/UpcomingIdo'
import Layout from '../layout'

function Dashboard() {
  return (
    <Layout>
      <DashComp/>
      <UpcomingIdo/>
    </Layout>
  )
}

export default Dashboard