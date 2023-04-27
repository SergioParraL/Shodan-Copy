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

const handleErrorEmptyResponse = () => {
    fetch('http://localhost:3001/errorView', {
        method: 'GET',
    })
    
    .then(data => {
        console.log(data);
        })
        .catch(error => {
        console.error(error);
    });
}