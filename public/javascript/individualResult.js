// linkear los datos que son un Link en "globalResult" y "individualResult" para que haga la busqueda con los respectivos filtros
// desarrollar la vista de Error, y configurar un error personalizado para cada caso

// const { search } = require("../../routes/routes");

// const e = require("express");

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/javascript/response.txt')
        .then(response => response.json())
        .then(data => {
            buildData(data)
            console.log('')
        })
        .catch(error => console.error(error))
})

const buildData = (json) => {
    const { 
        latitude,
        longitude,
        ip_str,
        hostnames,
        domains,
        country_name,
        city,
        asn,
        org,
        isp,
        vulns,
        ports,
        data
    } = json;

    map([latitude,longitude,ip_str])
    generalInformation({
        hostnames : hostnames,
        domains : domains,
        country : country_name,
        city : city,
        asn : asn,
        org : org,
        isp : isp
    })

    vulns == undefined ? deleteElement('vulnerabilities') : vulnerabilities(vulns)
    ports == undefined ? deleteElement('ports') : port(ports)
    data == undefined ? deleteElement('dataPort') : portDescription(data)
    
    const a = document.querySelectorAll('.searchByString')
    makeSearchByString(a)
}

const map = (path) => {
    const mapTag = document.querySelector('.mapFrame')
    const ipResult = document.querySelector('.ipResult')
    ipResult.textContent = path[2]
    let urlMap = `https://api.maptiler.com/maps/hybrid/?key=Yzumo1aUQzbA1gTZxvgC#9.9/${path[0]}/${path[1]}`
    mapTag.setAttribute('src',urlMap)

}
const generalInformation = (path) => {
    const keys = Object.keys(path);
    const values = Object.values(path)
    keys.forEach((e,i) => {
        const tag = document.querySelector(`.${e}`)
        if(values[i] != undefined){
            createTagTd(values[i],tag)
            setAttributeTag({
                tag : tag,
                att : 'href',
                value : '#'
            })
        }else{
            deleteElement(tag)
        }
    })
}

function vulnerabilities(data){
    data.forEach(element => {
        fetchQuery(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${data[0]}`)
            .then(res => res.json())
            .then(obj => {
                const title = createTag('div')
                const a = createTag('a')
                const h6 = createTag('h6')
                const textDescription = createTag('div')
                const wrapper = createTag('div')
                const text = obj.vulnerabilities[0].cve.descriptions[0].value
                const parent = document.querySelector('.vulnerabilities')
                
                addClass(['vulnsPartRepeat'],wrapper)
                addClass(['titleVulnerabilities'],title)
                addClass(['vulnerabilitiesText'],textDescription)
                addClass(['search'], a)
        
                setAttributeTag({
                    tag : a,
                    att : 'href',
                    value : 'google.com'
                })
        
                h6.textContent = element
                textDescription.textContent = text
                
                a.appendChild(h6)
                title.appendChild(a)
                textDescription.textContent = text
        
                wrapper.appendChild(title)
                wrapper.appendChild(textDescription)
                
                parent.appendChild(wrapper)
            })
            .catch(err => console.error(err))
       
    });
}

function port (data) {
    data.forEach(element => {
        const a = createTag('a')
        const parent = document.querySelector('.ports')
        addClass(['resultResearch','portBox','btn','blue','waves-effect'],a)
        setAttributeTag({
            tag : a,
            att : 'href',
            value : '#'
        })
        a.textContent = element
        parent.appendChild(a)
    });

    
}

function portDescription(dataObject){
    dataObject.forEach(element => {
        const { data,hash, timestamp, transport, port } = element
        if(data != ''){
            const dataText = createTag('div')
            dataText.innerHTML = `
                    <div>
                        <span class="col s6">
                            //&nbsp;
                            <span>${port}</span>
                            &nbsp;/&nbsp;${transport}
                        </span>
                        <span class="col s6">
                            <span class="number">${hash}</span>
                            <span>&nbsp;&nbsp;|&nbsp;&nbsp;${timestamp}</span>
                        </span> 
                    </div>
                    <br>
                    <hr>
                    <div class="dataDetail boxContent">
                        <pre class=''>
                        <br>
                            ${data}
                        </pre>
                    </div>
            `
            const q = document.querySelector('.dataPort')
            q.appendChild(dataText)

        }
    });
}

const setAttributeTag = (data) => {
    data.tag.setAttribute(data.att,data.value)
}
const createTag = tag => {
    const element = document.createElement(tag)
    return element
}
const addClass = (arrayNames,tag) => {
    arrayNames.forEach(element => {
        tag.classList.add(element)
    });
}
const deleteElement = tag => {
    const element = document.querySelector(`.${tag}`)
    element.parentNode.removeChild(element)
}
function createTagTd(data,position){
    const td = createTag('td');
    const a = createTag('a')

    if(typeof data == 'object'){
       if(data.length == 0){
            position.parentElement.removeChild(position)
       }else{
            data.forEach(element => {
            let aTag = createTag('a')
            aTag.classList.add('resultResearch')
            setAttributeTag({
                tag : aTag,
                att : 'target',
                value : '_blank'
            })
            td.appendChild(aTag)
            
            if(position.classList == 'domains'){
                addClass(['waves-effect','green','btn'],aTag)
                aTag.innerHTML = `${element}`
                aTag.style = 'margin: 0 .5rem'
            }else{
                aTag.innerHTML = `${element} | &nbsp;`
            }
            position.appendChild(td)
        })
       }
    }else{
        addClass(['resultResearch','searchByString'],a)
        
        a.textContent = data    
    
        td.appendChild(a)
        position.appendChild(td)
    }

    
}