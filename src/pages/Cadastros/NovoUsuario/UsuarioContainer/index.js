import React, { Component } from 'react'
import './index.css'
import { Input, Select, Card, Checkbox, Switch, Button, message } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { getTypeAccount, getResourcesByTypeAccount, NovoUsuarioService } from '../../../../services/usuario'

const { Option } = Select;

class NovoUsuario extends Component {

  state = {
    redirect: false,
    user: '',
    checkboxAble: false,
    permission: {
      addUser: false,
      addTypeAccount: false,
      responsibleUser: 'modrp',
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
      tecnico: false,
    },
    typeAccountArray: [],
    typeName: 'Selecione um tipo de conta'
  }

  success = () => {
    message.success('Novo usuário cadastrado');
  };
  
  error = () => {
    message.error('Usuário não cadastrado');
  };

  redirectReservaOs = () => {
    this.setState({
      redirect: true
    })
  }

  getAllTypeAccount = async () => {
    const query = {
      filters: {
        typeAccount: {
          specific: {
            stock: true,
          },
        },
      },
    }

    await getTypeAccount(query).then(
    resposta => this.setState({
      typeAccountArray: resposta.data.rows,
    }))
  }

  componentDidMount = async () => {
    await this.getAllTypeAccount()
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

  handleChange = async (value) => {
    await this.setState({
      typeName: value,
      checkboxAble: false,
    })

    const query = {
      filters: {
        typeAccount: {
          specific: {
            typeName: value,
          },
        },
      },
    }

    await getResourcesByTypeAccount(query).then(
    resposta => this.setState({
      permission:{
        addUser: resposta.data.addUser,
        addAccessories: resposta.data.addAccessories,
        addTypeAccount: resposta.data.addTypeAccount,
        addTec: resposta.data.addTec,
        addCar: resposta.data.addCar,
        addMark: resposta.data.addMark,
        addType: resposta.data.addType,
        addProd: resposta.data.addProd,
        addFonr: resposta.data.addFonr,
        addEntr: resposta.data.addEntr,
        addKit: resposta.data.addKit,
        addKitOut: resposta.data.addKitOut,
        addOutPut: resposta.data.addOutPut,
        addROs: resposta.data.addROs,
        addRML: resposta.data.addRML,
        gerROs: resposta.data.gerROs,
        delROs: resposta.data.delROs,
        updateRos: resposta.data.updateRos,
        tecnico: resposta.data.tecnico,
        addAnalyze: resposta.data.addAnalyze,
        addCompany: resposta.data.addCompany,
        addEntry: resposta.data.addEntry,
        addEquip: resposta.data.addEquip,
        addEquipType: resposta.data.addEquipType,
        addPart: resposta.data.addPart,
      }
    }))
  }

  saveTargetNewUser = async () => {

    this.setState({
      loading: true
    })

    const values = {
      username:this.state.user,
      typeName: this.state.typeName,
      customized: this.state.checkboxAble,
      addUser: this.state.permission.addUser,
      addTypeAccount: this.state.permission.addTypeAccount,
      responsibleUser: 'modrp',
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
      tecnico: this.state.permission.tecnico,
      addAnalyze: this.state.permission.addAnalyze,
      addCompany: this.state.permission.addCompany,
      addEntry: this.state.permission.addEntry,
      addEquip: this.state.permission.addEquip,
      addEquipType: this.state.permission.addEquipType,
      addPart: this.state.permission.addPart,
      addAccessories: this.state.permission.addAccessories,
    }

    const resposta = await NovoUsuarioService(values)

    console.log(values)

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
        typeName: 'Selecione um tipo de conta',
        user: '',
        checkboxAble: false,
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
          tecnico: false,
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
            {this.state.typeAccountArray.length !== 0 ?
              <Select value={this.state.typeName} style={{ width: '100%' }} onChange={this.handleChange}>
                {this.state.typeAccountArray.map((valor) => 
                <Option value={valor.typeName}>{valor.typeName}</Option>)}
              </Select> :
            <Select value='Nenhum tipo de conta cadastrado'></Select>}
            {this.props.auth.addTypeAccount ? <Button className='buttonadd-marca-produtos' type="primary" name='modalTipo' icon="plus" onClick={this.redirectReservaOs}/> : null }
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
            {this.state.checkboxAble === false ? 
            <div className='div-flex-usuario'>
            <div className='checkbox-card-tipo'>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addUser} name='addUser' disabled>Adicionar usuário</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTypeAccount} name='addTypeAccount' disabled>Adicionar tipo de conta</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTec} name='addTec' disabled>Adicionar técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addCar} name='addCar' disabled>Adicionar carro</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addMark} name='addMark' disabled>Adicionar marca do carro</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addType} name='addType' disabled>Adicionar tipo de equipamento</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addProd} name='addProd' disabled>Adicionar produto</Checkbox> 
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addFonr} name='addFonr' disabled>Adicionar fornecedor</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEntr} name='addEntr' disabled>Adicionar entrada</Checkbox>
              </div>
              <div className='checkbox-card-tipo' disabled>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addKit} name='addKit' disabled>Gerenciar kit do técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addKitOut} name='addKitOut' disabled>Baixa no kit do técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addOutPut} name='addOutPut' disabled>Baixa na Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addROs} name='addROs' disabled>Adicionar reserva por Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addRML} name='addRML' disabled>Adicionar reserva por mercado livre</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.gerROs} name='gerROs' disabled>Gerenciar reserva Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.delROs} name='delROs' disabled>Deletar reserva por Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.updateRos} name='updateRos' disabled>Atualizar reserva por Os</Checkbox> 
            </div>
            </div> : 
            <div className='div-flex-usuario'>
              <div className='checkbox-card-tipo'>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addUser} name='addUser'>Adicionar usuário</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTypeAccount} name='addTypeAccount'>Adicionar tipo de conta</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addTec} name='addTec'>Adicionar técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addCar} name='addCar'>Adicionar carro</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addMark} name='addMark'>Adicionar marca do carro</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addType} name='addType'>Adicionar tipo de equipamento</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addProd} name='addProd'>Adicionar produto</Checkbox> 
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addFonr} name='addFonr'>Adicionar fornecedor</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addEntr} name='addEntr'>Adicionar entrada</Checkbox>
              </div>
              <div className='checkbox-card-tipo'>
             <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addKit} name='addKit'>Gerenciar kit do técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addKitOut} name='addKitOut'>Baixa no kit do técnico</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addOutPut} name='addOutPut'>Baixa na Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addROs} name='addROs'>Adicionar reserva por Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.addRML} name='addRML'>Adicionar reserva por mercado livre</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.gerROs} name='gerROs'>Gerenciar reserva Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.delROs} name='delROs'>Deletar reserva por Os</Checkbox>
              <Checkbox onChange={this.onChangePermission} checked={this.state.permission.updateRos} name='updateRos'>Atualizar reserva por Os</Checkbox>  
              </div>
              </div>}
            </Card>
          </div>
        </div>

        {this.state.user !== '' ? <div className='div-button-tipo'>
              <Button type='primary' className='button' onClick={this.saveTargetNewUser} loading={this.state.loading}>Salvar</Button>
        </div> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(NovoUsuario)