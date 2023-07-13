const express = require('express'); 
const path = require('path')
const app = express(); 
const port = 3300; 

    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "public")))
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {res.render('usuarios/cadastro.ejs')});
    app.get('/principal', (req, res) => {res.render('principal.ejs')});
    app.get('/produto', (req, res) => {res.render('produto.ejs')});

    app.listen(port, () => { 
        console.log(`Servidor rodando em http://localhost:${port}`);
});