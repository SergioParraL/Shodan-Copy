document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/javascript/response.txt')
        .then(response => response.json())
        .then(data => buildData(data))
        .catch(error => console.error(error))
})

const buildData = (json) => {
    const { latitude, longitude } = json
    console.log(json);
    map(latitude,longitude)
}
// latitude 30.29365
// longitude 120.16142
const map = (x,y) => {
    console.log(x,y)
    const mapTag = document.querySelector('.mapFrame')
    let urlMap = `https://api.maptiler.com/maps/hybrid/?key=Yzumo1aUQzbA1gTZxvgC#9.9/${x}/${y}`
    mapTag.setAttribute('src',urlMap)
}