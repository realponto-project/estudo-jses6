import React, { Component } from 'react'
import './index.css'
import { Pagination, Spin } from 'antd'
import { stock } from '../../../../services/estoque'

class Estoque extends Component{

  state={
    loading: false,
    estoque:{
      rows: []
    },
  }

  getStock = async () => {

    this.setState({
      loading: true
    })

    await stock().then(
      resposta => this.setState({
        estoque: resposta.data,
      })
    )

    this.setState({
      loading: false
    })
  }

  componentDidMount = async () => {
    await this.getStock()
  }

  render(){
    console.log(this.state.estoque)
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
        </div>

        
        <div className=' div-separate-estoque'/>
            {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : 
          this.state.estoque.rows.map((line) =>
          <div className='div-100-estoque'>
          <div className='div-lines-estoque'
          //  onClick={() => this.openModalDetalhesCompany(line)}
           >
          <div className='cel-produto-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.name}
          </label>
          </div>
          <div className='cel-fabricante-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.manufacturer}
          </label>
          </div>
          <div className='cel-quant-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.amount}
          </label>
          </div>
          <div className='cel-estoque-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.stockBase}
          </label>
          </div>
        </div>
          <div className=' div-separate1-estoque'/>
        </div>
        )}

          <div className='footer-estoque'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default Estoque