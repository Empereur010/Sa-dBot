const express = require("express");
const { spawn } = require("child_process");
const log = require("./logger/log.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Démarrer GoatBot
function startProject() {
	const child = spawn("node", ["Goat.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true
	});

	child.on("close", (code) => {
		if (code === 2) {
			log.info("🔁 Redémarrage automatique de GoatBot...");
			startProject();
		}
	});
}

startProject();

// Serveur web obligatoire pour Render
app.get("/", (req, res) => {
	res.send("✅ GoatBot est en ligne sur Render");
});

app.listen(PORT, () => {
	console.log(`✅ Serveur Express lancé sur le port ${PORT}`);
});
