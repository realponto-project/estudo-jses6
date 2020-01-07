import React, { Component } from "react";
import { Select, Button, Modal } from 'antd';
import './index.css'

const { Option } = Select;

class EmprestimoContainer extends Component {

  state = {
    select: 'disponiveis',
    modalAdicionar: false,
  }

  onChangeSelect = (value) => {
    this.setState({
      select: value
    })
  }

  handleOk = () => {
    this.setState({
      modalAdicionar: false,
    });
  };

  ModalAdicionar = () => (
    <Modal
      title="Adicionar aos disponíveis"
      visible={this.state.modalAdicionar}
      onOk={this.handleOk}
      onCancel={this.handleOk}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )

  onClickAdicionar = () => {
    this.setState({
      modalAdicionar: true
    })
  }

  render() {
    return (
      <div className='div-card-Gentrada'>
        <div className='linhaTexto-Gentrada'>
          <h1 className='h1-Gentrada'>Gerenciar empréstimos</h1>
        </div>

        <div className='div-select-emprestimo'>
          <Select value={this.state.select} style={{ width: '20%' }} onChange={this.onChangeSelect}>
            <Option value="disponiveis">DISPONÍVEIS</Option>
            <Option value="reservados">RESERVADOS</Option>
          </Select>

          <Button
            type="primary"
            className='button'
            onClick={this.onClickAdicionar}
          >
            Adicionar
          </Button>
          <this.ModalAdicionar/>
        </div>

        {this.state.select === 'disponiveis' ? <div className="div-cabecalho-estoque">
          <div className="cel-produto-cabecalho-estoque">Produto</div>
          <div className="cel-fabricante-cabecalho-estoque">Fabricante</div>
          <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
          <div className="cel-estoque-cabecalho-estoque">Estoque</div>
        </div> : <div className="div-cabecalho-estoque">
            <div className="cel-produto-cabecalho-estoque">Produto</div>
            <div className="cel-razaosocial-cabecalho-emprestimo">Razão social</div>
            <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
          </div>}

      </div>
    )
  }
}

export default EmprestimoContainer