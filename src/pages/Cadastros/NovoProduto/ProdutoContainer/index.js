import React, { Component } from 'react'
import { Input, InputNumber, Select, Button, Modal, Switch, message } from 'antd'
import { connect } from 'react-redux'
import './index.css'
import { validators, masks } from './validators'
import { newMarca, newTipo, newFabricante, newProduto, getTipo, getMarca, getFabricante } from '../../../../services/produto'


const { Option } = Select;
const { TextArea } = Input;

class NovoProduto extends Component {

  state = {
    messageError: false,
    tipoArray: [],
    marcaArray:[],
    messageSuccess: false,
    itemArray:[],
    item: '',
    categoria: 'Equipamento',
    marca: "Não selecionado",
    tipo: "Não selecionado",
    fabricante: '',
    descricao: '',
    codigo: '',
    quantMin: 1,
    modalMarca: false,
    modalTipo: false,
    modalFabricante: false,
    newMarca: '',
    newFabricante: '',
    newTipo: '',
    newDescricao: '',
    loading: false,
    serial: false,
    fieldFalha: {
      item: false,
      codigo: false,
      quantMin: false,
    },
    message: {
      item: '',
      codigo: '',
      quantMin: '',
    },
  }

  onChangeQuantMin = (value) => {
    this.setState({
      quantMin: value ? value : 1,
    })
  }

  handleChangeTipo = (value) => {
    this.setState({
      tipo: value
    })
  }

  handleChangeMarca = async (value) => {

    // const {
    //   nome,
    //   valor,
    //   fieldFalha,
    //   message
    // } = validators('mark', value, this.state)

    // this.setState({
    //   [nome]: valor,
    //   fieldFalha,
    //   message
    // })

    await this.setState({
      marca: value,
    })

    await this.getAllFabricante()
  }

  success = () => {
    message.success('O cadastro foi efetuado');
  };
  
  error = () => {
    message.error('O cadastro não foi efetuado');
  };

  errorQuant = () => {
    message.error('Coloque a quantidade mínima');
  };

  componentDidMount = async () => {
    await this.getAllMarca()
    
    await this.getAllTipo()
  }

  getAllTipo = async () => {
    await getTipo().then(
      resposta => this.setState({
        tipoArray: resposta.data,
      })
    )
  }

  getAllMarca = async () => {
    await getMarca().then(
      resposta => this.setState({
        marcaArray: resposta.data,
      })
    )
  }

  getAllFabricante = async () => {

    const peca =  this.state.marca
    await getFabricante( peca ).then(
      resposta => this.setState({
        fabricante: resposta.data,
      })
    )
  }

