import React, { Component } from 'react'
import './index.css'
import { Icon, Input, Card, Checkbox, Button, message } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NovoTipoContaService } from '../../../../services/novoTipoConta' 

class NovoTipoConta extends Component {

  state={
    loading: false,
    messageError: false,
    messageSuccess: false,
    redirect: false,
    typeAccount: '',
    permission: {
      todas: false,
      addUser: false,
      addTypeAccount: false,
      responsibleUser: 'modrp',
      stock: true,
      labTec: false,
      addTec: false,
      addCar: false,
      addMark: false,
      addType: false,
      addProd: false,
      addFonr: false,
      addEntr: false,
      addKit: false,
      addKitOut: false,
      addOutPut: false,
      addROs: false,
      addRML: false,
      gerROs: false,
      delROs: false,
      updateRos: false,
    },
  }

  todas = async () =>{
    await this.setState({
      permission:{
        todas: !this.state.permission.todas
      }
    })

    if(this.state.permission.todas){
      await this.setState({
        permission: {
          todas: true,
          addUser: true,
          addTypeAccount: true,
          responsibleUser: 'modrp',
          stock: true,
          labTec: true,
          addTec: true,
          addCar: true,
          addMark: true,
          addType: true,
          addProd: true,
          addFonr: true,
          addEntr: true,
          addKit: true,
          addKitOut: true,
          addOutPut: true,
          addROs: true,
          addRML: true,
          gerROs: true,
          delROs: true,
          updateRos: true,
        }
      })
    }else if(!this.state.permission.todas){
      await this.setState({
        permission: {
          todas: false,
          addUser: false,
          addTypeAccount: false,
          responsibleUser: 'modrp',
          stock: true,
          labTec: false,
          addTec: false,
          addCar: false,
          addMark: false,
          addType: false,
          addProd: false,
          addFonr: false,
          addEntr: false,
          addKit: false,
          addKitOut: false,
          addOutPut: false,
          addROs: false,
          addRML: false,
          gerROs: false,
          delROs: false,
          updateRos: false,
        }
      })
    }
  }

  success = () => {
    message.success('Novo tipo de conta cadastrado');
  };
  
  error = () => {
    message.error('Tipo de conta não cadastrado');
  };

  redirectReservaOs = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {

    if (!this.props.auth.addTypeAccount) {
      return <Redirect to='/logged/dash' />
    }

    if (this.state.redirect) {
      return <Redirect push to='/logged/novoUsuario/add' />
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangePermission = async (e) => {
    await this.setState({
      permission: {
        ...this.state.permission,
        [e.target.name]: e.target.checked
      }
    })
  }

  saveTargetNewType = async () => {

    this.setState({
      loading: true
    })

    const values = {
      typeName: this.state.typeAccount,
      addCompany: false,
      addPart: false,
      addAnalyze: false,
      addEquip: false,
      addEntry: false,
      addEquipType: false,
      tecnico: false,
      addAccessories: false,
      addUser: this.state.permission.addUser,
      addTypeAccount: this.state.permission.addTypeAccount,
      responsibleUser: 'modrp',
      stock: true,
      labTec: false,
      addTec: this.state.permission.addTec,
      addCar: this.state.permission.addCar,
      addMark: this.state.permission.addMark,
      addType: this.state.permission.addType,
      addProd: this.state.permission.addProd,
      addFonr: this.state.permission.addFonr,
      addEntr: this.state.permission.addEntr,
      addKit: this.state.permission.addKit,
      addKitOut: this.state.permission.addKitOut,
      addOutPut: this.state.permission.addOutPut,
      addROs: this.state.permission.addROs,
      addRML: this.state.permission.addRML,
      gerROs: this.state.permission.gerROs,
      delROs: this.state.permission.delROs,
      updateRos: this.state.permission.updateRos,
    }

    const resposta = await NovoTipoContaService(values)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
      })
      await this.error()
      this.setState({
        loading:false,
        messageError: false,
      })
    } if (resposta.status === 200) {

      this.setState({
        typeAccount: '',
        permission: {
          addUser: false,
          addTypeAccount: false,
          responsibleUser: 'modrp',
          stock: true,
          labTec: false,
          addTec: false,
          addCar: false,
          addMark: false,
          addType: false,
          addProd: false,
          addFonr: false,
          addEntr: false,
          addKit: false,
          addKitOut: false,
          addOutPut: false,
          addROs: false,
          addRML: false,
          gerROs: false,
          delROs: false,
          updateRos: false,
        },
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false,
      })
    }
  }


  render() {
    return (
      <div className='div-card-tipo'>
        <div className='linhaTexto-tipo'>
          <div className='div-nome-40'>
            <div><Icon type="arrow-left" onClick={() => this.redirectReservaOs()}/></div>
            {this.renderRedirect()}
          </div>
          <div className='div-nome-60'>
            <h1 className='h1-tipo'>Novo tipo de conta</h1>
          </div>
        </div>

        <div className='linha-tipo'>
          <div className='div-tipo-tipo'>
            <div className='div-text-tipo'>Novo tipo de conta:</div>
            <Input
              className='input-100'
              placeholder="Digite o novo tipo de conta"
              name='typeAccount'
              value={this.state.typeAccount}
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className='linha1-tipo'>
          <div className='div-cardInfo-tipo'>
            <Card className='card-tipo'>
            <div className='checkbox-card-tipo'>
              <Checkbox onChange={this.todas} checked={this.state.permission.todas} name='todas'>Selecionar todas</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addUser} name='addUser'>Adicionar usuário</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTypeAccount} name='addTypeAccount'>Adicionar tipo de conta</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTec} name='addTec'>Adicionar técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addCar} name='addCar'>Adicionar carro</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addMark} name='addMark'>Adicionar marca do carro</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addType} name='addType'>Adicionar tipo de equipamento</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addProd} name='addProd'>Adicionar produto</Checkbox> 
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addFonr} name='addFonr'>Adicionar fornecedor</Checkbox>
              </div>
              <div className='checkbox-card-tipo'>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEntr} name='addEntr'>Adicionar entrada</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addKit} name='addKit'>Gerenciar kit do técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addKitOut} name='addKitOut'>Baixa no kit do técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addOutPut} name='addOutPut'>Baixa na Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addROs} name='addROs'>Adicionar reserva por Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addRML} name='addRML'>Adicionar reserva por mercado livre</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.gerROs} name='gerROs'>Gerenciar reserva Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.delROs} name='delROs'>Deletar reserva por Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.updateRos} name='updateRos'>Atualizar reserva por Os</Checkbox> 
            </div>
            </Card>
          </div>
        </div>

        <div className='div-button-tipo'>
          <Button className='button' type='primary' loading={this.state.loading} onClick={this.saveTargetNewType}>Salvar</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(NovoTipoConta)