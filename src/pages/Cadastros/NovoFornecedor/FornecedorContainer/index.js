import React, { Component } from 'react'
import './index.css'
import { Input, Button, message } from 'antd';
import { validators, masks } from './validators'
import * as R from 'ramda'
import { getAddressByZipCode, newFornecedor } from '../../../../services/fornecedores'

class NovoFornecedor extends Component {

  state = {
    messageError: false,
    messageSuccess: false,
    cnpj: '',
    razaoSocial: '',
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
      cnpj: false,
      razaoSocial: false,
      cep: false,
      estado: false,
      cidade: false,
      bairro: false,
      rua: false,
      numero: false,
      complemento: false,
      pontoReferencia: false,
      nomeContato: false,
      email: false,
      telefone: false,
    },
    message: {
      cnpj: '',
      razaoSocial: '',
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
    }
  }

  success = () => {
    message.success('O cadastro foi efetuado');
  };
  
  error = () => {
    message.error('O cadastro desse fornecedor não foi efetuado');
  };

  saveTargetNewFornecedor= async () => {

    this.setState({
      loading: true
    })

    const values = {
      razaoSocial: this.state.razaoSocial,
      cnpj: this.state.cnpj,
      street: this.state.rua,
      number: this.state.numero,
      city: this.state.cidade,
      state: this.state.estado,
      neighborhood: this.state.bairro,
      referencePoint: this.state.pontoReferencia,
      zipCode: this.state.cep,
      telphone: this.state.telefone,
      email: this.state.email,
      nameContact: this.state.nomeContato,
      complement: this.state.complemento,
      responsibleUser: 'modrp',
      relation: 'fornecedor'
    }

    const resposta = await newFornecedor(values)

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
        cnpj: '',
        razaoSocial: '',
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
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false
      })
    }
  }

  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    const { fieldFalha } = this.state

    if (nome === 'cnpj') fieldFalha.cnpj = false
    if (nome === 'razaoSocial') fieldFalha.razaoSocial = false
    if (nome === 'nomeContato') fieldFalha.nomeContato = false
    if (nome === 'email') fieldFalha.email = false
    if (nome === 'telefone') fieldFalha.telefone = false
    if (nome === 'cep') fieldFalha.cep = false
    if (nome === 'estado') fieldFalha.estado = false
    if (nome === 'cidade') fieldFalha.cidade = false
    if (nome === 'bairro') fieldFalha.bairro = false
    if (nome === 'rua') fieldFalha.rua = false
    if (nome === 'numero') fieldFalha.numero = false
    if (nome === 'pontoReferencia') fieldFalha.pontoReferencia = false

    this.setState({
      [nome]: valor,
      fieldFalha,
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

  render() {
    return (
      <div className='div-card-fornecedor'>
        <div className='linhaTexto-fornecedor'>
          <h1 className='h1-fornecedor'>Novo fornecedor</h1>
        </div>

        <div className='linha1-fornecedor'>
          <div className='div-cnpj-fornecedor'>
            <div className='div-text-fornecedor'>Cnpj:</div>
            <div className='div-inputs'>
              <Input
              className={
                this.state.fieldFalha.cnpj ?
                  'div-inputError' :
                  'input-100'}
                placeholder="Digite o cnpj"
                name='cnpj'
                value={this.state.cnpj}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.cnpj ?
                <p className='div-feedbackError'>
                  {this.state.message.cnpj}
                </p> : null}
            </div>
          </div>

          <div className='div-rs-fornecedor'>
            <div className='div-textRs-fornecedor'>Razão Social:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.razaoSocial ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite a razão social"
                name='razaoSocial'
                value={this.state.razaoSocial}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.razaoSocial ?
                <p className='div-feedbackError'>
                  {this.state.message.razaoSocial}
                </p> : null}
            </div>
          </div>
        </div>

        <div className='linha1-fornecedor'>
          <div className='div-cep-fornecedor'>
            <div className='div-text-fornecedor'>Cep:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.cep ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o cep"
                name='cep'
                value={this.state.cep}
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

          <div className='div-uf-fornecedor'>
            <div className='div-text-fornecedor'>UF:</div>
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
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.estado ?
                <p className='div-feedbackError'>
                  {this.state.message.estado}
                </p> : null}
            </div>
          </div>

          <div className='div-cidade-fornecedor'>
            <div className='div-text-fornecedor'>Cidade:</div>
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
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.cidade ?
                <p className='div-feedbackError'>
                  {this.state.message.cidade}
                </p> : null}
            </div>
          </div>
        </div>


        <div className='linha1-fornecedor'>
          <div className='div-bairro-fornecedor'>
            <div className='div-text-fornecedor'>Bairro:</div>
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

          <div className='div-rua-fornecedor'>
            <div className='div-text-fornecedor'>Rua:</div>
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

          <div className='div-n-fornecedor'>
            <div className='div-text-fornecedor'>Nº:</div>
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

        <div className='linha1-fornecedor'>
          <div className='div-comp-fornecedor'>
            <div className='div-text-fornecedor'>Compl:</div>
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

          <div className='div-ref-fornecedor'>
            <div className='div-textRef-fornecedor'>Ponto de ref:</div>
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

        <div className='linha1-fornecedor'>
          <div className='div-nome-fornecedor'>
            <div className='div-text-fornecedor'>Nome:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.nomeContato ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o nome"
                name='nomeContato'
                value={this.state.nomeContato}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.nomeContato ?
                <p className='div-feedbackError'>
                  {this.state.message.nomeContato}
                </p> : null}
            </div>
          </div>

          <div className='div-email-fornecedor'>
            <div className='div-text-fornecedor'>Email:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.email ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o email"
                name='email'
                value={this.state.email}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.email ?
                <p className='div-feedbackError'>
                  {this.state.message.email}
                </p> : null}
            </div>
          </div>

          <div className='div-tel-fornecedor'>
            <div className='div-text-fornecedor'>Telefone:</div>
            <div className='div-inputs'>
              <Input
                className={
                  this.state.fieldFalha.telefone ?
                    'div-inputError' :
                    'input-100'}
                placeholder="(11) 95771-2340"
                name='telefone'
                value={this.state.telefone}
                onChange={this.onChange}
                allowClear
                onBlur={this.onBlurValidator}
              />
              {this.state.fieldFalha.telefone ?
                <p className='div-feedbackError'>
                  {this.state.message.telefone}
                </p> : null}
            </div>
          </div>
        </div>

        <div className='linha-button-fornecedor'>
          <Button type="primary" className='button' onClick={this.saveTargetNewFornecedor} loading={this.state.loading}>Salvar</Button>
        </div>

      </div>
    )
  }
}

export default NovoFornecedor