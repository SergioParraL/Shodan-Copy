const makeSearchByString = (tag) => {
    let form = document.querySelector('#searchForm')
    let input = form.children[0].children[0].children[0]
    
    tag.forEach(element => {
        element.addEventListener('click', (e) => {
            if(element.classList[0] == 'ip_str'){
                const radioIp = document.querySelector('.radioIp')
                radioIp.checked = true
            }
                input.value = e.target.innerText
            form.submit()   
        })
    });
}

const fetchQuery = link => {
    const data = fetch(link)
    return data
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