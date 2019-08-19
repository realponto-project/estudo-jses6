import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'

class GerenciarEntrada extends Component{
  render(){
    return(
      <div className='div-card-RTec'>
        <div className='linhaTexto-RTec'>
          <h1 className='h1-RTec'>Relatório dos técnicos</h1>
        </div>

        <div className='div-cabecalho-RTec'>
          <div className='cel-produto-cabecalho-RTec'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-RTec'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-RTec'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-RTec'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-RTec'></div>
        <div className='div-lines-RTec'>
          <div className='cel-produto-cabecalho-RTec'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-RTec'>
            12
          </div>
          <div className='cel-usuario-cabecalho-RTec'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-RTec'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-RTec'></div>
          <div className='footer-RTec'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada