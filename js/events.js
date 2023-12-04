import { getEvents, saveEvent, deleteEvent } from './connection_e.js'
const form = document.querySelector('.formulario')
const btnAdd = document.querySelector('.btnAdd')
const btnClose = document.querySelector('#btnClose')

const btnDelete = document.querySelector('#btnDelete') // Selects the button to delete the product
const btnCancel = document.querySelector('#btnCancel')

const contenido = document.querySelector('#contenido-eventos')
const fragment = document.createDocumentFragment()

let events = []
let eventDelete = {}

document.addEventListener('DOMContentLoaded', async(e) => {
    events = await getEvents()
    console.log('events:', events)
    main()
})

const main = () => {
    creaCards()
    
    // Aquí van las llamadas a las demás funciones y listeners que necesitan de productos[]
    //Función para buscar un producto
    Buscar.addEventListener('keyup', () => {
        //console.log('Si llega aqui')
        let temp = []
        temp = events.filter(evento => evento.evento_name.toLowerCase().includes(Buscar.value.toLowerCase()))
        creaCardsALL(temp)
        //console.log('temp=>', temp)
    }) 
} 





btnAdd.addEventListener('click', async() => {
    await insertEvent()
    window.location.reload()
})

// Button to close the 'insert product' form and reset the form fields
btnClose.addEventListener('click', () => {
    form.reset()
})

// Button (inside the modal) to delete a product
btnDelete.addEventListener('click', async() => {
    await deleteEve(eventDelete)
    window.location.reload()
})

// Button to close the 'delete' modal and clear productDelete
btnCancel.addEventListener('click', () => {
    eventDelete = {}
})

form.addEventListener('input', () => {
    if (!form.categ.value || !form.contacto.value || !form.imgUrl.value || !form.eventName.value || !form.eventDay.value) {
        btnAdd.disabled = true
    } else {
        btnAdd.disabled = false
    }
})

const creaCards = () => {
    events.forEach((item) => {
        if (item.Grupo) {
            //console.log(item)
            cardTop.querySelector('img').setAttribute('src', item.image_url)
            cardTop.querySelector('.nombreEvento').textContent = item.Nombre_conf
            //cardTop.querySelector('.categoriaProducto').textContent = item.category
            cardTop.querySelector('.diaEvento').textContent = item.Fecha
            // cardTop.querySelector('.horasVenta').textContent = item.sale_hours
            cardTop.querySelector('.nombreGrupo').textContent = item.Grupo
            cardTop.querySelector('.contactoEvento').setAttribute('href', item.URL_p)
            const clone = cardTop.cloneNode(true)
            clone.querySelector('#btnModal-delete').addEventListener('click', () => {
                eventDelete = item
            })
            fragment.appendChild(clone)
        }
    })
    contenido.appendChild(fragment)
}


// Change color effect on header
window.addEventListener("scroll", function() {
    var header = document.querySelector("header")
    header.classList.toggle("abajo", window.scrollY > 0)
})

// Funciones para el menu de carrusel
function App() { }
window.onload = function (event) {
    var app = new App()
    window.app = app
}

App.prototype.processingButton = function (event) {
    let leftPosition = 0
    const btn = event.currentTarget
    const carruselList = event.currentTarget.parentNode
    const track = event.currentTarget.parentNode.querySelector('.track')
    const carrusel = track.querySelectorAll('.carrusel')
    const carruselWidth = carrusel[0].offsetWidth
    const trackWidth = track.offsetWidth
    const listWidth = carruselList.offsetWidth
    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1)
    btn.dataset.button == "button-prev" ? prevAction(leftPosition, carruselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track)
}

let prevAction = (leftPosition, carruselWidth, track) => {
    if (leftPosition > 0) {
        track.style.left = `${-1 * (leftPosition - carruselWidth)}px`
    }
}

let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) => {
    if (leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + carruselWidth)}px`
    }
}

// Function to add a product
const insertEvent = async () => {
    // Data to be added to the database
    const sendData = {
        // Fecha: form.eventDay.value,
        // URL_p: form.contacto.value,
        // image_url: form.imgUrl.value,
        // Nombre_conf: form.productName.value,
        // Grupo: form.categ.value,
        Fecha: form.Fecha.value,
        URL_p: form.contacto.value,
        image_url: form.imgUrl.value,
        Nombre_conf: form.productName.value,
        Grupo: form.categ.value,
    };
    await saveEvent(sendData)
    form.reset()
    btnAdd.disabled = true
};


// Function to delete a product
const deleteEve = async (prod) => {
    await deleteEvent(prod)
    productDelete = {}
}
