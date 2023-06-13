let montoTotal = 0;
let arrayComprados = [];

function crearPedido() {
    localStorage.setItem("montoTotal", montoTotal);
    localStorage.setItem("arrayComprados", JSON.stringify(arrayComprados));
};

const carritoStorage = localStorage.getItem("arrayComprados");
if (carritoStorage) {
    // Si hay un carrito almacenado, asignar los datos a las variables correspondientes
    arrayComprados = JSON.parse(carritoStorage);
    montoTotal = localStorage.getItem("montoTotal");
}

function mostrarProductos() {
    let ProductosVisu = document.getElementById("ProductosPagina");

    arrayProductos.forEach((item) => {
        let div = document.createElement("div");
        let fotoProducto = "../Images/fotoProducto" + item.id + ".png";
        div.innerHTML = `
    <div id="Producto">
    <h2>${item.nombre}</h2>
    <img class="FotoProducto" src="${fotoProducto}" alt="Imagen de Producto">
    <p>${item.detalle}</p>
    <b>${item.moneda} ${item.precio}</b>
    <label class="agregaCarrito" id="${item.id}">Sumar en carrito<input type="checkbox" id="" visibility: hidden></label>
    <hr></hr>
    </div>
    `;
        ProductosVisu.append(div);
    });
};

function crearOValidarCliente() {
    let nombreBas = document.getElementById("nombre").value;
    let apellidoBas = document.getElementById("apellido").value;
    let dniBas = document.getElementById("dni").value;
    let emailBas = document.getElementById("email").value;
    let fechaNacimientoBas = document.getElementById("fechaNacimiento").value;
    let paisBas = document.getElementById("pais").value;
    let contraseñaBas = document.getElementById("contraseña").value;

    let personaBas = {
        dni: dniBas,
        nombre: nombreBas,
        apellido: apellidoBas,
        email: emailBas,
        fecNac: fechaNacimientoBas,
        pais: paisBas,
        contraseña: contraseñaBas
    };

    localStorage.setItem('personaBas', JSON.stringify(personaBas));
};


fetch('../productosDB.json')
    .then(response => response.json())
    .then(data => {
        // Aquí tienes acceso a los datos del archivo JSON
        const arrayProductos = data;

        // Puedes realizar operaciones con el arrayProductos
        console.log('arrayProductos ', arrayProductos);
        console.log('Producto 3 id', typeof arrayProductos[2].id);

        mostrarProductos();
        localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));
    })
    .catch(error => {
        // Manejo de errores en caso de que la solicitud falle
        console.error('Error al cargar el archivo JSON:', error);
    });

// bajo el arrayProductos del localStorage para trabajarlo en esta pagina
const arrayProductosStorage = localStorage.getItem("arrayProductos");
const arrayProductos = JSON.parse(arrayProductosStorage);
//creo array de productos comprados
//const arrayComprados = [];
//cargo arrayProductos al localStorage para compulsar en pagina de facturacion
localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

mostrarProductos();

//click entrar como invitado
document.getElementById("contInvitado").addEventListener("click", function () {
    //document.getElementById("popup").style.display = "none";
    popup.style.animation = "fadeOut 0.5s ease-in-out";
    setTimeout(function () {
        popup.style.display = "none";
        popup.style.animation = "";
    }, 500);
    location.href = "../Pages/FormCompra.html";
    localStorage.setItem("banderaUsuarioRegistrado", 1);
});

//Click en registrar usuario 
document.getElementById("registrarUsuarioBasico").addEventListener("click", function (event) {
    event.preventDefault();
    crearOValidarCliente();
    localStorage.setItem("banderaUsuarioRegistrado", 2);
    popup.style.animation = "fadeOut 0.5s ease-in-out";
    setTimeout(function () {
        popup.style.display = "none";
        popup.style.animation = "";
        location.href = "../Pages/FormCompra.html";
    }, 500);
});

//click en X de form de ingreso 
document.getElementById("btnCerrar").addEventListener("click", function () {
    /*document.getElementById("popup").style.display = "none";*/
    //arrayComprados.splice(0, arrayComprados.length);
    localStorage.setItem("arrayComprados", JSON.stringify(arrayComprados));
    popup.style.animation = "fadeOut 0.5s ease-in-out";
    setTimeout(function () {
        popup.style.display = "none";
        popup.style.animation = "";
    }, 500);
});

function cargaInfoProducto(idProducto, cantProducto) {
    return {
        id: idProducto,
        cantidad: cantProducto
    };
};


function buscarProductoEnArrayComprados(idProducto) {
    var productoEncontrado = arrayComprados.find(item => item.id === idProducto);
    if (productoEncontrado) {
        return true; // Producto repetido
    } else {
        return false; // Producto nuevo
    }
}

