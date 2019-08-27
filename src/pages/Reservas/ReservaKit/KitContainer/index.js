import React, { Component } from 'react'
import './index.css'
import { Pagination, Button, Select, Input, Icon, Modal, Tooltip, InputNumber, Spin } from 'antd'
import { Redirect } from 'react-router-dom'
import * as R from 'ramda'

import { getTecnico } from '../../../../services/tecnico'
import { baixaReservaOs } from '../../../../services/reservaOs';
import { getKit } from '../../../../services/kit'


const { Option } = Select;

class ReservaKit extends Component {

  state = {
    modalBaixa: false,
    teste: NaN,
    produtoSelecionado: {
      products: {}
    },
    avancado: false,
    produto: '',
    data: '',
    tecnicoArray: [],
    kitArray: {
      rows: []
    },
    tecnico: 'Não selecionado',
    redirect: false,
  }

  getAllKit = async () => {

    const value = {
      tecnichian: this.state.tecnico,
    }

    await getKit(value).then(
      resposta => this.setState({
        kitArray: resposta.data,
      })
    )
  }

  handleOkModalPeca = async () => {
    await this.setState({
      modalBaixa: false,
      produtoSelecionado: {
        products: {}
      },
      teste: NaN,
    })
  }

  openModalDetalhes = async (valor) => {
    await this.setState({
      modalBaixa: true,
      produtoSelecionado: {
        products: valor
      },
    })

    await this.setState({
      teste: this.state.produtoSelecionado.products.quantMax
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
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

  onChangeTecnico = async (value) => {
    this.setState({
      tecnico: value
    })

    await this.getAllKit()
  }

  retornar = async () => {
    const menos = this.state.produtoSelecionado.products.quantMax - this.state.teste

    this.setState({
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          quantMax: menos
        }
      }
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.osPartsId,
      add: {
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

    await this.getAllKit()

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
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          quantMax: menos
        }
      }
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.osPartsId,
      add: {
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

    await this.getAllKit()

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
      produtoSelecionado: {
        products: {
          ...this.state.produtoSelecionado.products,
          quantMax: menos
        }
      }
    })

    const value = {
      osPartsId: this.state.produtoSelecionado.products.osPartsId,
      add: {
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

    await this.getAllKit()

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


  modalDetalhesLinha = () => (
    <Modal
      title="Detalhes do atendimento"
      visible={this.state.modalBaixa}
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
          <div className='div-quant-modal'><InputNumber min={1} max={this.state.produtoSelecionado.products.quantMax} defaultValue={this.state.teste} style={{ width: '90%' }} value={this.state.teste} onChange={this.onChangeModal} /></div>
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
        <div className='div-total-modal'>
          <div className='div-baixo'>Total:</div>
          <div className='div-baixo'>Incluídos:</div>
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

  render() {
    return (
      <div className='div-card-kit'>
        <div className='linhaTexto-kit'>
          <h1 className='h1-kit'>Kit do técnico</h1>
        </div>

        {this.state.avancado ?
          <div className='div-avancado-buttons-kit'>
            <div className='div-button-avancado-kit'>
              {this.renderRedirect()}
              <Button className='button' type='primary' onClick={this.avancado}>Ocultar</Button>
              <Button className='button' type='primary' onClick={this.setRedirect}>Gerenciar kit</Button>
            </div>
            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-produto-Rtecnico'>
                <div className='div-text-Os'>Produto:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='produto'
                  value={this.state.produto}
                  placeholder="Digite o nome do produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-data-kit'>
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

              <div className='div-fabricante-Rtecnico'>
                <div className='div-text-Rtecnico'>Técnico:</div>
                {this.state.tecnicoArray.length === 0 ?
                  <Select value='Nenhum tecnico cadastrado' style={{ width: '100%' }}></Select> :
                  <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}>{this.state.tecnicoArray.map((valor) => <Option value={valor.name}>{valor.name}</Option>)}</Select>}
              </div>
            </div></div> :
          <div className='div-avancado-buttons-kit'>
            <div className='div-button-avancado-kit'>
              {this.renderRedirect()}
              <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
              <Button className='button' type='primary' onClick={this.setRedirect}>Gerenciar kit</Button>
            </div>
          </div>}
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
        {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> :
          this.state.kitArray.rows.map((line) =>
            <div className='div-100-Gentrada'>
              <div className='div-lines1-kit'>
                <div className='cel-produto-cabecalho-kit'>
                  {line.name}
                </div>
                <div className='cel-quant-cabecalho-kit'>
                  {line.amount}
                </div>
                <div className='cel-data-cabecalho-kit'>
                  22/11/2001 14:30
                </div>
                <div className='cel-acoes-cabecalho-kit'>
                  <Button className='button' type='primary' onClick={() => this.openModalDetalhes(line)} ><Icon type="edit" /></Button>
                </div>
                <this.modalDetalhesLinha />
              </div>
              <div className='div-separate1-kit'></div>
            </div>)}

        <div className='footer-kit'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    )
  }
}

export default ReservaKit