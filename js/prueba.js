import { listGifs } from './listGifs.js'

import { getGif } from './trending.js'

const apiKey = '2vUSUsXDFZ8nbgW1TgoYgUc72lFoiyFV'

getGif(3)

//2.-BARRA DE BUSQUEDA 
const ulShow = document.querySelector('#results-ul')
const inputSearch = document.querySelector('#autocomplete-input')
const search_img_close = document.querySelector('#search-img-close')
const search_img = document.querySelector('#search-img')
const div_show_results = document.querySelector('#show-results')
const div_show_gifos = document.getElementById('show-gifts');
const form_search = document.querySelector('#search-form')
let divTitle = document.querySelector('#title-h2')

// a) User escribe en el input
inputSearch.addEventListener('keyup', async (ev) => {
    console.log(inputSearch.value)
    if (ev.which === 13) { 
        ulShow.innerHTML = ""
        return          
    }
   
    if (inputSearch.value.length === 0) {
        ulShow.innerHTML = ""
        changeIcons()
        divBtn.classList.remove('more-btn')
    }

    if (inputSearch.value.length >= 1) {
        search_img_close.src = "../images/close.svg"
        search_img.style.visibility = "visible"
        div_show_results.classList.add("mystyle");


        const result = await getDataAutocomplete(inputSearch.value)
       
        showAutocomplete(result.data)
    }
})

//Evento click en la X
search_img_close.addEventListener('click', () => {
    ulShow.innerHTML = ""
    inputSearch.value = ""
    div_ouch.innerHTML = ""
    divTitle.innerHTML = ""
    divBtn.classList.remove('more-btn')
    div_show_results.classList.remove("mystyle")
    changeIcons()
} )

//Evento submit
form_search.addEventListener('submit', async (e) => {
    e.preventDefault()
    ulShow.innerHTML = ""
    div_show_gifos.innerHTML = ""
    divTitle.innerHTML = ""
    div_ouch.innerHTML = ""
    div_show_results.classList.remove("mystyle");
    changeIcons()
    appendTitle()
    const result = await getSearch(inputSearch.value, 0) 
        
})

// b) Busco la data en el API
async function getDataAutocomplete(value){    
    let urlTags = `https://api.giphy.com/v1/gifs/search/tags?q=${value}&api_key=${apiKey}`
    const response = await fetch(urlTags)
    const data = await response.json()
    //console.log(data.data)

    return data
}

// c) Muestro en el autocomplete la data
// data = ['mascota', 'mama', 'martes']
const showAutocomplete = data => {
    ulShow.innerHTML = ""
    data.map( item => {
        const li = document.createElement('li')
        const imgSpan = document.createElement('img')
        imgSpan.src = '../images/icon-search.svg'
        
        li.textContent = item.name
        li.prepend(imgSpan)
        li.setAttribute("data-name", item.name)
        li.addEventListener('click', (ev) => {
            ulShow.innerHTML = ""
            div_show_gifos.innerHTML = ""
            divTitle.innerHTML = ""
            div_ouch.innerHTML = ""
            inputSearch.value = ev.currentTarget.getAttribute('data-name')
            changeIcons()
            div_show_results.classList.remove("mystyle");
            
            appendTitle()

            getSearch(item.name, 0)            
        })
        ulShow.appendChild(li)
       
    })
}

//d) Busqueda de las gifs
async function getSearch(search, paginado){
    //console.log(search)
    let url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=12&offset=${paginado}`
    const response = await fetch(url)
    const dataJson = await response.json()
    
    console.log(dataJson.data) 
    if (dataJson.data.length === 0){
        ulShow.innerHTML = ""
        div_ouch.innerHTML = ""
        appendOuch()
        divBtn.classList.remove('more-btn')
        
    } else {
        listGifs(dataJson.data, div_show_gifos)
        showMoreBtn()
    }
    

}

const trendingSearch = document.querySelector("#trending-search")
const getSearchTermsTrendings = async () => {
    let url = `http://api.giphy.com/v1/trending/searches?api_key=${apiKey}`
    const response = await fetch(url)
    const terms = await response.json()
    //console.log(terms.data)
    let arrayTrendings = terms.data.slice(0,5)
    //console.log(arrayTrendings)
    const wordsTrendings = arrayTrendings.join(", ")
    trendingSearch.textContent = wordsTrendings
    return arrayTrendings.join()
}
getSearchTermsTrendings()

const appendTitle = () => {
    const title_h2 = document.createElement('h2')
    const str = inputSearch.value
    title_h2.append(str)  
    divTitle.appendChild(title_h2)
    const hr = document.createElement('hr')
    title_h2.before(hr)  
}

let div_ouch = document.querySelector('#ouch')
const appendOuch = () => {
    const img_ouch = document.createElement('img')
    img_ouch.src = '../images/icon-busqueda-sin-resultado.svg'
    div_ouch.appendChild(img_ouch)

    const title_h4 = document.createElement('h4')
    const str_h3 = "Intenta con otra búsqueda"
    title_h4.append(str_h3)
    div_ouch.appendChild(title_h4)
    
}

const createMoreBtn = () => {
    const divBtn = document.createElement('div')
    divBtn.classList.add('more-btn')
    const moreBtn = document.createElement('button')
    moreBtn.type = 'button'
    moreBtn.innerText = 'VER MÁS'
    div_show_gifos.after(divBtn)
    divBtn.appendChild(moreBtn)

    return moreBtn
}

let pag = 0
const showMoreBtn = () => {
    const divBtn = document.querySelector(".more-btn")
    
    if(divBtn){
        divBtn.remove()
    }
    let moreBtn = createMoreBtn()            
    
    moreBtn.addEventListener('click', () => {  
        console.log(pag)    
        pag += 12
        getSearch(inputSearch.value, pag)             
    })
}

const changeIcons = () => {
    search_img_close.src = "../images/icon-search.svg"
    search_img.style.visibility = "hidden"
}
