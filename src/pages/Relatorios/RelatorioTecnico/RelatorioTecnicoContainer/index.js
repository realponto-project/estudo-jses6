import React, { Component } from 'react'
import './index.css'
import { Pagination, Input, Button } from 'antd'

class GerenciarEntrada extends Component{

  state={
    avancado: false,
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  render(){
    return(
      <div className='div-card-RTec'>
        <div className='linhaTexto-RTec'>
          <h1 className='h1-RTec'>Relatório dos técnicos</h1>
        </div>


        {this.state.avancado ? 
        <div className='div-linha-avancado-Rtecnico'>
        <div className='div-ocultar-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
        </div>
        <div className='div-linha1-avancado-Rtecnico'>
          <div className='div-Os-Rtecnico'>
          <div className='div-text-Os'>Os:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='Os'
              value={this.state.Os}
              placeholder="12"
              onChange={this.onChange}
              allowClear
            />
          </div> 

          <div className='div-rs-Rtecnico'>
          <div className='div-textRs-Rtecnico'>Razão social:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='razaoSocial'
              value={this.state.razaoSocial}
              placeholder="Digite a razão social"
              onChange={this.onChange}
              allowClear
            />
          </div>

          <div className='div-cnpj-Rtecnico'>
          <div className='div-text-Rtecnico'>Cnpj:</div>
            <Input
              className='input-100'
              style={{ width: '100%' }}
              name='cnpj'
              value={this.state.cnpj}
              placeholder="Digite o cnpj"
              onChange={this.onChange}
              allowClear
            />
          </div>

          <div className='div-data-Rtecnico'>
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
        <div className='div-cabecalho-RTec'>
          <div className='cel-produto-cabecalho-RTec'>
            Produto
          </div>
          <div className='cel-quant-cabecalho-RTec'>
            Qnt.
          </div>
          <div className='cel-usuario-cabecalho-RTec'>
            Usuário
          </div>
          <div className='cel-data-cabecalho-RTec'>
            Data lançamento
          </div>
        </div>

        
        <div className=' div-separate-RTec'></div>
        <div className='div-lines-RTec'>
          <div className='cel-produto-cabecalho-RTec'>
            TESTEEEEEEEEEEEEEEEEEE
          </div>
          <div className='cel-quant-cabecalho-RTec'>
            12
          </div>
          <div className='cel-usuario-cabecalho-RTec'>
            TESTE
          </div>
          <div className='cel-data-cabecalho-RTec'>
            22/11/2001 14:30
          </div>
        </div>

        <div className=' div-separate-RTec'></div>
          <div className='footer-RTec'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default GerenciarEntrada