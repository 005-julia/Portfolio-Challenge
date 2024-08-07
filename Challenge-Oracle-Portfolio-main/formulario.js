const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const btn = document.getElementById('button');

const expresiones = {
    nome: /^[a-zA-ZÀ-ÿ\s]{1,50}$/,
	assunto: /^[a-zA-Z0-9\s\_\-]{1,50}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}
const campos = {
    nome: false,
    email: false,
    assunto: false,
}

const validarFormulario = (e)=>{
    switch (e.target.name){
        case "nome":
            validarCampo(expresiones.nome, e.target, 'nome');
        break;
        case "assunto":
            validarCampo(expresiones.assunto, e.target, 'assunto');
        break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;
    }
};
const validarCampo = (expresion,inpunt,campo)=>{
    if (expresion.test(inpunt.value)) {
        document.getElementById(`grupo_${campo}`).classList.remove('form_grupo_in');
        document.getElementById(`grupo_${campo}`).classList.add('form_grupo_co');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-xmark');

        document.querySelector(`#grupo_${campo} .form_input_error`).classList.remove('form_input_error-act');
        campos[campo] = true;
    } else{
        document.getElementById(`grupo_${campo}`).classList.remove('form_grupo_co');
        document.getElementById(`grupo_${campo}`).classList.add('form_grupo_in');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-xmark');
        
        document.querySelector(`#grupo_${campo} .form_input_error`).classList.add('form_input_error-act');
        campos[campo] = false;
    };
}

inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});
// -------------------------------------------------------------
 formulario.addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_uhvl9y8';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });

    if (campos.nome && campos.email && campos.assunto) {
        formulario.reset();
        document.getElementById('form_mensaje_exito').classList.add('form_mensaje_exito-act');
        setTimeout(()=>{
            document.getElementById('form_mensaje_exito').classList.remove('form_mensaje_exito-act');
        },3000);
        document.querySelectorAll('.form_grupo_co').forEach((icono)=>{
            icono.classList.remove('form_grupo_co');
        });
    } else {
        document.getElementById('form_mensaje').classList.add('form_mensaje-act');
        setTimeout(()=>{
            document.getElementById('form_mensaje').classList.remove('form_mensaje-act');
        },1500);
    }
});