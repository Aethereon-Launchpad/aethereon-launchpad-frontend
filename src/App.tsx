
import { Route, Routes } from 'react-router-dom'
import Home from './pages'
import Launchpad from './pages/launchpad'

function App() {

  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/launchpad' element={<Launchpad/>}/>
    </Routes>
  )
}

export default App
