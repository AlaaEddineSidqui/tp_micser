const express = require('express');
const app = express();
const port = 3000;

// Mock data
const emprunts = [
  { id: 1, idLivre: 1, idClient: 1 },
  { id: 2, idLivre: 2, idClient: 2 },
];

// Ajouter un nouveau emprunt
app.post('/api/v1/emprunt', (req, res) => {
  const { idLivre, idClient } = req.body;
  const nouvelEmprunt = { id: emprunts.length + 1, idLivre, idClient };
  emprunts.push(nouvelEmprunt);
  res.status(200).json(nouvelEmprunt);
});

// Retourner un livre
app.post('/api/v1/emprunt/retour', (req, res) => {
  const { idLivre, idClient } = req.body;
  const index = emprunts.findIndex((e) => e.idLivre === idLivre && e.idClient === idClient);
  if (index !== -1) {
    const empruntRetourne = emprunts.splice(index, 1)[0];
    res.status(200).json(empruntRetourne);
  } else {
    res.status(404).json({ message: 'Emprunt introuvable' });
  }
});

// Retourner les emprunts d'un client donné
app.get('/api/v1/emprunt/:idClient', (req, res) => {
  const { idClient } = req.params;
  const empruntsClient = emprunts.filter((e) => e.idClient === parseInt(idClient));
  if (empruntsClient.length > 0) {
    res.status(200).json(empruntsClient);
  } else {
    res.status(404).json({ message: 'Aucun emprunt trouvé pour ce client' });
  }
});

app.listen(port, () => {
  console.log(`Service Emprunt en cours d'exécution sur http://localhost:${port}`);
});