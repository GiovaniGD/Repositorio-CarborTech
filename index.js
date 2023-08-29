const express = require("express"); 
const path = require("path");
const routes = require("./routes/routes");
const cloudinary = require('cloudinary').v2;
const session = require("express-session");
const dotenv = require('dotenv').config();
const connection = require("./models/db");

const usuarioController = require('./controllers/usuarioController');

const app = express();
const port = 3300;

    cloudinary.config({ 
        cloud_name: 'dimt4ezzx', 
        api_key: '313823824762314', 
        api_secret: 'JpCkXOn3GDQiqjr99dck7vVaZHw' 
    });

    app.set("view engine", "ejs");
    app.set('layout', './usuarios/login');
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.urlencoded({ extended: true }));
    app.use(routes);

    app.use(session({secret: 'r0dr1galus'}));

    app.use((req, res, next) => {
        if (req.session.usuario) {
            console.log('Logado');
            next();
        }else{
            console.log('Não logado');
            if(req.url == '/' || req.url == '/perfil' || req.url == '/logout'){
                res.redirect('/login?erro=2');
            }else{
                next();
            }
        }
    });
    
    app.get('/', (req, res) => {
        app.set('layout', './principal');
        res.render('principal');
    });
    
    app.get('/login', (req, res) => {
        app.set('layout', './usuarios/login');
        usuarioController.login(req, res);
    });
    
    app.post('/login', (req, res) => {
        usuarioController.autenticar(req, res);
    });
    
    app.get('/cadastro', (req, res) => {
        app.set('layout', './uusarios/cadastro');
        usuarioController.cadastro(req, res);
    });
    
    app.post('/cadastro', (req, res) => {
        usuarioController.cadastrar(req, res);
    });

    app.listen(port, () =>
        console.log(`Servidor rodando em http://localhost:${port}`)
);