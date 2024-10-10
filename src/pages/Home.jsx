import { Helmet } from 'react-helmet-async';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import '../App.css';
import { NavBar } from "../components/NavBar";


export function Home({ header }){

  return (
    <>
      <Helmet>
        <title>{header.site_title}</title>
      </Helmet>
      <NavBar />
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