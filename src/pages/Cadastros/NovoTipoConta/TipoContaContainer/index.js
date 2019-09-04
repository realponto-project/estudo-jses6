import React, { Component } from 'react'
import './index.css'
import { Icon, Input, Card, Checkbox, Button } from 'antd'
import { Redirect } from 'react-router-dom'

class NovoTipoConta extends Component {

  state={
    redirect: false,
    typeAccount: '',
    permission:{
      permission: {
        addCompany: false,
        addPart: false,
        addAnalyze: false,
        addEquip: false,
        addEntry: false,
        addEquipType: false,
        tecnico: false,
        addAccessories: false,
        addUser: false,
        addTypeAccount: false,
      },
    }
  }

  redirectReservaOs = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/logged/novoUsuario/add' />
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangePermission = (e) => {

    this.setState({
      permission: {
        ...this.state.permission,
        [e.target.name]: e.target.checked
      }
    })
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
          <div className='div-cardInfo-usuario'>
            <Card className='card-usuario'>
            <div className='checkbox-card-usuario'>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEntry} name='addEntry'>Adicionar entrada</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addPart} name='addPart'>Adicionar peça</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addCompany} name='addCompany'>Adicionar empresa</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addAnalyze} name='addAnalyze'>Adicionar analise</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEquip} name='addEquip'>Adicionar equipamento</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addAccessories} name='addAccessories'>Adicionar acessórios</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTypeAccount} name='addTypeAccount'>Adicionar tipo de conta</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addUser} name='addUser'>Adicionar usuário</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEquipType} name='addEquipType'>Adicionar tipo de equipamento</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.tecnico} name='tecnico'>Acesso a tela técnico</Checkbox> 
            </div>
            </Card>
          </div>
        </div>

        <div className='div-button-tipo'>
          <Button className='button' type='primary'>Salvar</Button>
        </div>
      </div>
    )
  }
}

export default NovoTipoConta