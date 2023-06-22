const express = require('express');
const app = express();
const port = 3000;

// Configuration de la file d'événements (Queue)
const notificationsQueue = [];

// Importez le module pour l'envoi d'e-mails (par exemple, Nodemailer)
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: 'your_username',
    pass: 'your_password'
  }
});

// Endpoint pour recevoir les notifications des autres services
app.post('/api/v1/notification', (req, res) => {
  const notification = req.body;
  notificationsQueue.push(notification);
  res.status(200).json({ message: 'Notification reçue avec succès' });
});

// Traitement de la file d'événements (Queue)
function processNotificationsQueue() {
  setInterval(() => {
    if (notificationsQueue.length > 0) {
      const notification = notificationsQueue.shift();
      console.log('Nouvelle notification :', notification);

      // Envoi de la notification par e-mail
      const mailOptions = {
        from: 'your_email@example.com',
        to: notification.clientEmail, // Adresse e-mail du client
        subject: 'Notification de la librairie',
        text: notification.message
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erreur lors de l\'envoi de la notification par e-mail:', error);
        } else {
          console.log('Notification envoyée par e-mail:', info.response);
        }
      });
    }
  }, 1000); // Exemple de traitement toutes les 1 seconde, ajustez selon vos besoins
}

// Démarrage du traitement de la file d'événements (Queue)
processNotificationsQueue();

app.listen(port, () => {
  console.log(`Service Notification en cours d'exécution sur http://localhost:${port}`);
});