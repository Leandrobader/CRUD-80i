import {ValidarinputRequerido, ValidarinputDescripcion,ValidarinputPrecio,ValidarinputUrl, validarTodo, ObtenerCodigoAleatorio} from "./hellpers.js"; //Para poder importar debo agregar el type module en el html script
let arrayProductos=JSON.parse(localStorage.getItem("productos"))||[];
let bodyTabla=document.querySelector("tbody")
let inputCodigo=document.getElementById("codigo")
let inputNombre=document.getElementById("nombre")
let inputDescripcion=document.getElementById("descripcion")
let inputPrecio=document.getElementById("precio")
let inputImgUrl=document.getElementById("imgUrl")


let form=document.querySelector("form") //esto se hace para no perder los datos del formulario al apretar el boton submit que recarga la pagina
inputCodigo.value=ObtenerCodigoAleatorio();
console.log(bodyTabla);

form.addEventListener("submit",GuardarProducto);//al formulario le cambiamos el comportamiento nativo que tiene al precionar el boton submit para que no recargue la pagina

inputCodigo.addEventListener("blur",()=>{
    ValidarinputRequerido(inputCodigo)
})

inputNombre.addEventListener("blur",()=>{
    ValidarinputRequerido(inputNombre)
})

inputDescripcion.addEventListener("blur",()=>{
    ValidarinputDescripcion(inputDescripcion);
})

inputPrecio.addEventListener("blur",()=>{
    ValidarinputPrecio(inputPrecio)
})

inputImgUrl.addEventListener("blur",()=>{
    ValidarinputUrl(inputImgUrl);
})
//Llamamos a la funcion listar productos para crear filas en nuestra tabla
ListarProductos();

function GuardarProducto(e){//siempre que haya un formulario tiene que recibir un evento. se lo coloca como e
    e.preventDefault();//Evita que se actualice la pagina
    if (validarTodo(inputCodigo,inputNombre,inputDescripcion,inputPrecio,inputImgUrl)) {
        CrearProducto();
    }else{
        Swal.fire({
            title: "Ups",
            text: "Todos los campos son requeridos",
            icon: "error"
          });
    }
}

function CrearProducto(){
    const nuevoProducto={
        codigo: inputCodigo.value,
        nombre: inputNombre.value,
        descripcion: inputDescripcion.value,
        precio: inputPrecio.value,
        imgUrl: inputImgUrl.value
    }
    arrayProductos.push(nuevoProducto);
    Swal.fire({
        title: "Exito!",
        text: "El producto se guardo correctamente",
        icon: "success"
      });
    LimpiarFormulario();
    bodyTabla.innerHTML=""; //De esta manera limpiamos la tabla para que no listen los productos dos veces
    ListarProductos();
};

function LimpiarFormulario(){
    form.reset();
    inputCodigo.className="form-control"
    inputCodigo.value=ObtenerCodigoAleatorio();
    inputNombre.className="form-control"
    inputDescripcion.className="form-control"
    inputPrecio.className="form-control"
    inputImgUrl.className="form-control"
    GuardarLocalStorage();
};

function GuardarLocalStorage(){
    localStorage.setItem("productos",JSON.stringify(arrayProductos));
}

function ListarProductos(){
    arrayProductos.forEach(element => {
        bodyTabla.innerHTML+=`<tr>
        <th scope="row">${element.codigo}</th>
        <td>${element.nombre}</td>
        <td>${element.descripcion}</td>
        <td>${element.precio}</td>
        <td><a href="${element.imgUrl}" target = "_blank" title="Ver imagen">${element.imgUrl}</a></td>
        <td>
            <button type="button" class="btn btn-warning mx-1">Editar</button>
            <button type="button" class="btn btn-danger mx-1">Eliminar</button>
        </td>
    </tr>`
    });
}

