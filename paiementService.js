const express = require('express');
const app = express();
const port = 3000;

// Configuration de la file d'événements (Queue)
const paymentQueue = [];

// Endpoint pour recevoir les instructions de paiement des autres services
app.post('/api/v1/payment', (req, res) => {
  const paymentInstruction = req.body;
  paymentQueue.push(paymentInstruction);
  res.status(200).json({ message: 'Instruction de paiement reçue avec succès' });
});

// Traitement de la file d'événements (Queue)
function processPaymentQueue() {
  setInterval(() => {
    if (paymentQueue.length > 0) {
      const paymentInstruction = paymentQueue.shift();
      console.log('Nouvelle instruction de paiement :', paymentInstruction);

     

      // Exemple de code pour effectuer le paiement avec une API fictive
      makePayment(paymentInstruction)
        .then(response => {
          console.log('Paiement effectué avec succès:', response);
        })
        .catch(error => {
          console.error('Erreur lors du paiement:', error);
        });
    }
  }, 1000); // Exemple de traitement toutes les 1 seconde, ajustez selon vos besoins
}

// Fonction fictive pour effectuer le paiement avec une API externe
function makePayment(paymentInstruction) {
  return new Promise((resolve, reject) => {

    // Exemple de réponse simulée
    const response = {
      status: 'success',
      message: 'Paiement réussi',
      paymentId: '1234567890'
    };

    // Simuler un délai de traitement
    setTimeout(() => {
      if (response.status === 'success') {
        resolve(response);
      } else {
        reject(new Error('Échec du paiement'));
      }
    }, 2000); // Simuler un délai de 2 secondes pour le traitement du paiement
  });
}

// Démarrage du traitement de la file d'événements (Queue)
processPaymentQueue();

app.listen(port, () => {
  console.log(`Service Paiement en cours d'exécution sur http://localhost:${port}`);
});