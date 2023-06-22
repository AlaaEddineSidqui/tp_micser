const express = require('express');
const app = express();
const port = 3000;

// Base de données fictive ou connexion à une base de données réelle
const livres = [
  { id: 1, titre: 'Livre 1' },
  { id: 2, titre: 'Livre 2' },
];

// Récupérer les informations d'un livre
app.get('/api/v1/livre/:idLivre', (req, res) => {
  const { idLivre } = req.params;
  const livre = livres.find((l) => l.id === parseInt(idLivre));
  if (livre) {
    res.status(200).json(livre);
  } else {
    res.status(404).json({ message: 'Livre introuvable' });
  }
});

// Ajouter un nouveau livre
app.post('/api/v1/livre', (req, res) => {
  const { titre } = req.body;
  const nouveauLivre = { id: livres.length + 1, titre };
  livres.push(nouveauLivre);
  res.status(200).json(nouveauLivre);
});

// Modifier un livre
app.put('/api/v1/livre/:idLivre', (req, res) => {
  const { idLivre } = req.params;
  const { titre } = req.body;
  const livre = livres.find((l) => l.id === parseInt(idLivre));
  if (livre) {
    livre.titre = titre;
    res.status(200).json(livre);
  } else {
    res.status(404).json({ message: 'Livre introuvable' });
  }
});

// Supprimer un livre
app.delete('/api/v1/livre/:idLivre', (req, res) => {
  const { idLivre } = req.params;
  const index = livres.findIndex((l) => l.id === parseInt(idLivre));
  if (index !== -1) {
    const livreSupprime = livres.splice(index, 1)[0];
    res.status(200).json(livreSupprime);
  } else {
    res.status(404).json({ message: 'Livre introuvable' });
  }
});

app.listen(port, () => {
  console.log(`Service Livre en cours d'exécution sur http://localhost:${port}`);
});