function eliminarProductoDelCarrito(posicion) {
    arrayComprados.splice(posicion, 1);
    crearPedido();
};

function buscarPosicionEnArrayComprados(idProducto) {
    return arrayComprados.findIndex(item => item.id === idProducto);
};

//---------------------------------------------------------------------------------------------------------

function actualizarCarrito() {

    //escribe en arrayComprados y muestra en Carrito
    let contenidoCarrito = document.getElementById("contenidoCarrito");
    contenidoCarrito.innerHTML = "";

    arrayComprados.forEach(item => {

        let productoCarrito = document.createElement("div");
        let cantSeleccionada = item.cantidad;
        let valorVisu = cantSeleccionada * arrayProductos[item.id - 1].precio;
        productoCarrito.innerHTML = `
                    <div id="prodCarrito">
                    <p>${arrayProductos[item.id - 1].nombre} x <button class="btnMenos" id="btnMenos${item.id}" type="submit" value=" - "> - </button> ${cantSeleccionada} <button class="btnMas" id="btnMas${item.id}" type="submit" value="+"> + </button> - ${arrayProductos[item.id - 1].moneda} ${valorVisu}</p>
                    </div>
                    `;

        contenidoCarrito.append(productoCarrito);
    });

    //botones - del carrito 
    let btnMenosLista = document.querySelectorAll('.btnMenos');
    btnMenosLista.forEach((btnMenos) => {
        btnMenos.addEventListener('click', (event) => {
            event.preventDefault();
            let itemIdMenos = event.target.id.slice(8);
            let qth2 = buscarPosicionEnArrayComprados(itemIdMenos);

            if (arrayComprados[qth2].cantidad === 1) {
                eliminarProductoDelCarrito(buscarPosicionEnArrayComprados(itemIdMenos));

                if (arrayComprados.length === 0) {
                    desactivarBotonFinalizarCompra();
                }
            } else {
                arrayComprados[qth2].cantidad -= 1;
                crearPedido();

            };
            //genero listado nuevamente
            actualizarCarrito();
        });
    });//cierre botones -

    //botones + del carrito
    let btnMasLista = document.querySelectorAll('.btnMas');
    btnMasLista.forEach((btnMas) => {
        btnMas.addEventListener('click', (event) => {

            event.preventDefault();
            let itemIdMas = event.target.id.slice(6);
            arrayComprados[buscarPosicionEnArrayComprados(itemIdMas)].cantidad += 1;
            //genero listado nuevamente
            actualizarCarrito();
            crearPedido();
        });
    });//cierre botones +


    crearPedido();
}; //cierre function actualizarCarrito()

actualizarCarrito();

//--------------------------------------------------------------------------------------------------------

// Escuchar eventos para agregar al carrito desde labelsAgregaCarrito
const labelsAgregaCarrito = document.querySelectorAll('label.agregaCarrito');
labelsAgregaCarrito.forEach((label) => {
    label.addEventListener('click', (event) => {
        event.preventDefault();
        //find label.id en arrayComprados, si esta que modifique cantidad, sino que agregue al carrito 
        const productoRepetido = buscarProductoEnArrayComprados(label.id);
        let hg = buscarPosicionEnArrayComprados(label.id);

        if (productoRepetido) {   //actualiza
            arrayComprados[hg].cantidad += 1;
            crearPedido();

        } else { // agrega normal
            let infoComprados = new cargaInfoProducto(label.id, 1);
            arrayComprados.push(infoComprados);
            botonCompra.disabled = false;
            botonCompra.style.backgroundColor = 'red';
            document.getElementById("carritoPopup").style.display = "block";
            Swal.fire({
                position: 'top-end',
                title: 'Producto agregado al Carrito',
                showConfirmButton: false,
                timer: 700
            })
            crearPedido();
        } //cierre else
        actualizarCarrito();
    });//cierre label.addEventListener
});//cierre labelsAgregaCarrito


let carritoPopup = document.getElementById('carritoPopup');
let btnMinimizarCarrito = document.getElementById('btnMinimizarCarrito');
let contenidoCarrito = document.getElementById('contenidoCarrito');

function limpiarCarrito() {
    botonCompra.disabled = true;
    botonCompra.style.backgroundColor = 'gray';
    arrayComprados.splice(0, arrayComprados.length);
    localStorage.setItem("arrayComprados", JSON.stringify(arrayComprados));
    let contenidoCarrito = document.getElementById("contenidoCarrito");
    contenidoCarrito.innerHTML = "";
    carritoPopup.style.animation = "fadeOut 1s ease-in-out";
};