  saveTargetNewProduto = async () => {

    this.setState({
      loading: true
    })

    const values = {
      category: this.state.categoria.toLocaleLowerCase(),
      SKU: this.state.codigo,
      description: this.state.descricao,
      minimumStock: this.state.quantMin.toString(),
      mark: this.state.marca,
      name: this.state.item,
      type: this.state.tipo,
      serial: this.state.serial,
      responsibleUser: 'modrp',
    }

    const resposta = await newProduto(values)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        loading:false,
        messageError: false,
      })
    } if (resposta.status === 200) {

      this.setState({
        item: '',
        categoria: 'Equipamento',
        marca: "Não selecionado",
        tipo: "Não selecionado",
        fabricante: '',
        descricao: '',
        codigo: '',
        quantMin: '',
        serial: false,
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        loading:false,
        messageSuccess: false
      })
    }
  }

  saveTargetNewMarca = async () => {

    const values = {
      manufacturer: this.state.newFabricante,
      mark: this.state.newMarca,
      responsibleUser: 'modrp'
    }

    const resposta = await newMarca(values)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        messageError: false,
      })
    } if (resposta.status === 200) {

      this.setState({
        newMarca: '',
        newFabricante: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        messageSuccess: false,
        modalMarca: false,
      })
    }

    await this.getAllMarca()
  }

  saveTargetNewFabricante = async () => {

    const values = {
      manufacturer: this.state.newFabricante,
    }

    const resposta = await newFabricante(values)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        messageError: false,
      })
    } if (resposta.status === 200) {

      this.setState({
        newFabricante: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        messageSuccess: false,
        modalFabricante: false,
      })
    }

    await this.getAllFabricante()
  }

  saveTargetNewTipo = async () => {

    const values = {
      type: this.state.newTipo,
      responsibleUser: 'modrp'
    }

    const resposta = await newTipo(values)

    if (resposta.status === 422) {

      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      })
      await this.error()
      this.setState({
        messageError: false,
      })
    } if (resposta.status === 200) {

      this.setState({
        newTipo: '',
        messageSuccess: true,
      })
      await this.success()
      this.setState({
        messageSuccess: false,
        modalTipo: false,
      })
    }

    await this.getAllTipo()
  }

  onChangeSerial = () => {
    this.setState({
      serial: !this.state.serial
    })
  }

  handleOk = () => {
    this.setState({
      modalMarca: false,
      modalFabricante: false,
      modalTipo: false
    });
  };

  handleCancel = () => {
    this.setState({
      modalMarca: false,
    });
  };

  openModais = (e) => {
    this.setState({
      [e.target.name]: true,
    })
  }

  handleChange = (value) => {
    this.setState({
      categoria: value,
      fabricante: '',
      tipo: 'Não selecionado'
    })

    this.getAllMarca()

    if (this.state.marca !== 'Não selecionado') this.getAllFabricante()
  }

  onChange = (e) => {
    const { nome,
      valor,
    } = masks(e.target.name, e.target.value)

    this.setState({
      [nome]: valor,
    })
  }


  onChangeCodigo = (e) =>{
    this.setState({
      codigo: e.target.value.replace(/\D/ig, '')
    })
  }

  onBlurValidator = async (e) => {
    const {
      nome,
      valor,
      fieldFalha,
      message
    } = validators(e.target.name, e.target.value, this.state)

    await this.setState({
      [nome]: valor,
      fieldFalha,
      message
    })
  }

  onFocus = async (e) => {
    await this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        [e.target.name]: false,
      },
      message: {
        ...this.state.message,
        [e.target.name]: false,
      },
    })
  }

  onFocusMark = () => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        mark: false,
      },
      message: {
        ...this.state.message,
        mark: false,
      },
    })
  }

  onFocusType = () => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        type: false,
      },
      message: {
        ...this.state.message,
        type: false,
      },
    })
  }


  modalMarca = () => (
    <Modal
      title="Adicionar marca"
      visible={this.state.modalMarca}
      onOk={this.saveTargetNewMarca}
      okText='Salvar'
      onCancel={this.handleOk}
      cancelText='Cancelar'
    >
      <div className='linhaModal-produtos'>
        <div className='div-marcaModal-produtos'>
          <div className='div-text-produtos'>Marca:</div>
          <Input
            allowClear={!this.state.fieldFalha.newMarca}
            className={
              this.state.fieldFalha.newMarca ?
                'div-inputError-tecnico' :
                'input-100'}
            placeholder="Digite a marca"
            name='newMarca'
            value={this.state.newMarca}
            onChange={this.onChange}
            onBlur={this.onBlurValidator}
            onFocus={this.onFocus} 
          />
          {this.state.fieldFalha.newMarca ?
            <p className='div-feedbackError'>
              {this.state.message.newMarca}
            </p> : null}
        </div>
      </div>

      <div className='linhaModal-produtos'>
        <div className='div-fabricanteModal-produtos'>
          <div className='div-text-produtos'>Fabricante:</div>
          <Input
            className='input-100'
            placeholder="Digite o fabricante"
            name='newFabricante'
            value={this.state.newFabricante}
            onChange={this.onChange}
            allowClear
          />
        </div>
      </div>
    </Modal>
  )

  modalTipo = () => (
    <Modal
      title="Adicionar tipo"
      visible={this.state.modalTipo}
      onOk={this.saveTargetNewTipo}
      okText='Salvar'
      onCancel={this.handleOk}
      cancelText='Cancelar'
    >
      <div className='linhaModal-produtos'>
        <div className='div-tipoModal-produtos'>
          <div className='div-text-produtos'>Tipo:</div>
          <Input
            className='input-100'
            placeholder="Digite o tipo"
            name='newTipo'
            value={this.state.newTipo}
            onChange={this.onChange}
            allowClear
          />
        </div>
      </div>
    </Modal>
  )

  render() {
    return (
      <div className='div-card-produtos'>
        <div className='linhaTexto-produtos'>
          <h1 className='h1-produtos'>Produtos</h1>
        </div>

        <div className='linha1-produtos'>
          <div className='div-item-produtos'>
            <div className='div-text-produtos'>Item:</div>
              <div className='div-inputs'>
                <Input
                  allowClear={!this.state.fieldFalha.item}
                  className={
                    this.state.fieldFalha.item ?
                      'div-inputError-produtos' :
                      'input-100'}
                  placeholder="Digite o item"
                  name='item'
                  value={this.state.item}
                  onChange={this.onChange}
                  onBlur={this.onBlurValidator}
                  onFocus={this.onFocus}
                />
                {this.state.fieldFalha.item ?
                  <p className='div-feedbackError'>
                    {this.state.message.item}
                  </p> : null}
            </div>
          </div>

          <div className='div-categoria-produtos'>
            <div className='div-text-produtos'>Categoria:</div>
            <Select value={this.state.categoria} style={{ width: '100%' }} onChange={this.handleChange}>
              <Option value='Equipamento'>Equipamento</Option>
              <Option value='Peca'>Peca</Option>
              <Option value='Outros'>Outros</Option>
            </Select>
          </div>

          <div className='div-marca-produtos'>
            <div className='div-text-produtos'>Marca:</div>
              <div className='div-inputs'>
              {this.state.marcaArray.length !== 0 ?
                <Select
                  showSearch
                  placeholder="Selecione o produto"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  name='mark'
                  value={this.state.marca}
                  style={{ width: '100%'}}
                  onChange={this.handleChangeMarca}
                  onFocus={this.onFocusMark}
                  className={this.state.fieldFalha.mark ? 'div-inputError-produtos' : 'input-100'}> 
                {this.state.marcaArray.map((valor) =>
                  <Option value={valor.mark}>{valor.mark}</Option>)}
                </Select> : 
                <Select value='Nenhuma marca cadastrada' style={{ width: '100%'}}></Select>}

              {this.state.fieldFalha.mark ?
                  <p className='div-feedbackError'>
                    {this.state.message.mark}
                  </p> : null}
              </div>
              {this.props.auth.addMark ? <Button className='buttonadd-marca-produtos' type="primary" icon="plus" name='modalMarca' onClick={this.openModais}/> : null }
          </div>
          <this.modalMarca />
        </div>

        {this.state.categoria === 'Equipamento' ? <div className='linha1-produtos'>
          <div className='div-tipo-produtos'>
            <div className='div-text-produtos'>Tipo:</div>
            <div className='div-inputs'>
              {this.state.tipoArray.length !== 0 ?
                <Select
                  value={this.state.tipo}
                  style={{ width: '100%'}}
                  name='type'
                  onFocus={this.onFocusType}
                  className={this.state.fieldFalha.type ? 'div-inputError-produtos' : 'input-100'}
                  onChange={this.handleChangeTipo}> 
              {this.state.tipoArray.map((valor) =>
              <Option value={valor.type}>{valor.type}</Option>)}
              </Select> : 
              <Select value='Nenhum tipo cadastrado' style={{ width: '100%'}}></Select>}
              {this.state.fieldFalha.type ?
                  <p className='div-feedbackError'>
                    {this.state.message.type}
                  </p> : null}
            </div>
            {this.props.auth.addType ? <Button className='buttonadd-marca-produtos' type="primary" name='modalTipo' icon="plus" onClick={this.openModais}/> : null }
            <this.modalTipo />
          </div>

          <div className='div-modelo-produtos'>
            <div className='div-text-produtos'>Fabricante:</div>
            <Input
              readOnly
              placeholder='Selecione a marca'
              className='input-100'
              name='fabricante'
              value={this.state.fabricante}
            />
          </div>

        </div> : null}

        <div className='linha1-produtos'>
          <div className='div-descricao-produtos'>
            <div className='div-text-produtos'>Descrição:</div>
            <TextArea
              className='input-100'
              placeholder="Digite a descrição"
              autosize={{ minRows: 2, maxRows: 4 }}
              rows={4}
              name='descricao'
              value={this.state.descricao}
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className='linhaSemEspaco-produtos'>
          <div className='div-codigo-produtos'>
            <div className='div-text-produtos'>SKU:</div>
              <div className='div-inputs'>
                <Input
                  allowClear={!this.state.fieldFalha.codigo}
                  className={
                    this.state.fieldFalha.codigo ?
                      'div-inputError-produtos' :
                      'input-100'}
                  placeholder="12345"
                  name='codigo'
                  value={this.state.codigo}
                  onChange={this.onChange}
                  onBlur={this.onBlurValidator}
                  onFocus={this.onFocus}
                />
                {this.state.fieldFalha.codigo ?
                  <p className='div-feedbackError'>
                    {this.state.message.codigo}
                  </p> : null}
              </div>
          </div>

          <div className='div-quantMin-produtos'>
            <div className='div-textQuant-produtos'>Quant. min:</div>
              <div className='div-inputs'>
                <InputNumber
                  min={1}
                  className={
                    this.state.fieldFalha.quantMin ?
                      'div-inputError-produtos' :
                      'input-100'}
                  placeholder="12345"
                  name='quantMin'
                  value={this.state.quantMin}
                  onChange={this.onChangeQuantMin}
                  onBlur={this.onBlurValidator}
                  onFocus={this.onFocus}
                />
                {this.state.fieldFalha.quantMin ?
                  <p className='div-feedbackError'>
                    {this.state.message.quantMin}
                  </p> : null}
            </div>
          </div>

          <div className='div-serial-produtos'>
            <div className='div-textSerial-produtos'>Número de série:</div>
            <Switch checked={this.state.serial} onChange={this.onChangeSerial} />
          </div>
        </div>

        <div className='linha-button-produtos'>
          <Button className='button' type="primary" loading={this.state.loading} onClick={this.saveTargetNewProduto}>Salvar</Button>
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

export default connect(mapStateToProps)(NovoProduto)