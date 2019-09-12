import * as R from 'ramda'
import React, { Component } from 'react'
import './index.css'
import { Button, Icon, Modal, Tooltip, Input, Spin, InputNumber, DatePicker, Select, message } from 'antd'
import { connect } from 'react-redux'

import { getTecnico } from '../../../../services/tecnico'
import { getTodasOs, baixaReservaOs, removeReservaOs } from '../../../../services/reservaOs';

const { TextArea } = Input;
const { Option } = Select;

class ReservaTecnico extends Component {

  state = {
    idLine: '',
    numeroSerieTest: '',
    valueDate: { start: '2019/01/01' },
    avancado: false,
    loading: false,
    OsArray: {
      rows: []
    },
    produtoSelecionado: {
      products: {}
    },
    mais: {},
    quantModal: NaN,
    teste: NaN,
    tecnicoArray: [],
    modalDetalhes: false,
    modalRemove: false,
    Os: '',
    razaoSocial: '',
    cnpj: '',
    data: '',
    lineSelected: {
      rows: []
    },
    tecnico: 'Não selecionado',
    page: 1,
    total: 10,
    count: 0,
    show: 0,
  }

  errorNumeroSerie = () => {
    message.error('Este equipamento ja foi registrado');
  };

  filter = async (e) => {

    await this.setState({
      numeroSerieTest: e.target.value
    })

    const teste = this.state.numeroSerieTest.split(/\n/)

    if (/\n/.test(this.state.numeroSerieTest[this.state.numeroSerieTest.length - 1])) {

      let count = 0

      // eslint-disable-next-line array-callback-return
      teste.map((valor) => {
        if (valor === teste[teste.length - 2]) count++
      })

      if (count > 1) {

        this.errorNumeroSerie()

        teste.splice(teste.length - 2, 1)

        const testeArray = teste.toString()

        this.setState({
          numeroSerieTest: testeArray.replace(/,/ig, '\n')
        })
      }
    }
  }

  changePages = (pages) => {
    this.setState({
      page: pages
    }, () => {
      this.getAllOs()
    }
    )
  }

  getAllTecnico = async () => {

    await getTecnico().then(
      resposta => this.setState({
        tecnicoArray: resposta.data,
      })
    )
  }

  copy = async (acessorio) => {
    await this.setState({
      numeroSerieTest: this.state.numeroSerieTest ? `${this.state.numeroSerieTest}\n${acessorio}` : acessorio,
    })

    const teste = this.state.numeroSerieTest.split(/\n/)

    await this.setState({
      teste: teste.length
    })

    let count = 0

    // eslint-disable-next-line array-callback-return
    teste.map((valor) => {
      if (valor === teste[teste.length - 1]) count++
    })

    if (count > 1) {

      this.errorNumeroSerie()

      teste.splice(teste.length - 1, 1)

      const testeArray = teste.toString()

      await this.setState({
        numeroSerieTest: testeArray.replace(/,/ig, '\n'),
        teste: teste.length
      })
    }else{
      await this.setState({
        produtoSelecionado: {
          products:{
            ...this.state.produtoSelecionado.products,
            serialNumbers: this.state.produtoSelecionado.products.serialNumbers.filter((serial)=> serial.serialNumber !== acessorio.toString())
          }
        }
      }, console.log(acessorio, this.state.produtoSelecionado.products.serialNumbers, this.state.produtoSelecionado.products.serialNumbers.filter((serial)=> serial.serialNumber !== acessorio.toString())))
    }
  }

