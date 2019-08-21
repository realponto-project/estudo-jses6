import React, { Component } from 'react'
import './index.css'
import { Pagination, Button, Icon, Modal, Tooltip, Input } from 'antd'

import { getTecnico } from '../../../../services/tecnico'

class ReservaTecnico extends Component{

  state={
    avancado: false,
    loading: false,
    tecnicoArray:[],
    modalDetalhes: false,
    Os: '',
    razaoSocial: '',
    cnpj: '',
    data: '',
    lineSelected: {},
    tecnico: 'Não selecionado'
  }

  getAllTecnico = async () => {

    await getTecnico().then(
      resposta => this.setState({
        tecnicoArray: resposta.data,
      })
    )
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

  componentDidMount = async () => {
    await this.getAllTecnico()
  }

  onChangeSelect = async (value) => {
    await this.setState({
      tecnico: value
    })
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

        {this.state.avancado ? 
        <div className='div-linha-avancado-Rtecnico'>
        <div className='div-ocultar-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
        </div>
        <div className='div-linha1-avancado-Rtecnico'>
          <div className='div-Os-Rtecnico'>
          <div className='div-text-Os'>Os:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='Os'
              value={this.state.Os}
              placeholder="12"
              onChange={this.onChange}
              allowClear
            />
          </div> 

          <div className='div-rs-Rtecnico'>
          <div className='div-textRs-Rtecnico'>Razão social:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='razaoSocial'
              value={this.state.razaoSocial}
              placeholder="Digite a razão social"
              onChange={this.onChange}
              allowClear
            />
          </div>

          <div className='div-cnpj-Rtecnico'>
          <div className='div-text-Rtecnico'>Cnpj:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='cnpj'
              value={this.state.cnpj}
              placeholder="Digite o cnpj"
              onChange={this.onChange}
              allowClear
            />
          </div>

          <div className='div-data-Rtecnico'>
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