import { AppBar, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Si vous utilisez React Router pour la navigation

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)', // Soustraire la hauteur de la barre d'applications (AppBar)
  backgroundImage: 'url("./src/assets/imageAdmin.png")', // Ajoutez le chemin de votre image d'arrière-plan ici
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const buttonStyle = {
  margin: '8px',
};

const PageAccueilAdmin = () => {
  return (
    <div style={containerStyle}> {/* Appliquez le style à la div principale */}
      {/* En-tête de la page */}
      <AppBar position="static">
        {/* <Toolbar>
          <Typography variant="h6">Tableau de bord de l'administrateur</Typography>
        </Toolbar> */}
      </AppBar>

      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Bienvenue, Administrateur
        </Typography>

        {/* Boutons de gestion */}
        <Button
          variant="contained"
          color="primary"
          style={buttonStyle}
          component={Link} // Lien vers la gestion des utilisateurs
          to="/GestionUser" // Remplacez par le chemin correct
        >
          Gestion des Utilisateurs
        </Button>

        <Button
          variant="contained"
          color="primary"
          style={buttonStyle}
          component={Link} // Lien vers la gestion des plats
          to="/gestionPlat" // Remplacez par le chemin correct
        >
          Gestion des Plats
        </Button>

       
      </Container>
    </div>
  );
};

export default PageAccueilAdmin;
