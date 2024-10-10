
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Home } from './pages/Home';
import  Admin from './pages/Admin';
import './App.css';


function App() {

  
  const [headerData, setHeaderData] = useState({});

  const [headerImage, setHeaderImage] = useState(null);

  const [header, setHeader] = useState({});

  const [getCount, setGetCount] = useState(0);

  useEffect(() => {
    getHeaderContent();
  }, [getCount]);

  function getHeaderContent(){
    axios.get("http://localhost:8888/api/header").then(function(response){
      console.log(response.data);
      setHeader(response.data[0]);
    });
  }

 

  return(
    <>
   
    <Router>
      <Routes>
        <Route path={"/"} element={<Home 
          header={header}
        />} />
        <Route path={"/Admin"} 
           element={
           <Admin 
           headerData={headerData}
           setHeaderData={setHeaderData}
           headerImage={headerImage}
           setHeaderImage={setHeaderImage}
           header={header}
           getCount={getCount}
           setGetCount={setGetCount}
           
           />
           } />
      </Routes>
    </Router>
    
    </>
    
  )
}

export default App
