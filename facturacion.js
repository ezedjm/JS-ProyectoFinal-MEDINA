// ()
const arrayProductosStorage = localStorage.getItem("arrayProductos");
const arrayCompradosStorage = localStorage.getItem("arrayComprados");

const arrayProductos = JSON.parse(arrayProductosStorage);
const arrayComprados = JSON.parse(arrayCompradosStorage);

/*
for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i);
    console.log("clave", clave);

    console.log("valor", localStorage.getItem(clave));
};
*/

let personaStorage = localStorage.getItem('personaBas');
let personaBas2 = JSON.parse(personaStorage);
//console.log(personaBas2.fecNac);

//cargo datos de registro basicos de tienda.html en los labels que van

if (localStorage.getItem("banderaUsuarioRegistrado") == "false") {
  let nombre = document.getElementById("firstName");
  let apellido = document.getElementById("lastName");
  let email = document.getElementById("email");
  //let dni = document.getElementById("dni");
  let pais = document.getElementById("country");
  let fechaNac = document.getElementById("fechaNac");
  
  nombre.value = personaBas2.nombre;
  apellido.value = personaBas2.apellido;
  email.value = personaBas2.email;
  //dni.value = personaBas2.dni;
  pais.value = personaBas2.pais;
  fechaNac.value = personaBas2.fecNac;
} 

console.log("banderausuario", localStorage.getItem("banderaUsuarioRegistrado"));

const montoTotal = localStorage.getItem("montoTotal")
//console.log("monto Total", montoTotal);

for (let i = 0; i < arrayComprados.length; i++) {
  console.log(arrayComprados[i]);
  let g = arrayComprados[i];
  console.log(arrayProductos[g - 1].nombre);
};
//console.log(arrayComprados.length);

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
  divDescArt.innerHTML = `
    <div>
      <li class="d-flex justify-content-between lh-sm">
        <div>
          <h6 class="my-0">${arrayProductos[z - 1].nombre}</h6>
          <small class="text-muted">${arrayProductos[z - 1].detalle}</small>
        </div>
        <span class="text-muted">${arrayProductos[z - 1].precio}</span>
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



