import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import '../styles/gestionUser.css';

const GestionDesUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [modifierIndex, setModifierIndex] = useState(-1);
  const [dialogAjoutOuvert, setDialogAjoutOuvert] = useState(false);
  const [dialogModificationOuvert, setDialogModificationOuvert] = useState(false);
  const [snackbarOuvert, setSnackbarOuvert] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [utilisateurEnCoursDeModification, setUtilisateurEnCoursDeModification] = useState(null);

  // Utilisez useEffect pour charger la liste des utilisateurs lors du chargement initial
  useEffect(() => {
    async function chargerUtilisateurs() {
      try {
        const response = await axios.post('http://localhost:8000/user/all');
        if (response.status === 200) {
          // La réponse contient un tableau d'utilisateurs avec les propriétés spécifiées
          const utilisateurs = response.data.map((utilisateur) => ({
            id: utilisateur.id, // Ajoutez l'ID de l'utilisateur
            nom: utilisateur.lastname,
            prenom: utilisateur.firstname,
            email: utilisateur.email,
            role: utilisateur.role,
          }));
  
          // Mise à jour de l'état utilisateurs avec les données récupérées
          setUtilisateurs(utilisateurs);
        } else {
          alert('Impossible de charger la liste des utilisateurs.');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs :', error);
        alert('Une erreur est survenue lors du chargement des utilisateurs.');
      }
    }
  
    chargerUtilisateurs();
  }, []); // Le tableau vide signifie que cela ne doit être exécuté qu'une seule fois au chargement initial

  const ajouterUtilisateur = async () => {
    try {
      const response = await axios.post('http://localhost:8000/user/signup', {
        nom,
        prenom,
        email,
        role,
      });

      if (response.status === 200) {
        // Inscription réussie, vous pouvez rediriger l'utilisateur ou effectuer d'autres actions
        alert('Utilisateur ajouté avec succès !');
        // Mettez à jour la liste des utilisateurs (côté client) en incluant le nouvel utilisateur
        const nouvelUtilisateur = {
          id: response.data.id,
          nom,
          prenom,
          email,
          role,
        };
        setUtilisateurs([...utilisateurs, nouvelUtilisateur]);
        // Réinitialisez les champs du formulaire
        setNom('');
        setPrenom('');
        setEmail('');
        setRole('');
        setDialogAjoutOuvert(false);
      } else {
        // Gérez les erreurs d'ajout d'utilisateur, par exemple en affichant un message d'erreur
        alert("L'ajout de l'utilisateur a échoué. Veuillez réessayer.");
      }
    } catch (error) {
      // Gérez les erreurs de requête
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      alert("Une erreur est survenue lors de l'ajout de l'utilisateur. Veuillez réessayer.");
    }
  };

  const supprimerUtilisateur = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/user/delete`, { id });

      if (response.status === 200) {
        // Suppression réussie, mettez à jour la liste des utilisateurs (côté client)
        const nouveauxUtilisateurs = utilisateurs.filter((utilisateur) => utilisateur.id !== id);
        setUtilisateurs(nouveauxUtilisateurs);
      } else {
        // Gérez les erreurs de suppression d'utilisateur, par exemple en affichant un message d'erreur
        alert("La suppression de l'utilisateur a échoué. Veuillez réessayer.");
      }
    } catch (error) {
      // Gérez les erreurs de requête
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      alert("Une erreur est survenue lors de la suppression de l'utilisateur. Veuillez réessayer.");
    }
  };

  const modifierUtilisateur = (utilisateur) => {
    setUtilisateurEnCoursDeModification(utilisateur);
    setNom(utilisateur.nom);
    setPrenom(utilisateur.prenom);
    setEmail(utilisateur.email);
    setRole(utilisateur.role);
    setDialogModificationOuvert(true);
  };

  const sauvegarderModification = async () => {
    if (modifierIndex !== -1) {
      if (
        nom.trim() !== '' &&
        prenom.trim() !== '' &&
        email.trim() !== '' &&
        role.trim() !== ''
      ) {
        try {
          const response = await axios.post('http://localhost:8000/user/update', {
            id: utilisateurEnCoursDeModification.id,
            nom,
            prenom,
            email,
            role,
          });

          if (response.status === 200) {
            // Mise à jour réussie
            const nouveauxUtilisateurs = [...utilisateurs];
            const index = utilisateurs.findIndex((u) => u.id === utilisateurEnCoursDeModification.id);
            nouveauxUtilisateurs[index] = {
              ...utilisateurEnCoursDeModification,
              nom,
              prenom,
              email,
              role,
            };
            setUtilisateurs(nouveauxUtilisateurs);
            setNom('');
            setPrenom('');
            setEmail('');
            setRole('');
            setModifierIndex(-1);
            setDialogModificationOuvert(false);
          } else {
            alert('L\'opération de modification a échoué. Veuillez réessayer.');
          }
        } catch (error) {
          console.error('Erreur lors de la modification de l\'utilisateur :', error);
          alert('Une erreur est survenue lors de la modification de l\'utilisateur. Veuillez réessayer.');
        }
      } else {
        setSnackbarMessage('Veuillez remplir tous les champs.');
        setSnackbarOuvert(true);
      }
    }
  };

  const fermerSnackbar = () => {
    setSnackbarOuvert(false);
  };

  return (
    <div className="container">
      <div className="dashboard">
        <Typography variant="h4" gutterBottom>
          Gestion des Utilisateurs
        </Typography>

        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h5" gutterBottom>
            Liste des Utilisateurs
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rôle</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {utilisateurs.map((utilisateur, index) => (
                  <TableRow key={utilisateur.id}>
                    <TableCell>{utilisateur.nom}</TableCell>
                    <TableCell>{utilisateur.prenom}</TableCell>
                    <TableCell>{utilisateur.email}</TableCell>
                    <TableCell>{utilisateur.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => modifierUtilisateur(utilisateur)} aria-label="Modifier">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => supprimerUtilisateur(utilisateur.id)} aria-label="Supprimer">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <div style={{ marginTop: '16px' }}>
          <Button variant="contained" color="primary" onClick={() => setDialogAjoutOuvert(true)}>
            Ajouter un Utilisateur
          </Button>
        </div>

        <Dialog open={dialogAjoutOuvert} onClose={() => setDialogAjoutOuvert(false)}>
          {/* ... (Code pour ajouter un utilisateur) */}
        </Dialog>

        <Dialog open={dialogModificationOuvert} onClose={() => setDialogModificationOuvert(false)}>
          <DialogTitle>Modifier un utilisateur</DialogTitle>
          <DialogContent>
            <TextField label="Nom" fullWidth margin="normal" value={nom} onChange={(e) => setNom(e.target.value)} />
            <TextField label="Prénom" fullWidth margin="normal" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField
              select
              label="Rôle"
              fullWidth
              margin="normal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Livreur">Livreur</MenuItem>
              <MenuItem value="Utilisateur">Utilisateur</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogModificationOuvert(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={() => sauvegarderModification()} color="primary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOuvert}
          autoHideDuration={3000}
          onClose={() => fermerSnackbar()}
          message={snackbarMessage}
        />
      </div>
    </div>
  );
};

export default GestionDesUtilisateurs;

