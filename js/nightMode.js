const nightMode = document.querySelector(".night-mode")
const dark = document.body.classList
const lightMode = document.getElementById("light-mode")

nightMode.addEventListener('click', () => {
    nightMode.style.display = 'none'
    lightMode.style.display = 'block'
    dark.toggle('dark')

    //Guardar en el localStorage el modo nocturno
    if(dark.contains('dark')) {
        localStorage.setItem('dark-mode', 'true')
    } else {
        localStorage.setItem('dark-mode', 'false')
    }
});

lightMode.addEventListener('click', () => {
    nightMode.style.display = 'block'
    lightMode.style.display = 'none'
    dark.toggle('dark')

    if(dark.contains('dark')) {
        localStorage.setItem('dark-mode', 'true')
    } else {
        localStorage.setItem('dark-mode', 'false') 
    }
})

//Obtenemos el modo actual
if(localStorage.getItem('dark-mode') === 'true') {
    dark.add('dark')
    nightMode.style.display = 'none'
    lightMode.style.display = 'block'
} else {
    dark.remove('dark')
}