import * as cnpjLib from "@fnando/cnpj";
import * as cpfLib from "@fnando/cpf";

export const validator = (name, value, state) => {
  const { fieldFalha } = state;
  switch (name) {
    case "cnpj":
      if (!cnpjLib.isValid(value) && !cpfLib.isValid(value)) {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    case "razaoSocial":
      if (value === "") {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    default:
      return {
        fieldFalha
      };
  }
};

export const masks = (name, valor) => {
  let value = valor;

  switch (name) {
    case "cnpj":
      value = value.replace(/\D/gi, "");
      value = value.slice(0, 14);

      if (value.length > 2 && value.length <= 5) {
        value = value.replace(/(\d{2})(\d{3,})?/, "$1.$2");
      } else if (value.length > 5 && value.length <= 8) {
        value = value.replace(/(\d{2})(\d{3})(\d{3,})?/, "$1.$2.$3");
      } else if (value.length > 8 && value.length < 11) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4,})?/, "$1.$2.$3/$4");
      } else if (value.length === 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      } else if (value.length === 12) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4,})?/, "$1.$2.$3/$4");
      } else if (value.length > 12) {
        value = value.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2,})?/,
          "$1.$2.$3/$4-$5"
        );
      }

      return {
        name,
        value
      };
    case "serialNumberSearch":
      value = value.replace(/\W/gi, "");
      return {
        name,
        value
      };

    default:
      return {
        name,
        value
      };
  }
};
