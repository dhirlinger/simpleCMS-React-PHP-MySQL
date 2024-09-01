import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import content from '../components/content.json'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'


export function Home(){
    const [count, setCount] = useState(0)
    

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
      <h1>Vite + React <br />
      @doughirlinger.com</h1>
  
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}