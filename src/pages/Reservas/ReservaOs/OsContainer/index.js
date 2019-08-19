import React, { Component } from 'react'
import './index.css'
import { Input, DatePicker, InputNumber, Button, message, Select } from 'antd'
import { newReservaOs } from '../../../../services/reservaOs';


const { Option } = Select;

class ReservaOs extends Component{

  state={
    messageError: false,
    messageSuccess: false,
    Os: '',
    razaoSocial: '',
    cnpj: '',
    data: '',
    tecnico: 'TESTE',
    nomeProduto: '',
    tecnicoId: '',
    quant: '1',
    carrinho: [],
    estoque: 'REALPONTO'
  }

  success = () => {
    message.success('A reserva foi efetuada');
  };

  error = () => {
    message.error('A reserva não foi efetuada');
  };

  errorProduto = () => {
    message.error('O nome do produto é obrigatório para essa ação ser realizada');
  };

  onChangeData = (date, dateString) => {
    this.setState({
      data: dateString
    })
  }


  saveTargetNewReservaOs = async () => {

    this.setState({
      loading: true
    })

    const values = {
      Os: this.state.Os,
      razaoSocial: this.state.razaoSocial,
      cnpj: this.state.cnpj,
      date: this.state.data,
      // technicianId: this.state.tecnicoId,
      osParts: this.state.carrinho,
      responsibleUser: 'modrp',
    }

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
        messageSuccess: false
      })
    }
  }

  onChangeTecnico = (value) => {
    this.setState({
      tecnico: value
    })
  }

  onChangeSelect = (value) => {
    this.setState({
      estoque: value
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeQuant = (value) => {
    this.setState({
      quant: value
    })
  }

  addCarrinho = () => {
    if(this.state.nomeProduto !== ''){
    this.setState({
      carrinho:[{
        nomeProdutoCarrinho: this.state.nomeProduto,
        // produtoIdCarrinho: 
        quantCarrinho: this.state.quant,
        estoqueCarrrinho: this.state.estoque,
      },...this.state.carrinho],
      nomeProduto: '',
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
      <div className='div-card-Os'>
        <div className='linhaTexto-Os'>
          <h1 className='h1-Os'>Reserva Os</h1>
        </div>

        <div className='div-linha-Os'>
        <div className='div-nOs-Os'>
          <div className='div-textOs-Os'>Nº Os:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='Os'
              value={this.state.Os}
              placeholder="3203"
              onChange={this.onChange}
              onBlur={this.onBlurValidator}
              allowClear
            />
          </div>

          <div className='div-rs-Os'>
          <div className='div-textRs-Os'>Razão social:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='razaoSocial'
              value={this.state.razaoSocial}
              placeholder="Digite a razão social"
              onChange={this.onChange}
              onBlur={this.onBlurValidator}
              allowClear
            />
          </div>
        </div>

        <div className='div-linha1-Os'>
        <div className='div-cnpj-Os'>
          <div className='div-text-Os'>Cnpj:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='cnpj'
              value={this.state.cnpj}
              placeholder="Digite o cnpj"
              onChange={this.onChange}
              onBlur={this.onBlurValidator}
              allowClear
            />
          </div>

          <div className='div-data-Os'>
          <div className='div-textData-Os'>Data do atendimento:</div>
            <DatePicker onChange={this.onChangeData} format='DD/MM/YYYY' placeholder='Selecione uma data'/>
          </div>

          <div className='div-tecnico-Os'>
          <div className='div-text-Os'>Técnico:</div>
          <Select value={this.state.tecnico} style={{ width: '100%' }} onChange={this.onChangeTecnico}>
            <Option value="TESTE">TESTE</Option>
            <Option value="TESTE1">TESTE1</Option>
            <Option value="TESTE2">TESTE2</Option>
            <Option value="TESTE3">TESTE3</Option>
          </Select>
          </div>
        </div>

        <div className='linhaTextoPecas-Os'>
          <h1 className='h1-Os'>Reservar peças</h1>
        </div>

        <div className='div-linha-Os'>
        <div className='div-nome-Os'>
          <div className='div-textNome-Os'>Nome do produto:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='nomeProduto'
              value={this.state.nomeProduto}
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

        {this.state.carrinho.length === 0 ? null : <div className='div-maior-Os'><div className='div-linhaSelecionados-Os'><h2 className='h2-Os'>Produtos selecionados</h2></div><div className='div-linha1-Os'><label className='label-produto-Os'>Produto</label><label className='label-quant-Os'>Quantidade</label></div><div className='div-linhaSepareteProdutos-Os'></div>{this.state.carrinho.map((valor) => <div className='div-linha-Os'><label className='label-produto-Os'>{valor.nomeProdutoCarrinho}</label><label className='label-quant-Os'>{valor.quantCarrinho}</label><Button type='primary' className='button-remove-Os' onClick={() => this.remove(valor)}>Remover</Button></div>)}</div>}

        <div className='div-buttonSalvar-Os'>
          <Button type='primary' className='button' onClick={this.saveTargetNewReservaOs}>Salvar</Button>
        </div>

      </div>
    )
  }
}

export default ReservaOs