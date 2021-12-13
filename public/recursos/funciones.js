(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          RegistrarCliente();
          event.preventDefault()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function RegistrarCliente(){
  let documento = document.querySelector("#txtDocumento").value;
  let nombre = document.querySelector("#txtNombres").value;
  let apellido = document.querySelector("#txtApellidos").value;
  let fechaNacimiento= document.querySelector("#dateFecha").value;
  let genero=document.querySelector("txtGenero").value;
  let numeroLicencia=document.querySelector("txtLicencia").value;
  let celular = document.querySelector("#txtCelular").value;
  let direccion = document.querySelector("#txtDireccion").value;
  let tarjeta1 = document.querySelector("#txtTarjeta1").value;
  let tarjeta2 = document.querySelector("#txtTarjeta2").value;
  let correo = document.querySelector("#txtCorreo").value;

  let url = 'http://localhost:3000/clientes';
  let datos = {
    documento: documento,
    nombre: nombre,
    apellido: apellido,
    fechaNacimiento: fechaNacimiento,
    genero: genero,
    numeroLicencia: numeroLicencia,
    celular: celular,
    direccion: direccion,
    tarjeta1: tarjeta1,
    tarjeta2: tarjeta2,
    correo: correo,
  };

fetch(url, {
  method: 'POST',
body: JSON.stringify(datos),
headers: {
  'Content-Type':'application/json'
  }
}).then(res => res.json())
.then(mensaje=>{
  console.log(mensaje)
})

}
