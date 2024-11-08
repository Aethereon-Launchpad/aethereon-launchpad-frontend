
import { Route, Routes } from 'react-router-dom'
import Home from './pages'
import Launchpad from './pages/launchpad'
import Explore from './pages/explore'

function App() {

  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/launchpad' element={<Launchpad/>}/>
     <Route path='/explore' element={<Explore/>}/>
    </Routes>
  )
}

export default App
