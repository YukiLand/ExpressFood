import { Button, IconButton } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from "react";

import "./Layout.css";


function Layout() {


  const location = useLocation();

  const currentRoute = location.pathname;

  const [logBtn, setLogBtn] = useState(true);

  useEffect(() => {
    setLogBtn(!currentRoute.startsWith('/product') && !currentRoute.startsWith('/detail') && currentRoute !== '/cart' && currentRoute !== '/payment');
  }, [currentRoute]);

  return (
    <>
      <div className="navbar">
        <Link className="logo-link" to="/"><img src="/src/assets/logo.png" className="logo" />EXPRESS FOOD</Link>
        <div cassName="log-grp">
          {logBtn &&
            <>
              <Link className="log-btn" to="/connexion"><Button variant="outlined">Connexion</Button></Link>
              <Link className="log-btn" to="/inscription"><Button variant="outlined">Inscription</Button></Link>
            </>
          }
          {!logBtn &&
          <>
            <Link className="log-btn" to="/product"><Button variant="outlined">Plats & Desserts</Button></Link>
            <Link className="log-btn" to="/cart"><IconButton > <ShoppingCartIcon /> </IconButton></Link>
          </>
          }
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;