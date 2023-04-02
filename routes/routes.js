const express = require('express');
const router = express.Router();

const app = express()
app.use(express.json());

const writeFile = require('../src/writeFileData.js')
const query = require('../src/axios.js');
const { response, urlencoded } = require('express');

const base = `https://api.shodan.io/`
const route = `shodan/host/search`;
const key = 'mdIBTyor5MZmZ4FKKWRO5jrA2f9tJ6bl';
const queryOptions = ['query','Domain','Country']; 

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/', (req,res) => {
    const dataForm = req.body.search;
    console.log(req.body.search)
    const path = './public/javascript/response.txt';
    query(`${base}${route}?key=${key}&${queryOptions[0]}=${dataForm}`)
        .then(response =>{
			const jsonResponse = JSON.stringify(response.data)
			writeFile.deleteFileData(path)
			writeFile.writeFileData(path,jsonResponse)
            res.redirect('globalResult')
        })
        .catch(error => {
                console.error(error)
        })
})

router.post('/newSearchByLink', (req,res) => {
    console.log(req.body)
    res.send('index')
})

router.get('/individualResult', (req,res) => {
    res.render('individualResult')
});

router.get('/globalResult', (req,res) => {
    res.render('globalResult')
})

module.exports = router;








// const repetitions = {};

// for (const key in sendDataFrontend.totalData) {
//   if (Array.isArray(sendDataFrontend.totalData[key])) {
// 	sendDataFrontend.totalData[key].forEach((value) => {
// 	  if (typeof value === "string") {
// 		sendDataFrontend.production[value] = sendDataFrontend.production[value] ? sendDataFrontend.production[value] + 1 : 1;
// 	  }
// 	});
//   } else {
// 	console.error(`Value for key "${key}" is not an array`);
//   }
// }

// console.log(sendDataFrontend.production)