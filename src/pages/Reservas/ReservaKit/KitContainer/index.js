import React, { Component } from 'react'
import './index.css'
import { Pagination, Button, Select } from 'antd'
import { Redirect } from 'react-router-dom'


const { Option } = Select;

class ReservaKit extends Component {

  state = {
    tecnico: 'TESTE',
    redirect: false,
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
            <Select value={this.state.tecnico} style={{ width: '50%' }} onChange={this.onChangeTecnico}>
              <Option value="TESTE">TESTE</Option>
              <Option value="TESTE1">TESTE1</Option>
              <Option value="TESTE2">TESTE2</Option>
              <Option value="TESTE3">TESTE3</Option>
            </Select>
          </div>
          <div className='div-button-kit'>
            {this.renderRedirect()}
            <Button className='button' type='primary'>Adicionar</Button>
            <Button className='button' type='primary' onClick={this.setRedirect}>Gerenciar kit</Button>
          </div>
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