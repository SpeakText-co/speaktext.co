import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Speak from './pages/Speak'
import './App.css'

function App() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://umami.leanderziehm.com/script.js'
    script.defer = true
    script.setAttribute('data-website-id', 'df533cf3-2f36-454e-9c89-f21d737b6152')
    document.body.appendChild(script)
  }, [])
  return (
    <div>
      <nav className="nav">
      <Link to="/">Speak</Link>
      </nav>
      <Routes>

        <Route path="/" element={<Speak />} />
      </Routes>
    </div>
  )
}

export default App
