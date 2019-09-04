export const masks = (nome, valor) => {
  
  if (nome === 'codigo') {
    let value = valor
    value = value.replace(/\W/ig, '')
    value = value.slice(0, 30)

    return {
      nome,
      valor: value,
    }
  }else {
    return {
      nome,
      valor,
    }
  }
}

export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state
  
  if (nome === 'item') {
    if (valor === '') {
      message.item = 'É obrigatório.'
      fieldFalha.item = true
    } else fieldFalha.item = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'mark') {
    if (valor === '') {
      message.mark = 'É obrigatório.'
      fieldFalha.mark = true
    } else fieldFalha.mark = false

    return {
      fieldFalha,
      message
    }
  }
  else if (nome === 'codigo'){
    if (valor === '') {
      message.codigo = 'É obrigatório.'
      fieldFalha.codigo = true
    } else fieldFalha.codigo = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'quantMin') {
    if (valor === '') {
      message.quantMin = 'É obrigatório.'
      fieldFalha.quantMin = true
    } else fieldFalha.quantMin = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'telefone') {
    if (valor === '') {
      message.telefone = 'É obrigatório.'
      fieldFalha.telefone = true
    } else fieldFalha.telefone = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'estado') {
    if (valor === '') {
      message.estado = 'É obrigatório.'
      fieldFalha.estado = true
    } else fieldFalha.estado = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'cidade') {
    if (valor === '') {
      message.cidade = 'É obrigatório.'
      fieldFalha.cidade = true
    } else fieldFalha.cidade = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'bairro') {
    if (valor === '') {
      message.bairro = 'É obrigatório.'
      fieldFalha.bairro = true
    } else fieldFalha.bairro = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'rua') {
    if (valor === '') {
      message.rua = 'É obrigatório.'
      fieldFalha.rua = true
    } else fieldFalha.rua = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'numero') {
    if (valor === '') {
      message.numero = 'É obrigatório.'
      fieldFalha.numero = true
    } else fieldFalha.numero = false

    return {
      fieldFalha,
      message
    }
  } else if (nome === 'newMarca') {
      if (valor === '') {
        message.newMarca = 'É obrigatório.'
        fieldFalha.newMarca = true
      } else fieldFalha.newMarca = false
  
      return {
        fieldFalha,
        message
      }
  }
}