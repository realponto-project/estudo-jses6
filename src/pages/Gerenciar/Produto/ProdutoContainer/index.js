import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './index.css'
import { Spin, Button, Input, Select, Icon } from 'antd'
import { getProdutos } from '../../../../services/produto';
import { getAllFornecedor } from '../../../../services/fornecedores';
import { getAllTecnico } from '../../../../services/tecnico'
import { getUsers } from '../../../../services/usuario'
import { masks } from './validators'
import { redirectValueProduto, redirectValueFornecedor, redirectValueUsuario, redirectValueTecnico } from '../ProdutoRedux/action'


const { Option } = Select;
class GerenciarProdutoDash extends Component {

  state = {
    redirect: '',
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
    userArray: {
      rows: []
    },
    tecnicoArray:{
      rows: []
    },
    fornecedorArray: {
      rows: []
    },
    OsArray: {
      rows: []
    },
    avancado: false,
    page: 1,
    total: 10,
    count: 0,
    show: 0,
  }

  onChangeUsuario = async (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    await this.setState({
      [nome]: valor,
    })

    await this.getAllUsers()
  }

  onChangeTecnico = async (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    await this.setState({
      [nome]: valor,
    })

    await this.getAllTecnicos()
  }

  onChangeFornecedor = async (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    await this.setState({
      [nome]: valor,
    })

    await this.getAllFornecedor()
  }

