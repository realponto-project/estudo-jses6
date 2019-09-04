import React, { Component } from 'react'
import './index.css'
import { Pagination, Spin } from 'antd'
import { getRelatorioML } from '../../../../services/relatorioML';

class GerenciarEntrada extends Component {

  state = {
    lineSelected: {
      rows: []
    },
    mais: {},
    relatorioArray: {
      rows: []
    },
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    loading: false,
  }

  componentDidMount = async () => {
    await this.getRelatorio()
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


  mais = async (line) => {
    await this.setState({
      mais: {
        [line.id]: !this.state.mais[line.id],
      },
      lineSelected: {
        rows: [line],
      },
    })
  }


  test = () => {
    if (this.state.relatorioArray.rows.length !== 0) {
      return (
        this.state.relatorioArray.rows.map((line) =>
          <div className='div-100-Gentrada'>
            <div className='div-lines-RML'>
              <div className='cel-mais-cabecalho-Rtecnico'>
                <div className='button-mais' onClick={() => this.mais(line)}>+</div>
              </div>
              <div className='cel-codigo-cabecalho-RML'>
                {line.trackingCode}
              </div>
              <div className='cel-nome-cabecalho-RML'>
                {line.name}
              </div>
              <div className='cel-cep-cabecalho-RML'>
                {line.zipCode.replace(/(\d{5})(\d{3})?/, '$1-$2')}
              </div>
              <div className='cel-data-cabecalho-RML'>
                {line.createdAt}
              </div>
            </div>
            {this.state.mais[line.id] ? <div className='div-100-Rtecnico'>
              <div className='div-mais-Rtecnico'>
                <div className='div-normal-mais' >
                  <div className='div-produtos-mais'>Produtos</div>
                  <div className='div-quant-mais'>Quantidade</div>
                </div>
              </div>
              {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> :
                this.state.lineSelected.rows.map((line) =>
                  <div className='div-branco-mais'>
                    <div className='div-produtos-mais'>{line.products.map((valor => <div className='div-peca'>{valor.name}</div>))}</div>
                    <div className='div-quant-mais'>{line.products.map((valor => <div className='div-peca'>{valor.amount}</div>))}</div>
                  </div>)}
            </div> : null}
            <div className=' div-separate1-Gentrada' />
          </div>
        ))
    } else {
      return (
        <div className='div-naotemnada'>Não há nenhuma reserva finalizada até o momento</div>
      )
    }
  }

  render() {
    console.log(this.state.lineSelected)
    return (
      <div className='div-card-RML'>
        <div className='linhaTexto-RML'>
          <h1 className='h1-RML'>Relatório do Mercado Livre</h1>
        </div>

        <div className='div-cabecalho-RML'>
          <div className='cel-mais-cabecalho-Rtecnico'>
          </div>
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
        {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.test()}

        <div className='footer-RML'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    )
  }
}

export default GerenciarEntrada