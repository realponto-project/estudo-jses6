import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'

class GerenciarEntrada extends Component{
  render(){
    return(
      <div className='div-card-RData'>
        <div className='linhaTexto-RData'>
          <h1 className='h1-RData'>Relatório por data</h1>
        </div>

        <div className='div-cabecalho-RData'>
          <div className='cel-produto-cabecalho-RData'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-RData'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-RData'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-RData'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-RData'></div>
        <div className='div-lines-RData'>
          <div className='cel-produto-cabecalho-RData'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-RData'>
            12
          </div>
          <div className='cel-usuario-cabecalho-RData'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-RData'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-RData'></div>
          <div className='footer-RData'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada