
import { Route, Routes } from 'react-router-dom'
import Home from './pages'
import Launchpad from './pages/launchpad'
import Explore from './pages/explore'
import Whitelist from './pages/whitelist'
import Staking from './pages/staking'

function App() {

  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/launchpad' element={<Launchpad/>}/>
     <Route path='/explore' element={<Explore/>}/>
     <Route path='/join-whitelist' element={<Whitelist/>}/>
     <Route path='/stake-farm' element={<Staking/>}/>
    </Routes>
  )
}

export default App
