import React from 'react'
import Layout from '../../layout'
import Hero from '../../components/Bonds/Hero'
import FeaturedBonds from '../../components/Bonds/Featured'
import LiveAndUpcoming from '../../components/Bonds/LiveandUpcoming'
import PastBonds from '../../components/Bonds/PastBonds'

function Bonds() {
  return (
    <Layout>
        <Hero/>
        <FeaturedBonds/>
        <LiveAndUpcoming/>
        <PastBonds/>
    </Layout>
  )
}

export default Bonds