import React, { Component } from 'react'
import './index.css'
import { Input, Button, InputNumber, Select, message } from 'antd'
import { getAddressByZipCode } from '../../../../services/fornecedores'
import * as R from 'ramda'
import { NewReservaML } from '../../../../services/mercadoLivre';
import { getItens } from '../../../../services/produto';


const { Option } = Select;

class ReservaML extends Component{

  state={
    itemArray: [],
    messageError: false,
    messageSuccess: false,
    nomeProduto: 'Não selecionado',
    quant: '1',
    carrinho: [],
    estoque: 'REALPONTO',
    codigo: '',
    nomeOuRs: '',
    cpfOuCnpj: '',
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: '',
    pontoReferencia: '',
    nomeContato: '',
    email: '',
    telefone: '',
    loading: false,
    fieldFalha: {
      cpfOuCnpj: false,
      razaoSocial: false,
      cep: false,
      estado: false,
      cidade: false,
      bairro: false,
      rua: false,
      numero: false,
      complemento: false,
      pontoReferencia: false,
    },
    message: {
      cpfOuCnpj: '',
      razaoSocial: '',
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      complemento: '',
      pontoReferencia: '',
    }
  }

  onChangeItem = (value) => {
    this.setState({
      nomeProduto: value
    })
  }

  componentDidMount = async () => {
    await this.getAllItens()
  }

  getAllItens = async () => {
    await getItens().then(
      resposta => this.setState({
        itemArray: resposta.data,
      })
    )
  }

  success = () => {
    message.success('A reserva foi efetuada');
  };

  error = () => {
    message.error('A reserva não foi efetuada');
  };

  getAddress = async (e) => {
    const cep = e.target.value
    try {
      const { fieldFalha, message } = this.state

      fieldFalha.estado = false
      fieldFalha.cidade = false
      fieldFalha.bairro = false
      fieldFalha.rua = false
      const address = await getAddressByZipCode(cep)

      // console.log(address)

      if (R.has('erro', address.data)) {
        fieldFalha.cep = true
        message.cep = 'Cep não encontrado.'

        this.setState({
          fieldFalha,
          message,
        })
      } else {
        this.setState({
          rua: address.data.logradouro,
          cidade: address.data.localidade,
          bairro: address.data.bairro,
          estado: address.data.uf,
        })
      }

    } catch (error) {
      const { fieldFalha, message } = this.state

      fieldFalha.cep = true
      message.cep = 'Cep inválido.'

      this.setState({
        fieldFalha,
        message
      })
    }
  }

