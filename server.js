const express = require('express');
const app = express();

// 1. Questa riga permette al server di LEGGERE i dati dall'app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
    res.send('Il server di timbratura è ONLINE!');
});

app.post('/timbra', (req, res) => {
    // 2. MODIFICA: precisione = 0 evita l'errore se l'app non la manda
    const { utente, lat, lon, precisione = 0 } = req.body;
    
    // 3. MODIFICA: Controllo più permissivo per i test
    if (precisione > 0 && precisione > 25) { 
        console.log(`❌ GPS instabile per ${utente} (${precisione}m)`);
        return res.status(400).json({ 
            status: "Errore", 
            message: "GPS instabile. Spostati all'aperto." 
        });
    }

    // 4. Se i dati arrivano, li stampiamo chiaramente nel log
    if (utente) {
        console.log(`✅ TIMBRATURA RICEVUTA!`);
        console.log(`👤 Utente: ${utente}`);
        console.log(`📍 Posizione: ${lat}, ${lon}`);
    } else {
        console.log("⚠️ Ricevuto un pacchetto, ma il nome utente è vuoto.");
    }

    res.json({ 
        status: "OK", 
        message: "Timbratura registrata con successo!" 
    });
});

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
