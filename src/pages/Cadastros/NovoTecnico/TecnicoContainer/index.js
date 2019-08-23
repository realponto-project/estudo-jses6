import React, { Component } from 'react'
import './index.css'
import { Input, Button, Select, Modal, message } from 'antd'
import { validators, masks } from './validators'
import { newTecnico, newCarro, getCarro } from '../../../../services/tecnico'


const { Option } = Select;

class NovoTecnico extends Component{

  state={
    carroArray:[],
    messageError: false,
    messageSuccess: false,
    nome: '',
    cnh: '',
    carro: '',
    placa: 'Selecione o carro',
    rodizio: '',
    loading: false,
    modalCarro: false,
    newModelo: '',
    newPlaca: '',
    newAno: '',
    fieldFalha:{
      nome: false,
      cnh: false,
    },
    message:{
      nome: '',
      cnh: '',
    },
  }

  getAllCarro = async () => {
      await getCarro().then(
      resposta => this.setState({
        carroArray: resposta.data,
      })
    )
  }

  success = () => {
    message.success('O cadastro foi efetuado');
  };
  
  error = () => {
    message.error('O cadastro não foi efetuado');
  };

  onChangeSelect = async (value) => {
    await this.setState({
      placa: value
    })
  
    this.rodizio()
  }

