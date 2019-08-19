import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'

class GerenciarEntrada extends Component{
  render(){
    return(
      <div className='div-card-ROs'>
        <div className='linhaTexto-ROs'>
          <h1 className='h1-ROs'>Relatório das Os</h1>
        </div>

        <div className='div-cabecalho-ROs'>
          <div className='cel-produto-cabecalho-ROs'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-ROs'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-ROs'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-ROs'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-ROs'></div>
        <div className='div-lines-ROs'>
          <div className='cel-produto-cabecalho-ROs'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-ROs'>
            12
          </div>
          <div className='cel-usuario-cabecalho-ROs'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-ROs'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-ROs'></div>
          <div className='footer-ROs'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada