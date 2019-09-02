import React, { Component } from 'react'
import './index.css'
import { Pagination } from 'antd'
import { getRelatorioML } from '../../../../services/relatorioML';

class GerenciarEntrada extends Component{

  state={
    relatorioArray: [],
    loading: false,
  }

  getRelatorio = async () => {

    this.setState({
      loading: true
    })

    const query = {
      page: this.state.page,
      total: this.state.total,
    }

    await getRelatorioML(query).then(
      resposta => this.setState({
        relatorioArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
      })
    )

    this.setState({
      loading: false
    })
  }

  render(){
    return(
      <div className='div-card-RML'>
        <div className='linhaTexto-RML'>
          <h1 className='h1-RML'>Relatório das entradas</h1>
        </div>

        <div className='div-cabecalho-RML'>
          <div className='cel-codigo-cabecalho-RML'>
            Código
          </div>
          <div className='cel-nome-cabecalho-RML'>
            Nome
          </div>
          <div className='cel-cep-cabecalho-RML'>
            Cep
          </div>
          <div className='cel-data-cabecalho-RML'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-RML'></div>
        <div className='div-lines-RML'>
          <div className='cel-codigo-cabecalho-RML'>
            202020202020
          </div>
          <div className='cel-nome-cabecalho-RML'>
            bla bla bla LTDA.
          </div>
          <div className='cel-cep-cabecalho-RML'>
            09890-510
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