  saveTargetNewReservaML = async () => {

    this.setState({
      loading: true
    })

    const values = {
      trackingCode: this.state.codigo,
      name: this.state.nomeOuRs,
      zipCode: this.state.cep,
      state: this.state.estado,
      city: this.state.cidade,
      neighborhood: this.state.bairro,
      street: this.state.rua,
      number: this.state.numero,
      cnpjOrCpf: this.state.cpfOuCnpj,
      freeMarkerParts: this.state.carrinho,
      complement: this.state.complemento,
      referencePoint: this.state.pontoReferencia,
    }

    const resposta = await NewReservaML(values)

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
        cpfOuCnpj: '',
        razaoSocial: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        complemento: '',
        pontoReferencia: '',
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

  onChangeSelect = (value) => {
    this.setState({
      estoque: value
    })
  }

  errorProduto = () => {
    message.error('O nome do produto é obrigatório para essa ação ser realizada');
  };

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
        quantCarrinho: this.state.quant,
        estoqueCarrrinho: this.state.estoque,
      },...this.state.carrinho],
      nomeProduto: 'Não selecionado',
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <div className='div-card-ML'>
        <div className='linhaTexto-ML'>
          <h1 className='h1-ML'>Reserva mercado-livre</h1>
        </div>

        <div className='div-linha-ML'>
        <div className='div-codigo-ML'>
          <div className='div-textCodigo-ML'>Código de rastreio:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='Os'
              value={this.state.codigo}
              placeholder="Código de rastreio"
              onChange={this.onChange}
              // onBlur={this.onBlurValidator}
              allowClear
            />
          </div>

          <div className='div-rs-ML'>
          <div className='div-textNome-ML'>Nome ou razão social:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='Os'
              value={this.state.nomeOuRs}
              placeholder="Digite o nome ou a razão social"
              onChange={this.onChange}
              // onBlur={this.onBlurValidator}
              allowClear
            />
          </div>         
        </div>

        <div className='div-linha-ML'>
        <div className='div-cep-ML'>
            <div className='div-text-ML'>Cep:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.cep ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o cep"
                name='cep'
                // value={this.state.cep}
                onChange={this.onChange}
                allowClear
                onBlur={this.getAddress}
              />
              {this.state.fieldFalha.cep ?
                <p className='div-feedbackError'>
                  {this.state.message.cep}
                </p> : null}
            </div>
          </div>

          <div className='div-uf-ML'>
            <div className='div-text-ML'>UF:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.estado ?
                    'div-inputError' :
                    'input-100'}
                placeholder="EX"
                name='estado'
                value={this.state.estado}
                onChange={this.onChange}
                allowClear
                // onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.estado ?
                <p className='div-feedbackError'>
                  {this.state.message.estado}
                </p> : null}
            </div>
          </div>

          <div className='div-cidade-ML'>
            <div className='div-text-ML'>Cidade:</div>
            <div className='div-inputs'> 
              <Input
                className={
                this.state.fieldFalha.cidade ?
                  'div-inputError' :
                  'input-100'}
                placeholder="Digite a cidade"
                name='cidade'
                value={this.state.cidade}
                onChange={this.onChange}
                allowClear
                // onBlur={this.onBlurValidator}
              />
               {this.state.fieldFalha.cidade ?
                <p className='div-feedbackError'>
                  {this.state.message.cidade}
                </p> : null} 
             </div> 
          </div>
        </div>

        <div className='div-linha-ML'>
        <div className='div-bairro-ML'>
            <div className='div-text-ML'>Bairro:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.bairro ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o bairro"
                name='bairro'
                value={this.state.bairro}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.bairro ?
                <p className='div-feedbackError'>
                  {this.state.message.bairro}
                </p> : null}
            </div>
          </div>

          <div className='div-rua-ML'>
            <div className='div-text-ML'>Rua:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.rua ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite a rua"
                name='rua'
                value={this.state.rua}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.rua ?
                <p className='div-feedbackError'>
                  {this.state.message.rua}
                </p> : null}
            </div>
          </div>

          <div className='div-n-ML'>
            <div className='div-text-ML'>Nº:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.numero ?
                    'div-inputError' :
                    'input-100'}
                placeholder="123456"
                name='numero'
                value={this.state.numero}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.numero ?
                <p className='div-feedbackError'>
                  {this.state.message.numero}
                </p> : null}
            </div>
          </div>
        </div>

        <div className='div-linha-ML'>
        <div className='div-comp-ML'>
            <div className='div-text-ML'>Compl:</div>
            <div className='div-inputs'>
              <Input
                className='input-100'
                placeholder="Digite o complemento"
                name='complemento'
                value={this.state.complemento}
                onChange={this.onChange}
                allowClear
              />
            </div>
          </div> 

           <div className='div-ref-ML'>
            <div className='div-textRef-ML'>Ponto de ref:</div>
            <div className='div-inputs'>
              <Input
                className='input-100'
                placeholder="Digite a referência"
                name='pontoReferencia'
                value={this.state.pontoReferencia}
                onChange={this.onChange}
                allowClear
              />
            </div>
          </div> 
        </div>

        <div className='div-linha-ML'>
        <div className='div-cpf-ML'>
          <div className='div-textRef-ML'>Cpf ou Cnpj:</div>
          <div className='div-inputs'>
            <Input
              className='input-100'
              placeholder="Digite a referência"
              name='pontoReferencia'
              value={this.state.pontoReferencia}
              onChange={this.onChange}
              allowClear
            />
            </div>
          </div> 
        </div>

        <div className='div-linhaSepareted-ML'></div>

        <div className='linhaTextoPecas-ML'>
          <h1 className='h1-ML'>Selecionar peças</h1>
        </div>

        <div className='div-linha-ML'>
        <div className='div-nome-ML'>
          <div className='div-textNomeProduto-ML'>Nome do produto:</div>
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
              {this.state.itemArray.map((value)=> <Option value={value.name}>{value.name}</Option>)}
            </Select>
          </div>  

          <div className='div-quant-ML'>
            <div className='div-text-ML'>Quant:</div>
            <InputNumber min={1} defaultValue={this.state.quant} value={this.state.quant} onChange={this.onChangeQuant} />
          </div>
        </div>
          
        <div className='div-linha-ML'> 
        <div className='div-estoque-ML'>
          <div className='div-text-ML'>Estoque:</div>
          <Select value={this.state.estoque} style={{ width: '100%' }} onChange={this.onChangeSelect}>
            <Option value="REALPONTO">REALPONTO</Option>
            <Option value="NOVA REALPONTO">NOVA REALPONTO</Option>
            <Option value="PONTOREAL">PONTOREAL</Option>
          </Select>
          </div>  

          <Button className='button' type='primary' onClick={this.addCarrinho}>Adicionar</Button>
        </div>

        <div className='div-linhaSeparete-ML'></div>        

        {this.state.carrinho.length === 0 ? null : <div className='div-maior-ML'><div className='div-linhaSelecionados-ML'><h2 className='h2-ML'>Produtos selecionados</h2></div><div className='div-linha1-ML'><label className='label-produto-ML'>Produto</label><label className='label-quant-ML'>Quantidade</label></div><div className='div-linhaSepareteProdutos-ML'></div>{this.state.carrinho.map((valor) => <div className='div-linha-ML'><label className='label-produto-ML'>{valor.nomeProdutoCarrinho}</label><label className='label-quant-ML'>{valor.quantCarrinho} UN</label><Button type='primary' className='button-remove-ML' onClick={() => this.remove(valor)}>Remover</Button></div>)}</div>}

        <div className='div-buttonSalvar-ML'>
          <Button type='primary' className='button' onClick={this.saveTargetNewReservaML}>Salvar</Button>
        </div>

      </div>
    )
  }
}

export default ReservaML