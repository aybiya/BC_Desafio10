
    let form = document.querySelector("form");
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let docNumber = document.getElementById("docNumber");
    let direction = document.getElementById("direction");
    let errorName = document.getElementById("errorName");
    let errorLstName = document.getElementById("errorLstName");
    let errorDoc = document.getElementById("errorDoc");
    let errorDirec = document.getElementById("errorDirec");


   // 4 - Validaciones en los campos, informando los errores en tiempo real y al intentar enviar el formulario

    form.addEventListener("submit", function (event) {
        let isValid = true;
    
        if (!verifyNameInput(firstName.value)) {
            isValid = false;
        }
    
        if (!verifyLastNameInput(lastName.value)) {
            isValid = false;
        }
    
        if (!verifyDocumentInput(docNumber.value)) {
            isValid = false;
        }
    
        if (!verifyDirectionInput(direction.value)) {
            isValid = false;
        }
    
        if (!isValid) {
            event.preventDefault(); // Evitar el envío del formulario si no es válido
        }
    });


//3 - Informar errores de validación debajo de los campos

// Nombre
function verifyNameInput(input) {
    const regex = /^[A-ZÁÉÍÓÚÑ]?[a-záéíóúñ]{3,10}$/;

    if (regex.test(input)) {
        errorName.innerText = "";
        return true;
    } else {
        errorName.innerText = "Completar el campo con un mínimo de 3 y máximo de 10 caracteres, la primera letra puede estar en mayúscula o minúscula y las siguientes solo en minúsculas, caracteres del español.";
        return false;
    }
}

firstName.addEventListener("input", function (event) {
    verifyNameInput(event.target.value);
});

// Apellido
function verifyLastNameInput(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚ'’]{2,20}$/;

    if (regex.test(input)) {
        errorLstName.innerText = "";
        return true;
    } else {
        errorLstName.innerText = "Completar el campo con un mínimo de 2 y máximo de 20 caracteres, letras, acentos, apóstrofes o comillas";
        return false;
    }
}

lastName.addEventListener("input", function (event) {
    verifyLastNameInput(event.target.value);
});

// Documento
//se habilitará/deshabilitará el campo docNumber según la opción seleccionada:

const dniOption = document.getElementById("dniOption");
const cuilOption = document.getElementById("cuilOption");

chooseDocNumber(dniOption);

dniOption.addEventListener("change", () => chooseDocNumber(dniOption));
cuilOption.addEventListener("change", () => chooseDocNumber(cuilOption));

function chooseDocNumber(selectedOption) {
    const docNumberField = document.getElementById("docNumber");
    
    if (selectedOption.checked) {
        docNumberField.removeAttribute("disabled");
    } else {
        docNumberField.setAttribute("disabled", "disabled");
    }
}

// errores de Documento una vez habilitado el campo según la opción seleccionada:

let documentNumb = ''

function verifyDoc(event) {
    const docNumber = event.target.value;
    const docTypeDNI = document.querySelector('input[value="DNI"]');
    const docTypeCUIL = document.querySelector('input[value="CUIL"]');
    const errorDoc = document.getElementById("errorDoc");


    if (docTypeDNI.checked) {
        if (/^\d{7,8}(\.\d{3})*$/.test(docNumber.replace(/\./g, ''))) {
            errorDoc.innerText = "";
        } else {
            errorDoc.innerText = "Ingresa un número de DNI válido (mínimo 7/8 dígitos, puede incluir puntos)";
          }
    } else if (docTypeCUIL.checked) {
        if (/^\d{2}-?\d{7}-?\d$/.test(docNumber) || /^\d{11}$/.test(docNumber.replace(/-/g, ''))) {
            errorDoc.innerText = "";
        } else {
            errorDoc.innerText = "El CUIL no es válido";
        }
    } 
} 

// Dirección
function verifyDirectionInput(input) {
    const regex = /^[\w\sáéíóúñÁÉÍÓÚÑãõâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇàèéìíòóùúÁÉÍÓÚÑãõâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇàèéìíòóùú°\/,.\-'"\(\)]{10,200}$/;

    if (regex.test(input)) {
        errorDirec.innerText = "";
        return true;
    } else {
        errorDirec.innerText = "Completar el campo con un mínimo de 10 y máximo de 200 caracteres";
        return false;
    }
}

direction.addEventListener("input", function (event) {
    verifyDirectionInput(event.target.value);
});
