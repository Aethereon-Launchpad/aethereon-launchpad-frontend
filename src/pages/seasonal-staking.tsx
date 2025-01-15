// import React from 'react'

import SeasonalHero from "../components/Seasonal/SeasonalHero"
import SeasonNfts from "../components/Seasonal/SeasonNfts"
import SeasonTable from "../components/Seasonal/SeasonTable"
import Layout from "../layout"

function SeasonalStaking() {
  return (
    <Layout>
      <SeasonalHero/>
      <SeasonTable/>
      <SeasonNfts/>
    </Layout>
  )
}

export default SeasonalStaking