// import React from 'react'

import Community from "../components/Global/Community"
import Subscribe from "../components/Global/Subscribe"
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
        <Community/>
        <Subscribe/>
    </Layout>
  )
}

export default Home