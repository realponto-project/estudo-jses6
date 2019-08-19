import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'

class GerenciarEntrada extends Component{
  render(){
    return(
      <div className='div-card-Gentrada'>
        <div className='linhaTexto-Gentrada'>
          <h1 className='h1-Gentrada'>Gerenciar entrada</h1>
        </div>

        <div className='div-cabecalho-Gentrada'>
          <div className='cel-produto-cabecalho-Gentrada'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-Gentrada'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-Gentrada'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-Gentrada'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-Gentrada'></div>
        <div className='div-lines-Gentrada'>
          <div className='cel-produto-cabecalho-Gentrada'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-Gentrada'>
            12
          </div>
          <div className='cel-usuario-cabecalho-Gentrada'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-Gentrada'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-Gentrada'></div>
          <div className='footer-Gentrada'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada