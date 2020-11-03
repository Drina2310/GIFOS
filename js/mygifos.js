import { getGif } from './trending.js'

getGif(3)

const divShowGifos = document.querySelector('#show-my-gifts')

let divNoResults = document.createElement('div')
divNoResults.className = 'no-favs'
let imgNofavs = document.createElement('img')
imgNofavs.className = 'img-nofavs'
imgNofavs.setAttribute('src', '../images/icon-mis-gifos-sin-contenido.svg')
let h3 = document.createElement('h3')
h3.textContent = '¡Anímate a crear tu primer GIFO!'
divShowGifos.after(divNoResults)
divNoResults.appendChild(imgNofavs)
divNoResults.appendChild(h3)