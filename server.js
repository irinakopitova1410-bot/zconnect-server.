const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rotta per verificare se il server funziona
app.get('/', (req, res) => {
    res.send('Il tuo nuovo server di timbratura è ONLINE!');
});

// Rotta per ricevere la timbratura (corretta e migliorata)
app.post('/timbra', (req, res) => {
    const { utente, lat, lon, precisione } = req.body;
    
    // CONTROLLO PRECISIONE: Se il GPS sballa oltre i 25 metri, rifiuta
    if (precisione > 25) {
        return res.status(400).json({ 
            status: "Errore", 
            message: "GPS instabile (Precisione: " + precisione + "m). Spostati all'aperto." 
        });
    }

    console.log(`Timbratura ricevuta da ${utente} a Pos: ${lat}, ${lon}`);
    res.json({ 
        status: "OK", 
        message: "Timbratura registrata con successo!" 
    });
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
