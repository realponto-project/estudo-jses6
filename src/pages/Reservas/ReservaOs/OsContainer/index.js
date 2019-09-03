import React, { Component } from 'react'
import moment from 'moment'
import './index.css'
import { Input, DatePicker, InputNumber, Button, message, Select } from 'antd'

import { validators, masks } from './validators'
import { newReservaOs, getOsByOs } from '../../../../services/reservaOs';
import { getProdutoByEstoque } from '../../../../services/produto';
import { getTecnico } from '../../../../services/tecnico'


const { TextArea } = Input;
const { Option } = Select;

class ReservaOs extends Component{

  state={
    readOnly: false,
    serial: false,
    disp: 1,
    numeroSerieTest: '',
    tecnicoArray:[],
    itemArray: [],
    messageError: false,
    messageSuccess: false,
    Os: '',
    razaoSocial: '',
    cnpj: '',
    data: '',
    tecnico: 'Não selecionado',
    nomeProduto: 'Não selecionado',
    productBaseId: '',
    tecnicoId: '',
    quant: '1',
    carrinho: [],
    estoque: 'REALPONTO',
    fieldFalha: {
      Os: false,
      razaoSocial: false,
      cnpj: false,
      data: false,
      technician: false,
    },
    message: {
      Os: '',
      razaoSocial: '',
      cnpj: '',
      data: '',
      technician: '',
    },
  }

  getAllTecnico = async () => {

    await getTecnico().then(
      resposta => this.setState({
        tecnicoArray: resposta.data,
      })
    )
  }

  errorNumeroSerie = () => {
    message.error('Este equipamento ja foi registrado');
  };

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


  componentDidMount = async () => {
    await this.getAllItens()
    await this.getAllTecnico()
  }

  getAllItens = async () => {

    const query={
      stockBase: this.state.estoque
    }

    await getProdutoByEstoque(query).then(
      resposta => this.setState({
        itemArray: resposta.data,
      })
    )
  }

  onChangeItem = async (value, props) => {
   await this.setState({
      nomeProduto: value,
      productBaseId: props.props.props.id,
      serial: props.props.props.serial,
      disp: parseInt(props.props.props.available, 10),
    })
  }

  success = () => {
    message.success('A reserva foi efetuada');
  };

  error = () => {
    message.error('A reserva não foi efetuada');
  };

  errorProduto = () => {
    message.error('O produto é obrigatório para essa ação ser realizada');
  };

