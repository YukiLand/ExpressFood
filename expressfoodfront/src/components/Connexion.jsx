import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import Axios from "axios";

const Connexion = () => {
  useEffect(() => {
    localStorage.setItem("actualUserRole", JSON.stringify(null));
  }, []);
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:8000/user/login", {
        email,
        password: motDePasse,
      });

      if (response.status === 200) {
        alert("Authentification réussie");
        console.log("response :>> ", response);
        localStorage.setItem(
          "actualUserRole",
          JSON.stringify(response.data.role)
        );
        window.location.href = "/product";
      } else {
        setError(
          "Authentification échouée. Vérifiez vos informations d'identification."
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
      setError("Une erreur est survenue lors de l'authentification.");
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: 'url("./src/assets/imageConnexion.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div style={containerStyle}>
      <Container maxWidth="xs">
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Connexion
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
            {error && <div className="error-message">{error}</div>}
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Se connecter
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Connexion;
