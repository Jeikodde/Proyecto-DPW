"use strict";
(() => {
    let ClasesInput;
    (function (ClasesInput) {
        ClasesInput["invalid"] = "invalid__input";
        ClasesInput["valid"] = "valid__input";
    })(ClasesInput || (ClasesInput = {}));
    let ClasesMensaje;
    (function (ClasesMensaje) {
        ClasesMensaje["oculto"] = "mensaje__oculto";
        ClasesMensaje["visible"] = "mensaje__visible";
    })(ClasesMensaje || (ClasesMensaje = {}));
    const controlarClasses = (elemento, claseAgregar, claseRemover) => {
        elemento.classList.remove(claseRemover);
        elemento.classList.add(claseAgregar);
    };
    const limpiarClasesInput = (listaInputs, textarea) => {
        listaInputs.forEach((input) => {
            input.classList.remove(ClasesInput.invalid, ClasesInput.valid);
        });
        textarea.classList.remove(ClasesInput.invalid, ClasesInput.valid);
    };
    const validarTextarea = (textareaElement) => {
        var _a;
        const divMensaje = (_a = textareaElement.parentElement) === null || _a === void 0 ? void 0 : _a.lastElementChild;
        if (!textareaElement.checkValidity()) {
            controlarClasses(textareaElement, ClasesInput.invalid, ClasesInput.valid);
            controlarClasses(divMensaje, ClasesMensaje.visible, ClasesMensaje.oculto);
            return;
        }
        controlarClasses(textareaElement, ClasesInput.valid, ClasesInput.invalid);
        controlarClasses(divMensaje, ClasesMensaje.oculto, ClasesMensaje.visible);
    };
    const inputCollection = document.getElementsByTagName("input");
    const inputList = Array.from(inputCollection);
    const textarea = document.getElementById("mensaje");
    const inputTel = document.getElementById("telefono");
    const formulario = document.getElementById("formulario");
    inputList.forEach((input) => {
        var _a;
        const divMensaje = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.lastElementChild;
        const validarInput = () => {
            if (input.type === "tel") {
                let valor = inputTel.value.replace(/\D/g, "").slice(0, 8);
                if (valor.length > 4) {
                    valor = valor.slice(0, 4) + "-" + valor.slice(4);
                }
                inputTel.value = valor;
            }
            if (!input.checkValidity()) {
                controlarClasses(input, ClasesInput.invalid, ClasesInput.valid);
                controlarClasses(divMensaje, ClasesMensaje.visible, ClasesMensaje.oculto);
            }
            else {
                controlarClasses(divMensaje, ClasesMensaje.oculto, ClasesMensaje.visible);
                controlarClasses(input, ClasesInput.valid, ClasesInput.invalid);
            }
        };
        input.addEventListener("input", validarInput);
        input.addEventListener("blur", validarInput);
    });
    textarea.addEventListener("blur", () => {
        validarTextarea(textarea);
    });
    textarea.addEventListener("input", () => {
        validarTextarea(textarea);
    });
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        formulario.reset();
        limpiarClasesInput(inputList, textarea);
        Swal.fire({
            icon: "success",
            titleText: "Formulario enviado con éxito",
            text: "Gracias por completar el formulario, pronto nos pondremos en contacto contigo",
            confirmButtonColor: "#f4623a",
            confirmButtonText: "Entendido",
        });
    });
    formulario.addEventListener("input", () => {
        const botonEnviar = document.getElementById("botonEnviar");
        if (formulario.checkValidity()) {
            botonEnviar.classList.remove("disabled");
            return;
        }
        botonEnviar.classList.add("disabled");
    });
})();
