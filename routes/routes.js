const express = require('express');
const router = express.Router();

const app = express()
app.use(express.json());

const writeFile = require('../src/writeFileData.js')
const query = require('../src/axios.js');
const { response, urlencoded } = require('express');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


router.post('/', (req,res) => {
    const { search, group1 } = req.body;
    // console.log(search)
    // console.log(group1)
    const path = './public/javascript/response.txt';

    query(search,group1)
        .then(response =>{
			const jsonResponse = JSON.stringify(response.data)
			writeFile.deleteFileData(path)
			writeFile.writeFileData(path,jsonResponse)
            if(group1 == 'search'){
                if(response.data.total == 0){
                    res.redirect('errorView?error=WeHaveAError')  // it's necessary setup the error view and take the data from the url
                }else{
                    res.redirect('globalResult')
                }
            }else{
                res.redirect('individualResult')
            }
        })
        .catch(error => {
            // data: { error: 'Invalid IP' }
            const exception = error.response.data
            if(exception.hasOwnProperty('error')){
                res.redirect(`errorView?error=${exception.error}`) // it's necessary setup the error view and take the data from the url
            }
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

router.get('/errorView', (req,res) => {
    res.render('errorView')
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