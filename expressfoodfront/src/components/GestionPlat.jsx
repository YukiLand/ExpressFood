import  { useState, useEffect } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import '../styles/gestionPlat.css';
import axios from 'axios';

const GestionDesPlats = () => {
  const [plats, setPlats] = useState([]);
  const [platAModifier, setPlatAModifier] = useState(null);
  const [dialogAjoutOuvert, setDialogAjoutOuvert] = useState(false);
  const [dialogModificationOuvert, setDialogModificationOuvert] = useState(false);
  const [snackbarOuvert, setSnackbarOuvert] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [modifierIndex, setModifierIndex] = useState(-1);

  useEffect(() => {
    async function chargerPlats() {
      try {
        const response = await axios.post('http://localhost:8000/meal/search');
        if (response.status === 200) {
          setPlats(response.data);
        } else {
          alert('Impossible de charger la liste des plats.');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des plats :', error);
        alert('Une erreur est survenue lors du chargement des plats.');
      }
    }

    chargerPlats();
  }, []);

  const ajouterPlat = async () => {
    if (
      platAModifier &&
      platAModifier.name.trim() !== '' &&
      platAModifier.description.trim() !== '' &&
      platAModifier.price > 0 &&
      platAModifier.image.trim() !== '' &&
      platAModifier.category.trim() !== ''
    ) {
      try {
        const response = await axios.post('http://localhost:8000/meal/create', platAModifier);

        if (response.status === 200) {
          // Plat ajouté avec succès
          alert('Plat ajouté avec succès !');
          const nouveauPlat = response.data;
          setPlats([...plats, nouveauPlat]);
          setPlatAModifier(null);
          setDialogAjoutOuvert(false);
        } else {
          alert('L\'ajout du plat a échoué. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout du plat :', error);
        alert('Une erreur est survenue lors de l\'ajout du plat. Veuillez réessayer.');
      }
    } else {
      setSnackbarMessage('Veuillez remplir tous les champs.');
      setSnackbarOuvert(true);
    }
  };

  const supprimerPlat = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8000/meal/delete`, { uuid: id });
      if (response.status === 200) {
  
        alert('Le plat a été supprimé avec succès.');
        const nouveauxPlats = plats.filter((plat) => plat.uuid !== id);
        setPlats(nouveauxPlats);
      } else {
        alert('L\'opération de suppression a échoué. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du plat :', error);
      alert('Une erreur est survenue lors de la suppression du plat. Veuillez réessayer.');
    }
  };
  

  const modifierPlat = (plat) => {
    setPlatAModifier({ ...plat }); 
    setModifierIndex(plats.findIndex((p) => p.uuid === plat.uuid)); 
    setDialogModificationOuvert(true);
  };

  const sauvegarderModification = async () => {
    if (modifierIndex !== -1) {
      if (
        platAModifier &&
        platAModifier.name.trim() !== '' &&
        platAModifier.description.trim() !== '' &&
        platAModifier.price > 0 &&
        platAModifier.image.trim() !== '' &&
        platAModifier.category.trim() !== ''
      ) {
        try {
          const response = await axios.post(`http://localhost:8000/meal/update`, platAModifier);

          if (response.status === 200) {
            // Modification réussie
            const nouveauxPlats = [...plats];
            nouveauxPlats[modifierIndex] = platAModifier;
            setPlats(nouveauxPlats);
            setPlatAModifier(null);
            setModifierIndex(-1);
            setDialogModificationOuvert(false);
          } else {
            alert('L\'opération de modification a échoué. Veuillez réessayer.');
          }
        } catch (error) {
          console.error('Erreur lors de la modification du plat :', error);
          alert('Une erreur est survenue lors de la modification du plat. Veuillez réessayer.');
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
          Gestion des Plats
        </Typography>

        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h5" gutterBottom>
            Liste des Plats
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Prix (€)</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plats.map((plat) => (
                  <TableRow key={plat.id}>
                    <TableCell>{plat.name}</TableCell>
                    <TableCell>{plat.description}</TableCell>
                    <TableCell>{plat.price}</TableCell>
                    <TableCell>{plat.category}</TableCell>
                    <TableCell>
                      <img src={plat.image} alt={plat.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => modifierPlat(plat)} aria-label="Modifier">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => supprimerPlat(plat.uuid)} aria-label="Supprimer">
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
            Ajouter un Plat
          </Button>
        </div>

        <Dialog open={dialogAjoutOuvert} onClose={() => setDialogAjoutOuvert(false)}>
          <DialogTitle>Ajouter un nouveau plat</DialogTitle>
          <DialogContent>
            <TextField label="Nom" fullWidth margin="normal" value={platAModifier?.name || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, name: e.target.value })} />
            <TextField label="Description" fullWidth margin="normal" value={platAModifier?.description || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, description: e.target.value })} />
            <TextField label="Prix (€)" fullWidth margin="normal" type="number" value={platAModifier?.price || 0} onChange={(e) => setPlatAModifier({ ...platAModifier, price: e.target.value })} />
            <TextField label="Lien de l'image" fullWidth margin="normal" value={platAModifier?.image || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, image: e.target.value })} />
            <TextField label="Catégorie" fullWidth margin="normal" value={platAModifier?.category || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, category: e.target.value })} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogAjoutOuvert(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={() => ajouterPlat()} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={dialogModificationOuvert} onClose={() => setDialogModificationOuvert(false)}>
          <DialogTitle>Modifier un plat</DialogTitle>
          <DialogContent>
            <TextField label="Nom" fullWidth margin="normal" value={platAModifier?.name || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, name: e.target.value })} />
            <TextField label="Description" fullWidth margin="normal" value={platAModifier?.description || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, description: e.target.value })} />
            <TextField label="Prix (€)" fullWidth margin="normal" type="number" value={platAModifier?.price || 0} onChange={(e) => setPlatAModifier({ ...platAModifier, price: e.target.value })} />
            <TextField label="Lien de l'image" fullWidth margin="normal" value={platAModifier?.image || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, image: e.target.value })} />
            <TextField label="Catégorie" fullWidth margin="normal" value={platAModifier?.category || ''} onChange={(e) => setPlatAModifier({ ...platAModifier, category: e.target.value })} />
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

        <Snackbar open={snackbarOuvert} autoHideDuration={3000} onClose={() => fermerSnackbar()} message={snackbarMessage} />
      </div>
    </div>
  );
};

export default GestionDesPlats;
