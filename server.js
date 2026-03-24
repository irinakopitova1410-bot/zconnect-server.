const express = require('express');
const app = express();

// Questi servono per leggere i dati dall'app
app.use(express.json());
app.use(express.text()); // Legge anche se l'app manda testo semplice
app.use(express.urlencoded({ extended: true }));

app.post('/timbra', (req, res) => {
    let dati = req.body;

    // Se i dati arrivano come testo, proviamo a trasformarli in oggetto
    if (typeof dati === 'string') {
        try { dati = JSON.parse(dati); } catch(e) {}
    }

    const { utente, lat, lon } = dati;

    if (!utente) {
        console.log("⚠️ Ricevuto qualcosa, ma non trovo il nome utente:", dati);
        return res.status(400).send("Nome mancante");
    }

    console.log(`✅ TIMBRATURA RICEVUTA! Utente: ${utente}, Pos: ${lat}, ${lon}`);
    res.json({ status: "OK", message: "Registrato!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server Pronto!"));
