import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

import "./Layout.css";


function Layout() {
  return (
    <>
      <div className="navbar">
        <Link className="logo-link" to="/"><img src="/src/assets/logo.png" className="logo" />EXPRESS FOOD</Link>
        <div className="log-grp">
          <Link className="log-btn" to="/connexion"><Button variant="outlined">Connexion</Button></Link>
          <Link className="log-btn" to="/inscription"><Button variant="outlined">Inscription</Button></Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;