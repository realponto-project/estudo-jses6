import React, { Component } from 'react'
import './index.css'
import { Pagination, Spin, Button, Input } from 'antd'
import { getEntrada } from '../../../../services/entrada';

class GerenciarEntrada extends Component{

  state={
    avancado: false,
    loading: false,
    usuario: '',
    produto: '',
    data: '',
    entrada:{
      rows: []
    },
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
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
    return(
      <div className='div-card-Gentrada'>
        <div className='linhaTexto-Gentrada'>
          <h1 className='h1-Gentrada'>Gerenciar entrada</h1>
        </div>

        {this.state.avancado ? 
        <div className='div-linha-avancado-Rtecnico'>
        <div className='div-ocultar-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
        </div>
        <div className='div-linha1-avancado-Rtecnico'>
          <div className='div-produto-Gentrada'>
          <div className='div-text-Os'>Produto:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='produto'
              value={this.state.produto}
              placeholder="Digite o nome do produto"
              onChange={this.onChange}
              allowClear
            />
          </div> 

          <div className='div-usuario-Gentrada'>
          <div className='div-text-Rtecnico'>Usuário:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='usuario'
              value={this.state.usuario}
              placeholder="Digite o usuário"
              onChange={this.onChange}
              allowClear
            />
          </div>

          <div className='div-data-Gentrada'>
          <div className='div-text-Rtecnico'>Data:</div>
          <Input
              className='input-100'
              style={{ width: '100%' }}
              name='data'
              value={this.state.data}
              placeholder="Digite a data"
              onChange={this.onChange}
              allowClear
            />
          </div>
        </div></div> : 
        <div className='div-avancado-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
        </div> }

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