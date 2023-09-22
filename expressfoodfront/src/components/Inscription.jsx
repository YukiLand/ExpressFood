import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import "../styles/inscription.css";
import axios from "axios";

const Inscription = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

<<<<<<< HEAD
=======
  // const sert à

  useEffect(() => {
    //set actualUserRole to null
    localStorage.setItem("actualUserRole", JSON.stringify(null));
  }, []);

>>>>>>> 61b8a14594365c868f960b4de829238e77b581ea
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/user/signup", {
        nom,
        prenom,
        email,
        motDePasse,
      });

      if (response.status === 200) {
        alert("Inscription réussie !");
        window.location = "/connexion";
      } else {
        alert("L'inscription a échoué. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
    }
  };

  return (
    <div
      className="inscription-container"
      style={{
        backgroundImage: 'url("./src/assets/imageInscription.png")',
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} className="inscription-form">
          <Typography variant="h5" component="h2" gutterBottom>
            Inscription
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nom"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <TextField
              label="Prénom"
              type="text"
              variant="outlined"
              fullWidth
              margin="normal"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
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
            <Box mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                S'inscrire
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Inscription;
