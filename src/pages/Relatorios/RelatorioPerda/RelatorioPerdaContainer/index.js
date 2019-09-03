import React, { Component } from 'react'
import './index.css'
import { Pagination, DatePicker, Select, Button, Input, Spin } from 'antd'
import { getTecnico } from '../../../../services/tecnico'
import { getRelatorioPerda } from '../../../../services/realatorioPerda';


const { Option } = Select;

class GerenciarEntrada extends Component {

  state = {
    avancado: false,
    tecnicoArray: [],
    tecnico: 'Não selecionado',
    data: '',
    produto: '',
    relatorioArray: {
      rows: []
    },
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    loading: false,
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

    await this.getRelatorio()
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  getRelatorio = async () => {

    this.setState({
      loading: true
    })

    const query = {
      filters: {
        kitOut: {
          specific: {
            action: 'perda'
          }
        }
      },
      page: this.state.page,
      total: this.state.total,
    }

    await getRelatorioPerda(query).then(
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

  test = () => {
    if(this.state.relatorioArray.rows.length !== 0){
      return(
        this.state.relatorioArray.rows.map((line) =>
          <div className='div-100-Gentrada'>
            <div className=' div-separate-RPerda'></div>
            <div className='div-lines-RPerda'>
              <div className='cel-produto-cabecalho-RPerda'>
                {line.name}
              </div>
              <div className='cel-quant-cabecalho-RPerda'>
                {line.amount}
              </div>
              <div className='cel-usuario-cabecalho-RPerda'>
                {line.technician}
              </div>
              <div className='cel-data-cabecalho-Gentrada'>
                {line.createdAt}
              </div>
            </div>
          </div>
      ))
    }else{
      return(
        <div className='div-naotemnada'>Não há nenhuma perda até o momento</div>
      )
    }
  }

  render() {
    return (
      <div className='div-card-RPerda'>
        <div className='linhaTexto-RPerda'>
          <h1 className='h1-RPerda'>Relatório de perda</h1>
        </div>

        {this.state.avancado ?
          <div className='div-linha-avancado-Rtecnico'>
            <div className='div-ocultar-Rtecnico'>
              <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
            </div>
            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-produto-RPerda'>
                <div className='div-text-Os'>Produto:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='produto'
                  value={this.state.produto}
                  placeholder="Digite o produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-data-RPerda'>
                <div className='div-text-Rtecnico'>Data:</div>
                <DatePicker.RangePicker
                  placeholder='Digite a data'
                  format='DD/MM/YYYY'
                  dropdownClassName='poucas'
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>

              <div className='div-tecnico-RPerda'>
                <div className='div-text-Rtecnico'>Técnico:</div>
                {this.state.tecnicoArray.length === 0 ?
                  <Select value='Nenhum tecnico cadastrado' style={{ width: '100%' }}></Select> :
                  <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}>{this.state.tecnicoArray.map((valor) => <Option value={valor.name}>{valor.name}</Option>)}</Select>}
              </div>
            </div>
          </div> :
          <div className='div-avancado-Rtecnico'>
            <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
          </div>}

        <div className='div-cabecalho-RPerda'>
          <div className='cel-produto-cabecalho-RPerda'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-RPerda'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-RPerda'>
            Técnico
          </div>
          <div className='cel-data-cabecalho-RPerda'>
            Data lançamento
          </div>
        </div>
        
        {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading}/></div> : this.test()}

        <div className=' div-separate-Gentrada'></div>
        <div className='footer-Gentrada'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    )
  }
}

export default GerenciarEntrada