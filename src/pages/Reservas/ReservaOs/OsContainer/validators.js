import * as cnpjLib from "@fnando/cnpj";

export const masks = (nome, valor) => {
  if (nome === "cnpj") {
    let value = valor;
    value = value.replace(/\D/gi, "");
    value = value.slice(0, 14);

    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (value.length === 14) {
      value = value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }

    return {
      nome,
      valor: value
    };
  } else if (nome === "data") {
    let value = valor;
    value = value.replace(/\D/gi, "");

    return {
      nome,
      valor: value
    };
  } else if (nome === "serialNumber") {
    let value = valor;
    value = value.replace(/\D/gi, "");

    return {
      nome,
      valor: value
    };
  } else if (nome === "Os") {
    let value = valor;
    value = value.replace(/\D/gi, "");

    return {
      nome,
      valor: value
    };
  } else {
    return {
      nome,
      valor
    };
  }
};

export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state;

  if (nome === "cnpj") {
    if (!cnpjLib.isValid(valor)) {
      if (valor.length === 18) message.cnpj = "Cnpj inválido.";
      else message.cnpj = "Número incompleto.";
      fieldFalha.cnpj = true;
    } else {
      fieldFalha.cnpj = false;
      message.cnpj = "";
    }

    return {
      fieldFalha,
      message
    };
  } else if (nome === "Os") {
    if (valor === "") {
      message.Os = "É obrigatório.";
      fieldFalha.Os = true;
    } else fieldFalha.Os = false;

    return {
      fieldFalha,
      message
    };
  } else if (nome === "razaoSocial") {
    if (valor === "") {
      message.razaoSocial = "É obrigatório.";
      fieldFalha.razaoSocial = true;
    } else fieldFalha.razaoSocial = false;

    return {
      fieldFalha,
      message
    };
  } else if (nome === "estado") {
    if (valor === "") {
      message.estado = "É obrigatório.";
      fieldFalha.estado = true;
    } else fieldFalha.estado = false;

    return {
      fieldFalha,
      message
    };
  } else if (nome === "cidade") {
    if (valor === "") {
      message.cidade = "É obrigatório.";
      fieldFalha.cidade = true;
    } else fieldFalha.cidade = false;

    return {
      fieldFalha,
      message
    };
  } else if (nome === "bairro") {
    if (valor === "") {
      message.bairro = "É obrigatório.";
      fieldFalha.bairro = true;
    } else fieldFalha.bairro = false;

    return {
      fieldFalha,
      message
    };
  } else if (nome === "rua") {
    if (valor === "") {
      message.rua = "É obrigatório.";
      fieldFalha.rua = true;
    } else fieldFalha.rua = false;

    return {
      fieldFalha,
      message
    };
  } else if (nome === "numero") {
    if (valor === "") {
      message.numero = "É obrigatório.";
      fieldFalha.numero = true;
    } else fieldFalha.numero = false;

    return {
      fieldFalha,
      message
    };
  } else {
    return {
      fieldFalha,
      message
    };
  }
};
