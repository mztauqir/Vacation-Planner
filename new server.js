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

// MAIN PAGES
    // index page 
app.get('/', function(req, res) {
    // use res.render to load up an ejs view file
    res.render('index.ejs', {
    });
});
    // Tecnician page
app.get('/Technicians', function(req, res) {
    res.render('Technicians.ejs', {  
    });
});
// Login page
app.get('/authenticate', function(req, res) {

    res.render('login.ejs', {
    });
});
// processing login
app.post('/process_login', function(req,res){
    var user = req.body.username;
    var password = req.body.password;
    var TechnicianRequest = JSON.stringify({Table_Name:"Technicians"})
    axios.post('http://127.0.0.1:5000/api', TechnicianRequest, {headers:{
        "Content-Type":"application/json"}
    })
    .then((response)=>{
        // Technician List
        var TechniciansList = response.data
        const techs_user = [];
        const techs_pass = [];
        for (pos in TechniciansList){
            techs_user[pos] = TechniciansList[pos].Username;
            techs_pass[pos] = TechniciansList[pos].Password;
        }
        var Check = true
        for (i in techs_user){
            var t_user = techs_user[i];
            var t_pass = techs_pass[i];
            if (user == t_user && password == t_pass)
            {
                Check = false
                return res.render('welcome.ejs',{
                    user: user,
                    auth: true
                });
            }
            else
            {
                continue
            }
        }
        if (Check == true)
        {
            return res.render('welcome.ejs',{
                user: user,
                auth: false
            });
        }
    }).catch(err => console.log(err))
});


//SCHEDULER
// Thanks page
app.get('/Thanks', function(req, res) {
    res.render('Thanks.ejs', {  
    });
});
    //SCHEDULER FORM
app.post('/Scheduler_Form', function(req, res){
    // create variables to hold the necesssary info from the request body ---------------------
    var First_Name = req.body.user_firstname
    var Last_Name = req.body.user_lastname
    var Address = req.body.user_address
    var City = req.body.user_city
    var Zip = req.body.user_zip
    var Phone = req.body.user_phone
    var Email = req.body.user_email
    var State_Code = req.body.user_statecode
    var Country_Code = req.body.user_countrycode
    var State = req.body.user_state
    //FORMATTED JSON
    var schedulerData = JSON.stringify({
        First_Name: First_Name,
        Last_Name: Last_Name,
        Address: Address,
        City: City,
        Zip: Zip,
        Phone: Phone,
        Email: Email,
        State_Code: State_Code,
        Country_Code: Country_Code,
        State: State
    });

    //Edit API CALL with user INPUT for desired change in data ------------------------
    axios.post('http://127.0.0.1:5000/api/Customer', schedulerData, {headers:{
        "Content-Type":"application/json"}
    })
    .then((response)=>{
        // Console log shows us that data was obtained, good to know for troubleshooting ------------
        console.log(response.data);
    }).catch(err => console.log(err))

    res.render('Thanks.ejs', {  
    });

});
//ESTIMATOR
// Estimate page
app.get('/Estimator', function(req, res) {
    res.render('Estimator.ejs', {
    });
});
    //ESTIMATOR FORM
app.post('/Estimator_Form', function(req, res){
    // create variables to hold the necesssary info from the request body ---------------------
    var First_Name = req.body.user_firstname
    var Last_Name = req.body.user_lastname
    var Address = req.body.user_address
    var City = req.body.user_city
    var Zip = req.body.user_zip
    var Phone = req.body.user_phone
    var Email = req.body.user_email
    var State_Code = req.body.user_statecode
    var Country_Code = req.body.user_countrycode
    var State = req.body.user_state
    //FORMATTED JSON
    var estimatorData = JSON.stringify({
        First_Name: First_Name,
        Last_Name: Last_Name,
        Address: Address,
        City: City,
        Zip: Zip,
        Phone: Phone,
        Email: Email,
        State_Code: State_Code,
        Country_Code: Country_Code,
        State: State
    });
    
    //Edit API CALL with user INPUT for desired change in data ------------------------
    axios.post('http://127.0.0.1:5000/api/Customer', estimatorData, {headers:{
        "Content-Type":"application/json"}
    })
    .then((response)=>{
        // Console log shows us that data was obtained, good to know for troubleshooting ------------
        console.log(response.data);
    }).catch(err => console.log(err))

    res.render('Estimator.ejs', {  
    });

});
//TECHNICIANS
// New Technician page
app.get('/New_Technician', function(req, res) {

    res.render('newTechnicianForm.ejs', {
    });
    
});
    //NEW TECHNICIAN FORM
