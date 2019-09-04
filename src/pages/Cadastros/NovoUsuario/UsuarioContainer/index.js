import React, { Component } from 'react'
import './index.css'
import { Input, Select, Card, Checkbox, Switch, Button } from 'antd'
import { Redirect } from 'react-router-dom'

const { Option } = Select;

class NovoUsuario extends Component {

  state = {
    redirect: false,
    user: '',
    checkboxAble: false,
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
      return <Redirect to='/logged/novoTipoConta/add' />
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

  onChangeAble = () => {
    this.setState({
      checkboxAble: !this.state.checkboxAble
    })
  }

  render() {
    return (
      <div className='div-card-usuario'>
        <div className='linhaTexto-usuario'>
          <h1 className='h1-usuario'>Novo usuário</h1>
        </div>

        <div className='linha-usuario'>
          <div className='div-usuario-usuario'>
            <div className='div-text-usuario'>Usuário:</div>
            <Input
              className='input-100'
              placeholder="Digite o nome do usuário"
              name='user'
              value={this.state.user}
              onChange={this.onChange}
            />
          </div>

          <div className='div-tipo-usuario'>
            <div className='div-textTipo-usuario'>Tipo de conta:</div>
            <Select defaultValue="lucy" style={{ width: '100%' }} onChange={this.handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Button className='buttonadd-marca-produtos' type="primary" name='modalTipo' icon="plus" onClick={this.redirectReservaOs} />
            {this.renderRedirect()}
          </div>
        </div>

        <div className='linha-usuario'>
        <div className='div-able-usuario'>
          <div className='div-textAble-usuario'>Habilitar customização: </div>
          <Switch checked={this.state.checkboxAble} onChange={this.onChangeAble}/>
          </div>
        </div>

        <div className='linha1-usuario'>
          <div className='div-cardInfo-usuario'>
            <Card className='card-usuario'>
            {this.state.checkboxAble === false ? <div className='checkbox-card-usuario'>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEntry} name='addEntry' disabled>Adicionar entrada</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addPart} name='addPart' disabled>Adicionar peça</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addCompany} name='addCompany' disabled>Adicionar empresa</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addAnalyze} name='addAnalyze' disabled>Adicionar analise</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEquip} name='addEquip' disabled>Adicionar equipamento</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addAccessories} name='addAccessories' disabled>Adicionar acessórios</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTypeAccount} name='addTypeAccount' disabled>Adicionar tipo de conta</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addUser} name='addUser' disabled>Adicionar usuário</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEquipType} name='addEquipType' disabled>Adicionar tipo de equipamento</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.tecnico} name='tecnico' disabled>Acesso a tela técnico</Checkbox> </div> : <div className='checkbox-card-usuario'>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEntry} name='addEntry'>Adicionar entrada</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addPart} name='addPart'>Adicionar peça</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addCompany} name='addCompany'>Adicionar empresa</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addAnalyze} name='addAnalyze'>Adicionar analise</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEquip} name='addEquip'>Adicionar equipamento</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addAccessories} name='addAccessories'>Adicionar acessórios</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTypeAccount} name='addTypeAccount'>Adicionar tipo de conta</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addUser} name='addUser'>Adicionar usuário</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEquipType} name='addEquipType'>Adicionar tipo de equipamento</Checkbox>
                <Checkbox onChange={this.onChangePermission} checked={this.state.permission.tecnico} name='tecnico'>Acesso a tela técnico</Checkbox> </div>}
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default NovoUsuario