import React, { Component } from 'react'
import './index.css'

class NovoUsuario extends Component{
  render(){
    return(
      <div className='div-card-usuario'>
        <div className='linhaTexto-usuario'>
          <h1 className='h1-usuario'>Novo usuário</h1>
        </div>
      </div>
    )
  }
}

export default NovoUsuario