  onChangeProduto = async (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    await this.setState({
      [nome]: valor,
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

    // await this.getAllUsers()
  }

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado,
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
      sku: '',
      produto: '',
      marca: '',
      tipo: '',
      categoria: '',
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

  getAllFornecedor = async () => {
    
    await this.setState({
      loading: true
    })

    const query = {
      filters: {
        company: {
          specific: {
            cnpj: this.state.cnpj.replace(/\D/ig, ''),
            razaoSocial: this.state.razaoSocial,
            state: this.state.uf,
            nameContact: this.state.nome,
            telphone: this.state.telefone.replace(/\D/ig, ''),
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    }

    await getAllFornecedor(query).then(
      resposta => this.setState({
        fornecedorArray: resposta.data,
      })
    )

    await this.setState({
      loading: false
    })
  }
  
  getAllTecnicos = async () => {
    
    await this.setState({
      loading: true
    })

    const query = {
      filters: {
        technician: {
          specific: {
            name: this.state.tecnico,
            CNH: this.state.cnh.replace(/\D/ig, ''),
          },
        },
        car: {
          specific: {
            plate: this.state.placa,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    }

    await getAllTecnico(query).then(
      resposta => this.setState({
        tecnicoArray: resposta.data,
      })
    )

    await this.setState({
      loading: false
    })
  }
  
  getAllUsers = async () => {
    
    await this.setState({
      loading: true
    })

    const query = {
      filters: {
        user: {
          specific: {
            username: this.state.usuario,
          },
        },
        typeAccount: {
          specific: {
            typeName: this.state.tipoConta,
          },
        },
      },
      page: this.state.page,
      total: this.state.total,
    }

    await getUsers(query).then(
      resposta => this.setState({
        userArray: resposta.data,
      })
    )

    await this.setState({
      loading: false
    })
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
    await this.getAllFornecedor()
    await this.getAllTecnicos()
    await this.getAllUsers()
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
              <div className='cel-edit-cabecalho-GCadastros'>
                <Icon
                  type="edit"
                  className='icon-edit'
                  onClick={() => this.redirectProduto(line)}
                  style={{ fontSize: '20px', color: '#08c'}}
                  theme="outlined" />
              </div>
            </div>
            <div className=' div-separate1-Gentrada' />
          </div>
        ))
    } else {
      return (
        <div className='div-naotemnada'>Não há nenhum produto cadastrado</div>
      )
    }
  }

  usuario = () => {
    if (this.state.userArray.rows.length !== 0) {
      return (
        this.state.userArray.rows.map((line) =>
        <div className='div-100-Gentrada'>
          <div className='div-lines-Rtecnico' >
            <div className='cel-usuario-cabecalho-GCadastros'>
              {line.username}
            </div>
            <div className='cel-tipoConta-cabecalho-GCadastros'>
              {line.typeName}
            </div>
            <div className='cel-customizado-cabecalho-GCadastros'>
              {line.customired ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#f01b0c" />} 
            </div>
            <div className='cel-edit-cabecalho-GCadastros'>
              <Icon
                type="edit"
                className='icon-edit'
                style={{ fontSize: '20px', color: '#08c'}}
                onClick={() => this.redirectUsuario(line)}
                theme="outlined" />
            </div>
          </div>
          <div className=' div-separate1-Gentrada' />
        </div>
        )
      )
    } else {
      return (
        <div className='div-naotemnada'>Não há nenhum usuário cadastrado</div>
      )
    }
  }

  tecnico = () => {
    if (this.state.tecnicoArray.rows.length !== 0) {
      return (
        this.state.tecnicoArray.rows.map((line) =>
        <div className='div-100-Gentrada'>
          <div className='div-lines-Rtecnico' >
            <div className='cel-tecnico-cabecalho-GCadastros'>
              {line.name}
            </div>
            <div className='cel-externo-cabecalho-GCadastros'>
              {line.external ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> : <Icon type="close-circle" theme="twoTone" twoToneColor="#eb2f96" /> }
            </div>
            <div className='cel-carro-cabecalho-GCadastros'>
              {line.plate}
            </div>
            <div className='cel-cnh-cabecalho-GCadastros'>
              {line.CNH.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')}
            </div>
            <div className='cel-edit-cabecalho-GCadastros'>
              <Icon
                type="edit"
                className='icon-edit'
                style={{ fontSize: '20px', color: '#08c'}}
                onClick={() => this.redirectTecnico(line)}
                theme="outlined" />
            </div>
          </div>
          <div className=' div-separate1-Gentrada' />
        </div>
        )
      )
    } else {
      return (
        <div className='div-naotemnada'>Não há nenhum técnico cadastrado</div>
      )
    }
  }

  fornecedor = () => {
    if (this.state.fornecedorArray.rows.length !== 0) {
      return (
        this.state.fornecedorArray.rows.map((line) =>
        <div className='div-100-Gentrada'>
          <div className='div-lines-Rtecnico' >
            <div className='cel-cnpj-cabecalho-GCadastros'>
              {line.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')}
            </div>
            <div className='cel-rs-cabecalho-GCadastros'>
              {line.razaoSocial}
            </div>
            <div className='cel-uf-cabecalho-GCadastros'>
              {line.state}
            </div>
            <div className='cel-nome-cabecalho-GCadastros'>
              {line.nameContact}
            </div>
            <div className='cel-telefone-cabecalho-GCadastros'>
              {line.telphone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3')}
            </div>
            <div className='cel-edit-cabecalho-GCadastros'>
              <Icon
                type="edit"
                className='icon-edit'
                style={{ fontSize: '20px', color: '#08c'}}
                onClick={() => this.redirectFornecedor(line)}
                theme="outlined" />
            </div>
          </div>
          <div className=' div-separate1-Gentrada' />
        </div>
        )
      )
    } else {
      return (
        <div className='div-naotemnada'>Não há nenhum fornecedor cadastrado</div>
      )
    }
  }

  redirectProduto = async (produto) => {
    const value = {
      id: produto.id,
      name: produto.name,
      category: produto.category,
      mark: produto.mark,
      type: produto.type,
      manufacturer: produto.manufacturer,
      description: produto.description,
      sku: produto.sku,
      minimumStock: produto.minimumStock,
      serial: produto.serial,
    }
    await this.props.redirectValueProduto(value)

    await this.setState({
      redirect: 'produto'
    })
  }

  redirectFornecedor = async (fornecedor) => {
    const value = {
      id: fornecedor.id,
      cnpj: fornecedor.cnpj,
      razaoSocial: fornecedor.razaoSocial,
      zipCode: fornecedor.zipCode,
      state: fornecedor.state,
      city: fornecedor.city,
      neighborhood: fornecedor.neighborhood,
      street: fornecedor.street,
      number: fornecedor.minimumStock,
      complement: fornecedor.complement,
      referencePoint: fornecedor.referencePoint,
      nameContact: fornecedor.nameContact,
      email: fornecedor.email,
      telphone: fornecedor.telphone,
    }

    await this.props.redirectValueFornecedor(value)

    await this.setState({
      redirect: 'fornecedor'
    })
  }

  redirectUsuario = async (usuario) => {
    const value = {
      id: usuario.id,
      customized: usuario.customized,
      typeName: usuario.typeName,
      username: usuario.username,
    }

    await this.props.redirectValueUsuario(value)

    await this.setState({
      redirect: 'usuario'
    })
  }


  redirectTecnico = async (tecnico) => {
    const value = {
      id: tecnico.id,
      name: tecnico.name,
      CNH: tecnico.CNH,
      plate: tecnico.plate,
      external: tecnico.external,
    }

    await this.props.redirectValueTecnico(value)

    await this.setState({
      redirect: 'tecnico'
    })
  }


  renderRedirect = () => {
    // eslint-disable-next-line default-case
    switch (this.state.redirect) {
      case 'produto': 
        return <Redirect exact path to='/logged/gerenciarProdutosDash/dash' />
        // eslint-disable-next-line no-duplicate-case
        case 'fornecedor': 
        return <Redirect exact path to='/logged/gerenciarFornecedor/dash'/>
        // eslint-disable-next-line no-duplicate-case
        case 'usuario': 
        return <Redirect exact path to='/logged/gerenciarUsuario/dash' />
        // eslint-disable-next-line no-duplicate-case
        case 'tecnico': 
        return <Redirect exact path to='/logged/gerenciarTecnico/dash' />
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
            <div className='cel-edit-cabecalho-GCadastros' />
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
            <div className='cel-edit-cabecalho-GCadastros' />
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
            <div className='cel-edit-cabecalho-GCadastros' />
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
            <div className='cel-edit-cabecalho-GCadastros' />
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
                  onChange={this.onChangeProduto}
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
                  onChange={this.onChangeProduto}
                  allowClear
                />
              </div>
            </div>

            <div className='div-linha1-avancado-Rtecnico'>
              <div className='div-categoria-GCadastros'>
                <div className='div-text-Rtecnico'>Categoria:</div>
                <Select defaultValue="Não selecionado" style={{ width: '100%' }} onChange={this.handleChange}>
                  <Option value=''>Todos</Option>
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
                  onChange={this.onChangeProduto}
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
                  onChange={this.onChangeProduto}
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
                  onChange={this.onChangeFornecedor}
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
                  onChange={this.onChangeFornecedor}
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
                  onChange={this.onChangeFornecedor}
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
                  onChange={this.onChangeFornecedor}
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
                  onChange={this.onChangeFornecedor}
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
                  value={this.state.tecnico}
                  placeholder="Digite o tecnico"
                  onChange={this.onChangeTecnico}
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
                  onChange={this.onChangeTecnico}
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
                  onChange={this.onChangeTecnico}
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
                  onChange={this.onChangeUsuario}
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
                  onChange={this.onChangeUsuario}
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

        {this.renderRedirect()}
      </div>
    )
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ redirectValueProduto, redirectValueFornecedor, redirectValueUsuario, redirectValueTecnico }, dispach)
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, mapDispacthToProps)(GerenciarProdutoDash)
