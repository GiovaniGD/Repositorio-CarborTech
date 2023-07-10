const express = require('express'); 
const path = require('path')
const app = express(); 
const port = 3300; 

    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "views/css")))
    app.use(express.static(path.join(__dirname, "views/css/principal.css")))
    app.use(express.static(path.join(__dirname, "css/principal.css")))
    app.use(express.static(path.join(__dirname, "views/tela principal/js")))
    app.use(express.urlencoded({ extended: true }));
    app.get('/',(req,res) => {res.render('principal.ejs')});

    app.listen(port, () => { 
        console.log(`Servidor rodando em http://localhost:${port}`);
});