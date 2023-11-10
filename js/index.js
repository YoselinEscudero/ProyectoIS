import { getProducts, saveProduct, deleteProduct } from './connection.js' // Imports the querys to get, save and delete products

// Form to insert a new product 
const form = document.querySelector('.formulario') // Selects the form
const btnAdd = document.querySelector('.btnAdd') // Selects the button to add products
const btnClose = document.querySelector('#btnClose') // Selects the button to close the form

// Modal to delete a product
const btnDelete = document.querySelector('#btnDelete') // Selects the button to delete the product
const btnCancel = document.querySelector('#btnCancel') // Selects the button to cancel

// Carga de tarjetas
const cardTop = document.querySelector('#products-top').content
const contenido = document.querySelector('#contenido-productos')
const fragment = document.createDocumentFragment()
const Buscar = document.getElementById('buscador')


//Seccion Comida
const contenido_comida = document.querySelector('#contenido-comida')
const fragment_comida = document.createDocumentFragment()

//Seccion Bebidas
const contenido_bebidas = document.querySelector('#contenido-bebidas')
const fragment_bebidas = document.createDocumentFragment()

// Seccion para otros
const contenido_otros = document.querySelector('#contenido-otros')
const fragment_otros = document.createDocumentFragment()

// Seccion general
const productosAll = document.querySelector('#productosAll')

let products = [] // Here the products are loaded from the database
let productDelete = {} // Temporal object to call the deleteProd() function

// Load the document, fetch the elements from the database and saves it in the 'products' list, then starts the main() function called inside loadProducts()
document.addEventListener('DOMContentLoaded', async(e) => {
    products = await getProducts()
    console.log('productos:', products)
    main()
})

// The main function prevents any method from being executed if the products in the list have not been loaded yet
const main = () => {
    creaCards()
    creaCardsComida()
    creaCardsBebidas()
    creaCardsOtros()
    
    // Aquí van las llamadas a las demás funciones y listeners que necesitan de productos[]
    //Función para buscar un producto
    Buscar.addEventListener('keyup', () => {
        //console.log('Si llega aqui')
        let temp = []
        temp = products.filter(producto => producto.product_name.toLowerCase().includes(Buscar.value.toLowerCase()))
        creaCardsALL(temp)
        //console.log('temp=>', temp)
    }) 
} 
   
// ---------------- Aquí van las definiciones de todas las funciones (y de los listeners que no dependen de productos[]) ------------------
// Button (inside the modal) to add a product
btnAdd.addEventListener('click', async() => {
    await insertProduct()
    window.location.reload()
})

// Button to close the 'insert product' form and reset the form fields
btnClose.addEventListener('click', () => {
    form.reset()
})

// Button (inside the modal) to delete a product
btnDelete.addEventListener('click', async() => {
    await deleteProd(productDelete)
    window.location.reload()
})

// Button to close the 'delete' modal and clear productDelete
btnCancel.addEventListener('click', () => {
    productDelete = {}
})

// Enable or disable the add button in the form
form.addEventListener('input', () => {
    if (!form.categ.value || !form.contacto.value || !form.imgUrl.value || !form.precio.value || !form.productName.value || !form.dias.value || !form.horas.value || !form.vendorName.value) {
        btnAdd.disabled = true
    } else {
        btnAdd.disabled = false
    }
})

// Funciones para mostrar las tarjetas
const creaCardsOtros = () => {
    products.forEach((item) => {
        if (item.category === 'otros') {
            //console.log(item)
            cardTop.querySelector('img').setAttribute('src', item.image_url)
            cardTop.querySelector('.nombreProducto').textContent = item.product_name
            cardTop.querySelector('.precioProducto').textContent = '$ ' + item.price
            //cardTop.querySelector('.categoriaProducto').textContent = item.category
            cardTop.querySelector('.diasVenta').textContent = item.sale_days
            cardTop.querySelector('.horasVenta').textContent = item.sale_hours
            cardTop.querySelector('.nombreVendedor').textContent = item.vendor_name
            cardTop.querySelector('.contactoVendedor').setAttribute('href', item.contact)
            const clone = cardTop.cloneNode(true)
            clone.querySelector('#btnModal-delete').addEventListener('click', () => {
                productDelete = item
            })
            fragment_otros.appendChild(clone)
        }
    })
    contenido_otros.appendChild(fragment_otros)
}

