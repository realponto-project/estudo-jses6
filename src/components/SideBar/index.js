import React, { Component } from 'react'
import { Menu, Icon, Tooltip } from 'antd';
import './index.css'
import { Redirect } from 'react-router-dom'
import { Logout } from '../../pages/Login/LoginRedux/action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const SubMenu = Menu.SubMenu;

class SideBar extends Component {

  state = {
    current: '0',
    redirect: false,
    open: [],
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token)

    this.setState({
      current: 'logout',
      redirect: true,
    })
  }

  handleClickCompany = (current, keyPath) => {
    
    this.setState({
      current,
      redirect: true,
      open: [
        keyPath
      ]
    })
  }

  changeRedirectState = () => {
    this.setState({
      redirect: false
    })
  }


  handleClickAtalhos = (current, keyPath) => {
    this.setState({
      current,
      redirect: true,
      open: [
        keyPath
      ]
    })
  }


  handleClick = e => {
    this.setState({
      current: e.key,
      redirect: true,
      open: [
        e.keyPath[1]
      ]
    })
  }

  render() {
    if (this.state.redirect) {
      this.changeRedirectState()
      switch (this.state.current) {
        case 'novoUsuario_add':
          return <Redirect to='/logged/novoUsuario/add' />
        case 'novoTipoConta_add':
          return <Redirect to='/logged/novoTipoConta/add' />
        case 'newTecnico_add':
          return <Redirect to='/logged/novoTecnico/add' />
        case 'novoProduto_add':
          return <Redirect to='/logged/novoProduto/add' />
        case 'novoFornecedor_add':
          return <Redirect to='/logged/novoFornecedor/add' />
        case 'entrada_add':
          return <Redirect to='/logged/entrada/add' />
        case 'entrada_dash':
          return <Redirect to='/logged/gerenciarEntrada/dash' />
        case 'estoque_dash':
          return <Redirect to='/logged/estoque/dash' />
        case 'reservaKit_dash':
          return <Redirect to='/logged/reservaKit/dash' />
        case 'reservaKit_add':
          return <Redirect to='/logged/reservaKitAdd/add' />
        case 'reservaTecnico_dash':
          return <Redirect to='/logged/reservaTecnico/dash' />
        case 'reservaOs_dash':
          return <Redirect to='/logged/reservaOs/dash' />
        case 'Os_dash':
          return <Redirect to='/logged/Os/dash' />
        case 'searchOs_dash':
          return <Redirect to='/logged/searchOs/dash' />
        case 'reservaML_dash':
          return <Redirect to='/logged/reservaML/dash' />
        case 'relatorioOs_dash':
          return <Redirect to='/logged/relatorioOs/dash' />
        case 'relatorioPerda_dash':
          return <Redirect to='/logged/relatorioPerda/dash' />
        case 'relatorioML_dash':
          return <Redirect to='/logged/relatorioML/dash' />
        case 'perfil_dash':
          return <Redirect to='/logged/perfil/dash' />
        case 'logout':
          return <Redirect to='/login' />
        default:
          return <Redirect to='/logged/dash' />
      }
    }
    return (
      <div>
        <div className='menuIcon'>

          <Tooltip placement="bottom" title={'Logout'} >
            <Icon key='logout' className='menuIcon-icon' type="logout"
              onClick={() => this.logout()}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={'Nova entrada'} >
            <Icon
              className={this.props.auth.addEntr ? 'menuIcon-icon' : 'menuIcon-icon-notPermission'}
              type="shopping-cart"
              onClick={this.props.auth.addEntr? ()=> this.handleClickCompany("entrada_add", "Entrada") : null }/>
          </Tooltip>

          <Tooltip placement="bottom" title={'Estoque'} >
            <Icon className='menuIcon-icon' type="stock" onClick={()=> this.handleClickCompany("estoque_dash", "Entrada")}/>
          </Tooltip>
          
          <Tooltip placement="bottom" title={'Perfil'} >
            <Icon className='menuIcon-icon' type="user" onClick={()=> this.handleClickCompany("perfil_dash")}/>
          </Tooltip>

        </div>

        <Menu
          className='menu'
          theme='dark'
          onClick={this.handleClick}
          defaultOpenKeys={this.state.open}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu
            key="Cadastros"
            title={
              <span>
                <Icon type="plus" />
                <span>Cadastros</span>
              </span>
            }
          >
            <Menu.Item disabled={!this.props.auth.addUser} key="novoUsuario_add"><Icon type="user" />Usuário</Menu.Item>
            <Menu.Item disabled={!this.props.auth.addTec} key="newTecnico_add"><Icon type="user-add" />Técnico</Menu.Item>
            <Menu.Item disabled={!this.props.auth.addProd} key="novoProduto_add"><Icon type="setting" />Produto</Menu.Item>
            <Menu.Item disabled={!this.props.auth.addFonr} key="novoFornecedor_add"><Icon type="bank" />Fornecedor</Menu.Item>
          </SubMenu>
          <SubMenu
            key="Entrada"
            title={
              <span>
                <Icon type="shop" />
                <span>Entrada</span>
              </span>
            }
          >
            <Menu.Item disabled={!this.props.auth.addEntr} key="entrada_add"><Icon type="shopping-cart" />Nova</Menu.Item>
            <Menu.Item key="entrada_dash"><Icon type="unordered-list" />Gerenciar</Menu.Item>
          </SubMenu>
          <SubMenu
            key="Estoque"
            title={
              <span>
                <Icon type="stock" />
                <span>Estoque</span>
              </span>
            }
          >
            <Menu.Item key="estoque_dash"><Icon type="unordered-list" />Gerenciar</Menu.Item>
          </SubMenu>

          <SubMenu
            key="Reserva"
            title={
              <span>
                <Icon type="pushpin" />
                <span>Reserva</span>
              </span>
            }
          >
            <Menu.Item disabled={!this.props.auth.addKitOut} key="reservaKit_dash"><Icon type="shopping" />Kit</Menu.Item>
            <Menu.Item disabled={!this.props.auth.addOutPut} key="reservaTecnico_dash"><Icon type="user" />Técnico</Menu.Item>
            <Menu.Item disabled={!this.props.auth.addROs} key="reservaOs_dash"><Icon type="file-add" />Nova Os</Menu.Item>
            <Menu.Item disabled={!this.props.auth.addRML} key="reservaML_dash"><Icon type="ie" />Mercado Livre</Menu.Item>
            <Menu.Item disabled={!this.props.auth.gerROs} key="Os_dash"><Icon type="unordered-list" />Gerenciar Os</Menu.Item>
          </SubMenu>

          <SubMenu
            key="Relatorios"
            title={
              <span>
                <Icon type="area-chart" />
                <span>Relatórios</span>
              </span>
            }
          >
            <Menu.Item key="relatorioOs_dash"><Icon type="file-search" />Os</Menu.Item>
            <Menu.Item key="relatorioPerda_dash"><Icon type="alert" />Perda</Menu.Item>
            <Menu.Item key="relatorioML_dash"><Icon type="ie" />Mercado Livre</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout }, dispach)
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(SideBar)