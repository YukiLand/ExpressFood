import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
