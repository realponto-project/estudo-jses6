import React, { Component } from 'react'
import './index.css'
import { Spin, Button, Input, Select } from 'antd'
import { getProdutos } from '../../../../services/produto';


const { Option } = Select;

class GerenciarProdutoDash extends Component {

  state = {
    cnh: '',
    nome: '',
    telefone: '',
    fornecedor: '',
    tecnico: '',
    placa: '',
    cnpj: '',
    razaoSocial: '',
    uf: '',
    tipoConta: '',
    usuario: '',
    gerenciar: 'produtos',
    sku: '',
    produto: '',
    marca: '',
    tipo: '',
    categoria: '',
    loading: false,
    OsArray: {
      rows: []
    },
    avancado: false,
    page: 1,
    total: 10,
    count: 0,
    show: 0,
  }

  onChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    })

    await this.getAllProdutos()
  }

  handleChange = async (value) => {
    await this.setState({
      categoria: value,
    })

    await this.getAllProdutos()
  }

  handleChangeGerenciar = async (value) => {
    await this.setState({
      gerenciar: value,
    })

    // await this.getAllProdutos()
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    })
  }

  changePages = (pages) => {
    this.setState({
      page: pages
    }, () => {
      this.getAllProdutos()
    }
    )
  }

  getAllProdutos = async () => {

    await this.setState({
      loading: true
    })

    const query = {
      filters: {
        product: {
          specific: {
            name: this.state.produto,
            SKU: this.state.sku,
            category: this.state.categoria,
          },
        },
        mark: {
          specific: {
            mark: this.state.marca,
          },
        },
        equipType: {
          specific: {
            type: this.state.tipo,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    }

    await getProdutos(query).then(
      resposta => this.setState({
        OsArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show,
      })
    )

    await this.setState({
      loading: false
    })
  }

  componentDidMount = async () => {
    await this.getAllProdutos()
  }

  Pages = () => (

    <div className='footer-Gentrada-button'>
      {Math.ceil(this.state.count / this.state.total) >= 5 && Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 4)}>{this.state.page - 4}</Button> : null}
      {Math.ceil(this.state.count / this.state.total) >= 4 && Math.ceil(this.state.count / this.state.total) - this.state.page < 2 && this.state.page > 3 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 3)}>{this.state.page - 3}</Button> : null}
      {this.state.page >= 3 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 2)}>{this.state.page - 2}</Button> : null}
      {this.state.page >= 2 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page - 1)}>{this.state.page - 1}</Button> : null}
      <div className='div-teste'>{this.state.page}</div>
      {this.state.page < (this.state.count / this.state.total) ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 1)}>{this.state.page + 1}</Button> : null}
      {this.state.page + 1 < (this.state.count / this.state.total) ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 2)}>{this.state.page + 2}</Button> : null}
      {this.state.page + 2 < (this.state.count / this.state.total) && this.state.page < 3 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 3)}>{this.state.page + 3}</Button> : null}
      {this.state.page + 3 < (this.state.count / this.state.total) && this.state.page < 2 ? <Button className='button' type="primary" onClick={() => this.changePages(this.state.page + 4)}>{this.state.page + 4}</Button> : null}
    </div>
  )

  produtos = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return (
        this.state.OsArray.rows.map((line) =>
          <div className='div-100-Gentrada'>
            <div className='div-lines-Rtecnico' >
              <div className='cel-os-cabecalho-GCadastros'>
                {line.sku}
              </div>
              <div className='cel-rs-cabecalho-GCadastros'>
                {line.name}
              </div>
              <div className='cel-cnpj-cabecalho-GCadastros'>
                {line.category}
              </div>
              <div className='cel-data-cabecalho-GCadastros'>
                {line.mark}
              </div>
              <div className='cel-acoes-cabecalho-GCadastros'>
                {line.type}
              </div>
            </div>
            <div className=' div-separate1-Gentrada' />
          </div>
        ))
    } else {
      return (
        <div className='div-naotemnada'>Não há reservas para esse técnico</div>
      )
    }
  }

  usuario = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return (
        //  this.state.OsArray.rows.map((line) =>
        <div className='div-100-Gentrada'>
          <div className='div-lines-Rtecnico' >
            <div className='cel-usuario-cabecalho-GCadastros'>
              Usuário
        </div>
            <div className='cel-tipoConta-cabecalho-GCadastros'>
              Tipo de conta
        </div>
            <div className='cel-customizado-cabecalho-GCadastros'>
              Customizado
        </div>
          </div>
          <div className=' div-separate1-Gentrada' />
        </div>
        //  )
      )
    } else {
      return (
        <div className='div-naotemnada'>Não há reservas para esse técnico</div>
      )
    }
  }

  tecnico = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return (
        //  this.state.OsArray.rows.map((line) =>
        <div className='div-100-Gentrada'>
          <div className='div-lines-Rtecnico' >
            <div className='cel-tecnico-cabecalho-GCadastros'>
              Técnico
        </div>
            <div className='cel-externo-cabecalho-GCadastros'>
              Externo
        </div>
            <div className='cel-carro-cabecalho-GCadastros'>
              Placa
        </div>
            <div className='cel-cnh-cabecalho-GCadastros'>
              Validade CNH
        </div>
          </div>
          <div className=' div-separate1-Gentrada' />
        </div>
        //  )
      )
    } else {
      return (
        <div className='div-naotemnada'>Não há reservas para esse técnico</div>
      )
    }
  }

  fornecedor = () => {
    if (this.state.OsArray.rows.length !== 0) {
      return (
        //  this.state.OsArray.rows.map((line) =>
        <div className='div-100-Gentrada'>
          <div className='div-lines-Rtecnico' >
            <div className='cel-cnpj-cabecalho-GCadastros'>
              Cnpj
        </div>
            <div className='cel-rs-cabecalho-GCadastros'>
              Razão social
        </div>
            <div className='cel-uf-cabecalho-GCadastros'>
              UF
        </div>
            <div className='cel-nome-cabecalho-GCadastros'>
              Nome
        </div>
            <div className='cel-telefone-cabecalho-GCadastros'>
              Telefone
        </div>
          </div>
          <div className=' div-separate1-Gentrada' />
        </div>
        //  )
      )
    } else {
      return (
        <div className='div-naotemnada'>Não há reservas para esse técnico</div>
      )
    }
  }

  Tables = () => {
    if (this.state.gerenciar === 'produtos') {
      return (
        <div className='div-tables-GCadastros'>
          <div className='div-cabecalho-GCadastros'>
            <div className='cel-os-cabecalho-GCadastros'>
              SKU
          </div>
            <div className='cel-rs-cabecalho-GCadastros'>
              Produto
          </div>
            <div className='cel-cnpj-cabecalho-GCadastros'>
              Categoria
          </div>
            <div className='cel-data-cabecalho-GCadastros'>
              Marca
          </div>
            <div className='cel-acoes-cabecalho-GCadastros'>
              Tipo
          </div>
          </div>

          <div className=' div-separate-Rtecnico' />
          {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.produtos()}
        </div>
      )
    } else if (this.state.gerenciar === 'usuario') {
      return (
        <div className='div-tables-GCadastros'>
          <div className='div-cabecalho-GCadastros'>
            <div className='cel-usuario-cabecalho-GCadastros'>
              Usuário
        </div>
            <div className='cel-tipoConta-cabecalho-GCadastros'>
              Tipo de conta
        </div>
            <div className='cel-customizado-cabecalho-GCadastros'>
              Customizado
        </div>
          </div>

          <div className=' div-separate-Rtecnico' />
          {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.usuario()}
        </div>
      )
    } else if (this.state.gerenciar === 'fornecedor') {
      return (
        <div className='div-tables-GCadastros'>
          <div className='div-cabecalho-GCadastros'>
            <div className='cel-cnpj-cabecalho-GCadastros'>
              Cnpj
        </div>
            <div className='cel-rs-cabecalho-GCadastros'>
              Razão social
        </div>
            <div className='cel-uf-cabecalho-GCadastros'>
              UF
        </div>
            <div className='cel-nome-cabecalho-GCadastros'>
              Nome
        </div>
            <div className='cel-telefone-cabecalho-GCadastros'>
              Telefone
        </div>
          </div>

          <div className=' div-separate-Rtecnico' />
          {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.fornecedor()}
        </div>
      )
    } else if (this.state.gerenciar === 'tecnico') {
      return (
        <div className='div-tables-GCadastros'>
          <div className='div-cabecalho-GCadastros'>
            <div className='cel-tecnico-cabecalho-GCadastros'>
              Técnico
        </div>
            <div className='cel-externo-cabecalho-GCadastros'>
              Externo
        </div>
            <div className='cel-carro-cabecalho-GCadastros'>
              Placa
        </div>
            <div className='cel-cnh-cabecalho-GCadastros'>
              Validade CNH
        </div>
          </div>

          <div className=' div-separate-Rtecnico' />
          {this.state.loading ? <div className='spin'><Spin spinning={this.state.loading} /></div> : this.tecnico()}
        </div>
      )
    }
  }

  Avancado = () => {
    if(this.state.avancado && this.state.gerenciar === 'produtos'){
      return(
          <div className='div-linha-avancado-Rtecnico'>
            <div className='div-ocultar-GCadastros'>
              <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
            </div>
            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-Os-ROs'>
                <div className='div-text-Rtecnico'>SKU:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='sku'
                  value={this.state.sku}
                  placeholder="Digite o sku"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-rs-ROs'>
                <div className='div-text-Os'>Produto:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='produto'
                  value={this.state.produto}
                  placeholder="Digite o produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>

            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-categoria-GCadastros'>
                <div className='div-text-Rtecnico'>Categoria:</div>
                <Select value='Não selecionado' style={{ width: '100%' }} onChange={this.handleChange}>
                  <Option value='equipamento'>Equipamento</Option>
                  <Option value='peca'>Peca</Option>
                  <Option value='outros'>Outros</Option>
                </Select>
              </div>

              <div className='div-marca-GCadastros'>
                <div className='div-text-Rtecnico'>Marca:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='marca'
                  value={this.state.marca}
                  placeholder="Digite a marca"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-tipo-GCadastros'>
                <div className='div-text-Rtecnico'>Tipo:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='tipo'
                  value={this.state.tipo}
                  placeholder="Digite o tipo"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>
          </div> 
      )
    }else if(this.state.avancado && this.state.gerenciar === 'fornecedor'){
      return(
          <div className='div-linha-avancado-Rtecnico'>
            <div className='div-ocultar-GCadastros'>
              <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
            </div>
            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-cnpj-GCadastros'>
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

              <div className='div-rs-GCadastros'>
                <div className='div-textRs-Os'>Razão social:</div>
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
            </div>

            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-uf-GCadastros'>
                <div className='div-text-Rtecnico'>UF:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='uf'
                  value={this.state.uf}
                  placeholder="SP"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-nome-GCadastros'>
                <div className='div-text-Rtecnico'>Nome:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='nome'
                  value={this.state.nome}
                  placeholder="Digite o nome"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-tel-GCadastros'>
                <div className='div-text-Rtecnico'>Telefone:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='telefone'
                  value={this.state.telefone}
                  placeholder="Digite o telefone"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>
          </div> 
      )
    }else if(this.state.avancado && this.state.gerenciar === 'tecnico'){
      return(
          <div className='div-linha-avancado-Rtecnico'>
            <div className='div-ocultar-GCadastros'>
              <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
            </div>
            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-tecnico-GCadastros'>
                <div className='div-text-Rtecnico'>Técnico:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='tecnico'
                  value={this.state.martecnicoca}
                  placeholder="Digite o tecnico"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-carro-GCadastros'>
                <div className='div-text-Rtecnico'>Placa:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='placa'
                  value={this.state.placa}
                  placeholder="Digite a placa"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className='div-cnh-GCadastros'>
                <div className='div-text-Rtecnico'>CNH:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='cnh'
                  value={this.state.cnh}
                  placeholder="20/11/2020"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>
          </div> 
      )
    }else if(this.state.avancado && this.state.gerenciar === 'usuario'){
      return(
          <div className='div-linha-avancado-Rtecnico'>
            <div className='div-ocultar-GCadastros'>
              <Button type="primary" className='button' onClick={this.avancado}>Ocultar</Button>
            </div>
            <div className='div-linha1-avancado-GCadastros'>
              <div className='div-usuario-GCadastros'>
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

              <div className='div-tipoConta-GCadastros'>
                <div className='div-textTipo-GCadastros'>Tipo de conta:</div>
                <Input
                  className='input-100'
                  style={{ width: '100%' }}
                  name='tipoConta'
                  value={this.state.tipoConta}
                  placeholder="Digite o tipo de conta"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>
          </div> 
      )
    }else{
      return(
        <div className='div-avancado-GCadastros'>
            <Select value={this.state.gerenciar} style={{ width: '25%' }} onChange={this.handleChangeGerenciar}>
              <Option value='usuario'>USUÁRIO</Option>
              <Option value='tecnico'>TÉCNICO</Option>
              <Option value='produtos'>PRODUTOS</Option>
              <Option value='fornecedor'>FORNECEDOR</Option>
            </Select>
            <Button type="primary" className='button' onClick={this.avancado}>Avançado</Button>
          </div>
      )
    }
  }

  render() {
    return (
      <div className='div-card-Rtecnico'>
        <div className='linhaTexto-Rtecnico'>
          <h1 className='h1-Rtecnico'>Gerenciar cadastros</h1>
        </div>

        <this.Avancado/>

        <this.Tables />

        <this.Pages />

      </div>
    )
  }
}

export default GerenciarProdutoDash