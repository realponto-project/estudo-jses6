import * as cnpjLib from "@fnando/cnpj";
import * as cpfLib from "@fnando/cpf";

export const masks = (nome, valor) => {
  
  if (nome === 'cnpj') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 14)

    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }
    else if (value.length === 14) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    }

    return {
      nome,
      valor: value,
    }
  } else if (nome === 'telphone') {
      let value = valor
      value = value.replace(/\D/ig, '')
      value = value.slice(0, 11)


      if (value.length > 2 && value.length <= 6) {
        value = value.replace(/(\d{2})(\d{4})?/, '($1) $2')
      }
      if (value.length > 6 && value.length < 11) {
        value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
      }
      if (value.length === 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3')
      }

      return {
        nome,
        valor: value,
      }
    }else if (nome === 'zipCode'){
      let value = valor
      value = value.replace(/\D/ig, '')
      value = value.slice(0, 8)


      if (value.length > 5) {
        value = value.replace(/(\d{5})(\d{3})?/, '$1-$2')
      }

      return {
        nome,
        valor: value,
      }
    } else if (nome === 'state') {
        let value = valor
        value = value.replace(/\W|\d/g, '')
        value = value.slice(0, 2)
        value = value.toUpperCase(0, 2)
  
        return {
          nome,
          valor: value,
        }
      } else if (nome === 'number') {
      let value = valor
      value = value.replace(/\D/ig, '')

      return {
        nome,
        valor: value,
      } 
    } else {
      return {
        nome,
        valor,
      }
    }
}

export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state
  
  if (nome === 'cnpj') {
    if (!cnpjLib.isValid(valor) && !cpfLib.isValid(valor)) {
      if (valor.length === 14) message.cnpj = 'Cpf inválido.'
      else if (valor.length === 18) message.cnpj = 'Cnpj inválido.'
      else message.cnpj = 'Número incompleto.'
      fieldFalha.cnpj = true
  
    } else {
      fieldFalha.cnpj = false
      message.cnpj = ''
    }
  
    return {
      fieldFalha,
      message
    }
  }else if (nome === 'razaoSocial') {
    if (valor === '') {
      message.razaoSocial = 'É obrigatório.'
      fieldFalha.razaoSocial = true
    } else fieldFalha.razaoSocial = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'zipCode') {
    if (valor === '') {
      message.zipCode = 'É obrigatório.'
      fieldFalha.zipCode = true
    } else fieldFalha.zipCode = false

    return {
      fieldFalha,
      message
    }
  } 
  else if (nome === 'nameContact'){
    if (valor === '') {
      message.nameContact = 'É obrigatório.'
      fieldFalha.nameContact = true
    } else fieldFalha.nameContact = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'email') {
    if (valor === '') {
      message.email = 'É obrigatório.'
      fieldFalha.email = true
    } else fieldFalha.email = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'telphone') {
    if (valor === '') {
      message.telphone = 'É obrigatório.'
      fieldFalha.telphone = true
    } else fieldFalha.telphone = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'state') {
    if (valor === '') {
      message.state = 'É obrigatório.'
      fieldFalha.state = true
    } else fieldFalha.state = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'city') {
    if (valor === '') {
      message.city = 'É obrigatório.'
      fieldFalha.city = true
    } else fieldFalha.city = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'neighborhood') {
    if (valor === '') {
      message.neighborhood = 'É obrigatório.'
      fieldFalha.neighborhood = true
    } else fieldFalha.neighborhood = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'street') {
    if (valor === '') {
      message.street = 'É obrigatório.'
      fieldFalha.street = true
    } else fieldFalha.street = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'number') {
    if (valor === '') {
      message.number = 'É obrigatório.'
      fieldFalha.number = true
    } else fieldFalha.number = false

    return {
      fieldFalha,
      message
    }
  }
}