//click X carrito
let btnCerrarCarrito = document.getElementById('btnCerrarCarrito');
btnCerrarCarrito.addEventListener('click', () => {
    limpiarCarrito();
    setTimeout(function () {
        carritoPopup.style.display = "none";
    }, 1000);
});



btnMinimizarCarrito.addEventListener('click', () => {
    contenidoCarrito.style.display = contenidoCarrito.style.display === 'none' ? 'block' : 'none';
});

//click botonCompra
const botonCompra = document.getElementById('botonCompra');
botonCompra.addEventListener('click', (event) => {
    document.getElementById("popup").style.display = "block";
    event.preventDefault();
    arrayComprados.forEach((item) => {
        let iid = item.id - 1;
        montoTotal = montoTotal + (arrayProductos[iid].precio * item.cantidad);
    });
    crearPedido();
});

//click boton ingresar con usuario -signUsuario- y contraseña -signContraseña-
//funcion busqueda
function buscarUsuarioPorDNI(array, dni) {
    const objetoEncontrado = array.find(objeto => objeto.dni === dni);
    if (objetoEncontrado) {
        return array.indexOf(objetoEncontrado); // Devuelve la posición index si se encuentra una coincidencia
    } else {
        return -1; // Devuelve -1 si no se encuentra ninguna coincidencia
    }
};

//click
const botonIngresarCC = document.getElementById('ingresoUsuario');
botonIngresarCC.addEventListener('click', (event) => {
    event.preventDefault();
    //valido credenciales en usuariosDB.json
    fetch('../usuariosDB.json')
        .then(response => response.json())
        .then(data => {
            const arrayUsuarios = data;
            let usuarioDNI = document.getElementById('signUsuario').value;
            let usuarioContrasenia = document.getElementById('signContraseña').value;
            let objetivo = buscarUsuarioPorDNI(arrayUsuarios, JSON.parse(usuarioDNI));
            console.log("objetivo index", typeof usuarioDNI);
            if (objetivo != -1) { //usuario hallado
                if (arrayUsuarios[objetivo].contraseña == usuarioContrasenia) { //que avance a facturar
                    localStorage.setItem('usuarioIngresado', JSON.stringify(objetivo));
                    localStorage.setItem("banderaUsuarioRegistrado", 3);
                    popup.style.animation = "fadeOut 0.5s ease-in-out";
                    setTimeout(function () {
                        popup.style.display = "none";
                        popup.style.animation = "";
                        location.href = "../Pages/FormCompra.html";
                    }, 500);
                } else { //contras incorrecta
                    Swal.fire({
                        position: 'center',
                        title: 'Usuario y/o Contraseña inexistentes',
                        showConfirmButton: false,
                        timer: 900
                    })
                }
            } else { //usuario no encontrado
                Swal.fire({
                    position: 'center',
                    title: 'Usuario y/o Contraseña inexistentes',
                    showConfirmButton: false,
                    timer: 900
                })
            };

            console.log(arrayUsuarios);
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON de Usuarios:', error);
        });
});

//que evalue el carrito al iniciar 
function desactivarBotonFinalizarCompra() {
    botonCompra.disabled = true;
    botonCompra.style.backgroundColor = 'gray';
};

//desactivar Finalizar Compra al iniciar si no hay nada en el carrito
window.addEventListener('DOMContentLoaded', function () {
    if (arrayComprados.length === 0) {
        desactivarBotonFinalizarCompra();
    }
});

// LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA 
// LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA
// LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA 
// LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA LIBRERIA 
//uso libreria anime
const FotoProductoAnimada = document.querySelectorAll("img.FotoProducto");
FotoProductoAnimada.forEach((img) => {

    let FotoProductoGrande = false;

    const mouseOverImagen = () => {
        anime({
            targets: img,
            scale: {
                delay: 100,
                value: 1.05,
            },
            duration: 1800
        });
    };

    const clickEnImagen = () => {
        if (FotoProductoGrande === false) {
            anime({
                targets: img,
                scale: {
                    delay: 100,
                    value: 2,
                },
                duration: 1800
            });
            FotoProductoGrande = true;
        } else {
            anime({
                targets: img,
                scale: {
                    delay: 100,
                    value: 1,
                },
                duration: 1800
            });
            FotoProductoGrande = false;
        }
    };

    img.addEventListener('mouseover', mouseOverImagen);
    img.addEventListener('click', clickEnImagen);

    const mouseOutImagen = () => {
        anime({
            targets: img,
            scale: {
                delay: 100,
                value: 1,
            },
            duration: 1800
        });
        FotoProductoGrande = false
    };

    img.addEventListener('mouseout', mouseOutImagen);
});



