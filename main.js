// Previene que se envie el form
var form = document.getElementById("myForm");

function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);


// Declaramos las funciones para cada boton interactivo
document.getElementsByClassName('submit')[0].addEventListener('click', function() {
    validateForm();
})

document.getElementsByClassName('fillForm')[0].addEventListener('click', function() {
    fillIt();
})

document.getElementsByClassName('reset')[0].addEventListener('click', function() {
    clearAll();
})

document.getElementsByClassName('copy')[0].addEventListener('click', function() {
    copyCode();
})


// Validacion basica del formulario
function validateForm() {
    let code = document.getElementById("codeOut");
    let snackBar = document.getElementById("snackbar");
    let hiddenStep = document.getElementById("hiddenStep");
    var btn = document.getElementById("getCode");
    const fields = ["nombreAdjunto", "claveAdjunto"];
    let x = document.forms["myForm"]["nombreAdjunto", "claveAdjunto"].value;
    if (x == "") {
        //alert("Debes llenar los campos!");
        snackBar.innerText = "Debes llenar los campos primero :)";
        snackBar.className = "show";
        setTimeout(function() {
            snackBar.className = snackBar.className.replace("show", "");
        }, 3000);
        code.innerText = ''
        btn.classList.add('disabled');
        btn.disabled = true;
        fields.forEach((element) => document.getElementById(element).classList.add("required"));
        setTimeout(() => {
            fields.forEach((element) => document.getElementById(element).classList.remove("required"));
        }, 3000);
        return false;
    } else {
        btn.classList.remove('disabled');
        fields.forEach((element) => document.getElementById(element).classList.remove("required"));
        btn.disabled = false;
        code.innerText = '%%=AttachFile("ContentBuilder","' + document.getElementById(fields[0]).value + '","' + document.getElementById(fields[1]).value + '")=%%';
        code.focus();
        hiddenStep.classList.remove("hide");
        return false;
    }
}

function fillIt() {
    let hiddenStep = document.getElementById("hiddenStep");
    var code = document.getElementById("codeOut");
    const fields = ["nombreAdjunto", "claveAdjunto"];
    var file = document.getElementById(fields[0]).value = 'Documento de Prueba.pdf';
    var pass = document.getElementById(fields[1]).value = '395e5926-d91f-4b88-a6a0-c4d66dd29bff';
    var btn = document.getElementById("getCode");
    var sub = document.getElementById("go");
    var del = document.getElementById("del");

    code.innerText = '%%=AttachFile("ContentBuilder","' + pass + '","' + file + '")=%%';
    fields.forEach((element) => document.getElementById(element).classList.remove("required"));
    btn.classList.remove('disabled');
    btn.disabled = false;
    sub.disabled = true;
    hiddenStep.classList.remove("hide");
    code.focus();

    return false;
}

function goToAnchor(anchor) {
    var loc = document.location.toString().split('#')[0];
    document.location = loc + '#' + anchor;
    return false;
}

function clearAll() {
    var hiddenStep = document.getElementById("hiddenStep");
    var code = document.getElementById("codeOut");
    var btn = document.getElementById("getCode");
    const fields = ['nombreAdjunto', 'claveAdjunto'];
    var sub = document.getElementById("go");

    code.innerText = '';
    fields.value = '';
    btn.classList.add('disabled');
    hiddenStep.classList.add("hide");
    btn.disabled = true;
    sub.disabled = false;
    fields.forEach((element) => document.getElementById(element).classList.remove("required"));
}

function copyCode() {
    var copyText = document.getElementById("codeOut");
    let snackBar = document.getElementById("snackbar");

    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(copyText.value);

    // alert("Copiado: " + copyText.value);
    snackBar.innerText = "Copiado al portapapeles!";
    snackBar.className = "show";
    setTimeout(function() {
        snackBar.className = snackBar.className.replace("show", "");
    }, 3000);

}