import React, { Component } from 'react'
import './index.css'
import { notifications } from '../../../../services/notificacao';
import { Spin } from 'antd'


class NotificacaoDash extends Component{

  state= {
    loading: false,
    notificacoes: {
      rows:[]
    }
  }

  getNotificacoes = async () => {

    this.setState({
      loading: true
    })

    await notifications().then(
      resposta => this.setState({
        notificacoes: resposta.data,
      })
    )

    this.setState({
      loading: false
    })
  }

  componentDidMount = async () => {
    await this.getNotificacoes()
  }

  test = () => {
    if(this.state.notificacoes.rows.length !== 0){
      return( 
        this.state.notificacoes.rows.map((line) => 
          <div className='div-card-not'>
              <div className='div-circulo-not'>
                <img alt="example" src='../../sino.png' className='image-sino' />
              </div>
              <div className='text-not'>
                {line.message}
              </div>
          </div>)
      )
    }else{
      return(
        <div className='div-naotemnada'>Não há nenhuma notificação até o momento</div>
      )
    }
  }

  render(){
    return(
      <div className='div-card-AddKit'>
        <div className='linhaTexto-Gentrada'>
          <h1 className='h1-Gentrada'>Notificações</h1>
        </div>

      {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> :this.test()}
        
      </div>
    )
  }
}

export default NotificacaoDash