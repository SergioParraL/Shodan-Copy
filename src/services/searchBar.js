import { processingData } from "./buildingData.js"
const $url = 'https://api.shodan.io'
// const ip = '147.135.27.93'

const fetchData = (urlAPI) => {
    const response = fetch(urlAPI)

    return response
}
window.onload = () =>{
    const element = document.querySelector('nav-bar')
    const shadow = element.shadowRoot
    const iconInput = shadow.querySelector('.search')
    const form = shadow.querySelector('form')
    form.addEventListener('submit', (event) =>{
        event.preventDefault()
        makeQuery(shadow)
        // validar que sean numeros
    })
    // iconInput.addEventListener('click', (event)=> makeQuery(shadow))
}

const makeQuery = () =>{
    const element = document.querySelector('nav-bar')
    const shadow = element.shadowRoot
    const ip = shadow.querySelector('#search').value
        if ( ip != ''){
            fetch(`${$url}/shodan/host/${ip}?key=40ojJVd399m5flUsiKI2w9d7rBo6Y7uT`)
                .then(response => response.json())
                .then(data => processingData(data, shadow))
                .catch(err => console.error(err))
        }else{
            console.log('You need write a IP number')
        }
}