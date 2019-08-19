import React, { Component } from 'react'
import './index.css'
import { Input, Select, InputNumber, Button, Modal, message } from 'antd'
import { validators } from './validators'
import { newEntrada } from '../../../../services/entrada'
import { getItens } from '../../../../services/produto';
import { getFornecedor } from '../../../../services/fornecedores';


const { Option } = Select;
const { TextArea } = Input;


class NovaEntrada extends Component {

  state = {
    fornecedorArray: [],
    itemArray:[],
    serial: false,
    numeroSerieTest: [],
    messageError: false,
    messageSucesso: false,
    estoque: 'REALPONTO',
    nomeProduto: 'Não selecionado',
    fornecedor: 'Não selecionado',
    quant: '1',
    modalConfirm: false,
    arrayProdutos: [],
    fieldFalha: {
      nomeProduto: false,
      fornecedor: false
    },
    message: {
      nomeProduto: '',
      fornecedor: '',
    },
  }

  componentDidMount = async () => {
    await this.getAllItens()

    await this.getAllFornecedor()
  }

  getAllFornecedor = async () => {
    await getFornecedor().then(
      resposta => this.setState({
        fornecedorArray: resposta.data,
      })
    )
  }

  getAllItens = async () => {
    await getItens().then(
      resposta => this.setState({
        itemArray: resposta.data,
      })
    )
  }

  handleOk = () => {
    this.setState({
      modalConfirm: false,
      nomeProduto: '',
      fornecedor: '',
      quant: '1'
    });
  };

  handleCancel = () => {
    this.setState({
      modalConfirm: false,
    });
  };

  success = () => {
    message.success('A entrada foi efetuada');
  };

  error = () => {
    message.error('A entrada não foi efetuada');
  };

  errorNumeroSerie = () => {
    message.error('Este equipamento ja foi registrado');
  };

  errorNome = () => {
    message.error('O nome do produto é obrigatório');
  };

  errorForn = () => {
    message.error('O fornecedor é obrigatório');
  };

  errorOsDois = () => {
    message.error('O nome do produto e o fornecedor são obrigatórios');
  };


  messagesError = () => {
    if (this.state.nomeProduto === '' && this.state.fornecedor === '') {
      this.errorOsDois()
    } else if (this.state.nomeProduto === '' && this.state.fornecedor !== '') {
      this.errorNome()
    } else if (this.state.nomeProduto !== '' && this.state.fornecedor === '') {
      this.errorForn()
    } else if (this.state.nomeProduto !== '' && this.state.fornecedor !== '') {
      this.Confirm()
    }
  }

  onChangeSelect = (value) => {
    this.setState({
      estoque: value
    })
  }
 

