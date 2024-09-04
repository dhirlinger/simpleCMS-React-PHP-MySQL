import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import content from '../components/content.json'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import axios from 'axios';

export function Home(){

  const [header, setHeader] = useState({});
  useEffect(() => {
    getHeaderContent();
  }, []);

  function getHeaderContent(){
    axios.get("http://localhost:8888/api/header").then(function(response){
      console.log(response.data);
      setHeader(response.data[0]);
    });
  }
   
  

  return (
    <>
      <Helmet>
        <title>{content['siteTitle']}</title>
      </Helmet>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Title: {header.site_title}</h1>
      <h2>Tagline: {header.tagline}</h2>
  
      
    </>
  )
}