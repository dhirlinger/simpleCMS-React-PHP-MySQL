import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import content from '../components/content.json'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'


export function Home(){
   

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
      <h1>Title: @doughirlinger.com</h1>
      <h2>Tagline: </h2>
  
      
    </>
  )
}