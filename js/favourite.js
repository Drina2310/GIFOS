import { getGif } from './trending.js'

getGif(3)
const divShowGifos = document.querySelector('#show-gifts-favs')

const gifosFavs = JSON.parse(localStorage.getItem('favs'))

if (gifosFavs != null){
    gifosFavs.map( gifos =>{
        let divgif = document.createElement('div')
        divgif.className = 'card-gif'
        let gifElm = document.createElement('img')
        gifElm.className = 'img-gif'
        gifElm.setAttribute('src', gifos.url)
        divShowGifos.appendChild(divgif)
        divgif.appendChild(gifElm)
    })
} else {
    let divNoResults = document.createElement('div')
    divNoResults.className = 'no-favs'
    let imgNofavs = document.createElement('img')
    imgNofavs.className = 'img-nofavs'
    imgNofavs.setAttribute('src', '../images/icon-fav-sin-contenido.svg')
    let h3 = document.createElement('h3')
    h3.textContent = '"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"'
    divShowGifos.after(divNoResults)
    divNoResults.appendChild(imgNofavs)
    divNoResults.appendChild(h3)
}

const divBtn = document.createElement('div')
divBtn.classList.add('more-btn')
const moreBtn = document.createElement('button')
moreBtn.type = 'button'
moreBtn.innerText = 'VER MÁS'
divShowGifos.after(divBtn)
divBtn.appendChild(moreBtn)