const creaCardsBebidas = () => {
    products.forEach((item) => {
        if (item.category === 'bebidas') {
            //console.log(item)
            cardTop.querySelector('img').setAttribute('src', item.image_url)
            cardTop.querySelector('.nombreProducto').textContent = item.product_name
            cardTop.querySelector('.precioProducto').textContent = '$ ' + item.price
            //cardTop.querySelector('.categoriaProducto').textContent = item.category
            cardTop.querySelector('.diasVenta').textContent = item.sale_days
            cardTop.querySelector('.horasVenta').textContent = item.sale_hours
            cardTop.querySelector('.nombreVendedor').textContent = item.vendor_name
            cardTop.querySelector('.contactoVendedor').setAttribute('href', item.contact)
            const clone = cardTop.cloneNode(true)
            clone.querySelector('#btnModal-delete').addEventListener('click', () => {
                productDelete = item
            })
            fragment_bebidas.appendChild(clone)
        }
    })
    contenido_bebidas.appendChild(fragment_bebidas)
}

const creaCardsComida = () => {
    products.forEach((item) => {
        if (item.category === 'comida') {
            //console.log(item)
            cardTop.querySelector('img').setAttribute('src', item.image_url)
            cardTop.querySelector('.nombreProducto').textContent = item.product_name
            cardTop.querySelector('.precioProducto').textContent = '$ ' + item.price
            //cardTop.querySelector('.categoriaProducto').textContent = item.category
            cardTop.querySelector('.diasVenta').textContent = item.sale_days
            cardTop.querySelector('.horasVenta').textContent = item.sale_hours
            cardTop.querySelector('.nombreVendedor').textContent = item.vendor_name
            cardTop.querySelector('.contactoVendedor').setAttribute('href', item.contact)
            const clone = cardTop.cloneNode(true)
            clone.querySelector('#btnModal-delete').addEventListener('click', () => {
                productDelete = item
            })
            fragment_comida.appendChild(clone)
        }
    })
    contenido_comida.appendChild(fragment_comida)
}

const creaCards = () => {
    products.forEach((item) => {
        if (item.category === 'dulces') {
            //console.log(item)
            cardTop.querySelector('img').setAttribute('src', item.image_url)
            cardTop.querySelector('.nombreProducto').textContent = item.product_name
            cardTop.querySelector('.precioProducto').textContent = '$ ' + item.price
            //cardTop.querySelector('.categoriaProducto').textContent = item.category
            cardTop.querySelector('.diasVenta').textContent = item.sale_days
            cardTop.querySelector('.horasVenta').textContent = item.sale_hours
            cardTop.querySelector('.nombreVendedor').textContent = item.vendor_name
            cardTop.querySelector('.contactoVendedor').setAttribute('href', item.contact)
            const clone = cardTop.cloneNode(true)
            clone.querySelector('#btnModal-delete').addEventListener('click', () => {
                productDelete = item
            })
            fragment.appendChild(clone)
        }
    })
    contenido.appendChild(fragment)
}

// Funcion que muestra todas las tarjetas
const creaCardsALL = (productos) => {
    productosAll.innerHTML = ""
    productos.forEach((item) => {
        //console.log(item)
            cardTop.querySelector('img').setAttribute('src', item.image_url)
            cardTop.querySelector('.nombreProducto').textContent = item.product_name
            cardTop.querySelector('.precioProducto').textContent = '$ ' + item.price
            //cardTop.querySelector('.categoriaProducto').textContent = item.category
            cardTop.querySelector('.diasVenta').textContent = item.sale_days
            cardTop.querySelector('.horasVenta').textContent = item.sale_hours
            cardTop.querySelector('.nombreVendedor').textContent = item.vendor_name
            cardTop.querySelector('.contactoVendedor').setAttribute('href', item.contact)
            const clone = cardTop.cloneNode(true)
            clone.querySelector('#btnModal-delete').addEventListener('click', () => {
                productDelete = item
            })
            fragment.appendChild(clone)
    })
    productosAll.appendChild(fragment)
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
const insertProduct = async () => {
    // Data to be added to the database
    const sendData = {
        category: form.categ.value,
        contact: form.contacto.value,
        image_url: form.imgUrl.value,
        price: form.precio.value,
        product_name: form.productName.value,
        sale_days: form.dias.value,
        sale_hours: form.horas.value,
        vendor_name: form.vendorName.value
    };
    await saveProduct(sendData)
    form.reset()
    btnAdd.disabled = true
};


// Function to delete a product
const deleteProd = async (prod) => {
    await deleteProduct(prod)
    productDelete = {}
}