  getAllOs = async () => {

    this.setState({
      loading: true
    })
    parseInt(this.state.Os, 10)
    const query = {
      filters: {
        technician: {
          specific: {
            name: this.state.tecnico,
          },
        },
        os: {
          specific: {
            os: this.state.Os,
            razaoSocial: this.state.razaoSocial,
            cnpj: this.state.cnpj,
            date: this.state.valueDate,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
      required: true,
      paranoid: true,
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

  removeOs = async () => {

    const query = {
      osId: this.state.idLine
    }

    await removeReservaOs(query)

    await this.getAllOsSemLoading()

    await this.setState({
      modalRemove: false,
      idLine: '',
    })
  }

  removerLinha = (line) => {
    this.setState({
      modalRemove: true,
      idLine: line
    })
  }


  getAllOsSemLoading = async () => {

    const query = {
      filters: {
        technician: {
          specific: {
            name: this.state.tecnico,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
      required: true,
      paranoid: true,
    }

    await getTodasOs(query).then(
      resposta => this.setState({
        OsArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
      })
    )
  }

  searchDate = async (e) => {
    if (!e[0] || !e[1]) return
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d },
    })
    await this.getAllOs()
  }

  onChangeModal = (value) => {
    this.setState({
      teste: value
    })
  }

  retornar = async () => {
    const menos = this.state.produtoSelecionado.products.quantMax - this.state.teste

    this.setState({
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          quantMax: menos,
          return: parseInt(this.state.produtoSelecionado.products.return, 10) + this.state.teste
        }
      },
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.id,
      add: {
        return: this.state.teste,
      },
      serialNumberArray: this.state.numeroSerieTest.length > 0 ? this.state.numeroSerieTest.split(/\n/).filter((item) => item ? item : null ) : null,
    }

    const resposta = await baixaReservaOs(value)

    if (resposta.status === 200) {

      this.setState({
        teste: menos,
      })
    }


    // eslint-disable-next-line array-callback-return
    const x = this.state.OsArray.rows.filter((item) => {
      if (item.id === R.keys(this.state.mais)[0]) {
        return item
      }
    })

    await this.setState({
      lineSelected: {
        rows: x
      },
      teste: 0,
      numeroSerieTest: '',
    },  await this.getAllOsSemLoading())
  }

  perda = async () => {
    const menos = this.state.produtoSelecionado.products.quantMax - this.state.teste

    this.setState({
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          quantMax: menos,
          missOut: parseInt(this.state.produtoSelecionado.products.missOut, 10) + this.state.teste
        }
      },
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.id,
      add: {
        missOut: this.state.teste
      },
      serialNumberArray: this.state.numeroSerieTest.length > 0 ? this.state.numeroSerieTest.split(/\n/).filter((item) => item ? item : null ) : null,

    }

    const resposta = await baixaReservaOs(value)

    if (resposta.status === 200) {

      this.setState({
        teste: menos,
      }, await this.getAllOsSemLoading())
    }


    // eslint-disable-next-line array-callback-return
    const x = this.state.OsArray.rows.filter((item) => {
      if (item.id === R.keys(this.state.mais)[0]) {
        return item
      }
    })

    await this.setState({
      lineSelected: {
        rows: x
      },
      teste: 0,
      numeroSerieTest: '',
    }, await this.getAllOsSemLoading())
  }

  liberar = async () => {
    const menos = this.state.produtoSelecionado.products.quantMax - this.state.teste

    this.setState({
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          quantMax: menos,
          output: parseInt(this.state.produtoSelecionado.products.output, 10) + this.state.teste
        }
      },
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.id,
      add: {
        output: this.state.teste
      },
      serialNumberArray: this.state.numeroSerieTest.length > 0 ? this.state.numeroSerieTest.split(/\n/).filter((item) => item ? item : null ) : null,
    }

    const resposta = await baixaReservaOs(value)

    if (resposta.status === 200) {

      this.setState({
        teste: 0,
        numeroSerieTest: '',
      }, await this.getAllOsSemLoading())
    }


    // eslint-disable-next-line array-callback-return
    const x = this.state.OsArray.rows.filter((item) => {
      if (item.id === R.keys(this.state.mais)[0]) {
        return item
      }
    })

    await this.setState({
      lineSelected: {
        rows: x
      },
    })
    await this.getAllOsSemLoading()
  }

  onChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    })

    await this.getAllOs()
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  componentDidMount = async () => {
    await this.getAllTecnico()

    await this.setState({
      tecnico: ''
    })

    await this.getAllOs()
  }

  onChangeSelect = async (value) => {
    await this.setState({
      tecnico: value
    })
  }

