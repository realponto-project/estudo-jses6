import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'

class GerenciarEntrada extends Component{
  render(){
    return(
      <div className='div-card-RML'>
        <div className='linhaTexto-RML'>
          <h1 className='h1-RML'>Relatório das entradas</h1>
        </div>

        <div className='div-cabecalho-RML'>
          <div className='cel-produto-cabecalho-RML'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-RML'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-RML'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-RML'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-RML'></div>
        <div className='div-lines-RML'>
          <div className='cel-produto-cabecalho-RML'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-RML'>
            12
          </div>
          <div className='cel-usuario-cabecalho-RML'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-RML'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-RML'></div>
          <div className='footer-RML'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada