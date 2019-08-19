import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'

class GerenciarEntrada extends Component{
  render(){
    return(
      <div className='div-card-RPerda'>
        <div className='linhaTexto-RPerda'>
          <h1 className='h1-RPerda'>Relatório de perda</h1>
        </div>

        <div className='div-cabecalho-RPerda'>
          <div className='cel-produto-cabecalho-RPerda'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-RPerda'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-RPerda'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-RPerda'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-RPerda'></div>
        <div className='div-lines-RPerda'>
          <div className='cel-produto-cabecalho-RPerda'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-RPerda'>
            12
          </div>
          <div className='cel-usuario-cabecalho-RPerda'>
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