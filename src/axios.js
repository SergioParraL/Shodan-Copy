const axios = require('axios');

function query(query){
    return axios.get(query);
}

module.exports = query;