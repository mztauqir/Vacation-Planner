//load the things we need
var express = require('express');
var app = express();
const bodyParser  = require('body-parser');

// required module to make calls to a REST API
const axios = require('axios');

var selectedID = "";
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    axios.get(`http://127.0.0.1:5000/api/trip/all`)
    .then(response => {
        var tagline = response.data;
        res.render('pages/thanks.ejs',{
            tagline: tagline
        });

    });

});

// about page
app.get('/add_trip', function(req, res) {
    res.render('pages/add_trip');
});

// about page
app.get('/delete_trip', function(req, res) {
    res.render('pages/delete_trip');
});

// about page
app.get('/update_vacation', function(req, res) {
    res.render('pages/update_vacation');
});

app.post('/trip', function(req, res){
    var destination_id = req.body.destination_id;
    var transportation = req.body.transportation;
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    var trip_name = req.body.trip_name;
    var country = req.body.country;
    var city = req.body.city;
    var sight_seeing = req.body.sight_seeing;

    axios.post('http://127.0.0.1:5000/api/trip', {
        destinationid: destination_id,
        transportation: transportation,
        startdate: start_date,
        enddate: end_date,
        tripname: trip_name,
        country: country,
         city: city,
        sightseeing: sight_seeing

    }).then(response => {
        var tagline = response.data;
        res.render('pages/thanks.ejs',{
            tagline: tagline
        });

    });

})

app.post('/trip', function(req, res){
    var idToDelete = req.body.idToDelete;

    axios.post('http://127.0.0.1:5000/api/trip/', {
        id: idToDelete

    }).then(response => {
        var tagline = response.data;
        res.render('pages/thanks.ejs',{
            tagline: tagline
        });

    });

})

app.put('/destination', function(req, res){
    var dest_id = req.body.dest_id;
    var u_country = req.body.u_country;
    var u_city = req.body.u_city;
    var u_sightseeing = req.body.u_sightseeing;
    var u_transportation = req.body.u_transportation;
    var u_startdate = req.body.u_startdate;
    var u_enddate = req.body.u_enddate;
    var u_tripname = req.body.u_tripname;

    axios.post('http://127.0.0.1:5000/api/destination/', {
        id: dest_id,
        country: u_country,
        city: u_city,
        sightseeing: u_sightseeing,
        transportation: u_transportation,
        startdate: u_startdate,
         enddate: u_enddate,
        tripname: u_tripname

    }).then(response => {
        var tagline = response.data;
        res.render('pages/thanks.ejs',{
            tagline: tagline
        });

    });

})

app.listen(8080);
console.log('8080 is the magic port');
