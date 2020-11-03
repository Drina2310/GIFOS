//b) lISTADO DE LAS GIFS
export function listGifs(gifos, divGifo){
    try{
        gifos.map((gif, i) => {
            //console.log(gif)
            let divgif = document.createElement('div')
            divgif.className = 'card-gif'
            let gifElm = document.createElement('img')
            gifElm.className = 'img-gif'
            gifElm.setAttribute('src', gifos[i].images.fixed_height_downsampled.url)
            divGifo.appendChild(divgif)
            divgif.appendChild(gifElm)

            let divIcons = document.createElement('div')
            divIcons.className = 'icons-gif'

            let iconFav = document.createElement('button')
            iconFav.className = 'icons icon-fav'
            //Evento onclick a favoritos
            iconFav.addEventListener('click', () =>{
                let favs = []
                if ( localStorage.getItem('favs') ) {
                    favs = JSON.parse(localStorage.getItem('favs'))
                }
                
                var item = {
                    title : gifos[i].title,
                    username: gifos[i].username,
                    url: gifos[i].images.fixed_height_downsampled.url
                }
            
                favs.push(item)
                localStorage.setItem('favs', JSON.stringify(favs))
            })

            let iconDow = document.createElement('button')
            iconDow.className = 'icons icon-dow'
            let iconMax = document.createElement('button')
            iconMax.className = 'icons icon-max'

            divgif.appendChild(divIcons)
            divIcons.appendChild(iconFav)
            divIcons.appendChild(iconDow)
            divIcons.appendChild(iconMax)

            let divInfo = document.createElement('div')
            divInfo.className = 'info'
            let user = document.createElement('h5')
            const str =  gifos[i].username
            user.append(str)
            divInfo.appendChild(user)
            let titleGifo = document.createElement('h5')
            titleGifo.className = 'title'
            const str1 =  gifos[i].title
            titleGifo.append(str1)
            divInfo.appendChild(titleGifo)
            divIcons.appendChild(divInfo)
    })
    } catch (error) {
        console.error(error);
    }
}
