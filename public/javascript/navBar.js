const searchIcon = document.querySelector('.search-icon')
const cleanIput = document.querySelector('.close-outline')
const form = document.querySelector('#searchForm')

searchIcon.addEventListener('click', () => {
    let input = document.querySelector('#search')
    if(input.value == ''){
        console.log("You need a Correct input")
    }else{
        form.submit()
    }
})

cleanIput.addEventListener('click', () => {
    form.reset()
})