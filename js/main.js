let ropa = [];

// Fetch + carga desde Json

fetch("./js/indumentaria.json")
    .then(response => response.json())
    .then(data => {
        ropa = data;
        cargarRopa(ropa);
    })



// DOM

const contenedorprendas = document.querySelector("#gridPrendas");
const botonCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonAgregar = document.querySelectorAll(".btn-agregar");
const contador = document.querySelector("#contador");
const contenedorCarrito = document.getElementById("modalShop-container");
const btnVaciarCarrito = document.querySelector(".clearShop");
const iconoCarrito = document.querySelector(".carrito-icon");
const modalCarrito = document.getElementById("modalCarrito");
const btnCerrarCarrito = document.querySelector(".btnClose");


// Carga de prendas

function cargarPrendas(prendasSelec) {

    contenedorPrendas.innerHTML = "";

    prendasSelec.forEach(prendas => {

        const article = document.createElement("article");
        article.classList.add('col-12');
        article.classList.add('col-sm-3');
        article.classList.add('card');
        article.classList.add('mb-4');
        article.innerHTML = `
                <img src="${01.imagen}" class="card-img-top mt-5" alt="${01.imagen}">
                <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">${remera.titulo}</h5>
                    <p class="card-precio">$${remera.precio}</p>
                    <button id="${remera.id}" class="btn btn-dark btn-agregar">Comprar</button>
                </div>
            </article>

        `;

        contenedorPrendas.append(article);
    })

    actualizarbotonAgregar();

}


// Cargar bebidas por categoria

botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todas") {
            const bebidaCategoria = bebidas.find(prenda => prenda.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = prendaCategoria.categoria.nombre;

            const prendaElegidas = prenda.filter(bebida => prenda.categoria.id === e.currentTarget.id);
            cargarPrendas(prendasElegidas);

        } else {
            tituloPrincipal.innerText = "Todas las remeras";
            cargarPrendas(prendas);
        }

    })

});


function actualizarbotonAgregar() {
    botonAgregar = document.querySelectorAll(".btn-agregar");

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);

    });
}

// Agregar prendas

let prendasEnCarrito;
let prendasEnCarritolS = localStorage.getItem("prendas_en_carrito");

if (prendasEnCarritolS) {
    prendasEnCarrito = JSON.parse(prendasEnCarritolS);
    actualizarContador();
} else {
    prendasEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const prendaAgregada = prendas.find(prenda => prenda.id === idBoton);

    if (prendasEnCarrito.some(prenda => prenda.id === idBoton)) {
        const inicio = prendasEnCarrito.findIndex(prenda => prenda.id === idBoton);
        prendasEnCarrito[inicio].cantidad++;
    } else {
        prendaAgregada.cantidad = 1;
        prendasEnCarrito.push(prendaAgregada);
    }

    actualizarContador();

    localStorage.setItem("prendas_en_carrito", JSON.stringify(prendasEnCarrito));
    mostrarCarrito();


    // Alert de prenda agregada

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Prenda agregada'
    })

}



// Carrito

// Cargar prendas en el carrito

window.addEventListener("load", () => {
    mostrarCarrito();
    actualizarContador();
});

// Mostrar en carrito

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    prendasEnCarrito.forEach(prenda => {
        const div = document.createElement("div");
        div.className = "infoShop";
        div.innerHTML = `
            <img class="imgShop" src="${prenda.imagen}" alt="${prenda.titulo}">
            <div class="infoShop prendaShop d-flex flex-column">
                <h5 class="prendaTitulo">${prenda.titulo}</h5>
                <h5 class="infoPrenda">Cantidad: ${prenda.cantidad}</h5>
                <h5 class="infoPrenda">Precio: $${prenda.precio}</h5>
                <h5 class="infoPrenda">Subtotal: $${prenda.cantidad * prenda.precio}</h5>
            </div>
            <a class="delItem bi bi-trash pe-2" id="${prenda.id}"></a>
        `;
        contenedorCarrito.appendChild(div);
    });

    // Calcular y mostrar el total de prendas en el carrito
    const divTotal = document.querySelector(".divTotal");
    const totalElement = document.querySelector(".total");

    // Verificar si esta vacio el carrito
    if (prendasEnCarrito.length > 0) {
        divTotal.innerText = "Total:";
        const total = prendasEnCarrito.reduce((acc, prenda) => acc + prenda.cantidad * prenda.precio, 0);
        totalElement.innerText = `$${total}`;
    } else {
        divTotal.innerText = "Carrito Vacío";
        totalElement.innerText = "";
    }
}

// Eliminar prendas del carrito

contenedorCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("delItem")) {
        const idPrendaAEliminar = e.target.id;
        const prendaAEliminar = prendasEnCarrito.find(prendas => prenda.id === idPrendaAEliminar);

        if (prendaAEliminar.cantidad > 1) {
            prendaAEliminar.cantidad--;
        } else {
            prendasEnCarrito = prendasEnCarrito.filter(prenda => prenda.id !== idPremdaAEliminar);
        }

        mostrarCarrito();
        localStorage.setItem("prendas_en_carrito", JSON.stringify(prendasEnCarrito));
        actualizarContador();


        // Alert de prenda eliminada

        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Prenda eliminada'
        })
    }
});


// Vaciar completamente el carrito + Alert

btnVaciarCarrito.addEventListener("click", () => {
    if (prendasEnCarrito.length !== 0) {
        Swal.fire({
            title: '¿quieres eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar carrito!'
        }).then((result) => {

            if (result.isConfirmed) {

                
                prendasEnCarrito.length = 0;
                localStorage.removeItem("prendas_en_carrito");
                modalCarrito.style.display = "none";
                mostrarCarrito();
                actualizarContador();
                
                // Mostrar mensaje
                Swal.fire({
                    icon: 'success',
                    title: 'Carrito Vacío!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    } else {

        // Si no hay prendas en el carrito
        Swal.fire({
            icon: 'warning',
            title: 'No hay prendas seleccionadas!',
            showConfirmButton: false,
            
        });
    }
});

// Realizar compra de las prendas del carrito + Alert

const btnPay = document.querySelector(".btnPay");
btnPay.addEventListener("click", finalizarCompra);

async function finalizarCompra() {
    if (prendasEnCarrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No hay prendas seleccionadas!',
            showConfirmButton: false,
          
        });
    } else {
        const { value: email } = await Swal.fire({
            title: 'Ingrese su correo electrónico:',
            input: 'email',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Si, comprar!',
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                return email;
            },

            allowOutsideClick: () => !Swal.isLoading()
        });

        if (email) {
            Swal.fire(`${email}`);

            // Mensaje de compra
            Swal.fire({
                title: 'Revisa tu casilla de email. <br> <br> Te hemos enviado un link de pago. <br> <br> Una vez realizado el mismo, podrás disfrutar de tus prendas. 😉',
                icon: 'success'
            }).then(() => {
                // Vaciar el carrito y actualizar el DOM
                prendasEnCarrito = [];
                mostrarCarrito();
                localStorage.removeItem("prendas_en_carrito");
                modalCarrito.style.display = "none";
                actualizarContador();
            });
        }
    }
}


// Abrir el carrito
iconoCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "block";
});

// Cerrar el carrito
btnCerrarCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});


// Atualizar el contador del carrito
function actualizarContador() {
    const contadorActual = prendasEnCarrito.reduce((acc, prenda) => acc + prenda.cantidad, 0);
    contador.innerText = contadorActual;
    contador.style.visibility = contadorActual > 0 ? 'visible' : 'hidden';

}

