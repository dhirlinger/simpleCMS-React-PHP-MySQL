import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { Home } from './pages/Home'
import  Admin from './pages/Admin'
import content from './components/content.json'
import './App.css'

function App() {
  //old: graab from json file 
  /*const [data, setData] = useState(content);*/

  return(
    <>
   
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Admin"} 
           element={
           <Admin //setData={setData} 
           //data={data}
           />
           } />
      </Routes>
    </Router>
    
    </>
    
  )
}

export default App