  saveTargetNewEntrada = async () => {

    this.setState({
      loading: true
    })

    const values = {
      amountAdded: this.state.quant,
      stockBase: this.state.estoque,
      // productId: this.state.produtoId,
      // companyId: this.state.fornecedor,
      // serial: this.state.numeroSerieTest,
      responsibleUser: 'modrp',
    }

    const resposta = await newEntrada(values)

    console.log(resposta)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        loading:false,
        messageError: false,
      })
    } if (resposta.status === 200) {

      this.setState({
        estoque: 'REALPONTO',
        nomeProduto: 'Não selecionado',
        fornecedor: 'Não selecionado',
        quant: '1',
        numeroSerieTest: [],
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false
      })
    }
  }

  filter = async (e) => {

    await this.setState({
      numeroSerieTest: e.target.value
    })

    const teste = this.state.numeroSerieTest.split(/\n/, 10)

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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeItem = (value, product) => {
    this.setState({
      nomeProduto: value,
      serial: product.props.product.serial,
    })
  }

  onChangeForn = (value) => {
    this.setState({
      fornecedor: value
    })
  }

  handleChange = (value) => {
    this.setState({
      nomeProduto: value
    })
  }

  onChangeQuant = (value) => {
    this.setState({
      quant: value
    })
  }

  onBlurValidator = (e) => {
    const {
      nome,
      valor,
      fieldFalha,
      message
    } = validators(e.target.name, e.target.value, this.state)

    this.setState({
      [nome]: valor,
      fieldFalha,
      message
    })
  }

  Confirm = () => {
    this.setState({
      modalConfirm: true
    })
  }

  modalConfirm = () => (
    <Modal
      title="Confirmar produto"
      visible={this.state.modalConfirm}
      onOk={this.saveTargetNewEntrada}
      okText='Confirmar'
      onCancel={this.handleCancel}
      cancelText='Cancelar'
    >
      <div className='linhaModal-entrada'>
        <div className='div-fornecedorModal-entrada'>
          <div className='div-text-entrada'>Produto:</div>
          <label className='label-entrada'>{this.state.nomeProduto}</label>
        </div>
      </div>

      <div className='linhaModal-entrada'>
        <div className='div-fornecedorModal-entrada'>
          <div className='div-text-entrada'>Quant:</div>
          <label className='label-entrada'>{this.state.quant} UN</label>
        </div>
      </div>

      <div className='linhaModal-entrada'>
        <div className='div-fornecedorModal-entrada'>
          <div className='div-text-entrada'>Estoque:</div>
          <label className='label-entrada'>{this.state.estoque}</label>
        </div>
      </div>

      <div className='linhaModal-entrada'>
        <div className='div-fornecedorModal-entrada'>
          <div className='div-text-entrada'>Fornecedor:</div>
          <label className='label-entrada'>{this.state.fornecedor}</label>
        </div>
      </div>
    </Modal>
  )

  render() {
    return (
      <div className='div-card-entrada'>
        <div className='linhaTexto-entrada'>
          <h1 className='h1-entrada'>Nova entrada</h1>
        </div>

        <div className='linha1-entrada'>
          <div className='div-nome-entrada'>
            <div className='div-textNome-entrada'>Nome do produto:</div>
            <div className='div-inputs'>
            {this.state.itemArray.length !== 0 ?
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Selecione o produto"
                optionFilterProp="children"
                value={this.state.nomeProduto}
                onChange={this.onChangeItem}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
              {this.state.itemArray.map((value)=> <Option product={value} value={value.name}>{value.name}</Option>)}
              </Select> : <Select
                value='Nenhum produto cadastrado'
              >
              </Select>}
              {this.state.fieldFalha.nomeProduto ?
                <p className='div-feedbackError'>
                  {this.state.message.nomeProduto}
                </p> : null}
            </div>
          </div>

          <div className='div-estoque-entrada'>
            <div className='div-text-entrada'>Estoque:</div>
            <Select value={this.state.estoque} style={{ width: '100%' }} onChange={this.onChangeSelect} >
              <Option value='REALPONTO'>REALPONTO</Option>
              <Option value='NOVA REALPONTO'>NOVA REALPONTO</Option>
              <Option value='PONTOREAL'>PONTOREAL</Option>
            </Select>
          </div>
        </div>

        <div className='linha1-entrada'>
          <div className='div-fornecedor-entrada'>
            <div className='div-text-entrada'>Fornecedor:</div>
            <div className='div-inputs'>
            {this.state.fornecedorArray.length !== 0 ? <Select
                showSearch
                style={{ width: '100%' }}
                optionFilterProp="children"
                value={this.state.fornecedor}
                onChange={this.onChangeForn}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
              {this.state.fornecedorArray.map((value)=> <Option value={value.razaoSocial}>{value.razaoSocial}</Option>)}
              </Select> : <Select
                value='Nenhum fornecedor cadastrado'
              >
              </Select>}
            
              {this.state.fieldFalha.fornecedor ?
                <p className='div-feedbackError'>
                  {this.state.message.fornecedor}
                </p> : null}
            </div>
          </div>

          <div className='div-quant-entrada'>
            <div className='div-text-entrada'>Quant:</div>
            <InputNumber min={1} defaultValue={this.state.quant} style={{width: '100%'}} value={this.state.quant} onChange={this.onChangeQuant} />
          </div>
        </div>
        
        {this.state.serial ? <div className='div-button-entrada'>
          <div className='div-serial-entrada'>
            <div className='div-textSerial-entrada'>Número de série:</div>
            <TextArea
              className='input-100'
              placeholder="Digite o número de série"
              autosize={{ minRows: 2, maxRows: 4 }}
              rows={4}
              name='numeroSerie'
              value={this.state.numeroSerieTest}
              onChange={this.filter}
            />
          </div>
          <Button className='button' type="primary" onClick={this.messagesError} loading={this.state.loading}>Salvar</Button>
          <this.modalConfirm /> </div>: <div className='div-button-entrada1'><Button className='button' type="primary" onClick={this.messagesError} loading={this.state.loading}>Salvar</Button>
          <this.modalConfirm /></div>}
          
        </div>
    )
  }
}

export default NovaEntrada