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
    zipCode: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complemento: '',
    pontoReferencia: '',
    nameContact: '',
    email: '',
    telphone: '',
    loading: false,
    fieldFalha: {
      cnpj: false,
      razaoSocial: false,
      zipCode: false,
      state: false,
      city: false,
      neighborhood: false,
      street: false,
      number: false,
      complemento: false,
      pontoReferencia: false,
      nameContact: false,
      email: false,
      telphone: false,
    },
    message: {
      cnpj: '',
      razaoSocial: '',
      zipCode: '',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complemento: '',
      pontoReferencia: '',
      nameContact: '',
      email: '',
      telphone: '',
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
      street: this.state.street,
      number: this.state.number,
      city: this.state.city,
      state: this.state.state,
      neighborhood: this.state.neighborhood,
      referencePoint: this.state.pontoReferencia,
      zipCode: this.state.zipCode,
      telphone: this.state.telphone,
      email: this.state.email,
      nameContact: this.state.nameContact,
      complement: this.state.complemento,
      responsibleUser: 'modrp',
      relation: 'fornecedor'
    }

    const resposta = await newFornecedor(values)

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
        zipCode: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        complemento: '',
        pontoReferencia: '',
        nameContact: '',
        email: '',
        telphone: '',
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
    if (nome === 'nameContact') fieldFalha.nameContact = false
    if (nome === 'email') fieldFalha.email = false
    if (nome === 'telphone') fieldFalha.telphone = false
    if (nome === 'zipCode') fieldFalha.zipCode = false
    if (nome === 'state') fieldFalha.state = false
    if (nome === 'city') fieldFalha.city = false
    if (nome === 'neighborhood') fieldFalha.neighborhood = false
    if (nome === 'street') fieldFalha.street = false
    if (nome === 'number') fieldFalha.number = false
    if (nome === 'pontoReferencia') fieldFalha.pontoReferencia = false

    this.setState({
      [nome]: valor,
      fieldFalha,
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
    const zipCode = e.target.value
    try {
      const { fieldFalha, message } = this.state

      fieldFalha.state = false
      fieldFalha.city = false
      fieldFalha.neighborhood = false
      fieldFalha.street = false
      const address = await getAddressByZipCode(zipCode)

      if (R.has('erro', address.data)) {
        fieldFalha.zipCode = true
        message.zipCode = 'Cep não encontrado.'

        this.setState({
          fieldFalha,
          message,
        })
      } else {
        this.setState({
          street: address.data.logradouro,
          city: address.data.localidade,
          neighborhood: address.data.bairro,
          state: address.data.uf,
        })
      }

    } catch (error) {
      const { fieldFalha, message } = this.state

      fieldFalha.zipCode = true
      message.zipCode = 'Cep inválido.'

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
                allowClear={!this.state.fieldFalha.cnpj}
                className={
                this.state.fieldFalha.cnpj ?
                  'div-inputError' :
                  'input-100'}
                placeholder="Digite o cnpj"
                name='cnpj'
                value={this.state.cnpj}
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

          <div className='div-rs-fornecedor'>
            <div className='div-textRs-fornecedor'>Razão Social:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.razaoSocial}
                className={
                  this.state.fieldFalha.razaoSocial ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite a razão social"
                name='razaoSocial'
                value={this.state.razaoSocial}
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

        <div className='linha1-fornecedor'>
          <div className='div-cep-fornecedor'>
            <div className='div-text-fornecedor'>Cep:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.zipCode}
                className={
                  this.state.fieldFalha.zipCode?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o cep"
                name='zipCode'
                value={this.state.zipCode}
                onChange={this.onChange}
                onBlur={this.getAddress}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.zipCode ?
                <p className='div-feedbackError'>
                  {this.state.message.zipCode}
                </p> : null}
            </div>
          </div>

          <div className='div-uf-fornecedor'>
            <div className='div-text-fornecedor'>UF:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.state}
                className={
                  this.state.fieldFalha.state ?
                    'div-inputError' :
                    'input-100'}
                placeholder="EX"
                name='state'
                value={this.state.state}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.state ?
                <p className='div-feedbackError'>
                  {this.state.message.state}
                </p> : null}
            </div>
          </div>

          <div className='div-cidade-fornecedor'>
            <div className='div-text-fornecedor'>Cidade:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.city}
                className={
                this.state.fieldFalha.city ?
                  'div-inputError' :
                  'input-100'}
                placeholder="Digite a cidade"
                name='city'
                value={this.state.city}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.city ?
                <p className='div-feedbackError'>
                  {this.state.message.city}
                </p> : null}
            </div>
          </div>
        </div>


        <div className='linha1-fornecedor'>
          <div className='div-bairro-fornecedor'>
            <div className='div-text-fornecedor'>Bairro:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.neighborhood}
                className={
                  this.state.fieldFalha.neighborhood ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o bairro"
                name='neighborhood'
                value={this.state.neighborhood}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.neighborhood ?
                <p className='div-feedbackError'>
                  {this.state.message.neighborhood}
                </p> : null}
            </div>
          </div>

          <div className='div-rua-fornecedor'>
            <div className='div-text-fornecedor'>Rua:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.street}
                className={
                  this.state.fieldFalha.street ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite a rua"
                name='street'
                value={this.state.street}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.street ?
                <p className='div-feedbackError'>
                  {this.state.message.street}
                </p> : null}
            </div>
          </div>

          <div className='div-n-fornecedor'>
            <div className='div-text-fornecedor'>Nº:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.number}
                className={
                  this.state.fieldFalha.number ?
                    'div-inputError' :
                    'input-100'}
                placeholder="123456"
                name='number'
                value={this.state.number}
                onChange={this.onChange}
              />
              {this.state.fieldFalha.number ?
                <p className='div-feedbackError'>
                  {this.state.message.number}
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
                allowClear={!this.state.fieldFalha.nameContact}
                className={
                  this.state.fieldFalha.nameContact ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o nome"
                name='nameContact'
                value={this.state.nameContact}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.nameContact ?
                <p className='div-feedbackError'>
                  {this.state.message.nameContact}
                </p> : null}
            </div>
          </div>

          <div className='div-email-fornecedor'>
            <div className='div-text-fornecedor'>Email:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.email}
                className={
                  this.state.fieldFalha.email ?
                    'div-inputError' :
                    'input-100'}
                placeholder="Digite o email"
                name='email'
                value={this.state.email}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
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
                allowClear={!this.state.fieldFalha.telphone}
                className={
                  this.state.fieldFalha.telphone ?
                    'div-inputError' :
                    'input-100'}
                placeholder="(11) 95771-2340"
                name='telphone'
                value={this.state.telphone}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.telphone ?
                <p className='div-feedbackError'>
                  {this.state.message.telphone}
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