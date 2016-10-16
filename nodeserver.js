var express = require('express');
var app = express();

var fs = require("fs");
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var multer = require('multer');
var storage1 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './file/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now()+'-' + file.originalname);
    }
});
var upload1 = multer({ storage: storage1 }).array('userPhoto', 5);
var storage2 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});
var upload2 = multer({ storage: storage2 }).array('userPhoto', 5);

var cookieParser = require('cookie-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(upload1);//upload multiplefiles
app.use(upload2);//upload multiplefiles
app.use(cookieParser());
//app.use(express.cookieParser());

app.get('/index.html', function (req, res) {
    res.cookie('email', 'aks@gmail.com', { maxAge: 900000, httpOnly: true });
    console.log("Cookies: ", req.cookies);
    res.sendFile(__dirname + "/" + "index.html");
})
app.get('/process_get', function (req, res) {
    console.log("Cookies: ", req.cookies);
    // Prepare output in JSON format
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})
app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {
    console.log(req.files);
    upload1(req, res, function (err) {
        //console.log(req.body);
        console.log(req.files);
        if (err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
})

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
    console.log("Got a GET request for /list_user");
    res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})