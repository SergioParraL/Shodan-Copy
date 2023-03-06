const express = require('express');
const router = express.Router();

const writeFile = require('../src/writeFileData.js')
const query = require('../src/axios.js')

const base = `https://api.shodan.io/`
const route = `shodan/host/search`;
const key = 'mdIBTyor5MZmZ4FKKWRO5jrA2f9tJ6bl';
const queryOptions = ['query','Domain','Country']; 




router.post('/', (req,res) => {
    const dataForm = req.body.search;
    const path = './public/javascript/response.txt';
    const q = 'https://api.shodan.io/shodan/host/search?key=mdIBTyor5MZmZ4FKKWRO5jrA2f9tJ6bl&query=comida';
    const w = '`${base}${route}?key=${key}&${queryOptions[0]}=${dataForm}`';
    query(`${base}${route}?key=${key}&${queryOptions[0]}=${dataForm}`)
        .then(response =>{
            console.log('entrando')
            const jsonResponse = JSON.stringify(response.data)
            writeFile.deleteFileData(path)
            writeFile.writeFileData(path,jsonResponse)
            res.redirect('globalResult')
        })
        .catch(error => {
                console.error(error)
        })
})

router.get('/individualResult', (req,res) => {
    res.render('individualResult')
});

router.get('/globalResult', (req,res) => {
    res.render('globalResult')
})




module.exports = router;