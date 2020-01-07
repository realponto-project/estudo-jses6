import React, { Component } from "react";
import { Menu, Icon, Tooltip } from "antd";
import "./index.css";
import { Redirect } from "react-router-dom";
import { Logout } from "../../pages/Login/LoginRedux/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as R from "ramda";
import uuidValidate from "uuid-validate";

import { auth } from "../../services/auth";
import { hasNotifications } from "../../services/notificacao";

const SubMenu = Menu.SubMenu;

class SideBar extends Component {
  state = {
    notificacao: false,
    current: "0",
    redirect: false,
    open: [],
    auth: true
  };

  hasNotifications = async () => {
    await hasNotifications().then(resp =>
      this.setState({
        notificacao: resp.data
      })
    );
  };

  auth = async () => {
    const value = {
      token: this.props.auth.token,
      username: this.props.auth.username
    };

    let response = {};

    response = await auth(value).then(resp =>
      this.setState({
        auth: resp ? resp.data : false
      })
    );

    return response;
  };

  hasAuth = R.has("auth");
  hasToken = R.has("token");

  forceLogout = async () => {
    if (!this.hasAuth(this.props)) {
      await this.logout();
    } else if (!this.hasToken(this.props.auth)) {
      await this.logout();
    } else if (!uuidValidate(this.props.auth.token)) {
      await this.logout();
    }
  };

  componentDidMount = async () => {
    await this.forceLogout();
  };

  logout = async () => {
    await this.props.Logout(this.props.auth.token);

    this.setState({
      current: "logout",
      redirect: true
    });
  };

  handleClickCompany = async (current, keyPath) => {
    await this.auth();

    if (!this.state.auth) {
      await this.logout();
      return;
    }

    this.setState({
      current,
      redirect: true,
      open: [keyPath]
    });
  };

  changeRedirectState = () => {
    this.setState({
      redirect: false
    });
  };

  handleClickAtalhos = async (current, keyPath) => {
    await this.auth();

    if (!this.state.auth) {
      await this.logout();
      return;
    }

    this.setState({
      current,
      redirect: true,
      open: [keyPath]
    });
  };

  handleClick = async e => {
    await this.auth();

    if (!this.state.auth) {
      await this.logout();
      return;
    }

    this.setState({
      current: e.key,
      redirect: true,
      open: [e.keyPath[1]]
    });
  };

