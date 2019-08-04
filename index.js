var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// https://stackoverflow.com/questions/31119605/expressjs-angularjs-post
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));

// https://stackabuse.com/reading-and-writing-json-files-with-node-js/
const fs = require('fs');

// https://flaviocopes.com/express-send-json-response/
app.get('/data', (req, res) => {
    let rawdata = fs.readFileSync('data/data.json');
    let json = JSON.parse(rawdata);
    res.json(json);
})
//assuming app is express Object.
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/data', function(req, res) {
    // var body=req.body;
    let reasons = req.body;

    saveReasonsToPublicFolder(reasons, function(err) {
        if (err) {
            res.status(404).send('User not saved');
            return;
        }
    });

    res.end();
});

function saveReasonsToPublicFolder(reasons, callback) {
    fs.writeFile('./data/data.json', JSON.stringify({
        "reasons": reasons
    }), callback);
}

app.listen(3000);