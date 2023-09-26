const routes = require("express").Router();

//blog
routes.get('/inicial', (req, res) => {res.render('blog/inicial.ejs')});
routes.get('/contact', (req, res) => {res.render('blog/contact.ejs')});
routes.get('/about', (req, res) => {res.render('blog/about.ejs')});
routes.get('/o-desmatamento-das-araucarias-ao-longo-da-historia', (req, res) => {res.render('blog/post1.ejs')});
routes.get('/conheca-algumas-especies-nativas-do-rs', (req, res) => {res.render('blog/post2.ejs')});
routes.get('/a-vegetacao-dos-pampas', (req, res) => {res.render('blog/post3.ejs')});
routes.get('/a-vegetacao-da-mata-atlantica', (req, res) => {res.render('blog/post4.ejs')});

module.exports = routes;