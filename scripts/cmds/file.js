const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Autorisation (ID admin)
const OWNER_ID = "61566369676527";

// Route principale (test rapide)
app.get('/', (req, res) => {
  res.send('Bot script server is running.');
});

// Route pour lire un fichier JS
app.get('/file', (req, res) => {
  const senderID = req.query.senderID;
  const fileName = req.query.name;

  if (senderID !== OWNER_ID) {
    return res.status(403).send("❌ Accès refusé, tu n'es pas 🍁SAÏD🍁 ಠ⁠_⁠ಠ");
  }

  if (!fileName) {
    return res.status(400).send("⚠️ Le nom du fichier est requis.");
  }

  const filePath = path.join(__dirname, `${fileName}.js`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send(`❌ Fichier introuvable : ${fileName}.js`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  res.setHeader('Content-Type', 'text/plain');
  res.send(content);
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
