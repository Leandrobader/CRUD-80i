//vamos a validar los formularios
export function ValidarinputRequerido(input){//recibimos un input completo
    if(input.value.trim().length > 0){
        
        input.className="form-control is-valid" //cambiamos la clase que tiene por otra que muestre que es valido.
        return true;
    }else{
        
        input.className="form-control is-invalid"
        return false;
    }
}

export function ValidarinputDescripcion(input){
    if (input.value.trim().length>=10 && input.value.trim().length<=200) {
        input.className="form-control is-valid"
        return true
    }else{
        input.className="form-control is-invalid"
        return false;
    }
}

export function ValidarinputPrecio(input){
    const regExPrecio=/^\$?\d+(\.\d{1,2})?$/;
    if (regExPrecio.test(input.value)) {
        input.className="form-control is-valid"
        return true
    }else{
        input.className="form-control is-invalid"
        return false
    }
}

export function ValidarinputUrl(input){
    const regExUrl=/^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/
    if (regExUrl.test(input.value)) {
        input.className="form-control is-valid"
        return true
    }else{
        input.className="form-control is-invalid"
        return false
    }
}

export function validarTodo(inpCodigo,inpNombre,inpDescripcion,inpPrecio,inpUrl){
    if (ValidarinputRequerido(inpCodigo)&&ValidarinputRequerido(inpNombre)&&ValidarinputDescripcion(inpDescripcion)&&ValidarinputPrecio(inpPrecio)&&ValidarinputUrl(inpUrl)) {
        return true;
    }else{
        return false;
    }
}

//ALAN NO LO PUDO HACER EN CLASE, LO HICE YO LUEGO Y ESTABA FUNCIONANDO

//  export function CodigoAleatorio(){
//      const regCode=JSON.parse(localStorage.getItem("regCode")) || [];
//      let repeat = false;
//      let code;
//      do {
//          if(regCode.length>=10){
//              console.log("No quedan mas digitos por generar...");
//              break
//          }
//          code = parseInt(Math.random()*10);
//          for(let i = 0; i < regCode.length; i++){
//              if (code === regCode[i]) {
//                  repeat = true;
//                  break
//              }else{
//                  repeat = false;
//              }
//          }
//      } while (repeat);
  
//      if (regCode.length<10) {
//          regCode.push(code);
//          localStorage.setItem("regCode",JSON.stringify(regCode));
//          return code;
//      }else{
//          return code;
//      }
    
//      // regCode.push(code);
//      // localStorage.setItem("regCode",JSON.stringify(regCode));
//      // return code;
//  }

export function ObtenerCodigoAleatorio(){
     return window.crypto.randomUUID()//De esta manera nos genera codigos unicos es parte del DOM
 }

 

