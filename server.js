var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());


app.use(express.static("dist/admin-lte")); // myApp will be the same folder name.
app.get('/', function (req, res, next) {
    res.redirect('/dist/admin-lte/index.html');
});

app.post('/api/v1/login', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    if (username == 'ppp' && password == 'ppp')
        res.json({ status: true, message: '', data: { username, password } });
    else res.json({ status: false, message: 'Invalid username or password', data: null });

});

class Dashboard {
    constructor(mediaCount, campaignCount, comments, availableMediaCount) { }
}

app.get('/api/v1/dashboard', function (req, res, next) {
    dashboard = new Dashboard();
    dashboard.mediaCount = 20;
    dashboard.campaignCount = 400;
    dashboard.comments = 50;
    dashboard.availableMediaCount = 0;
    res.json({
        status: true, message: '',
        data: dashboard
    });
});


app.listen(8080, 'localhost');
console.log("MyProject Server is Listening on port 8080");
