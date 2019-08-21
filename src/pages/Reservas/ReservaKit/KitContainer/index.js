import React, { Component } from 'react'
import './index.css'
import { Pagination, Button, Select } from 'antd'
import { Redirect } from 'react-router-dom'

import { getTecnico } from '../../../../services/tecnico'


const { Option } = Select;

class ReservaKit extends Component {

  state = {
    tecnicoArray:[],
    tecnico: 'Não selecionado',
    redirect: false,
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

        <div className='div-linha-kit'>
          <div className='div-tecnico-kit'>
            <div className='div-text-kit'>Técnico:</div>
            {this.state.tecnicoArray.length === 0 ?
            <Select value='Nenhum tecnico cadastrado' style={{ width: '100%' }}></Select> :
            <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}>
              {this.state.tecnicoArray.map((valor) => 
              <Option value={valor.name}>{valor.name}</Option>)}</Select>}
          </div>
            {this.renderRedirect()}
            <Button className='button' type='primary' onClick={this.setRedirect}>Gerenciar kit</Button>
        </div>
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