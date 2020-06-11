// Importation modules npm
const express = require('express')

// Instanciation d'express
const app = express()

// Instanciation du port localhost
const PORT = 8080

app.get('/', (req,res) => {
    res.send('Salut')
})

// Application Listen (http://localhost:8080/)
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT} 🚀`)
});