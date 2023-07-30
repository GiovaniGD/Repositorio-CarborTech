const express = require('express'); 
const path = require('path')
const app = express(); 
const port = 3300; 

    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, "public")))
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {res.render('usuarios/cadastro.ejs')});
    app.get('/principal', (req, res) => {res.render('principal.ejs')});
    app.get('/jabuticabeira', (req, res) => {res.render('produtos/jabuticabeira.ejs')});
    app.get('/araucaria', (req, res) => {res.render('produtos/araucaria.ejs')});

    app.get('/inicial', (req, res) => {res.render('carborblog/inicial.ejs')});
    app.get('/contact', (req, res) => {res.render('carborblog/contact.ejs')});
    app.get('/about', (req, res) => {res.render('carborblog/about.ejs')});
    app.get('/o-desmatamento-das-araucarias-ao-longo-da-historia', (req, res) => {res.render('carborblog/posts/post1.ejs')});
    app.get('/conheca-algumas-especies-nativas-do-rs', (req, res) => {res.render('carborblog/posts/post2.ejs')});
    app.get('/a-vegetacao-dos-pampas', (req, res) => {res.render('carborblog/posts/post3.ejs')});
    app.get('/a-vegetacao-da-mata-atlantica', (req, res) => {res.render('carborblog/posts/post4.ejs')});

    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
});