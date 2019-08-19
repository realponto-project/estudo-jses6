import React, { Component } from 'react'
import './index.css'
import { Input, Select, InputNumber, Button, message } from 'antd'


const { Option } = Select;

class AddKit extends Component{

  state={
    carrinho: [],
    item: '',
    quant: '1',
    estoque: 'REALPONTO',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeSelect = (value) => {
    this.setState({
      estoque: value
    })
  }

  onChangeQuant = (value) => {
    this.setState({
      quant: value
    })
  }

  errorProduto = () => {
    message.error('O nome do produto é obrigatório para essa ação ser realizada');
  };

  errorSelecionado = () => {
    message.error('Este item já foi selecionado');
  };

  
  addCarrinho = async () => {
    if(this.state.item !== ''){

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
        // produtoIdCarrinho: 
        quantCarrinho: this.state.quant,
        estoqueCarrrinho: this.state.estoque,
      },...this.state.carrinho],
      item: '',
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
    return(
      <div className='div-card-AddKit'>
        <div className='linhaTexto-AddKit'>
          <h1 className='h1-AddKit'>Gerenciar kit</h1>
        </div>

        <div className='div-linha-Os'>
        <div className='div-nome-Os'>
          <div className='div-textNome-Os'>Nome do produto:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='item'
              value={this.state.item}
              placeholder="Digite o nome do produto"
              onChange={this.onChange}
              onBlur={this.onBlurValidator}
              allowClear
            />
          </div>  

          <div className='div-quant-Os'>
            <div className='div-text-Os'>Quant:</div>
            <InputNumber min={1} defaultValue={this.state.quant} value={this.state.quant} onChange={this.onChangeQuant} />
          </div>
        </div>
          
        <div className='div-linha-Os'> 
        <div className='div-estoque-Os'>
          <div className='div-text-Os'>Estoque:</div>
          <Select value={this.state.estoque} style={{ width: '100%' }} onChange={this.onChangeSelect}>
            <Option value="REALPONTO">REALPONTO</Option>
            <Option value="NOVA REALPONTO">NOVA REALPONTO</Option>
            <Option value="PONTOREAL">PONTOREAL</Option>
          </Select>
          </div>  

          <Button className='button' type='primary' onClick={this.addCarrinho}>Adicionar</Button>
        </div>

        <div className='div-linhaSeparete-Os'></div>        

        {this.state.carrinho.length === 0 ? null : <div className='div-maior-Os'><div className='div-linhaSelecionados-Os'><h2 className='h2-Os'>Produtos selecionados</h2></div><div className='div-linha1-Os'><label className='label-produto-Os'>Produto</label><label className='label-quant-Os'>Quantidade</label></div><div className='div-linhaSepareteProdutos-Os'></div>{this.state.carrinho.map((valor) => <div className='div-linha-Os'><label className='label-produto-Os'>{valor.itemCarrinho}</label><label className='label-quant-Os'>{valor.quantCarrinho}</label><Button type='primary' className='button-remove-Os' onClick={() => this.remove(valor)}>Remover</Button></div>)}</div>}

        <div className='div-buttonSalvar-Os'>
          <Button type='primary' className='button' onClick={this.saveTargetNewReservaOs}>Salvar</Button>
        </div>

      </div>
    )
  }
}

export default AddKit