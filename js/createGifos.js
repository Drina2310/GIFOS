const startBtn = document.getElementById('start-btn')
const textH2 = document.getElementById('text-h2')
const textP = document.getElementById('text-p')
const textContainer = document.querySelector('.container-text')
const one = document.getElementById('one')
const two = document.getElementById('two')
const videoPreview = document.getElementById('video')
const line = document.querySelector('.line')
const timeSecond = document.querySelector('#time-second')
const repeat = document.querySelector('#repeat')
const startRecord = document.getElementById('start-record')
const stopRecord = document.getElementById('stop-record')
const spanTime = document.querySelector('.time')
let intervalID;
let cantidadFavoritosGuardados = 0;

startBtn.addEventListener('click', () => {
    textH2.innerHTML= '¿Nos das acceso <br> a tu cámara?'
    textP.innerHTML = 'El acceso a tu cámara será válido sólo <br> por el tiempo en el que estés creando el GIFO'

    one.style.background = '#572EE5'
    one.style.color = 'white'
    startBtn.style.visibility = 'hidden'
    initVideo()
})

const initVideo = async () => {

    let stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: {max: 600}
        }
    });

    videoPreview.style.display = 'block'
    videoPreview.style.margin = '0 auto'
    videoPreview.style.height = '300px'
    videoPreview.srcObject = stream

    textContainer.style.display = 'none'
    two.style.background = '#572EE5'
    two.style.color = 'white'
    one.style.background = 'white'
    one.style.color = '#572EE5'

    
    const divBtn = document.createElement('div')
    const startRecord = document.createElement('button')
    startRecord.type = 'button'
    startRecord.classList.add('btn')
    startRecord.innerText = 'GRABAR'
    line.after(divBtn)
    divBtn.appendChild(startRecord)
 
    let recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video'
    });

    const startRecordHandler = () => {
        recorder.startRecording()
        console.log("entre")
    }
    
    const stopRecordHandler = async () => {
        console.log("estoy en stop")
        await recorder.stopRecording()
        let blob = await recorder.getBlob()

        videoPreview.srcObject = null
        videoPreview.src = URL.createObjectURL(blob)
    }

    startRecord.addEventListener('click', () => {
        startRecord.style.display = 'none'
        repeat.style.display = 'none'        
        timeSecond.style.display = 'block'
        spanTime.style.display = 'block'
        let n = 0;

        intervalID = window.setInterval(() => {
            let spanSeconds = document.getElementById("seconds");
            if (n < 10) {
                spanSeconds.innerHTML = '0' + n;
            } else {
                spanSeconds.innerHTML =  n;
            }
            n++;
        }, 1000);
        
        const divBtn = document.createElement('div')
        const stopRecord = document.createElement('button')
        stopRecord.type = 'button'
        stopRecord.classList.add('btn')
        stopRecord.innerText = 'FINALIZAR'
        stopRecord.style.display = 'block'
        line.after(divBtn)
        divBtn.appendChild(stopRecord)

        stopRecord.addEventListener('click', () => {
            stopRecord.style.display = 'none'
            repeat.style.display = 'block'
            const divBtn = document.createElement('div')
            const loadGif = document.createElement('button')
            loadGif.type = 'button'
            loadGif.classList.add('btn')
            loadGif.innerText = 'SUBIR GIFO'
            loadGif.style.display = 'block'
            line.after(divBtn)
            divBtn.appendChild(loadGif)

            loadGif.addEventListener('click', subirAGiphy);

            spanTime.style.display = 'none'
            
            repeat.addEventListener('click', () => {
                console.log('repetir grabación')
                startRecord.style.display = 'block'
                loadGif.style.display = 'none'
                repeat.style.display = 'none'
            })

            window.clearInterval(intervalID);
        
        }, stopRecordHandler)
        
    }, startRecordHandler)
    
    function subirAGiphy() {
        console.log('dentro de subir gifo')
        let formData = new FormData()
        formData.append('file', recorder.getBlob(), 'myGif.gif')
        let finalGif = formData.get('file')
        console.log(finalGif)
    
        fetch('https://upload.giphy.com/v1/gifs?api_key=V5bM3Y8Wa6bQWwYMR60BnK9aztE6gjcq', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => localStorage.setItem('favoritos' + cantidadFavoritosGuardados, data.data.id));
    }
    
}
