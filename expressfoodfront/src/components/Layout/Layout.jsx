import { Button, IconButton } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import "./Layout.css";


function Layout() {
  return (
    <>
      <div className="navbar">
        <Link className="logo-link" to="/"><img src="/src/assets/logo.png" className="logo" />EXPRESS FOOD</Link>
        <div className="log-grp">
          <Link className="log-btn" to="/connexion"><Button variant="outlined">Connexion</Button></Link>
          <Link className="log-btn" to="/inscription"><Button variant="outlined">Inscription</Button></Link>
          <Link className="log-btn" to="/cart"><IconButton > <ShoppingCartIcon /> </IconButton></Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;