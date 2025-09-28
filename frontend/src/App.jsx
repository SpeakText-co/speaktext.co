import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Speak from './pages/Speak'
import './App.css'

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Home</Link> | <Link to="/speak">Speak</Link>
      </nav>
      <Routes>
     
        <Route path="/" element={<Speak />} />
      </Routes>
    </div>
  )
}

export default App
