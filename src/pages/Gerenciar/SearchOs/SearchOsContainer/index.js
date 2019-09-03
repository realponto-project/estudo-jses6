import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import * as R from 'ramda'
import './index.css'
import { Input, DatePicker, InputNumber, Button, message, Select, Icon } from 'antd'
import { validators, masks } from './validators'
import { getOsByOs, updateReservaOs } from '../../../../services/reservaOs';
import { getProdutoByEstoque } from '../../../../services/produto';
import { getTecnico } from '../../../../services/tecnico'


const { TextArea } = Input;
const { Option } = Select;

class SearchOsDash extends Component{

  state={
    redirect: false,
    readOnly: false,
    serial: false,
    numeroSerieTest: '',
    tecnicoArray:[],
    itemArray: [],
    messageError: false,
    messageSuccess: false,
    // data: this.props.osUpdateValue.date,
    data: moment(this.props.osUpdateValue.date),
    tecnico: this.props.osUpdateValue.technician,
    nomeProduto: 'Não selecionado',
    productId: '',
    tecnicoId: this.props.osUpdateValue.technicianId,
    quant: '1',
    quantObj: {},
    carrinho: this.props.osUpdateValue.products,
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

  redirectGerenciarOs = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/logged/Os/dash' />
    }
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

    // eslint-disable-next-line array-callback-return
    await this.state.carrinho.map((item) => {
      this.setState({
        quantObj: {
          ...this.state.quantObj,
          [`quant${item.name}`]: item.amount,
        },
      })
    })
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
      productId: props.props.props.id,
      serial: props.props.props.serial,
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

  getOs = async () => {
    const os  = await getOsByOs(this.state.Os)

    if (os.status === 200) {
      if (os.data.razaoSocial) {
        await this.setState({
          razaoSocial: os.data.razaoSocial,
          cnpj: os.data.cnpj,
          data: moment(os.data.data),
          tecnico: os.data.technician,
          carrinho: os.data.reserve,
          readOnly: true,
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
        })
      } else {
        this.setState({
          readOnly: false,
        })
      }
    }
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

  updateTargetReservaOs = async () => {

    const osParts = await this.state.carrinho.map((item) => {
      let resp = {}
      if (R.prop('id', item)){
        resp = {
          id: item.id,
          amount: this.state.quantObj[`quant${item.name}`].toString(),
        }
      } else {
        resp = {
          ...item,
          amount: this.state.quantObj[`quant${item.name}`].toString(),
        }
      }
      return resp
    })

    const value = {
      id: this.props.osUpdateValue.Os,
      date: this.state.data,
      technicianId: this.state.tecnicoId,
      osParts,
    }

    console.log(value)
    

    this.setState({
      loading: true
    })

    const resposta = await updateReservaOs(value)

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
        Os: '',
        razaoSocial: '',
        cnpj: '',
        data: '',
        carrinho: [],
        // tecnicoId: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false,
        redirect: true,
      })
    }
  }


  onChangeEstoque = async (value) => {
    this.setState({
      estoque0: value
    })
    await this.getAllItens()
  }

  onChangeSelect = (value, props) => {
    this.setState({
      tecnico: value,
      technicoId: props.props.props.id,
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

  onChangeUpdateQuant = (name, value) => {

    this.setState({
      quantObj:{
        ...this.state.quantObj,
        [`quant${name}`]: value,
      },
    })
  }

  addCarrinho = () => {
    if(this.state.nomeProduto !== 'Não selecionado' || ''){
    this.setState({
      quantObj:{
        ...this.state.quantObj,
        [`quant${this.state.nomeProduto}`]: this.state.quant,
      },
      carrinho:[{
        name: this.state.nomeProduto,
        productId: this.state.productId,
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
    console.log(this.state)
    return(
      <div className='div-card-Os'>
        <div className='linhaTexto-GOs'>
        <div className='div-nome-40'>
        <div><Icon type="arrow-left" onClick={() => this.redirectGerenciarOs()} /></div>
        {this.renderRedirect()}
        </div>
        <div className='div-nome-60'>
          <h1 className='h1-Os'>Buscas por Os</h1>
        </div>
        </div>

        <div className='div-linha-Os'>
        <div className='div-nOs-Os'>
          <div className='div-textOs-Os'>Nº Os:</div>
            <div className='div-inputs'>
              <Input
                readOnly
                className='input-100'
                style={{ width: '100%' }}
                value={this.props.osUpdateValue.Os}
              />
              {this.state.fieldFalha.Os ?
                  <p className='div-feedbackError'>
                    {this.state.message.Os}
                  </p> : null}
              </div>
          </div>

          <div className='div-rs-Os'>
          <div className='div-textRs-Os'>Razão social:</div>
            <div className='div-inputs'>
              <Input
                readOnly
                className='input-100'
                style={{ width: '100%' }}
                value={this.props.osUpdateValue.razaoSocial}
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
                readOnly
                className='input-100'
                style={{ width: '100%' }}
                value={this.props.osUpdateValue.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
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
            <InputNumber min={1} defaultValue={this.state.quant} value={this.state.quant} onChange={this.onChangeQuant} />
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
              <label className='label-produto-Os'>{valor.name}</label>
              <InputNumber 
                min={1}
                value={this.state.quantObj[`quant${valor.name}`]}
                onChange={(value) => this.onChangeUpdateQuant(valor.name, value)} />
              <label className='label-quant-Os'>
                UN
              </label>
              <Button type='primary' className='button-remove-Os' onClick={() => this.remove(valor)}>Remover</Button>
            </div>)
          }
        </div>}

        {this.state.carrinho.length !== 0 ? <div className='div-buttonSalvar-Os'>
          <Button type='primary' className='button' onClick={this.saveTargetNewReservaOs}>Salvar</Button>
        </div> : null}

        {this.state.redirect ? <Redirect to='/logged/Os/dash' /> : null }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    osUpdateValue: state.osUpdateValue,
  }
}

export default connect(mapStateToProps)(SearchOsDash)