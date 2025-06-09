declare const Swal: any;

(() => {
  enum ClasesInput {
    invalid = "invalid__input",
    valid = "valid__input",
  }

  enum ClasesMensaje {
    oculto = "mensaje__oculto",
    visible = "mensaje__visible",
  }

  const controlarClasses = (
    elemento: HTMLElement | Element,
    claseAgregar: string,
    claseRemover: string,
  ) => {
    elemento.classList.remove(claseRemover);
    elemento.classList.add(claseAgregar);
  };

  const limpiarClasesInput = (
    listaInputs: HTMLInputElement[],
    textarea: HTMLTextAreaElement,
  ) => {
    listaInputs.forEach((input) => {
      input.classList.remove(ClasesInput.invalid, ClasesInput.valid);
    });

    textarea.classList.remove(ClasesInput.invalid, ClasesInput.valid);
  };

  const inputCollection: HTMLCollectionOf<HTMLInputElement> =
    document.getElementsByTagName("input");
  const inputList: HTMLInputElement[] = Array.from(inputCollection);
  const textarea = document.getElementById("mensaje") as HTMLTextAreaElement;
  const inputTel = document.getElementById("telefono") as HTMLTextAreaElement;
  const formulario = document.getElementById("formulario") as HTMLFormElement;

  inputList.forEach((input) => {
    const divMensaje = input.parentElement?.lastElementChild;

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
        controlarClasses(
          divMensaje!,
          ClasesMensaje.visible,
          ClasesMensaje.oculto,
        );
      } else {
        controlarClasses(
          divMensaje!,
          ClasesMensaje.oculto,
          ClasesMensaje.visible,
        );
        controlarClasses(input, ClasesInput.valid, ClasesInput.invalid);
      }
    };

    input.addEventListener("input", validarInput);

    input.addEventListener("blur", validarInput);
  });

  textarea.addEventListener("input", () => {
    const divMensaje = textarea.parentElement?.lastElementChild;

    if (!textarea.checkValidity()) {
      controlarClasses(textarea, ClasesInput.invalid, ClasesInput.valid);

      controlarClasses(
        divMensaje!,
        ClasesMensaje.visible,
        ClasesMensaje.oculto,
      );
      return;
    }
    controlarClasses(textarea, ClasesInput.valid, ClasesInput.invalid);

    controlarClasses(divMensaje!, ClasesMensaje.oculto, ClasesMensaje.visible);
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
    const botonEnviar = document.getElementById(
      "botonEnviar",
    ) as HTMLButtonElement;

    if (formulario.checkValidity()) {
      botonEnviar.classList.remove("disabled");
      return;
    }

    botonEnviar.classList.add("disabled");
  });
})();
