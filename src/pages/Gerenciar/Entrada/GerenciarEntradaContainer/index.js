import React, { Component } from 'react'
import './index.css'
import { Pagination, Spin } from 'antd'
import { getEntrada } from '../../../../services/entrada';

class GerenciarEntrada extends Component{

  state={
    loading: false,
    entrada:{
      rows: []
    },
  }

  getAllEntrada = async () => {

    this.setState({
      loading: true
    })

    await getEntrada().then(
      resposta => this.setState({
        entrada: resposta.data,
      })
    )

    this.setState({
      loading: false
    })
  }

  componentDidMount = async () => {
    await this.getAllEntrada()
  }


  render(){
    console.log(this.state.entrada)
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

        
        <div className=' div-separate-Gentrada'/>
            {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : 
          this.state.entrada.rows.map((line) =>
          <div className='div-100-Gentrada'>
          <div className='div-lines-Gentrada'
          //  onClick={() => this.openModalDetalhesCompany(line)}
           >
          <div className='cel-produto-cabecalho-Gentrada'>
          <label className='div-table-label-cel-Gentrada'>
            {line.name}
          </label>
          </div>
          <div className='cel-quant-cabecalho-Gentrada'>
          <label className='div-table-label-cel-Gentrada'>
            {line.amountAdded}
          </label>
          </div>
          <div className='cel-usuario-cabecalho-Gentrada'>
          <label className='div-table-label-cel-Gentrada'>
            {line.responsibleUser}
          </label>
          </div>
          <div className='cel-data-cabecalho-Gentrada'>
          <label className='div-table-label-cel-Gentrada'>
            {line.createdAt}
          </label>
          </div>
        </div>
          <div className=' div-separate1-Gentrada'/>
        </div>
        )}

          <div className='footer-Gentrada'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada