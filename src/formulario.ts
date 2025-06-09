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

  const inputCollection: HTMLCollectionOf<HTMLInputElement> =
    document.getElementsByTagName("input");
  const inputList: HTMLInputElement[] = Array.from(inputCollection);
  const textarea = document.getElementById("mensaje") as HTMLTextAreaElement;
  const inputTel = document.getElementById("telefono") as HTMLTextAreaElement;
  const formulario = document.getElementById("formulario") as HTMLFormElement;

  inputList.forEach((input) => {
    input.addEventListener("blur", () => {
      const divMensaje = input.parentElement?.lastElementChild;

      if (!input.checkValidity()) {
        controlarClasses(input, ClasesInput.invalid, ClasesInput.valid);

        controlarClasses(
          divMensaje!,
          ClasesMensaje.visible,
          ClasesMensaje.oculto,
        );
        return;
      }

      controlarClasses(
        divMensaje!,
        ClasesMensaje.oculto,
        ClasesMensaje.visible,
      );

      controlarClasses(input, ClasesInput.valid, ClasesInput.invalid);
    });
  });

  textarea.addEventListener("blur", () => {
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

  inputTel.addEventListener("input", () => {
    let valor = inputTel.value.replace(/\D/g, "").slice(0, 8);

    if (valor.length > 4) {
      valor = valor.slice(0, 4) + "-" + valor.slice(4);
    }

    inputTel.value = valor;
  });

  formulario.addEventListener("change", () => {
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
