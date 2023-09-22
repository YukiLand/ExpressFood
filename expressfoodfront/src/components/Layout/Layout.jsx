import { Button, IconButton } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";

import "./Layout.css";

function Layout() {
  const location = useLocation();
  //get from localstorage the value of actualUserRole

  const userRole = JSON.parse(localStorage.getItem("actualUserRole"));

  const [adminBtn, setAdminBtn] = useState(false);

  const currentRoute = location.pathname;

  const [logBtn, setLogBtn] = useState(true);

  useEffect(() => {
    setLogBtn(
      !currentRoute.startsWith("/product") &&
        !currentRoute.startsWith("/detail") &&
        currentRoute !== "/cart" &&
        currentRoute !== "/payement" &&
        currentRoute !== "/gestionplat" &&
        currentRoute !== "/gestionuser"
    );
  }, [currentRoute]);

  useEffect(() => {
    console.log("location.pathname  :>> ", location.pathname);
    if (userRole === "admin" && userRole != null && currentRoute != "/") {
      setAdminBtn(true);
    } else {
      setAdminBtn(false);
    }
  }, []);

  useEffect(() => {
    if (userRole === "admin" && userRole != null && currentRoute != "/") {
      setAdminBtn(true);
    } else {
      setAdminBtn(false);
    }
  }, [userRole]);

  return (
    <>
      <div className="navbar">
        <Link className="logo-link" to="/">
          <img src="/src/assets/logo.png" className="logo" />
          EXPRESS FOOD
        </Link>
        <div className="log-grp">
          {logBtn && (
            <>
              <Link className="log-btn" to="/connexion">
                <Button variant="outlined">Connexion</Button>
              </Link>
              <Link className="log-btn" to="/inscription">
                <Button variant="outlined">Inscription</Button>
              </Link>
            </>
          )}
          {!logBtn && (
            <>
              <Link className="log-btn" to="/product">
                <Button variant="outlined">Plats & Desserts</Button>
              </Link>
              <Link className="log-btn" to="/cart">
                <IconButton>
                  {" "}
                  <ShoppingCartIcon />{" "}
                </IconButton>
              </Link>
            </>
          )}
          {adminBtn && (
            <>
              <Link className="log-btn" to="/gestionuser">
                <Button variant="outlined">Gestion utilisateur</Button>
              </Link>
              <Link className="log-btn" to="/gestionplat">
                <Button variant="outlined">Gestion plats</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Layout;
