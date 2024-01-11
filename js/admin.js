import {
  ValidarinputRequerido,
  ValidarinputDescripcion,
  ValidarinputPrecio,
  ValidarinputUrl,
  validarTodo,
  ObtenerCodigoAleatorio,
} from "./hellpers.js"; //Para poder importar debo agregar el type module en el html script
let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
let bodyTabla = document.querySelector("tbody");
let inputCodigo = document.getElementById("codigo");
let inputNombre = document.getElementById("nombre");
let inputDescripcion = document.getElementById("descripcion");
let inputPrecio = document.getElementById("precio");
let inputImgUrl = document.getElementById("imgUrl");

let form = document.querySelector("form"); //esto se hace para no perder los datos del formulario al apretar el boton submit que recarga la pagina
inputCodigo.value = ObtenerCodigoAleatorio();
console.log(bodyTabla);

form.addEventListener("submit", GuardarProducto); //al formulario le cambiamos el comportamiento nativo que tiene al precionar el boton submit para que no recargue la pagina

inputCodigo.addEventListener("blur", () => {
  ValidarinputRequerido(inputCodigo);
});

inputNombre.addEventListener("blur", () => {
  ValidarinputRequerido(inputNombre);
});

inputDescripcion.addEventListener("blur", () => {
  ValidarinputDescripcion(inputDescripcion);
});

inputPrecio.addEventListener("blur", () => {
  ValidarinputPrecio(inputPrecio);
});

inputImgUrl.addEventListener("blur", () => {
  ValidarinputUrl(inputImgUrl);
});
//Llamamos a la funcion listar productos para crear filas en nuestra tabla
ListarProductos();

let esEdicion = false;

function GuardarProducto(e) {
  //siempre que haya un formulario tiene que recibir un evento. se lo coloca como e
  e.preventDefault(); //Evita que se actualice la pagina
  if (
    validarTodo(
      inputCodigo,
      inputNombre,
      inputDescripcion,
      inputPrecio,
      inputImgUrl
    )
  ) {
    if (esEdicion) {
        GuardarProductoEditado();
      //llamar a la funcion para guardar el producto editado
    } else {
      CrearProducto();
    }
  } else {
    Swal.fire({
      title: "Ups",
      text: "Todos los campos son requeridos",
      icon: "error",
    });
  }
}

function CrearProducto() {
  const nuevoProducto = {
    codigo: inputCodigo.value,
    nombre: inputNombre.value,
    descripcion: inputDescripcion.value,
    precio: inputPrecio.value,
    imgUrl: inputImgUrl.value,
  };
  arrayProductos.push(nuevoProducto);
  Swal.fire({
    title: "Exito!",
    text: "El producto se guardo correctamente",
    icon: "success",
  });
  LimpiarFormulario();

  ListarProductos();
}

function GuardarProductoEditado(){
    let indexProducto = arrayProductos.findIndex((element) => {//find index devuelve el index del objeto que satisface la funcion arrow
        return element.codigo===inputCodigo.value
    })
    
    if (indexProducto!== -1) {//de esta manera actualizamos el valor de cada campo del producto a modificar

        Swal.fire({
            title: "¿Estas seguro?",
            text: "Vas a cambiar los datos de un producto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, modificar",
            cancelButtonText:"Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
            arrayProductos[indexProducto].codigo=inputCodigo.value;
            arrayProductos[indexProducto].nombre=inputNombre.value;
            arrayProductos[indexProducto].descripcion=inputDescripcion.value;
            arrayProductos[indexProducto].precio=inputPrecio.value;
            arrayProductos[indexProducto].imgUrl=inputImgUrl.value; 
            esEdicion=false;
            Swal.fire({
                title: "Exito!",
                text: "El producto se modificó correctamente",
                icon: "success",
              });
            
            LimpiarFormulario();
            ListarProductos();
            }else{
              esEdicion=false;
                LimpiarFormulario();
            }
          });

        
    }else{
      console.log("Entro en el else de guardar producto editado porque el codigo no existe dentro del arrayProducto");
    }

}

window.LimpiarFormulario = function () {
  //De esta manera declaramos una funcion global para poder llamarla desde el html
  form.reset();
  inputCodigo.className = "form-control";
  inputCodigo.value = ObtenerCodigoAleatorio();
  inputNombre.className = "form-control";
  inputDescripcion.className = "form-control";
  inputPrecio.className = "form-control";
  inputImgUrl.className = "form-control";
  GuardarLocalStorage();
};

function GuardarLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(arrayProductos));
}

function ListarProductos() {
  bodyTabla.innerHTML = ""; //De esta manera limpiamos la tabla para que no listen los productos dos veces
  arrayProductos.forEach((element) => {
    bodyTabla.innerHTML += `<tr>
        <th scope="row">${element.codigo}</th>
        <td>${element.nombre}</td>
        <td>${element.descripcion}</td>
        <td>${element.precio}</td>
        <td><a href="${element.imgUrl}" target = "_blank" title="Ver imagen">${element.imgUrl}</a></td>
        <td>
        <div class="d-flex">
        <button type="button" class="btn btn-warning mx-1" onclick="PrepararEdicion('${element.codigo}')">Editar</button>
        <button type="button" class="btn btn-danger mx-1">Eliminar</button>
        </div>  
        </td>
    </tr>`;
  });
}

//A esta funcion la llamamos desde el Listar productos porque ahi es donde esta el boton de editar
//cuando se hace click le pasamos el codigo para asi poder indentificar el producto recorriendo el array con
//el metodo find() que devuelve el primer valor que satisfaga la condicion
window.PrepararEdicion = function (codigo) {
  const productoAEditar = arrayProductos.find((element) => {
    return element.codigo === codigo;
  });

  if (productoAEditar !== undefined) {
    inputCodigo.value = productoAEditar.codigo;
    inputNombre.value = productoAEditar.nombre;
    inputDescripcion.value = productoAEditar.descripcion;
    inputPrecio.value = productoAEditar.precio;
    inputImgUrl.value = productoAEditar.imgUrl;
  }
  esEdicion=true;
};

 
