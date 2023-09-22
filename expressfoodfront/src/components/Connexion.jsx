import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import Axios from "axios"; // Assurez-vous d'avoir installé Axios

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:8000/user/login", {
        // Assurez-vous que l'URL correspond à votre backend
        email,
        motDePasse,
      });

      if (response.status === 200) {
        // Authentification réussie, rediriger l'utilisateur vers une autre page
        // Exemple : window.location.href = '/tableau-de-bord';
        alert("Authentification réussie");
        // go to /product page
        window.location.href = "/product";
      } else {
        // Afficher un message d'erreur en cas d'échec de l'authentification
        setError(
          "Authentification échouée. Vérifiez vos informations d'identification."
        );
      }
    } catch (error) {
      // Gérer les erreurs de requête
      console.error("Erreur lors de l'authentification :", error);
      setError("Une erreur est survenue lors de l'authentification.");
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: 'url("./src/assets/imageConnexion.png")', // Remplacez "url_de_votre_image.jpg" par le chemin de votre image
    backgroundSize: "cover", // Pour ajuster la taille de l'image en fonction du conteneur
    backgroundPosition: "center", // Pour centrer l'image
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
