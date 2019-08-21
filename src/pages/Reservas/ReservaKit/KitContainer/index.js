import React, { Component } from 'react'
import './index.css'
import { Pagination, Button, Select, Input } from 'antd'
import { Redirect } from 'react-router-dom'

import { getTecnico } from '../../../../services/tecnico'


const { Option } = Select;

class ReservaKit extends Component {

  state = {
    avancado: false,
    produto: '',
    data: '',
    tecnicoArray: [],
    tecnico: 'Não selecionado',
    redirect: false,
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  getAllTecnico = async () => {

    await getTecnico().then(
      resposta => this.setState({
        tecnicoArray: resposta.data,
      })
    )
  }

  componentDidMount = async () => {
    await this.getAllTecnico()
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/logged/reservaKitAdd/add' />
    }
  }

  onChangeTecnico = (value) => {
    this.setState({
      tecnico: value
    })
  }

  render() {
    return (
      <div className='div-card-kit'>
        <div className='linhaTexto-kit'>
          <h1 className='h1-kit'>Kit do técnico</h1>
        </div>

          {this.state.avancado ?
            <div className='div-avancado-buttons-kit'>
              <div className='div-button-avancado-kit'>
              {this.renderRedirect()}
              <Button className='button' type='primary' onClick={this.avancado}>Ocultar</Button>
              <Button className='button' type='primary' onClick={this.setRedirect}>Gerenciar kit</Button>
               </div> 
               <div className='div-linha1-avancado-Rtecnico'>
          <div className='div-produto-Rtecnico'>
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

          <div className='div-data-kit'>
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

          <div className='div-fabricante-Rtecnico'>
          <div className='div-text-Rtecnico'>Técnico:</div>
          {this.state.tecnicoArray.length === 0 ? 
            <Select value='Nenhum tecnico cadastrado' style={{ width: '100%' }}></Select> : 
            <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}>{this.state.tecnicoArray.map((valor) => <Option value={valor.name}>{valor.name}</Option>)}</Select>}
          </div>
        </div></div> :
            <div className='div-avancado-buttons-kit'>
            <div className='div-button-avancado-kit'>
            {this.renderRedirect()}
              <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
              <Button className='button' type='primary' onClick={this.setRedirect}>Gerenciar kit</Button>
            </div>
            </div>}
        <div className='div-cabecalho-kit'>
          <div className='cel-produto-cabecalho-kit'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-kit'>
            Qnt.
          </div>
          <div className='cel-data-cabecalho-kit'>
            Data lançamento
          </div>
          <div className='cel-acoes-cabecalho-kit'>
            Ações
          </div>
        </div>


        <div className=' div-separate-kit'></div>
        <div className='div-lines-kit'>
          <div className='cel-produto-cabecalho-kit'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-kit'>
            12
          </div>
          <div className='cel-data-cabecalho-kit'>
            22/11/2001 14:30
          </div>
          <div className='cel-acoes-cabecalho-kit'>
            <Button className='button-remove-kit' type='primary'>Remover</Button>
          </div>
        </div>

        <div className=' div-separate-kit'></div>
        <div className='footer-kit'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    )
  }
}

export default ReservaKit