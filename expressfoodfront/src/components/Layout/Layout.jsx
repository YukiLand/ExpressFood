import { Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";


function Layout() {
  return (
    <>
      <div className="navbar">
        <Link to="/connexion"><Button variant="contained">Connexion</Button></Link>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;