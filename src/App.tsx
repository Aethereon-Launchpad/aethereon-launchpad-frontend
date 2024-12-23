
import { Route, Routes } from 'react-router-dom'
import Home from './pages'
import Launchpad from './pages/launchpad'
import Explore from './pages/explore'
import Whitelist from './pages/whitelist'
import Staking from './pages/staking'
import NewPool from './pages/staking/new'

function App() {

  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/launchpad' element={<Launchpad/>}/>
     <Route path='/launchpad/:id' element={<Whitelist/>}/>
     <Route path='/explore' element={<Explore/>}/>
     <Route path='/stake-farm' element={<Staking/>}/>
     <Route path='/stake-farm/new' element={<NewPool/>}/>
    </Routes>
  )
}

export default App
