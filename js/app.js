//El app es el que esta vinculado con el index.html
import { userAdmin } from "./user.js";
import { saveUserLog } from "./hellpers.js";
import { getRoleUserLog } from "./hellpers.js";

let adminLi = document.getElementById("adminLi");
checkAdmin();
let cardProductos=document.getElementById("cardProductos")
console.log(cardProductos);


function CrearCards(){
    const arrayProductos=JSON.parse(localStorage.getItem("productos"))||[];
    cardProductos.innerHTML="";//vaciamos el contenedor de la card para que no se repitan cada vez que actualizamos o agregamos un producto
    arrayProductos.forEach(element => {
        cardProductos.innerHTML+=`
        <div class="card m-3" style="width: 18rem;">
        <img src="${element.imgUrl}" class="card-img-top" alt="${element.descripcion}">
        <div class="card-body">
          <h5 class="card-title">${element.nombre}</h5>
          <p class="card-text">${element.descripcion}</p>
          <p class="card-text">$ ${element.precio}</p>
        </div>
      </div>`
    });
}

CrearCards();

window.Login = function(){
  saveUserLog(userAdmin);
  checkAdmin();
};

window.LogOut = function(){
  sessionStorage.removeItem("user");
  adminLi.className="nav-item d-none"
}

function checkAdmin(){
  const role = getRoleUserLog();

  if(role === "admin"){
    adminLi.className = "nav-item"
  } 
}

