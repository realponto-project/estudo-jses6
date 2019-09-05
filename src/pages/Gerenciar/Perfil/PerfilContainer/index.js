import React, { Component } from 'react'
import './index.css'
import { Input, Button } from 'antd'

class PerfilDash extends Component {

  state={
    user: '',
    pass: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className='div-card-perfil'>
        <div className='linhaTexto-perfil'>
          <h1 className='h1-perfil'>Seu perfil</h1>
        </div>

        <div className='div-linha-perfil'>
          <div className='div-user-perfil'>
            <div className='div-text-Os'>Usuário:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='user'
              value={this.state.user}
              onChange={this.onChange}
              placeholder="Digite o usuário"
              allowClear
            />
          </div>

          <div className='div-pass-perfil'>
            <div className='div-text-perfil'>Senha:</div>
            <Input.Password
              className='input-100'
              style={{ width: '100%' }}
              name='pass'
              value={this.state.pass}
              placeholder="Digite a senha atual"
              onChange={this.onChange}
            />
          </div>

          <div className='div-pass-perfil'>
            <Button type='primary' className='button'>Editar</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default PerfilDash