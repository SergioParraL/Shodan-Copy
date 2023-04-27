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
    const path = './public/javascript/response.txt';
    
    query(search,group1)
        .then(response =>{
			const jsonResponse = JSON.stringify(response.data)
			writeFile.deleteFileData(path)
			writeFile.writeFileData(path,jsonResponse)
            if(response.data.total == 0){
                res.redirect(`errorView?error=No%20Data%20Fount`)
            }else{
                if(group1 == 'search'){
                    res.redirect('globalResult')
                }else{
                    res.redirect('individualResult')
                }
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