  render() {
    if (this.state.redirect) {
      this.changeRedirectState();
      switch (this.state.current) {
        case "novoUsuario_add":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/novoUsuario/add",
                state: { from: this.props.location }
              }}
            />
          );
        case "notificacao_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/notificacao/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "novoTipoConta_add":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/novoTipoConta/add",
                state: { from: this.props.location }
              }}
            />
          );
        case "newTecnico_add":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/novoTecnico/add",
                state: { from: this.props.location }
              }}
            />
          );
        case "novoProduto_add":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/novoProduto/add",
                state: { from: this.props.location }
              }}
            />
          );
        case "novoFornecedor_add":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/novoFornecedor/add",
                state: { from: this.props.location }
              }}
            />
          );
        case "gerenciarProduto_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/gerenciarProduto/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "entrada_add":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/entrada/add",
                state: { from: this.props.location }
              }}
            />
          );
        case "entrada_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/gerenciarEntrada/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "estoque_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/estoque/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "reservaKit_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/reservaKit/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "reservaKit_add":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/reservaKitAdd/add",
                state: { from: this.props.location }
              }}
            />
          );
        case "reservaTecnico_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/reservaTecnico/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "Rexterno_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/Rexterno/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "Rinterno_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/Rinterno/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "Os_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/Os/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "searchOs_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/searchOs/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "reservaML_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/reservaML/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "relatorioOs_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/relatorioOs/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "relatorioPerda_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/relatorioPerda/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "relatorioML_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/relatorioML/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "perfil_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/perfil/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "gerenciarProdutosDash_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/gerenciarProdutosDash/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "gerenciarFornecedor_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/gerenciarFornecedor/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "gerenciarUsuario_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/gerenciarUsuario/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "gerenciarTecnico_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/gerenciarTecnico/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "gerenciarEntrada_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/entradaDash/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "emprestimo_dash":
          return (
            <Redirect
              push
              to={{
                pathname: "/logged/emprestimo/dash",
                state: { from: this.props.location }
              }}
            />
          );
        case "logout":
          return <Redirect to="/login" />;
        default:
          return <Redirect to="/logged/dash" />;
      }
    }
    return (
      <div>
        <div className="menuIcon">
          <Tooltip placement="bottom" title={"Logout"}>
            <Icon
              key="logout"
              className="menuIcon-icon"
              type="logout"
              onClick={() => this.logout()}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={"Estoque"}>
            <Icon
              className="menuIcon-icon"
              type="stock"
              onClick={() => this.handleClickCompany("estoque_dash", "Entrada")}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={"Entrada"}>
            <Icon
              className="menuIcon-icon"
              type="shop"
              onClick={() => this.handleClickCompany("entrada_add")}
            />
          </Tooltip>

          <Tooltip placement="bottom" title={"Perfil"}>
            <Icon
              className="menuIcon-icon"
              type="user"
              onClick={() => this.handleClickCompany("perfil_dash")}
            />
          </Tooltip>
        </div>

        <Menu
          className="menu"
          theme="dark"
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
            <Menu.Item
              disabled={!this.props.auth.addUser}
              key="novoUsuario_add"
            >
              <Icon type="user" />
              Usuário
            </Menu.Item>
            <Menu.Item disabled={!this.props.auth.addTec} key="newTecnico_add">
              <Icon type="user-add" />
              Técnico
            </Menu.Item>
            <Menu.Item
              disabled={!this.props.auth.addProd}
              key="novoProduto_add"
            >
              <Icon type="setting" />
              Produto
            </Menu.Item>
            <Menu.Item
              disabled={!this.props.auth.addFonr}
              key="novoFornecedor_add"
            >
              <Icon type="bank" />
              Fornecedor
            </Menu.Item>
            <Menu.Item key="gerenciarProduto_dash">
              <Icon type="unordered-list" />
              Gerenciar
            </Menu.Item>
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
            <Menu.Item disabled={!this.props.auth.addEntr} key="entrada_add">
              <Icon type="shopping-cart" />
              Nova
            </Menu.Item>
            <Menu.Item key="entrada_dash">
              <Icon type="unordered-list" />
              Gerenciar
            </Menu.Item>
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
            <Menu.Item key="estoque_dash">
              <Icon type="unordered-list" />
              Gerenciar
            </Menu.Item>
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
            <Menu.Item
              disabled={!this.props.auth.addKitOut}
              key="reservaKit_dash"
            >
              <Icon type="shopping" />
              Kit
            </Menu.Item>
            <Menu.Item
              disabled={!this.props.auth.addOutPut}
              key="reservaTecnico_dash"
            >
              <Icon type="user" />
              Técnico
            </Menu.Item>
            <Menu.Item disabled={!this.props.auth.addROs} key="Rexterno_dash">
              <Icon type="file-add" />
              Externo
            </Menu.Item>
            <Menu.Item disabled={!this.props.auth.gerROs} key="Rinterno_dash">
              <Icon type="file-add" />
              Interno
            </Menu.Item>
            <Menu.Item disabled={false} key="emprestimo_dash">
              <Icon type="retweet" />
              Empréstimo
            </Menu.Item>
            <Menu.Item disabled={!this.props.auth.addRML} key="reservaML_dash">
              <Icon type="ie" />
              E-Commerce
            </Menu.Item>
            <Menu.Item disabled={!this.props.auth.gerROs} key="Os_dash">
              <Icon type="unordered-list" />
              Gerenciar Os
            </Menu.Item>
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
            <Menu.Item key="relatorioOs_dash">
              <Icon type="file-search" />
              Os
            </Menu.Item>
            <Menu.Item key="relatorioPerda_dash">
              <Icon type="alert" />
              Perda
            </Menu.Item>
            <Menu.Item key="relatorioML_dash">
              <Icon type="ie" />
              E-Commerce
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ Logout }, dispach);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(SideBar);
