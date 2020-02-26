
export const masks = (nome, valor) => {
  
  if (nome === 'cnpj') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 14)

    if (value.length < 6) {
      value = value.replace(/(\d{2})(\d{1,3})/, '$1.$2')
    }else if (value.length > 5 && value.length < 9) {
      value = value.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3')
    }else if (value.length > 8 && value.length < 13) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4')
    }
    else if (value.length > 12) {
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5')
    }

    return {
      nome,
      valor: value,
    }
  }else if (nome === 'cnh') {
    let value = valor
    value = value.replace(/\D/ig, '')
    value = value.slice(0, 8)

    if (value.length < 5) {
      value = value.replace(/(\d{2})(\d{1,2})/, '$1/$2')
    }
    if (value.length > 4) {
      value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3')
    }

    return {
      nome,
      valor: value,
    }
  }else if (nome === 'placa') {
    let value = valor
    value = value.slice(0, 8)
    value = value.slice(0, 3).replace(/[^A-Za-z]/ig, '').toUpperCase() + value.slice(3, 8).replace(/\D/ig, '')

    if (value.length > 3) {
      value = value.replace(/(\w{3})(\d{1,4})/, '$1-$2')
    }

    return {
      nome,
      valor: value,
    }
  } else if (nome === 'telefone') {
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
    } else if (nome === 'uf') {
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
