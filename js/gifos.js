//1.-TRENDING GIFOS
const apiKey = '2vUSUsXDFZ8nbgW1TgoYgUc72lFoiyFV';
const div_gifos = document.getElementById('img-trending');

//a) OBTENER GIF EN TRENDING
async function getGif(numberOfGifs){
    let url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${numberOfGifs}`;
    const response = await fetch(url);
    const dataJson = await response.json();
    
    //console.log(dataJson.data);
    listGifs(dataJson.data, div_gifos);

}

//b) lISTADO DE LAS GIFS
function listGifs(gifos, divGifo){
    try{
        gifos.map((gif, i) => {
            let divgif = document.createElement('div')
            divgif.className = 'class-gif'
            let gifElm = document.createElement('img')
            gifElm.className = 'img-gif'
            gifElm.setAttribute('src', gifos[i].images.original.url)
            divGifo.appendChild(divgif)
            divgif.appendChild(gifElm)
    })
    } catch (error) {
        console.error(error);
    }
}

getGif(3);

//2.-BARRA DE BUSQUEDA 
const ulShow = document.querySelector('#results-ul')
const inputSearch = document.querySelector('#autocomplete-input')
const search_img_close = document.querySelector('#search-img-close')
const search_img = document.querySelector('#search-img')
const div_show_results = document.querySelector('#show-results')
const div_noResult = document.getElementById('no-result')
const div_show_gifos = document.getElementById('show-gifts');


// a) User escribe en el input
inputSearch.addEventListener('keyup', async (ev) => {
    //console.log(inputSearch.value)
    if (inputSearch.value.length === 0) {
        ulShow.innerHTML = ""
        search_img_close.src = "../images/icon-search.svg"
        search_img.style.visibility = "hidden"
    }

    if (inputSearch.value.length >= 1) {
        search_img_close.src = "../images/close.svg"
        search_img.style.visibility = "visible"
        div_show_results.classList.add("mystyle");


        const result = await getDataAutocomplete(inputSearch.value)
       
        showAutocomplete(result.data)
    }
})

// b) Busco la data en el API
async function getDataAutocomplete(value){    
    let urlTags = `https://api.giphy.com/v1/gifs/search/tags?q=${value}&api_key=${apiKey}`;
    const response = await fetch(urlTags);
    const data = await response.json();
    //console.log(data.data)
    
    if (data.data.length === 0){
        
        inputSearch.addEventListener('keyup', (e) => {//hay dos eventos keyup 
            const keycode = e.keyCode || e.which; //este codigo pasarlo al evento de arriba 
            console.log("press in input")
            if (keycode == 13) {
                const title_h2 = document.createElement('h2')
                const str = inputSearch.value
                title_h2.append(str)                
                div_show_gifos.before(title_h2)
                const hr = document.createElement('hr')
                title_h2.before(hr)

                const div_ouch = document.createElement('div')//si result.data === 0 hacer este codigo
                div_ouch.setAttribute('id', 'ouch')
                const div_img = document.createElement('img')
                div_img.src = '../images/icon-busqueda-sin-resultado.svg'
                title_h2.after(div_ouch)
                div_ouch.appendChild(div_img)

                const title_h4 = document.createElement('h4')
                const str_h3 = "Intenta con otra búsqueda"
                title_h4.append(str_h3)
                div_show_gifos.before(title_h4)
                
            }
        });
        
    }
    return data;
}

// c) Muestro en el autocomplete la data
// data = ['mascota', 'mama', 'martes']
const showAutocomplete = data => {
    //input.innerHTML = ""
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
            inputSearch.value = ev.currentTarget.getAttribute('data-name')
            search_img_close.src = "../images/icon-search.svg"
            search_img.style.visibility = "hidden"
            div_show_results.classList.remove("mystyle");
            
            const title_h2 = document.createElement('h2')
            const str = inputSearch.value
            title_h2.append(str)            
            div_show_gifos.before(title_h2)
            const hr = document.createElement('hr')
            title_h2.before(hr)
            
            const divBtn = document.createElement('div')
            divBtn.classList.add('more-btn');
            const moreBtn = document.createElement('button')
            moreBtn.type = 'button'; 
            moreBtn.innerText = 'VER MÁS'; 
            div_show_gifos.after(divBtn)
            divBtn.appendChild(moreBtn)
            localStorage.setItem("paginado", 12)

            moreBtn.addEventListener('click', async () => {      
                let pag = parseInt(localStorage.getItem("paginado"))
                console.log(pag)
                if (pag !== 0){
                    pag += 12
                    console.log(pag)
                    localStorage.setItem("paginado", pag)
                }
                const callApi = await getSearch(inputSearch.value, pag)
                console.log(inputSearch.value)
                
            })
            getSearch(item.name)            
        })
        ulShow.appendChild(li)
       
    })
}

//d) Busqueda de las gifs
async function getSearch(search, paginado){
    //console.log(search);
    let url = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=12&offset=${paginado}`;
    const response = await fetch(url);
    const dataJson = await response.json();
    
    //console.log(dataJson.data) 

    listGifs(dataJson.data, div_show_gifos)

}

