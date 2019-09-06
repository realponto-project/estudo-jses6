import React, { Component } from 'react'
import './index.css'
import { DatePicker, Select, Button, Input, Spin } from 'antd'
import { getTecnico } from '../../../../services/tecnico'
import { getRelatorioPerda } from '../../../../services/realatorioPerda';


const { Option } = Select;

class GerenciarEntrada extends Component {

  state = {
    valueDate: {start: '2019/01/01'},    
    avancado: false,
    tecnicoArray: [],
    tecnico: '',
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
            action: 'perda',
            createdAt: this.state.valueDate,
          },
        },
        technician: {
          specific: {
            name: this.state.tecnico,
          },
        },
        product: {
          specific: {
            name: this.state.produto,
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

  changePages = (pages) => {
    this.setState({
      page: pages
    }, () => {
      this.getRelatorio()
    }
    )
  }

  onChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    })

    await this.getRelatorio()
  }

  searchDate = async(e) => {
    if( !e[0] || !e[1] ) return
    await this.setState({
      valueDate: {start: e[0]._d, end: e[1]._d},
    })
    await this.getRelatorio()
  }

  onChangeTecnico = (value) => {
    this.setState({
      tecnico: value
    }, this.getRelatorio)
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

  Pages = () => (
    <div className='footer-Gentrada100-button'>
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
                  <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}>
                    <Option value=''>TODOS</Option>
                    {this.state.tecnicoArray.map((valor) => <Option value={valor.name}>{valor.name}</Option>)}
                  </Select>}
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
        <div className='footer-ROs'>
          {/* <Pagination defaultCurrent={1} total={50} /> */}
          <this.Pages />
        </div>
      </div>
    )
  }
}

export default GerenciarEntrada