import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Container,
} from "@mui/material";
import "../styles/inscription.css";
import axios from "axios"; //

const Inscription = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  // const sert à

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
        // Inscription réussie, vous pouvez rediriger l'utilisateur ou afficher un message de confirmation
        alert("Inscription réussie !");
        // Rediriger l'utilisateur vers une page de connexion, par exemple
        // history.push('/connexion');
        window.location = "/connexion";
      } else {
        // Gérer les erreurs d'inscription, par exemple en affichant un message d'erreur
        alert("L'inscription a échoué. Veuillez réessayer.");
      }
    } catch (error) {
      // Gérer les erreurs de requête, par exemple en affichant un message d'erreur
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
          {" "}
          {/* Ajout de la classe CSS pour le formulaire */}
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
