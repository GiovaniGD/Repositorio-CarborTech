const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const routes = require("./routes/routes");
const session = require("express-session");
const bodyParser = require('body-parser');

const usuarioController = require('./controllers/usuarioController');
const mapaController = require('./controllers/mapaController');
const mapaModel = require("./models/mapaModel");

const app = express();
const port = 3300;

    app.use(routes);
    app.set("view engine", "ejs");
    app.set('layout', './usuarios/login');
    app.use(express.static(path.join(__dirname, "public")));
    app.use(expressLayouts);
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(session({secret: 'r0dr1galus'}));

    app.use((req, res, next) => {
        if (req.session.usuario) {
            console.log('Logado');
            next();
        }else{
            console.log('Não logado');
            if(req.url == '/mapa' || req.url == '/servicoArea' || req.url == '/compraJabuticabeira' || req.url == '/compraAraucaria'){
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
        app.set('layout', './servicos/compraAraucaria');
        res.render('servicos/compraAraucaria');
    });


    app.get('/jabuticabeira', (req, res) => {
        app.set('layout', './produtos/jabuticabeira');
        res.render('produtos/jabuticabeira');
    });

    app.get('/compraJabuticabeira', (req, res) => {
        app.set('layout', './servicos/compraJabuticabeira');
        res.render('servicos/compraJabuticabeira');
    });

    app.get('/servicoArea', (req, res) => {
        app.set('layout', './servicos/servicoArea');
        res.render('servicos/servicoArea', { email_servico: req.session.usuario.email });
      });

    let dadosarea = null;

    function areadados() {
    return new Promise((resolve) => {
        resolve(dadosarea);
    });
    }

    // Serviços
    app.post('/dadosArea', (req, res) => {
        const proprietario = req.body.proprietario;
        const area = req.body.area;
        const perimetro = req.body.perimetro;
        const coordinates = req.body.coordinatesJSON;
        const usuario_cadastrante = req.body.usuario_cadastrante;
        const descricao = req.body.descricao;
        const email = req.body.emailProprietario;
        const municipio = req.body.municipio;
        const endereco = req.body.endereco;
        const tipo = req.body.tipo;
        const email_cadastrante = req.body.email_cadastrante;
        
        dadosarea = { proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email, municipio, endereco, tipo, email_cadastrante };
    });

    app.get('/mapa', async (req, res) => {
        app.set('layout', './servicos/mapa');
        res.render("servicos/mapa", { area: req.session.area });
    });

    app.get('/areas', async (req, res) => {
        app.set('layout', './servicos/mapa');
        
        try {
            const areas = await mapaModel.pegarAreas();
            const user = req.session.usuario.email;

            await mapaController.verificarSobreposicao(areas);

            res.json({ areas, user });
        } catch (error) {
            console.error('Erro ao buscar áreas do servidor:', error);
            res.status(500).json({ error: 'Erro ao recuperar áreas.' });
        }
    });

    app.get('/mapa/cadastro', (req, res) => { 
        mapaController.cadastroArea(req, res);
    });

    app.post('/mapa/cadastro', mapaController.cadastroArea);

    app.get('/apagarArea', mapaController.apagarArea);

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

module.exports = { areadados };