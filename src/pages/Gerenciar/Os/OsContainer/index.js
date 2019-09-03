import * as R from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.css'
import { Button, Icon, Modal, Tooltip, Input, Spin } from 'antd'
import { Redirect } from 'react-router-dom'

import { getTodasOs, baixaReservaOs, removeReservaOs } from '../../../../services/reservaOs'
import { redirectValueOs } from '../OsRedux/action'

class OsDash extends Component {

  state = {
    redirect: false,
    avancado: false,
    loading: false,
    OsArray: {
      rows:[]
    },
    produtoSelecionado: {
      products:{}
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
      rows:[]
    },
    tecnico: 'Não selecionado',
    page: 1,
    total: 10,
    count: 0,
    show: 0,
  }

  redirectSearchOs = async () => {
    const value = {
      Os: this.state.lineSelected.rows[0].id,
      razaoSocial: this.state.lineSelected.rows[0].razaoSocial,
      cnpj: this.state.lineSelected.rows[0].cnpj,
      technician: this.state.lineSelected.rows[0].technician,
      technicianId: this.state.lineSelected.rows[0].technicianId,
      date: this.state.lineSelected.rows[0].date,
      products: this.state.lineSelected.rows[0].products,
    }
    
    await this.props.redirectValueOs(value)

    await this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect exact to='/logged/searchOs/dash' />
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

  removerLinha = () => {
    this.setState({
      modalRemove: true
    })
  }

  getAllOs = async () => {

    this.setState({
      loading: true
    })

    const query = {
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
      }, console.log(resposta))
    )