  onChangeTecnico = (value) => {
    this.setState({
      tecnico: value
    }, this.getAllOs)
  }

  handleOkModalPeca = async () => {
    await this.setState({
      modalDetalhes: false,
      produtoSelecionado: {
        products: {}
      },
      teste: NaN,
      mais: {},
      lineSelected: {
        rows: [],
      },
      numeroSerieTest: '',
    })
  }

  openModalDetalhes = async (valor) => {
    await this.setState({
      modalDetalhes: true,
      produtoSelecionado: {
        products: valor
      },
      total: this.state.produtoSelecionado.products.quantMax,
    })

    await this.setState({
      teste: this.state.produtoSelecionado.products.serial ? 0 : this.state.produtoSelecionado.products.quantMax,
    })
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

  handleOk = () => {
    this.setState({
      modalDetalhes: false,
      modalRemove: false,
    })
  }


  modalDetalhesLinha = () => (
    <Modal
      title="Detalhes do atendimento"
      visible={this.state.modalDetalhes}
      onOk={this.handleOkModalPeca}
      onCancel={this.handleOkModalPeca}
      okText='OK'
      cancelText='Fechar'
    >
      <div className='div-textProdutos-Rtecnico'>Produtos reservados</div>
      <div className='div-body-modal'>
        <div className='div-text-modal'>
          <div className='div-produtos-modal'>Produtos</div>
          <div className='div-quant-modal'>Quant.</div>
          <div className='div-acoes-modal'>Ações</div>
        </div>
        <div className='div-separate-modal' />
        <div className='div-text-modal'>
          <div className='div-produtos-modal'>{this.state.produtoSelecionado.products.name}</div>
          <div className='div-quant-modal'>
            <InputNumber 
            disabled={this.state.produtoSelecionado.products.serial}
            max={this.state.produtoSelecionado.products.quantMax} 
            defaultValue={this.state.teste} 
            style={{ width: '90%' }} 
            value={this.state.teste} 
            onChange={this.onChangeModal}
            /></div>
          <div className='div-acoes-modal'>
            <Tooltip placement="top" title='Retornar' >
              <Button type='primary' className='button' onClick={this.retornar} ><Icon type="arrow-left" /></Button>
            </Tooltip>
            <Tooltip placement="top" title='Liberar' >
              <Button type='primary' className='button-liberar' onClick={this.liberar}><Icon type="arrow-right" /></Button>
            </Tooltip>
            <Tooltip placement="top" title='Perda' >
              <Button type='primary' className='button-remove-entrada' onClick={this.perda}><Icon type="alert" /></Button>
            </Tooltip>
          </div>
        </div>
        {this.state.produtoSelecionado.products.serial ? 
        <div className='div-text-modal'>
        <div className='div-numSerie-modal'>
        {this.state.produtoSelecionado.products.serialNumbers.map((valor) => 
        <div onClick={() => {this.copy(valor.serialNumber)}}>{valor.serialNumber}</div>)}
        </div>
        <div className='div-serie-modal'>
        <TextArea
          className='input-100'
          placeholder="Selecione o número de serie"
          autosize={{ minRows: 2, maxRows: 2 }}
          rows={4}
          name='numeroSerieTest'
          value={this.state.numeroSerieTest}
          onChange={this.filter}
          readOnly
        />
        </div>
        </div> :  null}
        <div className='div-total-modal'>
          <div className='div-baixo'>Total:</div>
          <div className='div-baixo'>Retornados:</div>
          <div className='div-baixo'>Liberados:</div>
          <div className='div-baixo'>Perdas:</div>
        </div>
        <div className='div-total-modal2'>
          <div className='div-baixo2'>{this.state.produtoSelecionado.products.amount}</div>
          <div className='div-baixo2'>{this.state.produtoSelecionado.products.return}</div>
          <div className='div-baixo2'>{this.state.produtoSelecionado.products.output}</div>
          <div className='div-baixo2'>{this.state.produtoSelecionado.products.missOut}</div>
        </div>
      </div>
    </Modal>
  )


  modalRemover = () => (
    <Modal
      title="Confirmação"
      visible={this.state.modalRemove}
      onOk={this.removeOs}
      onCancel={this.handleOk}
      okText='Continuar'
      cancelText='Cancelar'
    >
      <div className='div-textProdutos-Rtecnico'>Todos as reservas voltarão para o estoque, deseja continuar?</div>
    </Modal>
  )

  Pages = () => (

    <div className='footer-Gentrada-button'>
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

  test = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return (
        this.state.OsArray.rows.map((line) =>
          <div className='div-100-Gentrada'>
            <div className='div-lines-Rtecnico' >
              <div className='cel-mais-cabecalho-Rtecnico'>
                <div className='button-mais' onClick={() => this.mais(line)}>+</div>
              </div>
              <div className='cel-os-cabecalho-Rtecnico'>
                {line.os}
              </div>
              <div className='cel-rs-cabecalho-Rtecnico'>
                {line.razaoSocial}
              </div>
              <div className='cel-cnpj-cabecalho-Rtecnico'>
                {line.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
              </div>
              <div className='cel-data-cabecalho-Rtecnico'>
                {line.formatedDate}
              </div>
              <div className='cel-acoes-cabecalho-Rtecnico'>
                {this.props.auth.delROs && !line.notDelet ?
                  <Tooltip placement="topLeft" title='Remover'>
                    <Button type="primary" className='button-icon-remove' onClick={() => this.removerLinha(line.id)}><Icon type="delete" /></Button>
                  </Tooltip>
                  :
                  <Button type="primary" disabled className='button-disabled'><Icon type="stop" /></Button>}
                <this.modalDetalhesLinha />
                <this.modalRemover />
              </div>
            </div>
            {this.state.mais[line.id] ? <div className='div-100-Rtecnico'>
              <div className='div-mais-Rtecnico'>
                <div className='div-normal-mais' >
                  <div className='div-produtos-mais'>Produtos</div>
                  <div className='div-quant-mais'>Quantidade</div>
                </div>
              </div>
              {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> :
                this.state.lineSelected.rows.map((line) =>
                  <div className='div-branco-mais'>
                    <div className='div-produtos-mais'>
                      {line.products.map((valor => <div className='div-peca' onClick={this.props.auth.addOutPut ? () => this.openModalDetalhes(valor) : null}>{valor.name}</div>))}
                    </div>
                    <div className='div-quant-mais'>
                      {line.products.map((valor => <div className='div-peca' onClick={this.props.auth.addOutPut ? () => this.openModalDetalhes(valor) : null}>{valor.quantMax}</div>))}
                    </div>
                  </div>)}
            </div> : null}
            <div className=' div-separate1-Gentrada' />
          </div>
        ))
    } else {
      return (
        <div className='div-naotemnada'>Não há reservas para esse técnico</div>
      )
    }
  }

  render() {
    return (
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
                  placeholder="Digite o Nº Os"
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
            </div>

            <div className='div-linha1-avancado-Rtecnico'>
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
                <DatePicker.RangePicker
                  placeholder='Digite a data'
                  format='DD/MM/YYYY'
                  dropdownClassName='poucas'
                  onChange={this.searchDate}
                  onOk={this.searchDate}
                />
              </div>

              <div className='div-tecnico-Rtec'>
                <div className='div-text-Rtecnico'>Técnico:</div>
                {this.state.tecnicoArray.length === 0 ?
                  <Select value='Nenhum tecnico cadastrado' style={{ width: '100%' }}></Select> :
                  <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}><Option value=''>TODOS</Option>{this.state.tecnicoArray.map((valor) => <Option value={valor.name}>{valor.name}</Option>)}</Select>}
              </div>
            </div></div> :
          <div className='div-avancado-Rtecnico'>
            <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
          </div>}

        <div className='div-cabecalho-Rtecnico'>
          <div className='cel-mais-cabecalho-Rtecnico'>
          </div>
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


        <div className=' div-separate-Rtecnico' />
        {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.test()}
        <this.Pages />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(ReservaTecnico)