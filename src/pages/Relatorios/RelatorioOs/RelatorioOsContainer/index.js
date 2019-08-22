import React, { Component } from 'react'
import './index.css'
import { Pagination, Button, Input } from 'antd'

class GerenciarEntrada extends Component{

  state={
    avancado: false
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  render(){
    return(
      <div className='div-card-ROs'>
        <div className='linhaTexto-ROs'>
          <h1 className='h1-ROs'>Relatório das Os</h1>
        </div>

        {this.state.avancado ? 
        <div className='div-linha-avancado-Rtecnico'>
        <div className='div-ocultar-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
        </div>
        <div className='div-linha1-avancado-Rtecnico'>
          <div className='div-produto-Gentrada'>
          <div className='div-text-Os'>Produto:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='produto'
              value={this.state.produto}
              placeholder="Digite o nome do produto"
              onChange={this.onChange}
              allowClear
            />
          </div> 

          <div className='div-usuario-Gentrada'>
          <div className='div-text-Rtecnico'>Usuário:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='usuario'
              value={this.state.usuario}
              placeholder="Digite o usuário"
              onChange={this.onChange}
              allowClear
            />
          </div>

          <div className='div-data-Gentrada'>
          <div className='div-text-Rtecnico'>Data:</div>
          <Input
              className='input-100'
              style={{ width: '100%' }}
              name='data'
              value={this.state.data}
              placeholder="Digite a data"
              onChange={this.onChange}
              allowClear
            />
          </div>
        </div></div> : 
        <div className='div-avancado-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
        </div> }

        <div className='div-cabecalho-ROs'>
          <div className='cel-produto-cabecalho-ROs'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-ROs'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-ROs'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-ROs'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-ROs'></div>
        <div className='div-lines-ROs'>
          <div className='cel-produto-cabecalho-ROs'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-ROs'>
            12
          </div>
          <div className='cel-usuario-cabecalho-ROs'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-ROs'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-ROs'></div>
          <div className='footer-ROs'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada