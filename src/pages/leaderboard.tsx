// import React from 'react'

import LeaderHero from "../components/Leaderboard/LeaderHero"
import LeaderTable from "../components/Leaderboard/LeaderTable"
import Layout from "../layout"

function Leaderboard() {
  return (
    <Layout>
        <LeaderHero/>
        <LeaderTable/>
    </Layout>
  )
}

export default Leaderboard