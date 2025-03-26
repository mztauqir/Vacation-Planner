// load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

var selectedID = "";
app.use(bodyParser.urlencoded());

// set the view engine to ejs
app.set('view engine', 'ejs');

// CSS file link
app.use( express.static( "public" ) );

app.use(bodyParser.json());


// welcome page
app.get('/', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/welcome', {
    });
});

// index page
app.get('/index', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/index', {
    });
});

// Login page
app.get('/process_login', function(req, res) {

    res.render('pages/index', {
    });
});

// create page
app.get('/create', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/create', {
    });
});
// index page
app.get('/insert', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/insert', {
    });
});
// index page
app.get('/delete', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/delete', {
    });
});
// index page
app.get('/update', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/update', {
    });
});
// index page
app.get('/view', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('pages/view', {
    });
});

app.listen(8080);
console.log('8080 is the magic port');
