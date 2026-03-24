const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/timbra', (req, res) => {
    console.log("Dati ricevuti dall'app:", req.body);

    let utente, lat, lon;

    // TRUCCO: Se l'app manda i dati nel formato "strano" che abbiamo visto nei log
    const chiavi = Object.keys(req.body);
    if (chiavi.length > 0 && chiavi[0].includes('{')) {
        try {
            const datiPuliti = JSON.parse(chiavi[0]);
            utente = datiPuliti.utente;
            lat = datiPuliti.lat;
            lon = datiPuliti.lon;
        } catch (e) {
            console.log("Errore pulizia dati:", e);
        }
    } else {
        // Formato standard
        utente = req.body.utente;
        lat = req.body.lat;
        lon = req.body.lon;
    }

    if (!utente) {
        console.log("⚠️ Ancora non trovo l'utente. Dati ricevuti:", req.body);
        return res.status(400).send("Errore: Nome mancante");
    }

    console.log(`✅ TIMBRATURA SUCCESSFUL!`);
    console.log(`👤 Utente: ${utente}`);
    console.log(`📍 Posizione: ${lat || 'N/A'}, ${lon || 'N/A'}`);

    res.json({ status: "OK", message: "Timbratura registrata!" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server online sulla porta ${PORT}`));
