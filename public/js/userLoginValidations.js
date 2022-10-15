window.addEventListener('load', () => {

    const form = document.querySelector('#loginForm');

    const inputEmail= document.querySelector("#email");
    const errorEmail= document.querySelector("#errorEmail");

    const inputPassword= document.querySelector("#password");
    const errorPassword= document.querySelector("#errorPassword");

    let errors = [];

    inputEmail.addEventListener("blur",() => {
        if (inputEmail.value == "") displayMessage(errorEmail,`El email no puede estar vacío`);
        else if (inputEmail.value.length < 2) displayMessage(errorEmail,`El email no puede tener menos de 2 caracteres`);
        else if (!inputEmail.value.includes("@") || !inputEmail.value.includes(".com")) displayMessage(errorEmail,'El formato del email es incorrecto');
        else deleteError(errorEmail);
    })


    inputPassword.addEventListener("blur",() => {
        if (inputPassword.value == "") displayMessage(errorPassword,'Debes escribir una contraseña');
        else if (inputPassword.value.length < 6) displayMessage(errorPassword,'Debe contener al menos 6 caracteres');
        // else if (!(inputPassword.value.match(/[a-z]/)) ) displayMessage(errorPassword,'Debe contener una letra minúscula');
        // else if (!(inputPassword.value.match(/[A-Z]/)) ) displayMessage(errorPassword,'Debe contener una letra mayúscula');
        // else if (!(inputPassword.value.match(/\d/)) ) displayMessage(errorPassword,'Debe contener un número');
        else deleteError(errorPassword);
    })

    form.addEventListener('submit', e => {
        e.preventDefault();

        inputEmail.focus();
        inputPassword.focus();

        const allErrors = document.querySelectorAll('small.danger');
        if (allErrors.length === 0) form.submit();


    })

})

function displayMessage( item, message ) {
    item.style.display = "block";
    item.classList.add("danger");
    item.innerHTML = message;
    errors.push(message);
}

function deleteError(item){
    item.classList.remove('danger');
    item.style.display = "none";
}