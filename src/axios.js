const axios = require('axios');
const { param } = require('../routesFiles/routes');

const base = `https://api.shodan.io/shodan/host/`
const key = 'mdIBTyor5MZmZ4FKKWRO5jrA2f9tJ6bl';


const  urlDomainName = `` // we don't have enough credits for this functionality from Shodan API

// it's necessary create a object with all kind of routes possibles for make a query with ajax.. 
// then, in the UI you need change the part for differents kind of search that you can do with the Shodan's API


function containsNumbers(str) {           // this function test if the query have numbers using regular Expressions
    return /\d/.test(str);
  }
  

function query(query,param){
    console.log(query,param)
  let url
  if(param == 'ip'){              // urlip
    url = `${base}${query}?key=${key}`
  }
  else{                           // urlWord
    url = `${base}search?key=${key}&query=${query}`
  }
  //  const url = `${base}${route}?key=${key}&${queryOptions[0]}=${query}`
    // console.log(query)
    // console.log(containsNumbers(query))
    
    return axios.get(url);
}

module.exports = query;