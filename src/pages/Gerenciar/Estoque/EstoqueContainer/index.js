import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'
import { stock } from '../../../../services/estoque'

class Estoque extends Component{

  state={
    estoque:[],
  }

  getStock = async () => {
    await stock().then(
      resposta => this.setState({
        estoque: resposta.data,
      })
    )
  }

  componentDidMount = async () => {
    await this.getStock()
  }

  render(){
    // console.log(this.state.estoque)
    return(
      <div className='div-card-estoque'>
        <div className='linhaTexto-estoque'>
          <h1 className='h1-estoque'>Gerenciar estoque</h1>
        </div>

        <div className='div-cabecalho-estoque'>
          <div className='cel-produto-cabecalho-estoque'>
            Produto
          </div>
          <div className='cel-fabricante-cabecalho-estoque'>
            Fabricante
          </div>
          <div className='cel-quant-cabecalho-estoque'>
            Qnt.
          </div>
          <div className='cel-estoque-cabecalho-estoque'>
            Estoque
          </div>
          <div className='cel-data-cabecalho-estoque'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-estoque'></div>
        <div className='div-lines-estoque'>
          <div className='cel-produto-cabecalho-estoque'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-fabricante-cabecalho-estoque'>
            TESTE
          </div>
          <div className='cel-quant-cabecalho-estoque'>
            12
          </div>
          <div className='cel-estoque-cabecalho-estoque'>
            NOVA REALPONTO
          </div>
          <div className='cel-data-cabecalho-estoque'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-estoque'></div>
          <div className='footer-estoque'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default Estoque