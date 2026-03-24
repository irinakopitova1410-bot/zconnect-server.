const express = require('express');
const app = express();

// Accetta sia JSON che moduli semplici
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/timbra', (req, res) => {
    // LOG DI EMERGENZA: Vediamo cosa arriva davvero
    console.log("Dati grezzi ricevuti:", req.body);

    const { utente, lat, lon } = req.body;

    if (!utente || utente === "") {
        console.log("⚠️ Il server ha ricevuto un messaggio, ma il campo 'utente' non è stato trovato.");
        return res.status(400).send("Nome utente mancante");
    }

    console.log(`✅ TIMBRATURA OK! Utente: ${utente}, Lat: ${lat}, Lon: ${lon}`);
    res.json({ status: "OK", message: "Ricevuto!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server attivo sulla porta ${PORT}`));
