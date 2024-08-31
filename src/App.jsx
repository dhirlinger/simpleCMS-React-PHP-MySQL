
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Admin } from './pages/Admin'

//I'm adding this comment
import './App.css'

function App() {
  
  return(
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Admin"} element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
