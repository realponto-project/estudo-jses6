import React, { Component } from 'react'
import './index.css'
import { Pagination, Button, Icon, Modal, Tooltip, Select } from 'antd'


const { Option } = Select;

class ReservaTecnico extends Component{

  state={
    modalDetalhes: false,
    lineSelected: {
      
    },
    tecnico: 'TESTE'
  }

  onChangeTecnico = (value) => {
    this.setState({
      tecnico: value
    })
  }
  
  openModalDetalhes = async (line) => {
    await this.setState({
      modalDetalhes: true,
      lineSelected: line
    })
  }

  handleOk = () => {
    this.setState({
      modalDetalhes: false,
    })
  }


  modalDetalhesLinha = () => (
    <Modal
      title="Detalhes do atendimento"
      visible={this.state.modalDetalhes}
      onOk={this.handleOk}
      onCancel={this.handleOk}
      okText='Salvar'
      cancelText='Cancelar'
    >
      <div className='div-textProdutos-Rtecnico'>Produtos atrelados</div>
    </Modal>
  )


  render(){
    return(
      <div className='div-card-Rtecnico'>
        <div className='linhaTexto-Rtecnico'>
          <h1 className='h1-Rtecnico'>Reservas técnico</h1>
        </div>

        <div className='div-linha-Rtecnico'>
          <div className='div-tecnico-Rtecnico'>
          <div className='div-text-Rtecnico'>Técnico:</div>
        <Select value={this.state.tecnico} style={{ width: '50%' }} onChange={this.onChangeTecnico}>
          <Option value="TESTE">TESTE</Option>
          <Option value="TESTE1">TESTE1</Option>
          <Option value="TESTE2">TESTE2</Option>
          <Option value="TESTE3">TESTE3</Option>
        </Select>
        </div>
        </div>

        <div className='div-cabecalho-Rtecnico'>
          <div className='cel-os-cabecalho-Rtecnico'>
            Nº Os
          </div>
          <div className='cel-rs-cabecalho-Rtecnico'>
            Razão Social
          </div>
          <div className='cel-cnpj-cabecalho-Rtecnico'>
            Cnpj
          </div>
          <div className='cel-data-cabecalho-Rtecnico'>
            Data do atendimento
          </div>
          <div className='cel-acoes-cabecalho-Rtecnico'>
            Ações
          </div>
        </div>

        
        <div className=' div-separate-Rtecnico'></div>
        <div className='div-lines-Rtecnico' >
          <div className='cel-os-cabecalho-Rtecnico'>
            3232
          </div>
          <div className='cel-rs-cabecalho-Rtecnico'>
            TESTE
          </div>
          <div className='cel-cnpj-cabecalho-Rtecnico'>
          07.308.959/0001-38
          </div>
          <div className='cel-data-cabecalho-Rtecnico'>
            20/11/2001
          </div>
          <div className='cel-acoes-cabecalho-Rtecnico'>
          <Tooltip placement="topLeft" title='Detalhes'>
            <Button type="primary" className='button-icon' onClick={this.openModalDetalhes}><Icon type="info-circle" /></Button>
          </Tooltip>
          <Tooltip placement="topLeft" title='Remover'>
            <Button type="primary" className='button-icon-remove'><Icon type="delete" /></Button>
          </Tooltip>
            <this.modalDetalhesLinha/>
          </div>
        </div>

        <div className=' div-separate-Rtecnico'></div>
          <div className='footer-Rtecnico'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default ReservaTecnico