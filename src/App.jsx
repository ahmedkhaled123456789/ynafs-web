
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import LevelsPage from './pages/LevelsPage'
import SemestersPage from './pages/SemestersPage'
import StagesPage from './pages/StagesPage'
import SubjectsPage from './pages/SubjectsPage'
import Routers from './Routes/Routers'
function App() {
  return (
    <>
 <BrowserRouter>
      <Routers />
    </BrowserRouter>    </>

  )
}

export default App