  onChangeData = (date) => {
    this.setState({
      data: date,
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

  onFocus = (e) => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        [e.target.name]: false,
      },
      message: {
        ...this.state.message,
        [e.target.name]: false,
      },
    })
  }

  onFocusTecnico = () => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        technician: false,
      },
      message: {
        ...this.state.message,
        technician: false,
      },
    })
  }

  saveTargetNewReservaOs = async () => {

    this.setState({
      loading: true
    })

    const values = {
      razaoSocial: this.state.razaoSocial,
      cnpj: this.state.cnpj,
      date: this.state.data,
      technicianId: this.state.technicianId,
      osParts: this.state.carrinho,
      responsibleUser: 'modrp',
    }

    console.log(values)

    const resposta = await newReservaOs(values)

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
        razaoSocial: '',
        cnpj: '',
        data: '',
        carrinho: [],
        serial: false,
        numeroSerieTest: '',
        nomeProduto: 'Não selecionado',
        // tecnicoId: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false
      })
    }
  }

  onChangeEstoque = async (valor) => {
    await this.setState({
      estoque: valor
    })

    await this.getAllItens()
  }

  onChangeTecnico = (value) => {
    this.setState({
      tecnico: value
    })
  }

  onChangeSelect = (value, props) => {
    this.setState({
      tecnico: value,
      technicianId: props.props.props.id,
    })
  }

  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    this.setState({
      [nome]: valor,
    })
  }

  onChangeQuant = (value) => {
    this.setState({
      quant: value
    })
  }

  addCarrinho = () => {
    if(this.state.nomeProduto !== 'Não selecionado' || ''){
    this.setState({
      carrinho:[{
        nomeProdutoCarrinho: this.state.nomeProduto,
        productBaseId: this.state.productBaseId,
        amount: this.state.quant.toString(),
        stockBase: this.state.estoque,
        serialNumberArray: this.state.numeroSerieTest.split(/\n/).filter((item) => item ? item : null ),
      },...this.state.carrinho],
      nomeProduto: 'Não selecionado',
      quant: '1',
      estoque: 'REALPONTO',
      serial: false,
      numeroSerieTest: '',
    })
  }else (
    this.errorProduto()
  )}

  remove = (value) => {
    const oldCarrinho = this.state.carrinho
    const newCarrinho = oldCarrinho.filter(valor => valor !== value)

    this.setState({
      carrinho: newCarrinho
    })
  }


  render(){
    console.log(this.state.itemArray)
    return(
      <div className='div-card-Os'>
        <div className='linhaTexto-Os'>
          <h1 className='h1-Os'>Reserva Os</h1>
        </div>

        <div className='div-linha-Os'>
          <div className='div-rs1-Os'>
          <div className='div-textRs-Os'>Razão social:</div>
            <div className='div-inputs'>
              <Input
                readOnly={this.state.readOnly}
                allowClear={!this.state.fieldFalha.razaoSocial && !this.state.readOnly}
                className={
                  this.state.fieldFalha.razaoSocial ?
                    'div-inputError-OS' :
                    'input-100'}
                style={{ width: '100%' }}
                name='razaoSocial'
                value={this.state.razaoSocial}
                placeholder="Digite a razão social"
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.razaoSocial ?
                <p className='div-feedbackError'>
                  {this.state.message.razaoSocial}
                </p> : null}
            </div>
          </div>
        </div>

        <div className='div-linha1-Os'>
        <div className='div-cnpj-Os'>
          <div className='div-text-Os'>Cnpj:</div>
            <div className='div-inputs'>
              <Input
                readOnly={this.state.readOnly}
                allowClear={!this.state.fieldFalha.cnpj && !this.state.readOnly}
                className={
                  this.state.fieldFalha.cnpj ?
                    'div-inputError-OS' :
                    'input-100'}
                style={{ width: '100%' }}
                name='cnpj'
                value={this.state.cnpj}
                placeholder="Digite o cnpj"
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.cnpj ?
                <p className='div-feedbackError'>
                  {this.state.message.cnpj}
                </p> : null}
            </div>
          </div>

          <div className='div-data-Os'>
          <div className='div-textData-Os'>Data do atendimento:</div>
            <div className='div-inputs'>
              <DatePicker
                className={
                  this.state.fieldFalha.data ?
                    'div-inputError-OS' :
                    'input-100'}
                onChange={this.onChangeData}
                name='data'
                onFocus={this.onFocus}
                format='DD/MM/YYYY'
                value={this.state.data}
                placeholder='Selecione uma data'/>
                {this.state.fieldFalha.data ?
                  <p className='div-feedbackError'>
                    {this.state.message.data}
                  </p> : null}
            </div>
          </div>

          <div className='div-tecnico-Os'>
          <div className='div-text-Os'>Técnico:</div>
            <div className='div-inputs'>
            {this.state.tecnicoArray.length === 0 ?
              <Select
                className={
                  this.state.fieldFalha.technician ?
                    'div-inputError-OS' :
                    'input-100'}
                value='Nenhum tecnicos cadastrado'
                name='technician'
                onFocus={this.onFocusTecnico}
                style={{ width: '100%' }}>
              </Select> :
              <Select
                className={
                  this.state.fieldFalha.technician ?
                    'div-inputError-OS' :
                    'input-100'}
                defaultValue='Não selecionado'
                style={{ width: '100%' }}
                onChange={this.onChangeSelect}
                showSearch
                placeholder='Nenhum tecnicos cadastrado'
                optionFilterProp="children"
                value={this.state.tecnico}
                name='technician'
                onFocus={this.onFocusTecnico}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
                {this.state.tecnicoArray.map((valor) => 
                <Option props={valor} value={valor.name}>{valor.name}</Option>)}</Select>}
                {this.state.fieldFalha.technician ?
                  <p className='div-feedbackError'>
                    {this.state.message.technician}
                  </p> : null}
            </div>
          </div>
        </div>

        <div className='linhaTextoPecas-Os'>
          <h1 className='h1-Os'>Reservar peças</h1>
        </div>

        <div className='div-linha-Os'>
        <div className='div-nome-Os'>
          <div className='div-textNome-Os'>Nome do produto:</div>
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
                {this.state.itemArray.map((value)=> <Option props={value} value={value.name}>{value.name}</Option>)}
              </Select>:
              <Select
                style={{width: '100%'}}
                value='Nenhum produto cadastrado'
              >
              </Select>}
          </div>

          <div className='div-quant-Os'>
            <div className='div-text-Os'>Quant:</div>
            <InputNumber min={1} max={this.state.disp} defaultValue={this.state.quant} value={this.state.quant} onChange={this.onChangeQuant} />
          </div>
        </div>
          
        <div className='div-linha-Os'> 
        <div className='div-estoque-Os'>
          <div className='div-text-Os'>Estoque:</div>
          <Select value={this.state.estoque} style={{ width: '100%' }} onChange={this.onChangeEstoque}>
            <Option value="REALPONTO">REALPONTO</Option>
            <Option value="NOVAREAL">NOVA REALPONTO</Option>
            <Option value="PONTOREAL">PONTOREAL</Option>
          </Select>
          </div>  

          {this.state.serial ? 
          <div className='div-serial-AddKit'>
            <div className='div-textSerial-AddKit'>Número de série:</div>
            <TextArea
              className='input-100'
              placeholder="Digite o número de série"
              autosize={{ minRows: 2, maxRows: 3 }}
              rows={3}
              name='numeroSerie'
              value={this.state.numeroSerieTest}
              onChange={this.filter}
            />
          </div> : null}

          <Button className='button' type='primary' onClick={this.addCarrinho}>Adicionar</Button>
        </div>

        <div className='div-linhaSeparete-Os'></div>        

        {this.state.carrinho.length === 0 ? null :
        <div className='div-maior-Os'>
          <div className='div-linhaSelecionados-Os'>
            <h2 className='h2-Os'>Produtos selecionados</h2>
          </div>
          <div className='div-linha1-Os'>
            <label className='label-produto-Os'>Produto</label>
            <label className='label-quant-Os'>Quantidade</label>
          </div>
          <div className='div-linhaSepareteProdutos-Os'></div>
          {this.state.carrinho.map((valor) =>
            <div className='div-linha-Os'>
              <label className='label-produto-Os'>{valor.nomeProdutoCarrinho}</label>
              <label className='label-quant-Os'>{valor.amount} UN</label>
              <Button type='primary' className='button-remove-Os' onClick={() => this.remove(valor)}>Remover</Button>
            </div>)
          }
        </div>}

        {this.state.carrinho.length !== 0 ? <div className='div-buttonSalvar-Os'>
          <Button type='primary' className='button' onClick={this.saveTargetNewReservaOs}>Salvar</Button>
        </div> : null}

      </div>
    )
  }
}

export default ReservaOs