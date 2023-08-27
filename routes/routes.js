const routes = require("express").Router();

//rotas
routes.get('/cadastro', (req, res) => {res.render('usuarios/cadastro.ejs')});
routes.get('/login', (req, res) => {res.render('usuarios/login.ejs')});
routes.get('/', (req, res) => {res.render('principal.ejs')});
routes.get('/jabuticabeira', (req, res) => {res.render('produtos/jabuticabeira.ejs')});
routes.get('/araucaria', (req, res) => {res.render('produtos/araucaria.ejs')});

//blog
routes.get('/inicial', (req, res) => {res.render('blog/inicial.ejs')});
routes.get('/contact', (req, res) => {res.render('blog/contact.ejs')});
routes.get('/about', (req, res) => {res.render('blog/about.ejs')});
routes.get('/o-desmatamento-das-araucarias-ao-longo-da-historia', (req, res) => {res.render('blog/posts/post1.ejs')});
routes.get('/conheca-algumas-especies-nativas-do-rs', (req, res) => {res.render('blog/posts/post2.ejs')});
routes.get('/a-vegetacao-dos-pampas', (req, res) => {res.render('blog/posts/post3.ejs')});
routes.get('/a-vegetacao-da-mata-atlantica', (req, res) => {res.render('blog/posts/post4.ejs')});

module.exports = routes;