const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const app = express()
const port = 3000

app.listen(port, () => console.log("aplicacion corriendo en el puerto", port))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/nosotros', (req, res) => {
    res.render('nosotros')
})

app.get('/buscar', (req, res) => {
    res.render('buscar')
})

app.get('/resultado', (req, res) => {
    res.render('resultado')
})

app.post('/buscar', async (req, res) => {
    const dato = req.body.dato

    try {
        const query = await fetch('https://pokeapi.co/api/v2/pokemon/' + dato)
            .then(response => response.json())
        res.render('resultado', { query })

    } catch (error) {
        res.render('fallo')
    }
})