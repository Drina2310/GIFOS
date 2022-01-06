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

            let iconDow = document.createElement('button')
            iconDow.className = 'icons icon-dow'
            iconDow.setAttribute("data-gif_url", gifos[i].images.fixed_height_downsampled.url)

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

            //Evento click maximizar
            iconMax.addEventListener('click', () =>{
                let divModal = document.querySelector('#myModal')
                let spanModal = document.querySelector('.close')
                let imgModal = document.querySelector('#imgModal')
                let captionText = document.querySelector('#caption')
                let user = document.querySelector('#user')
                let title = document.querySelector('#title')
                let contentIcons = document.querySelector('.content-icons')

                imgModal.setAttribute('src', gifos[i].images.original.url)
                divModal.style.display = "block"
                user.textContent = str
                title.textContent = str1

                let iconFavModal = document.createElement('button')
                iconFavModal.className = 'icons icon-fav'
                iconFavModal.addEventListener('click', () =>{
                    iconFavModal.classList.add("active-fav");
                    iconFavModal.classList.remove("icon-fav");
    
                    let favs = []
                    // verfica si favs en el local storage existe
                    if ( localStorage.getItem('favs') ) {
                        // si existe el objeto en el local storage se lo asigno a favs
                        favs = JSON.parse(localStorage.getItem('favs'))
                    }
                    
                    let item = {
                        title : gifos[i].title,
                        username: gifos[i].username,
                        url: gifos[i].images.fixed_height_downsampled.url,
                        id: gifos[i].id
                    }
                    
                    const result = favs.find(i => i.id === item.id)
                    
                    if (result === undefined) {
                        favs.push(item)
                        localStorage.setItem('favs', JSON.stringify(favs))  
                    }
                    
                    return   
                })

                let iconDow = document.createElement('button')
                iconDow.className = 'icons icon-dow'
        
                contentIcons.appendChild(iconFav)
                contentIcons.appendChild(iconDow)
                                
                spanModal.addEventListener('click', () => { 
                    divModal.style.display = "none";
                })
            })

            let download_img = async (url) => {
                //create new a element
                let a = document.createElement('a');
                // get image as blob
                let response = await fetch(url);
                let file = await response.blob();
                // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
                a.download = 'Gif';
                a.href = window.URL.createObjectURL(file);
                console.log(file)
                //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
                a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
                //click on element to start download
                a.click();
            }

            //Evento onclick a descargar
            iconDow.addEventListener('click', (e) =>{
                console.log("Estoy en descarga")
                const gif_url = e.target.getAttribute('data-gif_url');
                console.log(gif_url);
                download_img(gif_url);
            });
               

            //Evento onclick a favoritos
            iconFav.addEventListener('click', () =>{
                iconFav.classList.add("active-fav");
                iconFav.classList.remove("icon-fav");

                let favs = []
                // verfica si favs en el local storage existe
                if ( localStorage.getItem('favs') ) {
                    // si existe el objeto en el local storage se lo asigno a favs
                    favs = JSON.parse(localStorage.getItem('favs'))
                }
                
                let item = {
                    title : gifos[i].title,
                    username: gifos[i].username,
                    url: gifos[i].images.fixed_height_downsampled.url,
                    id: gifos[i].id
                }
                
                const result = favs.find(i => i.id === item.id)
                
                if (result === undefined) {
                    favs.push(item)
                    localStorage.setItem('favs', JSON.stringify(favs))  
                }
                
                return   
            })

    })
    } catch (error) {
        console.error(error);
    }
}

