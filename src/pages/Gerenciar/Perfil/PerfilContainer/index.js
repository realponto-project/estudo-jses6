import React, { Component } from 'react'
import './index.css'
import { Input, Button, message, Card } from 'antd'
import { updateSenha } from '../../../../services/password';
import { connect } from 'react-redux'

class PerfilDash extends Component {

  state = {
    messageError: false,
    messageSuccess: false,
    editar: false,
    user: '',
    typeAccount: '',
    pass: '',
    newPass: '',
    confPass: '',
  }

  componentDidMount = () => {
    this.setState({
      user: this.props.auth.username,
      typeAccount: this.props.auth.typeAccount
    })
  }

  error = () => {
    message.error('Os dados do usuário não foram atualizados');
  };

  success = () => {
    message.success('Os dados do usuário foram atualizados');
  };

  messageErrorPass = () => {
    message.error('As duas senhas não coincidem');
  };

  messagePassEqual = () => {
    message.error('A senha atual não pode ser a mesma que a antiga');
  };


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  editar = () => {
    this.setState({
      editar: !this.state.editar,
    })
  }

  cancelar = () => {
    this.setState({
      editar: false,
      pass: '',
      newPass: '',
      confPass: '',
    })
  }

  saveNewPassword = async () => {

    if(this.state.pass === this.state.newPass){
      this.messagePassEqual()
    }else if (this.state.newPass !== this.state.confPass) {
      this.messageErrorPass()
    } else {

      const value = {
        username: this.state.user,
        oldPassword: this.state.pass,
        newPassword: this.state.newPass,
      }

      console.log(value)


      this.setState({
        loading: true
      })

      const resposta = await updateSenha(value)

      if (resposta.status === 422) {

        this.setState({
          messageError: true,
        })
        await this.error()
        this.setState({
          loading: false,
          messageError: false,
        })
      } if (resposta.status === 200) {

        this.setState({
          newPass: '',
          pass: '',
          confPass: '',
          messageSuccess: true,
          editar: false,
        })
        await this.success()
        this.setState({
          loading: false,
          messageSuccess: false,
        })
      }
    }
  }

  render() {
    return (
      <div className='div-card-perfil'>
        <div className='form-perfil'>
          <div className='linhaTexto-perfil'>
            <h1 className='h1-perfil'>Seu perfil</h1>
          </div>

          <div className='div-linhaCard-perfil'>
            <div className='div-cardInfos-perfil'>
              <Card className='card-perfil'>
                <div className='bg-wrapper-perfil'>
                  <img alt="example" src='../../avatar.png' className='image-dash' />
                </div>
              </Card>

              {this.state.editar ? <div className='div-editarCard-perfil'>
                <label className='label-text-perfil' onClick={this.cancelar}>Cancelar</label>
              </div> : <div className='div-editarCard-perfil'>
                  <label className='label-text-perfil' onClick={this.editar}>Editar</label>
                </div>}

            </div>

            <div className='div-info-perfil'>
              <div className='div-user-perfil'>
                <div className='div-text1-perfil'>Usuário:</div>
                <label className='div-text2-perfil'>{this.state.user}</label>
              </div>

              <div className='div-user-perfil'>
                <div className='div-text1-perfil'>Tipo de conta:</div>
                <label className='div-text2-perfil'>{this.state.typeAccount}</label>
              </div>
              {this.state.editar ?
                <div className='div-user-perfil'>
                  <div className='div-textPass-perfil'>Senha atual:</div>
                  <Input.Password
                    className='input-100'
                    style={{ width: '100%' }}
                    name='pass'
                    value={this.state.pass}
                    placeholder="Digite a senha atual"
                    onChange={this.onChange}
                  />
                </div> : null}
              {this.state.editar ?
                <div className='div-user-perfil'>
                  <div className='div-textNewPass-perfil'>Nova senha:</div>
                  <Input.Password
                    className='input-100'
                    style={{ width: '100%' }}
                    name='newPass'
                    value={this.state.newPass}
                    placeholder="Digite a nova senha"
                    onChange={this.onChange}
                  />
                </div> : null}
              {this.state.editar ?
                <div className='div-user-perfil'>
                  <div className='div-textConfPass-perfil'>Confirmar senha:</div>
                  <Input.Password
                    className='input-100'
                    style={{ width: '100%' }}
                    name='confPass'
                    value={this.state.confPass}
                    placeholder="Confirme a nova senha"
                    onChange={this.onChange}
                    onBlur={this.confirmPass}
                  />
                </div> : null}
              {this.state.editar ?
                <div className='div-button-perfil'>
                  <Button type='primary' className='button' loading={this.state.loading} onClick={this.saveNewPassword}>Salvar</Button>
                </div> : null}
            </div>
          </div>

          <div className='div-linhaSepareted-ML' />
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

export default connect(mapStateToProps)(PerfilDash)