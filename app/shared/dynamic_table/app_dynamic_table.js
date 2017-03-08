var express = require('express');
//Application object
var app = express();

var bodyParser = require('body-parser');

//initialize body
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//you can write RESTFULL Webservice mapping api

//data


var heroes = [
    { id: 11, name: 'Mr. Nice', status: 'incomplete' },
    { id: 12, name: 'Narco', status: 'complete' },
    { id: 13, name: 'Bombasto', status: 'complete' },
    { id: 14, name: 'Celetitas', status: 'incomplete' },
    { id: 15, name: 'Magneta', status: 'complete' },
    { id: 16, name: 'Rubberman', status: 'incomplete' },
    { id: 17, name: 'Dynama', status: 'incomplete' },
    { id: 18, name: 'Dr IQ', status: 'complete' },
    { id: 19, name: 'Magma', status: 'complete' },
    { id: 20, name: 'Tornado', status: 'incomplete' }
];

var players = [{
    "rank": 1,
    "name": "Dhoni"
}, {
    "rank": 2,
    "name": "Kohli"
}, {
    "rank": 1,
    "name": "Tendulkar"
}, {
    "rank": 1,
    "name": "Dravid"
}, {
    "rank": 1,
    "name": "Ganguly"
}]
app.get('/hello', (req, res) => {
    res.send('<h1>Hello!</h1>');
});

//heroes - get all heroes
app.get('/heroes', (req, res) => {
    res.json(heroes);
    res.end();
});

app.get('/players', (req, res) => {
    res.json(players);
    res.end();
});

//insert hero : http://localhost:3000/heroes/{id}
app.post('/heroes', (req, res) => {
    console.log(req.body);
    var jsonHero = req.body;
    heroes.push(jsonHero);
    console.log('Post is called!');
    res.json(heroes);
    res.end();
});

app.post('/search', (req, res) => {
    console.log(req.body);
    res.json(heroes);

});

var stocks = [
    { name: 'tcs', price: '100', status: 'incomplete' },
    { name: 'wipro', price: '300', status: 'complete' },
    { name: 'tata', price: '400', status: 'incomplete' },
    { name: 'reliance power', price: '500', status: 'complete' },
    { name: 'reliance digital', price: '500', status: 'complete' }
];

app.get('/search/:string', (req, res) => {
    var stocknames = [];
    var sendStocks = [];
    var stock = req.params.string;

    for (var i = 0; i < stocks.length; i++) {
        if (stocks[i].name.indexOf(stock) > -1) {
            sendStocks.push(stocks[i]);
        }
    }
    res.json(sendStocks);
    res.end();

});

app.get('/search', (req, res) => {
    res.end();
});

app.get('/stocks', (req, res) => {
    //res.json(stocks);
    //console.log(stocks[0].price.length);
    //console.log(stocks[0].name.length);
    /*var tableType = req.params.tableType;
    if (tableType === 'stocks') {
        res.json(stocks);
    } else if (tableType === 'heroes') {
        res.json(heroes);
    } else {
        res.json(players);
    }*/
    console.log("Inside server");
    res.json(stocks);
    res.end();
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});