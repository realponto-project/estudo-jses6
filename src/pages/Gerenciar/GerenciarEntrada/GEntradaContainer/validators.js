export const validators = (nome, valor, state) => {
  const { fieldFalha, message } = state

  if (nome === 'nomeProduto') {
    if (valor === '') {
      message.nomeProduto = 'É obrigatório.'
      fieldFalha.nomeProduto = true
    } else fieldFalha.nomeProduto = false

    return {
      fieldFalha,
      message
    }
  }else if (nome === 'fornecedor') {
    if (valor === '') {
      message.fornecedor = 'É obrigatório.'
      fieldFalha.fornecedor = true
    } else fieldFalha.fornecedor = false

    return {
      fieldFalha,
      message
    }
  }
}