import React, { Component } from 'react'
import './index.css'
import { Select, InputNumber, Button, message, Input, Icon } from 'antd'
import { getProdutoByEstoque } from '../../../../services/produto';
import { Redirect } from 'react-router-dom'

import { getTecnico } from '../../../../services/tecnico'
import { NewKit, getKitDefaultValue } from '../../../../services/kit'
import { getSerial } from '../../../../services/serialNumber';


const { TextArea } = Input;
const { Option } = Select;

class AddKit extends Component{

  state={
    redirect: false,
    serial: false,
    disp: 1,
    numeroSerieTest: '',
    itemArray: [],
    carrinho: [],
    item: 'Não selecionado',
    quant: '1',
    estoque: 'REALPONTO',
    quantTec: 1,
  }

  redirectReservaOs = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/logged/reservaKit/dash' />
    }
  }

  getAllTecnico = async () => {

    const query = {
      external: true
    }

    await getTecnico(query).then(
      resposta => this.setState({
        quantTec: resposta.data.length,
      })
    )
  }

  getKitDefault = async () => {
    const query = {}

    await getKitDefaultValue(query).then(
      resposta => this.setState({
        carrinho: resposta.data.rows,
      }, console.log(resposta))
    )
  }
  errorNumeroSerie = (value) => {
    message.error(value, 10);
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

      let mensagem = 'Este equipamento ja foi inserido nessa reserva'

      const resp = await getSerial(teste[teste.length - 2])

      if (resp.data) {
        if (resp.data.reserved) {
          count ++
          if (resp.data.deletedAt) {
            if (resp.data.osParts) {
              mensagem = `Este equipamento ja foi liberado para a OS: ${resp.data.osPart.o.os}`
            } else if (resp.data.freeMarketPart){
              mensagem = `Este equipamento foi liberado para mercado livre com código de restreamento: ${resp.data.freeMarketPart.freeMarket.trackingCode}`
            }
          } else {
            mensagem = `Este equipamento ja foi reservado para a OS: ${resp.data.osPart.o.os}`
          }
        }
      } else {
        mensagem = 'Este equipamento não consta na base de dados'
        count ++
      }

      if (count > 1) {

        this.errorNumeroSerie(mensagem)

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

    await this.getKitDefault()
  }

  getAllItens = async () => {

    const query={
      stockBase: this.state.estoque,
      kit: true,
    }

    await getProdutoByEstoque(query).then(
      resposta => this.setState({
        itemArray: resposta.data,
      })
    )
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeEstoque = async (valor) => {
    await this.setState({
      estoque: valor
    })

    await this.getAllItens()
  }

  onChangeQuant = (value) => {
    this.setState({
      quant: value
    })
  }

  errorProduto = () => {
    message.error('O produto é obrigatório para essa ação ser realizada');
  };

  errorSelecionado = () => {
    message.error('Este item já foi selecionado');
  };

  onChangeItem = (value, props) => {
    this.setState({
      item: value,
      productBaseId: props.props.props.id,
      disp: parseInt(props.props.props.available, 10),
    })
  }

  saveTargetNewKit = async () => {
    const value = {
      kitParts: this.state.carrinho.map((valor) => {
        const resp = {
          productBaseId: valor.productBaseId,
          amount: valor.amount.toString(),
        }
        return resp
      })
    }

    const resposta = await NewKit(value)

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
        carrinho: [],
        item: 'Não selecionado',
        quant: '1',
        estoque: 'REALPONTO',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false,
        redirect: true
      })
    }
  }

  success = () => {
    message.success('O cadastro foi efetuado');
  };

  error = () => {
    message.error('O cadastro não foi efetuado');
  };

  
  addCarrinho = async () => {
    if(this.state.item !== 'Não selecionado'){

    const array = this.state.carrinho.map(value => value.itemCarrinho)

    if(array.filter(value => value === this.state.item).length > 0){
      this.errorSelecionado()
      this.setState({
        item: '',
      })
      return
    }

    await this.setState({
      carrinho:[{
        itemCarrinho: this.state.item,
        productBaseId: this.state.productBaseId,
        amount: this.state.quant,
      },...this.state.carrinho],
      item: 'Não selecionado',
      quant: '1',
      estoque: 'REALPONTO'
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
      <div className='div-card-AddKit'>
        <div className='linhaTexto-AddKit'>
        <div className='div-nome-40'>
        <div><Icon type="arrow-left" onClick={() => this.redirectReservaOs()} /></div>
        </div>
        <div className='div-nome-60'>
          <h1 className='h1-AddKit'>Gerenciar kit</h1>
        </div>
        </div>

        <div className='div-linha-Os'>
        <div className='div-nome-Os'>
          <div className='div-textNome-Os'>Nome do produto:</div>
            <Select
                showSearch
                style={{ width: '100%' }}
                optionFilterProp="children"
                value={this.state.item}
                onChange={this.onChangeItem}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
              {this.state.itemArray.map((value)=> <Option value={value.name} props={value}>{value.name}</Option>)}
              </Select>
          </div>  

          <div className='div-quant-Os'>
            <div className='div-text-Os'>Quant:</div>
            <InputNumber min={1} max={Math.floor(this.state.disp/this.state.quantTec)} defaultValue={this.state.quant} value={this.state.quant} onChange={this.onChangeQuant} />
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
            <div className='div-linhaSepareteProdutos-Os'></div>{this.state.carrinho.map((valor) =>
              <div className='div-linha-Os'>
                <label className='label-produto-Os'>{valor.itemCarrinho}</label>
                <label className='label-quant-Os'>{valor.amount} UN</label>
                <Button type='primary' className='button-remove-Os' onClick={() => this.remove(valor)}>Remover</Button>
              </div>)}
          </div>}

          {this.renderRedirect()}

        <div className='div-buttonSalvar-Os'>
          {this.state.carrinho.length === 0 ? null : <Button type='primary' className='button' onClick={this.saveTargetNewKit}>Salvar</Button>}
        </div>

      </div>
    )
  }
}

export default AddKit