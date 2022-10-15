window.addEventListener('load', () => {

    const form = document.querySelector('#registerForm');

    const inputFullName= document.querySelector("#full_name");
    const errorFullName= document.querySelector("#errorFullName");

    const inputPhoneNumber= document.querySelector("#phone_number");
    const errorPhoneNumber= document.querySelector("#errorPhoneNumber");

    const inputEmail= document.querySelector("#email");
    const errorEmail= document.querySelector("#errorEmail");

    const inputPassword= document.querySelector("#password");
    const errorPassword= document.querySelector("#errorPassword");

    const inputAvatar= document.querySelector("#avatar");
    const errorAvatar= document.querySelector("#errorAvatar");

    const inputRole= document.querySelector("#role");
    const errorRole= document.querySelector("#errorRole");

    inputFullName.addEventListener("blur",() => {
        if (inputFullName.value == "") displayMessage(errorFullName,`El nombre no puede estar vacío`);
        else if (inputFullName.value.length < 2) displayMessage(errorFullName,`El nombre no puede tener menos de 2 caracteres`);
        else deleteError(errorFullName);
    })

    inputPhoneNumber.addEventListener("blur",() => {
        if (inputPhoneNumber.value == "") displayMessage(errorPhoneNumber,`El teléfono no puede estar vacío`);
        else if (parseInt(inputPhoneNumber.value) < 0) displayMessage(errorPhoneNumber,'El número no puede ser negativo');
        else deleteError(errorPhoneNumber);
    })

    inputEmail.addEventListener("blur",() => {
        if (inputEmail.value == "") displayMessage(errorEmail,`El usuario o email no puede estar vacío`);
        else if (inputEmail.value.length < 2) displayMessage(errorEmail,`El usuario o email no puede tener menos de 2 caracteres`);
        else if (!inputEmail.value.includes("@") || !inputEmail.value.includes(".com")) displayMessage(errorEmail,'El formato del correo es incorrecto');
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

    inputAvatar.addEventListener("blur",() => {
        const fileSize = inputAvatar.files[0].size / 1024 / 1024; // in MiB
        let imageAllowed = inputAvatar.value.match(/(\.jpg|\.jpeg|\.png|\.gif)$/) !== null;
        if ( !imageAllowed && inputAvatar.value !== '' ) displayMessage(errorAvatar,'La imagen debe ser en formato .jpeg, .jpg, .gif o .png');
        else if (fileSize >= 1 ) displayMessage(errorAvatar,'La imagen no puede pesar más de 1MB');
        else deleteError(errorAvatar);
    })

    // inputRole.forEach( item => {
    //     item.addEventListener('blur', () => {
    //         let isChecked = false;
    //         inputRole.forEach( select => {
    //             if ( select.checked ) isChecked = true
    //         } );
    //     if (!isChecked) displayMessage(errorRole,'Debes seleccionar un item');
    //     else deleteError(errorRole);
    //     })
    // }),



    form.addEventListener('submit', e => {
        e.preventDefault();

        // inputFullName.focus();
        // inputPhoneNumber.focus();
        // inputEmail.focus();
        // inputPassword.focus();
        // inputAvatar.focus();
        // inputRole.focus();
        // inputFullName.focus();

        const allErrors = document.querySelectorAll('small.danger');
        if (allErrors.length === 0) form.submit();
    })

})

function displayMessage( item, message ) {
    item.style.display = "block";
    item.classList.add("danger");
    item.innerHTML = message;
}

function deleteError(item){
    item.classList.remove('danger');
    item.style.display = "none";
}