// import React from 'react'

import Dynamic from "../components/Dynamic"
import Layout from "../layout"
import { usePageTitle } from "../hooks/utils"

function DynamicRewards() {
  usePageTitle("Lock & Stake for Presale Rewards")
  return (
    <Layout>
        <Dynamic/>
    </Layout>
  )
}

export default DynamicRewards