
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
    const flagSpan = document.createElement("span");
    fetchQuery(`https://restcountries.com/v3.1/alpha/${data.country_code}`)
        .then(res => res.json())
        .then(data => {
            flagSpan.classList.add("flag");
            flagSpan.textContent = data[0].flag;
        })
        .catch(err => console.error(err))

    // Cree un div para contener todos los artículos
    const dataDiv = createTag('div')
    dataDiv.classList.add("data");

    // Cree el primer artículo y sus elementos
    const article1 = document.createElement("article");

    const ipDiv = createTag('div')
    ipDiv.classList.add("ip");

    const ipLink = createTag('a')
    addClass(['ip_str','searchByString'],ipLink)
    ipLink.href = "#";
    ipLink.textContent = data.ip;

    const timeStampDiv = createTag('div')
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

    const ispLink = document.createElement("a");
    ispLink.classList.add('searchByString')
    ispLink.href = "#";
    ispLink.textContent = data.isp;

    const addressLi = document.createElement("li");
    addressLi.classList.add("address");

    const countryLink = document.createElement("a");
    countryLink.classList.add('searchByString')
    countryLink.href = "#";
    countryLink.textContent = ` ${data.country}, `;

    const cityLink = document.createElement("a");
    cityLink.href = "#";
    cityLink.classList.add('searchByString')
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
        const { isp, data, ip_str, org, location: {city, country_name, country_code}, timestamp, }  = element
        createElement ({
            isp : isp,
            ip : ip_str,
            data : data,
            org : org,
            city : city,
            country : country_name,
            country_code : country_code,
            timestamp : timestamp
        })
    });
}

const cardResumeData = (obj,total) => {         // Show data of the left box in the UI
    const totalResult = document.querySelector('.totalResult');
    const h4 = document.createElement('h4');
    h4.textContent = total;
    totalResult.appendChild(h4)
    for (const key in obj) {
        const value = obj[key]
        const element = document.querySelector(`#${key}`)
        value.forEach(item => {
            const li = document.createElement('li')
            const a = document.createElement('a')
            const span = document.createElement('span')
            if(key == 'country_name' || key == 'port'){
                a.classList.add('searchByString')
            }
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

document.addEventListener('DOMContentLoaded', ()=>{
    fetchQuery('http://localhost:3001/javascript/response.txt')
        .then(response =>   response.json())
        .then(data => {
            if(data.total == 0 ){
                handleErrorEmptyResponse()
            }else{
                buildObj(data)
                const resumeDataObj = buildResumeDataObj($showObjData)
                const shortedData = sortFunction(resumeDataObj)
                cardMainData(data)
                cardResumeData(shortedData,data.total)
        
                const a = document.querySelectorAll('.searchByString')
                makeSearchByString(a)
            }
        })
	.catch(error => console.error(error))


    
});

