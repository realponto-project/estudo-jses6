import React, { Component } from 'react'
import './index.css'
import { Pagination, DatePicker, Button, Input, Select } from 'antd'
import { getTecnico } from '../../../../services/tecnico'


const { Option } = Select;

class GerenciarEntrada extends Component {

  state = {
    avancado: false,
    os: '',
    rs: '',
    data: '',
    tecnico: 'Não selecionado',
    tecnicoArray: [],
    valueDate: {start: '2019/01/01'}
  }

  getAllTecnico = async () => {

    await getTecnico().then(
      resposta => this.setState({
        tecnicoArray: resposta.data,
      })
    )
  }

  onChangeTecnico = async (value) => {
    await this.setState({
      tecnico: value
    })
  }

  componentDidMount = async () => {
    await this.getAllTecnico()
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  searchDate = async(e) => {
    if( !e[0] || !e[1] ) return
    await this.setState({
      valueDate: {start: e[0]._d, end: e[1]._d},
    })
    // await this.getAllEntrada()
  }

  render() {
    return (
      <div className='div-card-ROs'>
        <div className='linhaTexto-ROs'>
          <h1 className='h1-ROs'>Relatório das Os</h1>
        </div>

        {this.state.avancado ?
          <div className='div-linha-avancado-Rtecnico'>
            <div className='div-ocultar-Rtecnico'>
              <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
            </div>
            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-Os-ROs'>
                <div className='div-text-Rtecnico'>Os:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='os'
                  value={this.state.os}
                  placeholder="Digite a Os"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-rs-ROs'>
                <div className='div-textRs-Os'>Razão social:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='rs'
                  value={this.state.rs}
                  placeholder="Digite o razão social"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>

            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-data-ROs'>
                <div className='div-text-Rtecnico'>Data:</div>
                <DatePicker.RangePicker
                  placeholder='Digite a data'
                  format='DD/MM/YYYY'
                  dropdownClassName='poucas'
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                    />
              </div>

              <div className='div-tecnico-ROs'>
                <div className='div-text-Rtecnico'>Técnico:</div>
                {this.state.tecnicoArray.length === 0 ?
                  <Select value='Nenhum tecnico cadastrado' style={{ width: '100%' }}></Select> :
                  <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}>{this.state.tecnicoArray.map((valor) => <Option value={valor.name}>{valor.name}</Option>)}</Select>}
              </div>
            </div>
          </div> :
        <div className='div-avancado-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
        </div> }

        <div className='div-cabecalho-ROs'>
          <div className='cel-Os-cabecalho-ROs'>
            Nº Os
          </div>
          <div className='cel-rs-cabecalho-ROs'>
            Razão social
          </div>
          <div className='cel-tecnico-cabecalho-ROs'>
            Técnico
          </div>
          <div className='cel-data-cabecalho-ROs'>
            Data atendimento
          </div>
        </div>


        <div className=' div-separate-ROs'></div>
        <div className='div-lines-ROs'>
          <div className='cel-Os-cabecalho-ROs'>
            123456
          </div>
          <div className='cel-rs-cabecalho-ROs'>
            bla bla bla LTDA
          </div>
          <div className='cel-tecnico-cabecalho-ROs'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-ROs'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-ROs'></div>
        <div className='footer-ROs'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    )
  }
}

export default GerenciarEntrada