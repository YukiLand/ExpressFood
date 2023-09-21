import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Product from './components/Product/Product'
import Detail from './components/Detail/Detail';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import Admin from './components/Admin';
import GestionUser from './components/GestionUser';
import GestionPlat from './components/GestionPlat';


function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/gestionUser" element={<GestionUser />} />
            <Route path="/gestionPlat" element={<GestionPlat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
