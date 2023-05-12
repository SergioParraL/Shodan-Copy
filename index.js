const express = require('express');
const url = require('url');
const ejs = require('ejs');
const { response } = require('express');
const routes = require('./routes/routes')
const fs = require('fs');
const app = express();

const $port = (process.env.PORT || 3001);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs');
app.use('/', routes)

app.get('/', (req,res) => {
    res.render('index')
});

app.listen($port, () => {
    console.log(`The server are in the Port ${$port}`)
});