    this.setState({
      loading: false
    })
  }

  removeOs = async (line) => {

    const query = {
      osId: line
    }

    await removeReservaOs(query)

    await this.getAllOsSemLoading()
  }

  getAllOsSemLoading = async () => {

    const query = {
      page: this.state.page,
      total: this.state.total,
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

  onChangeModal = (value) => {
    this.setState({
      teste: value
    })
  }

  retornar = async () => {
    const menos = this.state.produtoSelecionado.products.quantMax - this.state.teste

    this.setState({
      produtoSelecionado:{
        products:{
          ...this.state.produtoSelecionado.products,
          quantMax: menos,
          return: parseInt(this.state.produtoSelecionado.products.return, 10) + this.state.teste
        }
      },
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.osPartsId,
      add:{
        return: this.state.teste
      }
    }

    const resposta = await baixaReservaOs(value)

    console.log(resposta)

    if (resposta.status === 200) {

      this.setState({
        teste: menos,
      })
    }

    await this.getAllOsSemLoading()

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
  }

  perda = async () => {
    const menos = this.state.produtoSelecionado.products.quantMax - this.state.teste

    this.setState({
      produtoSelecionado:{
        products:{
          ...this.state.produtoSelecionado.products,
          quantMax: menos,
          missOut: parseInt(this.state.produtoSelecionado.products.missOut, 10) + this.state.teste
        }
      },
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.osPartsId,
      add:{
        missOut: this.state.teste
      }
    }

    const resposta = await baixaReservaOs(value)

    console.log(resposta)

    if (resposta.status === 200) {

      this.setState({
        teste: menos,
      })
    }

    await this.getAllOsSemLoading()

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
  }

  liberar = async () => {
    const menos = this.state.produtoSelecionado.products.quantMax - this.state.teste

    this.setState({
      produtoSelecionado:{
        products:{
          ...this.state.produtoSelecionado.products,
          quantMax: menos,
          output: parseInt(this.state.produtoSelecionado.products.output, 10) + this.state.teste
        }
      },
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.osPartsId,
      add:{
        output: this.state.teste
      }
    }

    const resposta = await baixaReservaOs(value)

    console.log(resposta)

    if (resposta.status === 200) {

      this.setState({
        teste: menos,
      })
    }

    await this.getAllOsSemLoading()

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
    })
  }

  handleOkModalPeca = async () => {
    await this.setState({
      modalDetalhes: false,
      produtoSelecionado: {
        products: {}
      },
      teste: NaN,
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

  modalRemover = () => (
    <Modal
      title="Confirmação"
      visible={this.state.modalRemove}
      onOk={this.handleOk}
      onCancel={this.handleOk}
      okText='Continuar'
      cancelText='Cancelar'
    >
      <div className='div-textProdutos-GOs'>Todos as reservas voltarão para o estoque, deseja continuar?</div>
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


  render() {
    console.log(this.state)
    return (
      <div className='div-card-GOs'>
        <div className='linhaTexto-GOs'>
          <h1 className='h1-GOs'>Gerenciar Os</h1>
        </div>

        {this.state.avancado ?
          <div className='div-linha-avancado-GOs'>
            <div className='div-ocultar-GOs'>
              <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
            </div>
            <div className='div-linha1-avancado-GOs'>
              <div className='div-Os-GOs'>
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

              <div className='div-rs-GOs'>
                <div className='div-textRs-GOs'>Razão social:</div>
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

              <div className='div-cnpj-GOs'>
                <div className='div-text-GOs'>Cnpj:</div>
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

              <div className='div-data-GOs'>
                <div className='div-text-GOs'>Data:</div>
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
          <div className='div-avancado-GOs'>
            <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
          </div>}

        <div className='div-cabecalho-GOs'>
          <div className='cel-mais-cabecalho-GOs'>
          </div>
          <div className='cel-os-cabecalho-GOs'>
            Nº Os
          </div>
          <div className='cel-rs-cabecalho-GOs'>
            Razão Social
          </div>
          <div className='cel-cnpj-cabecalho-GOs'>
            Cnpj
          </div>
          <div className='cel-data-cabecalho-GOs'>
            Data do atendimento
          </div>
          <div className='cel-acoes-cabecalho-GOs'>
            Ações
          </div>
        </div>


        <div className=' div-separate-GOs' />
        {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> :
          this.state.OsArray.rows.map((line) =>
            <div className='div-100-Gentrada'>
              <div className='div-lines-GOs' >
                <div className='cel-mais-cabecalho-GOs'>
                  <div className='button-mais' onClick={() => this.mais(line)}>+</div>
                </div>
                <div className='cel-os-cabecalho-GOs'>
                  {line.id}
                </div>
                <div className='cel-rs-cabecalho-GOs'>
                  {line.razaoSocial}
                </div>
                <div className='cel-cnpj-cabecalho-GOs'>
                  {line.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
                </div>
                <div className='cel-data-cabecalho-GOs'>
                  {line.formatedDate}
                </div>
                <div className='cel-acoes-cabecalho-GOs'>
                  {/* <Tooltip placement="topLeft" title='Detalhes'>
                    <Button type="primary" className='button-icon' onClick={this.openModalDetalhes}><Icon type="info-circle" /></Button>
                  </Tooltip> */}
                  <Tooltip placement="topLeft" title='Remover'>
                    <Button type="primary" className='button-icon-remove' onClick={() => this.removeOs(line.id)}><Icon type="delete" /></Button>
                  </Tooltip>
                  <this.modalRemover />
                </div>
              </div>
              {this.state.mais[line.id] ? <div className='div-100-GOs'>
                <div className='div-mais-GOs'>
                <div className='div-normal-mais' >
                <div className='div-produtos-mais-GOs'>Produtos</div>
                <div className='div-quant-mais'>Quantidade</div>
                <div className='div-button-mais-GOs'>
                <Tooltip placement="topLeft" title='Adicionar produto'>
                  <div className='button-mais-div' onClick={() => this.redirectSearchOs()}>+</div>
                  {this.renderRedirect()}
                </Tooltip>
                </div>
                </div>
                </div>
                {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> :
                  this.state.lineSelected.rows.map((line) =>
                <div className='div-branco-mais'>
                  {/* {line.products.map((valor =>
                    <div className='div-produtos-mais-GOs'>
                      <div className='div-peca-GOs'>{valor.name}</div>
                      <div className='div-peca-GOs'>{valor.amount}</div>
                    </div>
                  ))} */}
                  <div className='div-produtos-mais-GOs'>{line.products.map((valor => <div className='div-peca-GOs'>{valor.name}</div>))}</div>
                  <div className='div-quant-mais'>{line.products.map((valor => <div className='div-peca-GOs'>{valor.amount}</div>))}</div>
                </div>)}
              </div> : null}
            <div className=' div-separate1-Gentrada'/>
          </div>)}
            <this.Pages />
      </div>
      )
    }
  }

  function mapDispacthToProps(dispach) {
    return bindActionCreators({ redirectValueOs }, dispach)
  }

  function mapStateToProps(state) {
    return {}
  }
  
export default connect(mapStateToProps, mapDispacthToProps)(OsDash)