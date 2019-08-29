import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dash from './Dash';

import { auth } from '../services/auth'
import { Logout } from './Login/LoginRedux/action'
import NovoFornecedorRoute from './Cadastros/NovoFornecedor';
import NovoProdutoRoute from './Cadastros/NovoProduto';
import NovoTecnicoRoute from './Cadastros/NovoTecnico';
import NovaEntradaRoute from './Cadastros/NovaEntrada';
import EstoqueRoute from './Gerenciar/Estoque';
import ReservaKitRoute from './Reservas/ReservaKit';
import NovoUsuarioRoute from './Cadastros/NovoUsuario';
import GerenciarEntradaRoute from './Gerenciar/Entrada';
import ReservaTecnicoRoute from './Reservas/ReservaTecnico';
import ReservaOsRoute from './Reservas/ReservaOs';
import ReservaMLRoute from './Reservas/ReservaML';
import RelatorioOsRoute from './Relatorios/RelatorioOs';
import RelatorioPerdaRoute from './Relatorios/RelatorioPerda';
import RelatorioMLRoute from './Relatorios/RelatorioML';
import AddKitRoute from './Gerenciar/Kit';
import SearchOsRoute from './Gerenciar/SearchOs';
import OsDashRoute from './Gerenciar/Os';

class PagesRoute extends Component {

  state = {
    auth: true
  }

  logout = async () => {
    await this.props.Logout(this.props.auth.token)
  }

  auth = async () => {
    const value = {
      token: this.props.auth.token,
      username: this.props.auth.username
    }

    let response = {}

    response = await auth(value).then(
      resp => this.setState({
        auth: resp.data
      },
        // console.log(this.state)
      )
    )

    return response
  }

  componentDidMount = () => {
    this.auth()
  }

  render() {
    if (this.state.auth) {
      return (
        <Switch>
          <Route exact path='/logged/dash' component={Dash} />
          <Route path='/logged/novoUsuario' component={NovoUsuarioRoute} />
          <Route path='/logged/novoFornecedor' component={NovoFornecedorRoute} /> 
          <Route path='/logged/novoProduto' component={NovoProdutoRoute} />
          <Route path='/logged/novoTecnico' component={NovoTecnicoRoute} />
          <Route path='/logged/entrada' component={NovaEntradaRoute} />
          <Route path='/logged/gerenciarEntrada' component={GerenciarEntradaRoute} />
          <Route path='/logged/estoque' component={EstoqueRoute} />
          <Route path='/logged/reservaKit' component={ReservaKitRoute} />
          <Route path='/logged/reservaTecnico' component={ReservaTecnicoRoute} />
          <Route path='/logged/reservaOs' component={ReservaOsRoute} />
          <Route path='/logged/reservaKitAdd' component={AddKitRoute} />
          <Route path='/logged/reservaML' component={ReservaMLRoute} />
          <Route path='/logged/relatorioOs' component={RelatorioOsRoute} />
          <Route path='/logged/relatorioPerda' component={RelatorioPerdaRoute} />
          <Route path='/logged/relatorioML' component={RelatorioMLRoute} />
          <Route path='/logged/searchOs' component={SearchOsRoute} />
          <Route path='/logged/Os' component={OsDashRoute} />
        </Switch>
      )
    } else {
      this.logout()
      return <Redirect to='/login' />
    }
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

export default connect(mapStateToProps, mapDispacthToProps)(PagesRoute)