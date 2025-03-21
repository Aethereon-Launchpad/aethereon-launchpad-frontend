

import { Route, Routes } from 'react-router-dom'
import Home from './pages'
import Launchpad from './pages/launchpad'
import Explore from './pages/explore'
import Whitelist from './pages/whitelist'
import Staking from './pages/staking'
import NewPool from './pages/staking/new'
import Single from './pages/staking/single'
import Dashboard from './pages/dashboard'
import Governance from './pages/governance'
import DynamicRewards from './pages/dynamic'
import Leaderboard from './pages/leaderboard'
import SeasonalStaking from './pages/seasonal-staking'
import PresaleCreator from './pages/presale/create'
import IDO from './pages/ido'
import AdminAuthScreen from './pages/admin'
import Ido from './pages/ido'
import AdminDashboardPage from './pages/admin/dashboard'
import AdminManagePresales from './pages/admin/dashboard/presale'
import AdminPresaleManageID from "./pages/admin/dashboard/presale/manage"
import FundPresale from "./pages/presale/fund";
import CashPresale from "./pages/presale/cash";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/launchpad' element={<Launchpad />} />
      <Route path='/launchpad/:id' element={<IDO />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/join-ido' element={<Ido />} />
      <Route path='/staking-pool' element={<Staking />} />
      <Route path='/staking-pool/:id' element={<Single />} />
      <Route path='/staking-pool/new' element={<NewPool />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/governance' element={<Governance />} />
      <Route path='/leaderboard' element={<Leaderboard />} />
      <Route path='/lock-stake' element={<DynamicRewards />} />
      <Route path='/seasonal-staking' element={<SeasonalStaking />} />
      <Route path='/admin' element={<AdminAuthScreen />} />
      <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
      <Route path='/admin/dashboard/presale/create' element={<PresaleCreator />} />
      <Route path='/admin/dashboard/presales' element={<AdminManagePresales />} />
      <Route path='/admin/dashboard/presales/manage/:id' element={<AdminPresaleManageID />} />
      <Route path='/admin/dashboard/presales/:id' element={<AdminManagePresales />} />
      <Route path='/admin/dashboard/presales/fund/:id' element={<FundPresale />} />
      <Route path='/admin/dashboard/presales/cash/:id' element={<CashPresale />} />
    </Routes>
  )
}

export default App
