import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import Layout from '../../layout'
import Hero from '../../components/Bonds/Hero'
import FeaturedBonds from '../../components/Bonds/Featured'
import LiveAndUpcoming from '../../components/Bonds/LiveAndUpcoming'
import PastBonds from '../../components/Bonds/PastBonds'
import { usePageTitleBonds } from '../../hooks/utils/index.tsx';

function Bonds() {
  usePageTitleBonds("Explore & Invest in Bonds")
  return (
    <Layout>
      <FeaturedBonds />
      <LiveAndUpcoming />
      <PastBonds />
    </Layout>
  )
}

export default Bonds