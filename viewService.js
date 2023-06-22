const express = require('express');
const app = express();
const port = 3000;

// Configuration du dossier contenant les fichiers statiques (HTML, CSS, JS, images, etc.)
app.use(express.static('public'));

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Service View en cours d'exécution sur http://localhost:${port}`);
});