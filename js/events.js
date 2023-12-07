import { getEvents, saveEvent, deleteEvent } from './connection_e.js'

const eventoForm = document.getElementById('eventoForm');
const btnAdd = document.getElementById('btnAdd');
const form = document.querySelector('.formulario');
const btnAdd2 = document.querySelector('#btnAdd');
const btnClose = document.querySelector('#btnClose')
const btnCancel = document.querySelector('#btnCancel')

const contenido = document.querySelector('#contenido-eventos')
const fragment = document.createDocumentFragment()

let events = [];
let eventDelete = {};

btnAdd2.disabled = true;

// Function to delete a product
const deleteEve = async (prod) => {
    await deleteEvent(prod);
    eventDelete = {};
};


const validateForm = () => {
    const grupoValue = form.Grupo.value;
    const urlPValue = form.URL_p.value;
    // const urlIValue = form.URL_i.value;
    const eventNameValue = form.Nombre_conf.value;
    const descripcionValue = form.Descripcion.value;
    const eventDayValue = form.Fecha.value;

    return !!(
        grupoValue &&
        urlPValue &&
        // urlIValue &&
        eventNameValue &&
        eventDayValue &&
        descripcionValue
    );
};

form.addEventListener('input', () => {
    // Activar o desactivar el botón según la condición de validateForm
    btnAdd.disabled = !validateForm();
});

const createCard = (item) => {
    const cardTop = document.createElement('li');
    cardTop.innerHTML = `
        <div class="grupo">
            <div class="time">
                <h2 class="text">${item.Fecha}<br><span class="text">${item.Mes}</span></h2>
            </div>
            <div class="details">
                    <h3 class="text">${item.Nombre_conf} - ${item.Grupo}</h3>
                    <p class="text" style="padding-bottom: 39px";>${item.Descripcion}</p>
                    <div class="btns-eve">
                        <div class=more_info>
                            <a href="${item.URL_p}" class="text">Más Info</a>
                        </div>
                        <div class=btn_delete>
                        <button class="btnn btn-delete" id="btnModal-delete" data-event-id="${item.id}">Borrar</button>
                        </div>
                    </div>
            </div>
            <div style="clear: both;"></div>
        </div>
    `;

    console.log("Contenido del clon:", cardTop);

    return cardTop;
};

const creaCards = () => {
    const contenidoEventos = document.getElementById('contenido-eventos');
    contenidoEventos.innerHTML = '';

    events.forEach((item) => {
        if (item.Grupo) {
            const clone = createCard(item);

            const btnModalDelete = clone.querySelector('#btnModal-delete');
            if (btnModalDelete) {
                btnModalDelete.addEventListener('click', async (event) => {
                    event.preventDefault();
                    eventDelete = { id: btnModalDelete.getAttribute('data-event-id') };
                    try {
                        
                        console.log(eventDelete);
                        await deleteEve(eventDelete);
                    } catch (error) {
                        console.error("Error al eliminar evento:", error);
                    }
                });
            } else {
                console.error("Error: No se encontró '.btnModal-delete' en el clon.", clone);
            }

            contenidoEventos.appendChild(clone);
        }
    });
};

const resetForm = () => {
    eventoForm.reset();
    btnAdd.disabled = true;
};

const main = () => {
    creaCards();
};

const getMonthName = (monthIndex) => {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return monthNames[monthIndex];
};

const insertEvent = async () => {
    const formData = new FormData(document.getElementById('eventoForm'));

    // Convertimos los datos del formulario en un objeto plano
    const sendData = {};
    formData.forEach((value, key) => {
        sendData[key] = value;
    });

    // Separar la fecha en día y mes
    const eventDate = new Date(sendData.Fecha);
    sendData.Fecha = eventDate.getDate();
    sendData.Mes = getMonthName(eventDate.getMonth());
    delete sendData.eventDay;
    console.log(sendData);
    await saveEvent(sendData);
    resetForm();
};

const setupEventListeners = () => {
    btnAdd.addEventListener('click', async () => {
        try {
            await insertEvent();
            // Actualiza solo la parte relevante del DOM sin recargar la página
            events = await getEvents();
            creaCards();
        } catch (error) {
            console.error("Error al agregar evento:", error);
        }
    });
    contenido.addEventListener('click', async (event) => {
        const target = event.target;

        if (target.id === 'btnModal-delete') {
            // Find the closest 'li' element, which represents the event card
            const eventCard = target.closest('li');

            if (eventCard) {
                // Retrieve the event data from the card
                const grupoElement = eventCard.querySelector('.grupo'); // Replace '.grupo' with the actual class or structure
                const eventData = {
                    Grupo: grupoElement ? grupoElement.textContent.trim() : '',
                    // Add other properties as needed
                };

                try {
                    // Delete the event from the database
                    await deleteEvent(eventData);

                    // Update the events array and recreate the cards
                    events = await getEvents();
                    creaCards();
                } catch (error) {
                    console.error("Error al eliminar evento:", error);
                }
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', async (e) => {
    try {
        events = await getEvents();
        console.log('events:', events);
        main();
        setupEventListeners();
    } catch (error) {
        console.error("Error al cargar eventos:", error);
    }
});



btnClose.addEventListener('click', () => {
    resetForm();
});


btnCancel.addEventListener('click', () => {
    eventDelete = {};
});

form.addEventListener('input', () => {
    btnAdd.disabled = !validateForm();
});

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




// Habilita el botón cuando se introduce información en el formulario
eventoForm.addEventListener('input', () => {
    btnAdd.disabled = !validateForm();
});
