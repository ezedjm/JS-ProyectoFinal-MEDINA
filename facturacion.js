// ()
const arrayProductosStorage = localStorage.getItem("arrayProductos");
const arrayCompradosStorage = localStorage.getItem("arrayComprados");

const arrayProductos = JSON.parse(arrayProductosStorage);
const arrayComprados = JSON.parse(arrayCompradosStorage);

//traigo el index del usuario registrado ingresado
let objetivo = localStorage.getItem('usuarioIngresado');

//preparo inputs para asignar valores
let nombre = document.getElementById("firstName");
let apellido = document.getElementById("lastName");
let email = document.getElementById("email");
let pais = document.getElementById("country");
let fechaNac = document.getElementById("fechaNac");
let domicilioE = document.getElementById("address");
let domicilioF = document.getElementById("address2");
let localidad = document.getElementById("state");
let CodigoPostal = document.getElementById("CodigoPostal");

// Obtener la opción de usuario seleccionada
const opcionTipoUsuario = localStorage.getItem("banderaUsuarioRegistrado");

switch (opcionTipoUsuario) {
  case "1":// invitado
  nombre.value = "";
  apellido.value = "";
  fechaNac.value = "1900-01-01";
  email.value = "";
  domicilioE.value = "";
  domicilioF.value = "";
  localidad.value = "";
  CodigoPostal.value = "";
  pais.value = "";
    break;
  case "2":// registro basico
  const personaStorage = localStorage.getItem('personaBas');
  const personaBas2 = JSON.parse(personaStorage);
  nombre.value = personaBas2.nombre;
  apellido.value = personaBas2.apellido;
  email.value = personaBas2.email;
  pais.value = personaBas2.pais;
  fechaNac.value = personaBas2.fecNac;
    break;
  case "3":// registrado
  fetch('../usuariosDB.json')
  .then(response => response.json())
  .then(data => {
    const arrayUsuarios = data;
    nombre.value = arrayUsuarios[objetivo].nombre;
    apellido.value = arrayUsuarios[objetivo].apellido;
    fechaNac.value = arrayUsuarios[objetivo].fecNac;
    email.value = arrayUsuarios[objetivo].email;
    domicilioE.value = arrayUsuarios[objetivo].domicilioE;
    domicilioF.value = arrayUsuarios[objetivo].domicilioF;
    localidad.value = arrayUsuarios[objetivo].localidad;
    CodigoPostal.value = arrayUsuarios[objetivo].codPostal;
    pais.value = arrayUsuarios[objetivo].pais;
    localStorage.setItem("arrayUsuariosStorage", JSON.stringify(arrayUsuarios));
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON de Usuarios:', error);
  });
    
    break;
  default:
    break;
};

//const montoTotal = localStorage.getItem("montoTotal");
let montoTotal = 0;
arrayComprados.forEach((obj) => {
  montoTotal = montoTotal + obj.cantidad * arrayProductos[obj.id - 1].precio;
});

//leo el arrayComprados y cargo cant articulos
let cantProd = document.getElementById("cantidadProductos");
let divCantProd = document.createElement("div");
divCantProd.innerHTML = `
  <label>${arrayComprados.length}</label>
`;
cantProd.append(divCantProd);

//leo los id de arrayComprados y leo ese id de Producto en arrayProductos y cargo datos en el asideC
let descArt = document.getElementById("datosProducto");
arrayComprados.forEach((z) => {
  let divDescArt = document.createElement("div");
  let iid = parseInt(z.id) - 1;
  divDescArt.innerHTML = `
    <div>
      <li class="d-flex justify-content-between lh-sm">
        <div>
          <h6 class="my-0">${arrayProductos[iid].nombre}</h6>
          <small class="text-muted">${arrayProductos[iid].detalle}</small>
        </div>
        <span class="text-muted">Cantidad: ${z.cantidad} x ${arrayProductos[iid].moneda}${arrayProductos[iid].precio}</span>
      </li>
    </div>
  `;
  descArt.append(divDescArt);
});

//
let valorTotalFinal = document.getElementById("valorTotalFinal");
let divVTF = document.createElement("div");
//calcular con descuento mas adelante
divVTF.innerHTML = `
  <label>${montoTotal}</label>
`;
valorTotalFinal.append(divVTF);

//muestro fotos de los articulos adquiridos
console.log(arrayComprados);
let ProductosComprados = document.getElementById("muestraComprados");
arrayComprados.forEach((y) => {
  let divComprados = document.createElement("div");
  let fotoProducto = "../Images/fotoProducto" + arrayProductos[y.id - 1].id + ".png";
  divComprados.innerHTML = `
    <h2>${arrayProductos[y.id - 1].nombre}</h2>
    <img src="${fotoProducto}" alt="Imagen de Producto">
    <p>${arrayProductos[y.id - 1].detalle}</p>
     <hr></hr>
    `;
  ProductosComprados.append(divComprados);
});


//click FINALIZAR COMPRA - guarde datos actualizados usuario, que genere factura en Pdf y cierre
const arrayUsuariosStorage = localStorage.getItem("arrayUsuarios");
const arrayUsuarios = JSON.parse(arrayUsuariosStorage);

function actualizoUsuarioDB(array, index) {
  array[index].nombre = nombre.value;
  array[index].apellido = apellido.value;
  array[index].fecNac = fechaNac.value;
  array[index].email = email.value;
  array[index].domicilioE = domicilioE.value;
  array[index].domicilioF = domicilioF.value;
  array[index].localidad = localidad.value;
  array[index].codPostal = CodigoPostal.value;
  array[index].pais = pais.value;
  console.log("arrayUsuarios", arrayUsuarios);
  console.log("objetivo", objetivo);
};

let FinalizarOperacion = document.getElementById("FinalizarOperacion");
FinalizarOperacion.addEventListener('click', (event) => {
  event.preventDefault();
  actualizoUsuarioDB(arrayUsuarios, objetivo);

  const datosActualizados = JSON.stringify(arrayUsuarios);
  fetch('../usuariosDB.json', {
    method: 'PUT', // Utiliza el método HTTP correcto según tu configuración del servidor
    headers: {
      'Content-Type': 'application/json'
    },
    body: datosActualizados
  })
    .then(response => response.json())
    .then(data => {
      console.log('Datos actualizados:', data);
    })

  Swal.fire({
    position: 'center',
    title: 'Genero Pdf a futuro. Datos de usuario actualizados (Al menos en el arrayUsuarios de memoria porque no puedo utilizar el metodo put para modificar el json, pero es la idea)',
    showConfirmButton: false,
    timer: 8000
  })
  setTimeout(function() {
    location.href = "../Pages/Tienda.html";
  }, 8000); // Ejecutar después de 5 segundos (5000 milisegundos)
  arrayComprados.splice(0, arrayComprados.length);
  localStorage.setItem("arrayComprados", JSON.stringify(arrayComprados));
});


