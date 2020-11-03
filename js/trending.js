import { listGifs } from './listGifs.js'

//1.-TRENDING GIFOS
const apiKey = '2vUSUsXDFZ8nbgW1TgoYgUc72lFoiyFV';
const div_gifos = document.getElementById('img-trending');

//a) OBTENER GIF EN TRENDING
export async function getGif(numberOfGifs){
    let url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${numberOfGifs}`;
    const response = await fetch(url);
    const dataJson = await response.json();

    listGifs(dataJson.data, div_gifos);
}
