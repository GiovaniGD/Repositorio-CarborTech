const routes = require("express").Router();

//rotas
routes.get('/cadastro', (req, res) => {res.render('usuarios/cadastro.ejs')});
routes.get('/', (req, res) => {res.render('principal.ejs')});
routes.get('/jabuticabeira', (req, res) => {res.render('produtos/jabuticabeira.ejs')});
routes.get('/araucaria', (req, res) => {res.render('produtos/araucaria.ejs')});

//blog
routes.get('/inicial', (req, res) => {res.render('carborblog/inicial.ejs')});
routes.get('/contact', (req, res) => {res.render('carborblog/contact.ejs')});
routes.get('/about', (req, res) => {res.render('carborblog/about.ejs')});
routes.get('/o-desmatamento-das-araucarias-ao-longo-da-historia', (req, res) => {res.render('carborblog/posts/post1.ejs')});
routes.get('/conheca-algumas-especies-nativas-do-rs', (req, res) => {res.render('carborblog/posts/post2.ejs')});
routes.get('/a-vegetacao-dos-pampas', (req, res) => {res.render('carborblog/posts/post3.ejs')});
routes.get('/a-vegetacao-da-mata-atlantica', (req, res) => {res.render('carborblog/posts/post4.ejs')});

module.exports = routes;