import React, { Component } from 'react'
import './index.css'
import { Pagination, DatePicker, Button, Input, Select, Spin } from 'antd'
import { getTecnico } from '../../../../services/tecnico'
import { getTodasOs } from '../../../../services/reservaOs';
import moment from 'moment';


const { Option } = Select;

class GerenciarEntrada extends Component {

  state = {
    avancado: false,
    os: '',
    rs: '',
    data: '',
    tecnico: 'Não selecionado',
    tecnicoArray: [],
    valueDate: { start: '2019/01/01' },
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    mais: {},
    OsArray: {
      rows: []
    },
  }

  getAllOs = async () => {

    this.setState({
      loading: true
    })

    const query = {
      filters: {
        os: {
          specific: {
            deletedAt: { start: '2019/01/01' }
          }
        }
      },
      order: {
        field: 'deletedAt',
        acendent: true
      },
      page: this.state.page,
      total: this.state.total,
      required: false,
      paranoid: false,
    }

    await getTodasOs(query).then(
      resposta => this.setState({
        OsArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
      })
    )

    this.setState({
      loading: false
    })
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
    await this.getAllOs()

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

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    })
    // await this.getAllEntrada()
  }

  formatDateFunct = (date) => {
    moment.locale('pt-br')
    const formatDate = moment(date).format('L')
    const formatHours = moment(date).format('LT')
    const dateformated = `${formatDate} ${formatHours}`
    return dateformated
  }

  mais = async (line) => {
    await this.setState({
      mais: {
        [line.id]: !this.state.mais[line.id],
      },
      lineSelected: {
        rows: [line],
      },
    })
  }

  test = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return (
        this.state.OsArray.rows.map((line) =>
          <div className='div-100-Gentrada'>
            <div className='div-lines-ROs'>
              <div className='cel-mais-cabecalho-ROs'>
                <div className='button-mais' onClick={() => this.mais(line)}>+</div>
              </div>
              <div className='cel-Os-cabecalho-ROs'>
                {line.id}
              </div>
              <div className='cel-rs-cabecalho-ROs'>
                {line.razaoSocial}
              </div>
              <div className='cel-tecnico-cabecalho-ROs'>
                {line.technician}
              </div>
              <div className='cel-data-cabecalho-ROs'>
                {line.formatedDate}
              </div>
            </div>
            {this.state.mais[line.id] ? <div className='div-100-Rtecnico'>
            <div className='div-mais-ROs'>
              <div className='div-normal-mais-ROs' >
                <div className='div-produtos-mais-ROs'>Produtos</div>
                <div className='div-amount-mais-ROs'>Reservado</div>
                <div className='div-missOut-mais-ROs'>Perca</div>
                <div className='div-output-mais-ROs'>Saída</div>
                <div className='div-return-mais-ROs'>Retorno</div>
              </div>
            </div>
            {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> :
              this.state.lineSelected.rows.map((line) =>
            <div className='div-branco-mais-ROs'>
            <div className='div-produtos-mais-ROs'>{line.products.map((valor => <div className='div-peca'>{valor.name}</div>))}</div>
            <div className='div-amount-mais-ROs'>{line.products.map((valor => <div className='div-peca'>{valor.amount}</div>))}</div>
            <div className='div-missOut-mais-ROs'>{line.products.map((valor => <div className='div-peca'>{valor.missOut}</div>))}</div>
            <div className='div-output-mais-ROs'>{line.products.map((valor => <div className='div-peca'>{valor.output}</div>))}</div>
            <div className='div-return-mais-ROs'>{line.products.map((valor => <div className='div-peca'>{valor.return}</div>))}</div>
            </div>)}
          </div> : null}
            <div className=' div-separate1-Gentrada' />
          </div>)
      )
    }else{
      return(
        <div className='div-naotemnada'>Não há nenhuma reserva finalizada</div>
      )
    }
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
          </div>}

        <div className='div-cabecalho-ROs'>
          <div className='cel-mais-cabecalho-ROs'></div>
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
        {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.test()}

        <div className='footer-ROs'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    )
  }
}

export default GerenciarEntrada