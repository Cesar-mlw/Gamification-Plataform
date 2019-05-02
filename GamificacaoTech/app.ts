import debug = require('debug');
import express = require('express');
import path = require('path');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require("express-ejs-layouts"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/usuario", require("./routes/api/usuario"))

app.use((req: express.Request, res: express.Response, next) => {
    let err = new Error("Não encontrado");
    err["status"] = 404;

    // Executa o próximo tratador na sequência (que no nosso caso
    // será um dos dois tratadores abaixo)
    next(err);
});

// Registra os tratadores de erro
app.use((err: any, req: express.Request, res: express.Response, next) => {
    res.status(err.status || 500);
    res.render("error", {
        layout: "layout",
        message: err.message,
        // Como é um ambiente de desenvolvimento, deixa o objeto do erro
        // ir para a página, que possivelmente exibirá suas informações
        error: err
    });

    // Não estamos chamando next(err) aqui porque não temos mais
    // tratadores abaixo desse
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
