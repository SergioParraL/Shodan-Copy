import { processingData, resetComponentsDOM } from "./buildingData.js"
const $url = 'https://api.shodan.io'
// const ip = '147.135.27.93'




window.onload = () =>{
    const element = document.querySelector('nav-bar')
    const shadow = element.shadowRoot
    const inconSearch = shadow.querySelector('.search-icon')
    const form = shadow.querySelector('form')
    const x = shadow.querySelector('.close-outline')
    x.addEventListener('click', ()=>{
        resetForm(form)
    })
    form.addEventListener('submit', (event) =>{
        event.preventDefault()
        makeQuery(form)
        // validar que sean numeros
    })
    inconSearch.addEventListener('click', (event)=>{
        makeQuery(form)
    })
}

const makeQuery = (form) =>{
    resetComponentsDOM()
    const element = document.querySelector('nav-bar')
    const shadow = element.shadowRoot
    const ip = shadow.querySelector('#search').value
        if ( ip != ''){
            fetch(`${$url}/shodan/host/${ip}?key=40ojJVd399m5flUsiKI2w9d7rBo6Y7uT`)
                .then(response => response.json())
                .then(data => processingData(data))
                .catch(err => {
                    console.error(err)
                    resetComponentsDOM()
                })
        }else{
            console.log('You need write a IP number')
        }
    resetForm(form)
    
}

const resetForm = (form) =>{
    form.reset()
}