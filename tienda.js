/*
ingresar un valor que a futuro vendra de un boton de compra de una tienda virtual
es cliente ?
si es cliente que ingrese nombre y clave
si no dar opcion de continuar como invitado o salir
si es invitado ingresar nombre 
mostrar total 
dar opciones de pago hasta 3 cuotas sin interes
si elige cuotas mostrar montos mensuales
()
*/

function crearPedido() {
    localStorage.clear;
    //sumo montos de articulos elegidos
    for (let i = 0; i < arrayProductos.length; i++) {
        if (FormCompra.elements[i].checked) {
            montoTotal = montoTotal + arrayProductos[i].precio;
            //localStorage.setItem(arrayProductos[i].id, arrayProductos[i].precio);

            //cargo los id de los productos comprados al storage para leerlos en la pagina de facturacion
            arrayComprados.push(arrayProductos[i].id);
            //console.log(localStorage.getItem(arrayProductos[i].id));
        };
    };
    //subo todo al storage 
    localStorage.setItem("montoTotal", montoTotal);
    localStorage.setItem("arrayComprados", JSON.stringify(arrayComprados));
};

//para cargar persona cuando valide el usuario mas adelante
/*let infoPersona = {
    dni: 123123123,
    contraseña: "123asd*",
    nombre: "Coder",
    apellido: "House",
    edad: 1,
    fechaNac: 01 / 01 / 01,
    domicilioE: "CasaE",
    domicilioF: "CasaF",
    pais: "Argentina",
    codPostal: 1211,
    email: "email@coder.com.ar",
    frecuente: true,
};*/


/*
function crearOValidarCliente() {

    // Obtener los valores de los campos del formulario
    let nombreBas = document.getElementById("nombre").value;
    let apellidoBas = document.getElementById("apellido").value;
    let dniBas = document.getElementById("dni").value;
    let emailBas = document.getElementById("email").value;
    let fechaNacimientoBas = document.getElementById("fechaNacimiento").value;
    let paisBas = document.getElementById("pais").value;
    let contraseñaBas = document.getElementById("contraseña").value;

    //validar dni a ver si ya es cliente o no
    //si no es cliente
    let variableNombre = "Cliente_" + dniBas;
    window[variableNombre] {
        dniBas,
        nombreBas,
        apellidoBas,    
        emailBas,
        fechaNacimientoBas,
        paisBas,
        contraseñaBas                
    };

    class PersonaBasicaBuilder {
        constructor(window[variableNombre]) {
            this.dni = window[variableNombre].dniBas;
            this.nombre = window[variableNombre].nombreBas;
            this.apellido = window[variableNombre].apellidoBas;
            this.email = window[variableNombre].emailBas;
            this.fechaNac = window[variableNombre].fechaNacimientoBas;
            this.pais = window[variableNombre].paisBas;
            this.contraseña = window[variableNombre].contraseñaBas;
        }
    };

    //si ya es cliente dar aviso que ya hay un usuario creado con ese dni y enviar a ingresar y dar 
    //chance de obtener nueva contrasenia 

    ;
};*/


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


function banderaUserReg (bandera) {
regCliente = bandera;
return regCliente;
};


class PersonaBuilder {
    constructor(infoPersona) {
        this.dni = infoPersona.dni;
        this.contraseña = infoPersona.contraseña;
        this.nombre = infoPersona.nombre;
        this.apellido = infoPersona.apellido;
        this.edad = infoPersona.edad;
        this.fechaNac = infoPersona.fechaNac;
        this.domicilioE = infoPersona.domicilioE;
        this.domicilioF = infoPersona.domicilioF;
        this.pais = infoPersona.pais;
        this.codPostal = infoPersona.codPostal;
        this.email = infoPersona.email;
        this.frecuente = infoPersona.frecuente;
    }
};

/*
const Persona1 = new PersonaBuilder(infoPersona);
const Persona2 = new PersonaBuilder(infoPersona);
const Persona3 = new PersonaBuilder(infoPersona);
*/

//generador de Productos
function Producto(idProducto, nombreProducto, monedaProducto, precioProducto, detalleProducto, stockProducto) {
    this.id = idProducto;
    this.nombre = nombreProducto;
    this.moneda = monedaProducto;
    this.precio = precioProducto;
    this.detalle = detalleProducto;
    this.stock = stockProducto;
};

//creo utilizando funcion
const Producto1 = new Producto(1, "Producto 1", "ARG $", 1100, "Descripcion basica del producto 1", true);
const Producto2 = new Producto(2, "Producto 2", "ARG $", 2200, "Descripcion basica del producto 2", true);

//creo a mano solo para ejemplo
const Producto3 = {
    id: 3,
    nombre: "Producto 3",
    moneda: "ARG $",
    precio: 3300,
    detalle: "Descripcion basica del producto 3",
    stock: true,
};

const Producto4 = new Producto(4, "Producto 4", "ARG $", 4400, "Descripcion basica del producto 4", true);
const Producto5 = new Producto(5, "Producto 5", "ARG $", 5500, "Descripcion basica del producto 5", true);
const Producto6 = new Producto(6, "Producto 6", "ARG $", 6600, "Descripcion basica del producto 6", true);
const Producto7 = new Producto(7, "Producto 7", "ARG $", 7700, "Descripcion basica del producto 7", true);
const Producto8 = new Producto(8, "Producto 8", "ARG $", 8800, "Descripcion basica del producto 8", true);
const Producto9 = new Producto(9, "Producto 9", "ARG $", 9900, "Descripcion basica del producto 9", true);


//carga del arrayProductos - hacer automatica la carga mas adelante 
const arrayProductos = [];
arrayProductos.push(Producto1);
arrayProductos.push(Producto2);
arrayProductos.push(Producto3);
arrayProductos.push(Producto4);
arrayProductos.push(Producto5);
arrayProductos.push(Producto6);
arrayProductos.push(Producto7);
arrayProductos.push(Producto8);
arrayProductos.push(Producto9);

//creo array de productos comprados
const arrayComprados = [];
arrayComprados.clear;

//cargo arrayProductos al localStorage para compulsar en pagina de facturacion
localStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));

//cargo arrayProductos al html como si estuviera trayendo de una BD
let ProductosVisu = document.getElementById("ProductosPagina");

arrayProductos.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <div id="Producto">
    <h2>${item.nombre}</h2>
    <img src="../Images/fotoProducto.png" alt="Imagen de Producto">
    <p>${item.detalle}</p>
    <b>${item.moneda} ${item.precio}</b>
    <label>Sumar en carrito <input type="checkbox" id="${item.id}"></label>
    <hr></hr>
    </div>
    `;
    ProductosVisu.append(div);
});

document.getElementById("botonCompra").addEventListener("click", function () {
    document.getElementById("popup").style.display = "block";
});

document.getElementById("contInvitado").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
    location.href = "../Pages/FormCompra.html";
    localStorage.setItem("banderaUsuarioRegistrado", JSON.stringify(banderaUserReg (true)));
});

document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault();
    location.href = "../Pages/FormCompra.html";
    crearOValidarCliente();
    localStorage.setItem("banderaUsuarioRegistrado", JSON.stringify(banderaUserReg (false)));
});


//traigo el form del html y lo escucho
const FormCompra = document.getElementById('FormCompra');

FormCompra.addEventListener('submit', (event) => {
    event.preventDefault();
    montoTotal = 0;
    crearPedido();
});