  rodizio = () => {
    if(this.state.placa[this.state.placa.length - 1] === '1' ){
      this.setState({
        rodizio: 'SEGUNDA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '2'  ){
      this.setState({
        rodizio: 'SEGUNDA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '3'  ){
      this.setState({
        rodizio: 'TERÇA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '4' ){
      this.setState({
        rodizio: 'TERÇA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '5' ){
      this.setState({
        rodizio: 'QUARTA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '6'  ){
      this.setState({
        rodizio: 'QUARTA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '7'  ){
      this.setState({
        rodizio: 'QUINTA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '8' ){
      this.setState({
        rodizio: 'QUINTA'
      })
    }else if(this.state.placa[this.state.placa.length - 1] === '9' ){
      this.setState({
        rodizio: 'SEXTA'
      })
    }
    else if(this.state.placa[this.state.placa.length - 1] === '0' ){
      this.setState({
        rodizio: 'SEXTA'
      })
    }
  }

  saveTargetNewFornecedor= async () => {

    this.setState({
      loading: true
    })

    const values = {
      name: this.state.nome,
      CNH: this.state.cnh,
      plate: this.state.placa,
    }

    const resposta = await newTecnico(values)

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
        nome: '',
        cnh: '',
        placa: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false
      })
    }
  }

  saveTargetNewCarro= async () => {

    this.setState({
      loading: true
    })

    const values = {
      model: this.state.newModelo,
      year: this.state.newAno,
      plate: this.state.newPlaca
    }

    const resposta = await newCarro(values)

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
        newModelo: '',
        newPlaca: '',
        newAno: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false,
        modalCarro: false
      })
    }

    this.getAllCarro()
  }

  openModal = () => {
    this.setState({
      modalCarro: true
    })
  }

  handleOk = () => {
    this.setState({
      modalCarro: false,
      newAno: '',
      newModelo: '',
      newPlaca: ''
    })
  }

  componentDidMount = async () => {
    await this.getAllCarro()
  }


  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    this.setState({
      [nome]: valor,
    })
  }

  onChangeNormal = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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

  onFocusCar = () => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        car: false,
      },
      message: {
        ...this.state.message,
        car: false,
      },
    })
  }

  modalCarro = () => (
    <Modal
      title="Adicionar carro"
      visible={this.state.modalCarro}
      onOk={this.saveTargetNewCarro}
      okText='Salvar'
      onCancel={this.handleOk}
      cancelText='Cancelar'
    >
      <div className='linhaModal-tecnico'>
        <div className='div-modeloModal-tecnico'>
          <div className='div-text-tecnico'>Modelo:</div>
          <Input
            className='input-100'
            placeholder="Digite o modelo"
            name='newModelo'
            value={this.state.newModelo}
            onChange={this.onChangeNormal}
            allowClear
          />
        </div>
      </div>

      <div className='linhaModal-tecnico'>
        <div className='div-anoModal-tecnico'>
          <div className='div-text-tecnico'>Ano:</div>
          <Input
            className='input-100'
            placeholder="2019"
            name='newAno'
            value={this.state.newAno}
            onChange={this.onChange}
            allowClear
          />
        </div>
      </div>

      <div className='linhaModal-tecnico'>
        <div className='div-placaModal-tecnico'>
          <div className='div-text-tecnico'>Placa:</div>
          <Input
            className='input-100'
            placeholder="ABC-1234"
            name='newPlaca'
            value={this.state.newPlaca}
            onChange={this.onChange}
            allowClear
          />
        </div>
      </div>
    </Modal>
  )

  render(){
    return(
      <div className='div-card-tecnico'>
        <div className='linhaTexto-tecnico'>
          <h1 className='h1-tecnico'>Técnico</h1>
        </div>

        <div className='linha1-tecnico'>
          <div className='div-nome-tecnico'>
            <div className='div-text-tecnico'>Nome:</div>
              <div className='div-inputs'>
                <Input
                  allowClear={!this.state.fieldFalha.nome}
                  className={
                    this.state.fieldFalha.nome ?
                      'div-inputError-tecnico' :
                      'input-100'}
                  placeholder="Digite o nome"
                  name='nome'
                  value={this.state.nome}
                  onChange={this.onChangeNormal}
                  onBlur={this.onBlurValidator}
                  onFocus={this.onFocus} 
                />
                {this.state.fieldFalha.nome ?
                  <p className='div-feedbackError'>
                    {this.state.message.nome}
                  </p> : null}
              </div>
          </div>

          <div className='div-cnh-tecnico'>
            <div className='div-textCNH-tecnico'>Validade CNH:</div>
            <div className='div-inputs'>
              <Input
                allowClear={!this.state.fieldFalha.cnh}
                className={
                  this.state.fieldFalha.cnh ?
                    'div-inputError-tecnico' :
                    'input-100'}
                placeholder="DD/MM/AAAA"
                name='cnh'
                value={this.state.cnh}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
              />
              {this.state.fieldFalha.cnh ?
                  <p className='div-feedbackError'>
                    {this.state.message.cnh}
                  </p> : null}
            </div>
          </div>
        </div>

        <div className='linhaSemEspaco-tecnico'>
          <div className='div-carro-tecnico'>
            <div className='div-text-tecnico'>Carro:</div>
            <div className='div-inputs'>
            {this.state.carroArray.length !== 0 ?
              <Select
                value={this.state.placa}
                style={{ width: '100%' }}
                name='car'
                onFocus={this.onFocusCar}
                className={this.state.fieldFalha.car ? 'div-inputError-produtos' : 'input-100'}
                onChange={this.onChangeSelect}>
            {this.state.carroArray.map((valor) => 
            <Option value={valor.plate}>{`${valor.model} ${valor.plate}`}</Option>)}</Select> :
            <Select value='Nenhum carro cadastrado'></Select>}
            {this.state.fieldFalha.car ?
              <p className='div-feedbackError'>
                {this.state.message.car}
              </p> : null}
            </div>           
          <Button className='buttonadd-marca-tecnico' type="primary" icon="plus" onClick={this.openModal} />
          </div>

          <div className='div-rodizio-tecnico'>
            <div className='div-text-tecnico'>Rodízio:</div>
            <Input
              readOnly
              className='input-100'
              name='rodizio'
              value={this.state.rodizio}
              placeholder='Selecione o carro'
            />
            <this.modalCarro/>
          </div>
        </div>

        <div className='linha-button-tecnico'>
          <Button className='button' type="primary" onClick={this.saveTargetNewFornecedor} loading={this.state.loading}>Salvar</Button>
        </div>
      </div>
    )
  }
}

export default NovoTecnico