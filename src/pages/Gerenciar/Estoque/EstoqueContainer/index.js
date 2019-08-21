import React, { Component } from 'react'
import './index.css'
import { Pagination, Spin, Button, Input, Select } from 'antd'
import { stock } from '../../../../services/estoque'



const { Option } = Select;

class Estoque extends Component{

  state={
    produto:'',
    fabricante: '',
    estoqueBase: 'REALPONTO',
    avancado: false,
    loading: false,
    estoque:{
      rows: []
    },
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeSelect = (value) => {
    this.setState({
      estoqueBase: value
    })
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  } 

  getStock = async () => {

    this.setState({
      loading: true
    })

    await stock().then(
      resposta => this.setState({
        estoque: resposta.data,
      })
    )

    this.setState({
      loading: false
    })
  }

  componentDidMount = async () => {
    await this.getStock()
  }

  render(){
    return(
      <div className='div-card-estoque'>
        <div className='linhaTexto-estoque'>
          <h1 className='h1-estoque'>Gerenciar estoque</h1>
        </div>
        
        {this.state.avancado ? 
        <div className='div-linha-avancado-Rtecnico'>
        <div className='div-ocultar-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
        </div>
        <div className='div-linha1-avancado-Rtecnico'>
          <div className='div-produto-Rtecnico'>
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

          <div className='div-fabricante-Rtecnico'>
          <div className='div-text-Rtecnico'>Fabricante:</div>
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

          <div className='div-estoque-Rtecnico'>
          <div className='div-text-Rtecnico'>Estoque:</div>
          <Select value={this.state.estoqueBase} style={{ width: '100%' }} onChange={this.onChangeSelect} >
            <Option value='REALPONTO'>REALPONTO</Option>
            <Option value='NOVA REALPONTO'>NOVA REALPONTO</Option>
            <Option value='PONTOREAL'>PONTOREAL</Option>
          </Select>
          </div>
        </div></div> : 
        <div className='div-avancado-Rtecnico'>
          <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
        </div> }
        <div className='div-cabecalho-estoque'>
          <div className='cel-produto-cabecalho-estoque'>
            Produto
          </div>
          <div className='cel-fabricante-cabecalho-estoque'>
            Fabricante
          </div>
          <div className='cel-quant-cabecalho-estoque'>
            Qnt.
          </div>
          <div className='cel-estoque-cabecalho-estoque'>
            Estoque
          </div>
        </div>

        
        <div className=' div-separate-estoque'/>
            {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : 
          this.state.estoque.rows.map((line) =>
          <div className='div-100-estoque'>
          <div className='div-lines-estoque'
          //  onClick={() => this.openModalDetalhesCompany(line)}
           >
          <div className='cel-produto-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.name}
          </label>
          </div>
          <div className='cel-fabricante-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.manufacturer}
          </label>
          </div>
          <div className='cel-quant-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.amount}
          </label>
          </div>
          <div className='cel-estoque-cabecalho-estoque'>
          <label className='div-table-label-cel-estoque'>
            {line.stockBase}
          </label>
          </div>
        </div>
          <div className=' div-separate1-estoque'/>
        </div>
        )}

          <div className='footer-estoque'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
      </div>
    )
  }
}

export default Estoque