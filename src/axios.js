const axios = require('axios');

function query(query){
    console.log('entrando query')
    console.log(query)
    return axios.get(query);
}

module.exports = query;