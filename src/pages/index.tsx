// import React from 'react'

import FeaturedIdo from "../components/Home/FeaturedIdo"
import HomeHero from "../components/Home/HomeHero"
import Powering from "../components/Home/Powering"
import Unlock from "../components/Home/Unlock"
import Layout from "../layout"

function Home() {
  return (
    <Layout>
        <HomeHero/>
        <Powering/>
        <Unlock/>
        <FeaturedIdo/>
    </Layout>
  )
}

export default Home