app.post('/New_Tech', function(req,res){
    // Takes information from form
    var First_Name = req.body.tech_firstname
    var Last_Name = req.body.tech_lastname
    var Email = req.body.tech_email
    var Phone = req.body.tech_number
    var Username = req.body.tech_username
    var Password = req.body.tech_password
    //FORMATTED JSON
    var newTechData = JSON.stringify({
        First_Name: First_Name,
        Last_Name: Last_Name,
        Email: Email,
        Phone: Phone,
        Username: Username,
        Password: Password
    });

    // Sends information from form to database table using API
    axios.post('http://127.0.0.1:5000/api/Technicians', newTechData, {headers: {
        "Content-Type":"application/json"}
    })
    .then((response)=>{
        console.log('CHECK')
        console.log(response.data);
    }).catch(err => console.log(err))

    res.render('NewTech.ejs',{
        First_Name: First_Name
    });

});
// PTO page
app.get('/New_PTO', function(req, res) {

    res.render('newPTOForm.ejs', {
    });
    
});
//EQUIPMENT
// New Vehicle page
app.get('/NewVehicles', function(req, res) {

    res.render('newVehicleForm.ejs', {
    });
    
});
    //NEW VEHICLE FORM
app.post('/New_Vehicle', function(req,res){
    // Takes information from form
    var plate = req.body.vehicle_plate
    var make = req.body.vehicle_make
    var model = req.body.vehicle_model
    var color = req.body.vehicle_color
    //FORMATTED JSON
    var newVehicleData = JSON.stringify({
        License_Plate: plate,
        Make: make,
        Model: model,
        Color: color
    });

    // Sends information from form to database table using API
    axios.post('http://127.0.0.1:5000/api/Vehicle', newVehicleData, {headers:{
        "Content-Type":"application/json"}
    })
    .then((response)=>{
        console.log(response.data);
    }).catch(err => console.log(err))

    res.render('NewVehicle.ejs',{
    });

});
//Service
// New Location page
app.get('/New_Location', function(req, res) {
    var stateRequest = JSON.stringify({ Table_Name: "State" });
    var countryRequest = JSON.stringify({ Table_Name: "Country"})
    axios.post('http://127.0.0.1:5000/api', stateRequest, {headers:{
        "Content-Type":"application/json"}
    })
    .then((response)=>{
        // State List
        var stateList = response.data
        const states = [];
        for (pos in stateList){
            states[stateList[pos].State_Code]= stateList[pos].State_Name;
        }
        // Country List
        axios.post('http://127.0.0.1:5000/api', countryRequest, {headers:{
            "Content-Type":"application/json"}
        })
        .then((response)=>{
            var countryList = response.data
            const countries = []
            for (c_pos in countryList){
                countries[countryList[c_pos].Country_Code]= countryList[c_pos].Country_Name;
            }
            res.render('newServiceLocationForm.ejs', {
                stateList: states,
                countryList: countries
            });
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    
});
    //LOCATION FORM
app.post('/New_Location', function(req,res){
    // Takes information from form
    var City = req.body.location_city
    var Zip = req.body.location_zip
    var State = req.body.location_state
    var Country = req.body.location_country
    //FORMATTED JSON
    var newLocationData = JSON.stringify({
        City: City,
        Zip: Zip,
        State_Code: State, //Code will have to give out state code using state as an identifier
        Country_Code: Country // Same
    });

    // Sends information from form to database table using API
    axios.post('http://127.0.0.1:5000/api/Service_Locations', newLocationData, {headers:{
        "Content-Type":"application/json"}
    })
    .then((response)=>{
        console.log(response.data);
    }).catch(err => console.log(err))

    res.render('NewServiceLocation.ejs',{
    });

});

app.listen(8080);
console.log('8080 is the magic port');
