const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const routes = require("./routes/routes");
const session = require("express-session");
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connection = require("./models/db");

const usuarioController = require('./controllers/usuarioController');
const mapaController = require('./controllers/mapaController');
const mapaModel = require("./models/mapaModel");

const app = express();
const port = 3300;

    app.set("view engine", "ejs");
    app.set('layout', './usuarios/login');
    app.use(express.static(path.join(__dirname, "public")));
    app.use(expressLayouts);
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(routes);

    app.use(session({secret: 'r0dr1galus'}));

    app.use((req, res, next) => {
        if (req.session.usuario) {
            console.log('Logado');
            next();
        }else{
            console.log('Não logado');
            if(req.url == '/mapat' || req.url == '/perfil'){
                res.redirect('/login?erro=2');
            }else{
                next();
            }
        }
    });

    // Nome do usuário logado
    app.use((req, res, next) => {
        if (req.session.usuario) {
          res.locals.usuario = req.session.usuario;
        } else {
          res.locals.usuario = null;
        }
        next();
      });
    
    // Tela principal
    app.get('/', (req, res) => {
        app.set('layout', './principal');
        res.render('principal');
    });

    
    // Produtos
    app.get('/araucaria', (req, res) => {
        app.set('layout', './produtos/araucaria');
        res.render('produtos/araucaria');
    });
    
    app.get('/compraAraucaria', (req, res) => {
        res.render('servicos/compraAraucaria.ejs');
    });


    app.get('/jabuticabeira', (req, res) => {
        app.set('layout', './produtos/jabuticabeira');
        res.render('produtos/jabuticabeira');
    });

    app.get('/compraJabuticabeira', (req, res) => {
        res.render('servicos/compraJabuticabeira.ejs');
    });


    // Serviços
    app.post('/dadosArea', (req, res) => {
        const proprietario = req.body.proprietario;
        const area = req.body.area;
        const perimetro = req.body.perimetro;
        const coordinates = req.body.coordinatesJSON;
        
        module.exports = { proprietario, area, perimetro, coordinates };
    });

    app.get('/coordenadas', async (req, res) => {
        try {
          const areas = await MapaModel.pegarAreas();
          res.json({ areas });
        } catch (error) {
          console.error('Erro ao recuperar áreas:',   error);
          res.status(500).json({ error: 'Erro ao recuperar áreas.' });
        }
      });

    app.get('/mapa', async (req, res) => {
        app.set('layout', './servicos/mapa');
        res.render("servicos/mapa", { area: req.session.area});
    });

    app.get('/areas', async (req, res, area) => {
        app.set('layout', './servicos/mapa');
        
        try {
            const areas = await mapaModel.pegarAreas();
            res.json({ areas });
        } catch (error) {
            console.error('Erro ao buscar áreas do servidor:', error);
            res.status(500).json({ error: 'Erro ao recuperar áreas.' });
        }
    });

    app.get('/mapa/cadastro', (req, res) => { 
        mapaController.cadastroArea(req, res);
    });

    app.post('/mapa/cadastro', mapaController.cadastroArea);


    app.get('/quiz', (req, res) => {
        app.set('layout', './servicos/quiz');
        res.render('servicos/quiz');
    });
    

    // Usuários
    app.get('/login', (req, res) => {
        app.set('layout', './usuarios/login');
        usuarioController.login(req, res);
    });
    
    app.post('/login', (req, res) => {
        usuarioController.autenticar(req, res);
    });
    
    app.get('/cadastro', (req, res) => {
        app.set('layout', './usuarios/cadastro');
        usuarioController.cadastro(req, res);
    });
    
    app.post('/cadastro', (req, res) => {
        usuarioController.cadastrar(req, res);
    });

    app.listen(port, () =>
        console.log(`Servidor rodando em http://localhost:${port}`)
);