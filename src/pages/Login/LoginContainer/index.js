/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import './index.css'
import { Input, Icon, Button, message } from 'antd';
import 'antd/dist/antd.css';
import * as R from 'ramda'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeValue, onSubmit } from '../LoginRedux/action'
import uuidValidate from 'uuid-validate'

class Login extends Component {
  hasAuth = R.has('auth')
  hasToken = R.has('token')

  enterKey = async (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      await this.props.onSubmit(this.props.value)
    }
  }

  error = () => {
    message.error('Erro ao logar');
  }

  onSubmit = async (e) => {
    await this.props.onSubmit(this.props.value)
    if(this.hasAuth(this.props)){
      if (this.hasToken(this.props.auth)){
        if(uuidValidate(this.props.auth.token)){
        }
      }
    }
    // this.error()
  }

  render() {
    return (
      <div className='div-all'>
        <div className='div-main-login'>
          <label><h1 className='LabelLogin'>Estoque - RP</h1></label>
          <img src='../../retina.png' className='img-Login' />
          <Input
            className='InputUsernameLogin'
            placeholder='Digite seu username'
            name='username'
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onFocus
            value={this.props.value.username}
            onChange={this.props.changeValue}
            onKeyPress={this.enterKey}
          />
          <Input.Password
            className='InputPasswordLogin'
            placeholder="Digite a senha"
            name='password'
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={this.props.value.password}
            onChange={this.props.changeValue}
            onKeyPress={this.enterKey}
          />
          <div className='div-ButtonLogin'>
            <Button
              onClick={this.onSubmit}
              className='button'
              type="primary">
              Login
          </Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ changeValue, onSubmit }, dispach)
}

function mapStateToProps(state) {
  return {
    value: state.login,
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(Login)