import React, { Component } from "react";
import { Button, Select, Input, Modal, message } from "antd";

import "./index.css";
import { addEquip, getAllEquipsService } from "../../../../services/equip";
import { getItens } from "../../../../services/produto";
import { getSerial } from "../../../../services/serialNumber";

const { TextArea } = Input;
const { Option } = Select;

class EmprestimoContainer extends Component {
  state = {
    razaoSocial: "",
    nomeProduto: "",
    productId: "",
    textArea: "",
    visible: false,
    itemArray: [],
    select: "disponiveis",
    modalAdicionar: false
  };

  onChangeSelect = value => {
    this.setState({
      select: value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async () => {
    const { productId, textArea } = this.state;

    const serialnNumbers = textArea
      .split(/\n/)
      .filter(item => (item ? item : null));

    console.log(productId, textArea, serialnNumbers);

    const value = {
      productId,
      serialnNumbers
    };

    await addEquip(value);

    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  componentDidMount = async () => {
    await this.getAllItens();

    await this.getAllEquips();
  };

  getAllEquips = async () => {
    const query = {
      filters: {
        equip: {
          specific: {
            imprestimo: true
          }
        }
      }
    };

    const response = await getAllEquipsService(query);

    console.log(response);
  };

  getAllItens = async () => {
    const query = {
      filters: {
        product: {
          specific: {
            serial: true
          }
        }
      }
    };

    await getItens(query).then(resposta => {
      this.setState({
        itemArray: resposta.data
      });
    });
  };

  onChangeItem = (value, product) => {
    this.setState({
      nomeProduto: value,
      productId: product.props.product.id
    });
  };

  errorNumeroSerie = () => {
    message.error("Este equipamento ja foi registrado");
  };

  filter = async e => {
    const { value } = e.target;

    await this.setState({
      textArea: value
    });

    const teste = value.split(/\n/);

    if (/\n/.test(value[value.length - 1])) {
      let count = 0;

      // eslint-disable-next-line array-callback-return
      teste.map(valor => {
        if (valor === teste[teste.length - 2]) count++;
      });

      const resp = await getSerial(teste[teste.length - 2]);

      if (resp.data) count++;

      if (count > 1) {
        this.errorNumeroSerie();

        teste.splice(teste.length - 2, 1);

        const testeArray = teste.toString();

        this.setState({
          textArea: testeArray.replace(/,/gi, "\n")
        });
      }
    }
  };

  ModalNewEquips = () => {
    return (
      <Modal
        title="Basic Modal"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        {this.state.itemArray.length !== 0 ? (
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Selecione o produto"
            optionFilterProp="children"
            value={this.state.nomeProduto}
            onChange={this.onChangeItem}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.itemArray.map(value => (
              <Option product={value} value={value.name}>
                {value.name}
              </Option>
            ))}
          </Select>
        ) : (
          <Select value="Nenhum produto cadastrado"></Select>
        )}
        <TextArea
          className="input-100"
          placeholder="Digite o número de série"
          autosize={{ minRows: 2, maxRows: 4 }}
          rows={4}
          name="numeroSerie"
          value={this.state.textArea}
          onChange={this.filter}
        />
      </Modal>
    );
  };

  render() {
    return (
      <>
        {this.ModalNewEquips()}
        <div className="div-card-Gentrada">
          <div className="linhaTexto-Gentrada">
            <h1 className="h1-Gentrada">Gerenciar empréstimos</h1>
          </div>
          <div className="div-select-emprestimo">
            <Select
              value={this.state.select}
              style={{ width: "20%" }}
              onChange={this.onChangeSelect}
            >
              <Option value="disponiveis">DISPONÍVEIS</Option>
              <Option value="reservados">RESERVADOS</Option>
            </Select>
            <Button
              type="primary"
              className="button"
              onClick={() => this.setState({ visible: true })}
            >
              Adicionar
            </Button>
          </div>

          {this.state.select === "disponiveis" ? (
            <div className="div-cabecalho-estoque">
              <div className="cel-produto-cabecalho-estoque">Produto</div>
              <div className="cel-fabricante-cabecalho-estoque">Fabricante</div>
              <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
              <div className="cel-estoque-cabecalho-estoque">Estoque</div>
            </div>
          ) : (
            <div className="div-cabecalho-estoque">
              <div className="cel-produto-cabecalho-estoque">Produto</div>
              <div className="cel-razaosocial-cabecalho-emprestimo">
                Razão social
              </div>
              <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
            </div>
          )}
        </div>
      </>
    );
  }

  // render() {
  //   return (
  //     <>

  //       {this.state.select === "disponiveis" ? (
  //         <div className="div-cabecalho-estoque">
  //           <div className="cel-produto-cabecalho-estoque">Produto</div>
  //           <div className="cel-fabricante-cabecalho-estoque">Fabricante</div>
  //           <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
  //           <div className="cel-estoque-cabecalho-estoque">Estoque</div>
  //         </div>
  //       ) : (
  //         <div className="div-cabecalho-estoque">
  //           <div className="cel-produto-cabecalho-estoque">Produto</div>
  //           <div className="cel-razaosocial-cabecalho-emprestimo">
  //             Razão social
  //           </div>
  //           <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
  //         </div>
  //       )}
  //     </>
  //   );
  // }
}

export default EmprestimoContainer;
