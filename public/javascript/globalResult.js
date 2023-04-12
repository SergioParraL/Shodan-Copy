// const m = {name : 'sergio', last : 'Parra'}
// console.log(JSON.stringify(m))
// fetch('/', {
//     method : 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(m)
// })
// .then(response => console.log(response))
// .catch(err => console.error(err))
let $showObjData = {
    port : [],
    org	: [],
    ip_str : [],
    timestamp	: [],
    isp	: [],
    country_name: [],
    city : [],
    data : [],
};

const buildObj = obj => {
    const params = Object.keys($showObjData)
    for (let key_obj in obj) {
		let value = obj[key_obj];
		if (typeof value === 'object') buildObj(value)
		else {
            if (params.includes(key_obj)) {
                const q = key_obj;
                $showObjData[key_obj].push(value)
            }
		}
	}
}
// hacer una funcion que solo recorra objetos
const buildResumeDataObj = obj => {
    let count = {
        org : {},
        country_name : {},
        port : {}
    }
    const params = Object.keys(count);
    for (const key in obj) {
        const element = obj[key];
        if(params.includes(key)){
            element.forEach(e => {
                if(count[key][e]){
                    count[key][e]++;
                } else{
                    count[key][e] = 1
                }
            });
        }
    }
    return count
}

const createElement = (data) => {
    // Cree un div para contener todos los artículos
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("data");

    // Cree el primer artículo y sus elementos
    const article1 = document.createElement("article");

    const ipDiv = document.createElement("div");
    ipDiv.classList.add("ip");

    const ipLink = document.createElement("a");
    ipLink.classList.add("ip_str");
    ipLink.href = "#";
    // ipLink.href = "individualResult";
    ipLink.textContent = data.ip;

    const timeStampDiv = document.createElement("div");
    timeStampDiv.classList.add("timeStamp");
    timeStampDiv.textContent = data.timestamp;

    // Agregue los elementos al primer artículo
    ipDiv.appendChild(ipLink);
    article1.appendChild(ipDiv);
    article1.appendChild(timeStampDiv);

    // Cree el segundo artículo y sus elementos
    const article2 = document.createElement("article");

    const ul = document.createElement("ul");

    const ispLi = document.createElement("li");
    ispLi.classList.add("isp");
    ispLi.addEventListener('click', (e) => {
        console.log(e)
    })

    const ispLink = document.createElement("a");
    ispLink.href = "#";
    ispLink.textContent = data.isp;

    const addressLi = document.createElement("li");
    addressLi.classList.add("address");

    const flagSpan = document.createElement("span");
    flagSpan.classList.add("flag");
    flagSpan.textContent = "🇻🇪";

    const countryLink = document.createElement("a");
    countryLink.href = "#";
    countryLink.textContent = ` ${data.country}, `;

    const cityLink = document.createElement("a");
    cityLink.href = "#";
    cityLink.textContent = data.city;

    const dataObjectDiv = document.createElement("div");
    dataObjectDiv.classList.add("dataObject");

    const dataPre = document.createElement("pre");
    dataPre.classList.add("dataPre");
    dataPre.textContent = data.data;

    // Agregue los elementos al segundo artículo
    ispLi.appendChild(ispLink);
    addressLi.appendChild(flagSpan);
    addressLi.appendChild(countryLink);
    addressLi.appendChild(cityLink);
    ul.appendChild(ispLi);
    ul.appendChild(addressLi);
    article2.appendChild(ul);
    dataObjectDiv.appendChild(dataPre);
    article2.appendChild(dataObjectDiv);

    // Agregue ambos artículos al contenedor principal
    dataDiv.appendChild(article1);
    dataDiv.appendChild(article2);

    // Agregue el contenedor principal al cuerpo del documento HTML
    const resumeData = document.querySelector('.response-Data')
    resumeData.appendChild(dataDiv);
    // console.log(resumeData)

}

const cardMainData = obj => {
   
    const sortFirst5 = obj.matches.slice(0,9);
    sortFirst5.forEach(element => {
        const { isp, data, ip_str, org, location: {city, country_name}, timestamp, }  = element
        createElement ({
            isp : isp,
            ip : ip_str,
            data : data,
            org : org,
            city : city,
            country : country_name,
            timestamp : timestamp
        })
    });
}

const cardResumeData = obj => {
    for (const key in obj) {
        const value = obj[key]
        const element = document.querySelector(`#${key}`)
        value.forEach(item => {
            const li = document.createElement('li')
            const a = document.createElement('a')
            const span = document.createElement('span')
    
            li.classList.add('slotResult')
            span.classList.add('num-Data')

            li.appendChild(a)
            li.appendChild(span)

            a.textContent = item[0]
            span.textContent = item[1]
            element.appendChild(li)
        });
    }
}

const sortFunction = obj => {       // show the top 5 of the 'obj' passed
    const arr = Object.entries(obj)
    let top5 = {}
    arr.map((element) => {
        const subArr = Object.entries(element[1])
        subArr.sort((a,b) => b[1] - a[1])
        top5[element[0]] = subArr.slice(0,5)
    })
    return top5
}

const handlerTagA = () => {
    const links = document.querySelectorAll('a')
    links.forEach(e => {
        e.addEventListener('click', (event) => {
            let form = document.querySelector('#searchForm')
            let input = form.children[0].children[0]
            input.value = event.target.innerText
            form.submit()
        })
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3001/javascript/response.txt')
        .then(response =>   response.json())
        .then(data => {
            buildObj(data)
            const resumeDataObj = buildResumeDataObj($showObjData)
            const shortedData = sortFunction(resumeDataObj)
            cardMainData(data)
            cardResumeData(shortedData)
            handlerTagA()
        })
	.catch(error => console.error(error))
});

