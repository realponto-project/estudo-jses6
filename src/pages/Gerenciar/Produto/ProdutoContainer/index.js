import React, { Component } from 'react'
import './index.css'
import { Spin, Button } from 'antd'
import { getProdutos } from '../../../../services/produto';

class GerenciarProdutoDash extends Component {

  state = {
    loading: false,
    OsArray: {
      rows: []
    },
    produto: '',
    page: 1,
    total: 10,
    count: 0,
    show: 0,
  }

  changePages = (pages) => {
    this.setState({
      page: pages
    }, () => {
      this.getAllProdutos()
    }
    )
  }

  getAllProdutos = async () => {

    await this.setState({
      loading: true
    })

    const query = {
      filters: {
        product: {
          specific: {
            name: this.state.produto,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    }

    await getProdutos(query).then(
      resposta => this.setState({
        OsArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
      })
    )

    await this.setState({
      loading: false
    })
  }

  componentDidMount = async () => {
    await this.getAllProdutos()
  }

  Pages = () => (

    <div className='footer-Gentrada-button'>
      {Math.ceil(this.state.count / this.state.total) >= 5 && Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 4)}>{this.state.page - 4}</Button> : null}
      {Math.ceil(this.state.count / this.state.total) >= 4 && Math.ceil(this.state.count / this.state.total) - this.state.page < 2 && this.state.page > 3 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 3)}>{this.state.page - 3}</Button> : null}
      {this.state.page >= 3 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 2)}>{this.state.page - 2}</Button> : null}
      {this.state.page >= 2 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 1)}>{this.state.page - 1}</Button> : null}
      <div className='div-teste'>{this.state.page}</div>
      {this.state.page < (this.state.count / this.state.total) ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 1)}>{this.state.page + 1}</Button> : null}
      {this.state.page + 1 < (this.state.count / this.state.total) ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 2)}>{this.state.page + 2}</Button> : null}
      {this.state.page + 2 < (this.state.count / this.state.total) && this.state.page < 3 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 3)}>{this.state.page + 3}</Button> : null}
      {this.state.page + 3 < (this.state.count / this.state.total) && this.state.page < 2 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 4)}>{this.state.page + 4}</Button> : null}
    </div>
  )

  test = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return (
        this.state.OsArray.rows.map((line) =>
          <div className='div-100-Gentrada'>
            <div className='div-lines-Rtecnico' >
              <div className='cel-os-cabecalho-GCadastros'>
                {line.sku}
              </div>
              <div className='cel-rs-cabecalho-GCadastros'>
                {line.name}
              </div>
              <div className='cel-cnpj-cabecalho-GCadastros'>
                {line.category}
              </div>
              <div className='cel-data-cabecalho-GCadastros'>
                {line.mark}
              </div>
              <div className='cel-acoes-cabecalho-GCadastros'>
                {line.type}
              </div>
            </div>
            <div className=' div-separate1-Gentrada' />
          </div>
        ))
    } else {
      return (
        <div className='div-naotemnada'>Não há reservas para esse técnico</div>
      )
    }
  }

  render() {
    return (
      <div className='div-card-Rtecnico'>
        <div className='linhaTexto-Rtecnico'>
          <h1 className='h1-Rtecnico'>Gerenciar cadastros</h1>
        </div>
        <div className='div-cabecalho-GCadastros'>
          <div className='cel-os-cabecalho-GCadastros'>
            SKU
          </div>
          <div className='cel-rs-cabecalho-GCadastros'>
            Produto
          </div>
          <div className='cel-cnpj-cabecalho-GCadastros'>
            Categoria
          </div>
          <div className='cel-data-cabecalho-GCadastros'>
            Marca
          </div>
          <div className='cel-acoes-cabecalho-GCadastros'>
            Tipo
          </div>
        </div>

        <div className=' div-separate-Rtecnico' />
        {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.test()}
        <this.Pages />
      
      </div>
    )
  }
}

export default GerenciarProdutoDash