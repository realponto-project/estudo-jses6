import React, { Component } from "react";
import "./index.css";
import { Input, Select, InputNumber, Button, Modal, message } from "antd";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { validators } from "./validators";
import { newEntrada } from "../../../../services/entrada";
import { getItens } from "../../../../services/produto";
import { getFornecedor } from "../../../../services/fornecedores";
import { getSerial } from "../../../../services/serialNumber";

const { Option } = Select;
const { TextArea } = Input;

class NovaEntrada extends Component {
  state = {
    fornecedorArray: [],
    itemArray: [],
    serial: false,
    numeroSerieTest: [],
    messageError: false,
    messageSucesso: false,
    estoque: "REALPONTO",
    nomeProduto: "Não selecionado",
    fornecedor: "Não selecionado",
    quant: 1,
    modalConfirm: false,
    arrayProdutos: [],
    fieldFalha: {
      nomeProduto: false,
      fornecedor: false
    },
    message: {
      nomeProduto: "",
      fornecedor: ""
    },
    productId: "",
    companyId: ""
  };

  componentDidMount = async () => {
    await this.getAllItens();

    await this.getAllFornecedor();
  };

  getAllFornecedor = async razaoSocial => {
    const query = {
      filters: {
        company: {
          specific: {
            razaoSocial
          }
        }
      }
    };
    await getFornecedor(query).then(resposta =>
      this.setState({
        fornecedorArray: resposta.data
      })
    );
  };

  getAllItens = async query => {
    await getItens(query).then(resposta =>
      this.setState({
        itemArray: resposta.data
      })
    );
  };

  handleOk = () => {
    this.setState({
      modalConfirm: false,
      nomeProduto: "",
      fornecedor: "",
      quant: 1
    });
  };

  handleCancel = () => {
    this.setState({
      modalConfirm: false
    });
  };

  success = () => {
    message.success("A entrada foi efetuada");
  };

  error = value => {
    message.error(value);
  };

  errorNumeroSerie = () => {
    message.error("Este equipamento ja foi registrado");
  };

  errorNome = () => {
    message.error("O nome do produto é obrigatório");
  };

  errorForn = () => {
    message.error("O fornecedor é obrigatório");
  };

  errorOsDois = () => {
    message.error("O nome do produto e o fornecedor são obrigatórios");
  };

  messagesError = () => {
    if (this.state.nomeProduto === "" && this.state.fornecedor === "") {
      this.errorOsDois();
    } else if (this.state.nomeProduto === "" && this.state.fornecedor !== "") {
      this.errorNome();
    } else if (this.state.nomeProduto !== "" && this.state.fornecedor === "") {
      this.errorForn();
    } else if (this.state.nomeProduto !== "" && this.state.fornecedor !== "") {
      this.Confirm();
    }
  };

  onChangeSelect = async value => {
    if (value === "EMPRESTIMO") {
      const query = {
        filters: {
          product: {
            specific: {
              serial: true
            }
          }
        }
      };
      await this.getAllItens(query);
      this.setState({ nomeProduto: "Não selecionado" });
    } else {
      await this.getAllItens();
    }
    this.setState({
      estoque: value
    });
  };

  saveTargetNewEntrada = async () => {
    const values = {
      amountAdded: this.state.quant.toString(),
      stockBase: this.state.estoque,
      productId: this.state.productId,
      companyId: this.state.companyId,
      serialNumbers:
        this.state.numeroSerieTest.length > 0
          ? this.state.numeroSerieTest
              .split(/\n/)
              .filter(item => (item ? item : null))
          : null,
      responsibleUser: this.props.auth.username
    };

    const resposta = await newEntrada(values);

    if (resposta.status === 422) {
      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message
      });

      await this.error(
        resposta.data.fields[0].field.message
          ? resposta.data.fields[0].message.message
          : "A entrada não foi efetuada"
      );
      this.setState({
        messageError: false,
        modalConfirm: false
      });
    }
    if (resposta.status === 200) {
      this.setState({
        estoque: "REALPONTO",
        nomeProduto: "Não selecionado",
        fornecedor: "Não selecionado",
        quant: 1,
        numeroSerieTest: [],
        messageSuccess: true,
        serial: false,
        modalConfirm: false
      });
      await this.success();
    }
  };

  filter = async e => {
    await this.setState({
      numeroSerieTest: e.target.value
    });

    const teste = this.state.numeroSerieTest.split(/\n/);

    if (
      /\n/.test(
        this.state.numeroSerieTest[this.state.numeroSerieTest.length - 1]
      )
    ) {
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
          numeroSerieTest: testeArray.replace(/,/gi, "\n")
        });
      }
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeItem = (value, product) => {
    this.setState({
      nomeProduto: value,
      serial: product.props.product.serial,
      productId: product.props.product.id
    });
  };

  onChangeForn = (value, company) => {
    this.setState({
      fornecedor: value,
      companyId: company.props.company.id
    });
  };

  handleChange = value => {
    this.setState({
      nomeProduto: value
    });
  };

  onChangeQuant = value => {
    this.setState({
      quant: value
    });
  };

  onBlurValidator = e => {
    const { nome, valor, fieldFalha, message } = validators(
      e.target.name,
      e.target.value,
      this.state
    );

    this.setState({
      [nome]: valor,
      fieldFalha,
      message
    });
  };

  Confirm = () => {
    this.setState({
      modalConfirm: true
    });
  };

  modalConfirm = () => (
    <Modal
      title="Confirmar produto"
      visible={this.state.modalConfirm}
      onOk={this.saveTargetNewEntrada}
      okText="Confirmar"
      onCancel={this.handleCancel}
      cancelText="Cancelar"
    >
      <div className="linhaModal-entrada">
        <div className="div-fornecedorModal-entrada">
          <div className="div-text-entrada">Produto:</div>
          <label className="label-entrada">{this.state.nomeProduto}</label>
        </div>
      </div>

      <div className="linhaModal-entrada">
        <div className="div-fornecedorModal-entrada">
          <div className="div-text-entrada">Quant:</div>
          <label className="label-entrada">{this.state.quant} UN</label>
        </div>
      </div>

      <div className="linhaModal-entrada">
        <div className="div-fornecedorModal-entrada">
          <div className="div-text-entrada">Estoque:</div>
          <label className="label-entrada">{this.state.estoque}</label>
        </div>
      </div>

      <div className="linhaModal-entrada">
        <div className="div-fornecedorModal-entrada">
          <div className="div-text-entrada">Fornecedor:</div>
          <label className="label-entrada">{this.state.fornecedor}</label>
        </div>
      </div>
    </Modal>
  );

  renderRedirect = () => {
    if (!this.props.auth.addEntr) {
      return <Redirect to="/logged/dash" />;
    }
  };

  render() {
    return (
      <div className="div-card-entrada">
        {this.renderRedirect()}
        <div className="linhaTexto-entrada">
          <h1 className="h1-entrada">Nova entrada</h1>
        </div>

        <div className="linha1-entrada">
          <div className="div-nome-entrada">
            <div className="div-textNome-entrada">Nome do produto:</div>
            <div className="div-inputs">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Selecione o produto"
                optionFilterProp="children"
                value={this.state.nomeProduto}
                onChange={this.onChangeItem}
                onSearch={async name => {
                  const query = {
                    filters: {
                      product: {
                        specific: {
                          name,
                          serial:
                            this.state.estoque === "EMPRESTIMO"
                              ? true
                              : undefined
                        }
                      }
                    }
                  };
                  await this.getAllItens(query);
                }}
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
              {this.state.fieldFalha.nomeProduto ? (
                <p className="div-feedbackError">
                  {this.state.message.nomeProduto}
                </p>
              ) : null}
            </div>
          </div>

          <div className="div-estoque-entrada">
            <div className="div-text-entrada">Estoque:</div>
            <Select
              value={this.state.estoque}
              style={{ width: "100%" }}
              onChange={this.onChangeSelect}
            >
              <Option value="REALPONTO">REALPONTO</Option>
              <Option value="NOVAREAL">NOVA REALPONTO</Option>
              <Option value="PONTOREAL">PONTOREAL</Option>
              <Option value="EMPRESTIMO">EMPRESTIMO</Option>
            </Select>
          </div>
        </div>

        <div className="linha1-entrada">
          <div className="div-fornecedor-entrada">
            <div className="div-text-entrada">Fornecedor:</div>
            <div className="div-inputs">
              <Select
                showSearch
                onSearch={razaoSocial => this.getAllFornecedor(razaoSocial)}
                style={{ width: "100%" }}
                optionFilterProp="children"
                value={this.state.fornecedor}
                onChange={this.onChangeForn}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.fornecedorArray.map(value => (
                  <Option company={value} value={value.razaoSocial}>
                    {value.razaoSocial}
                  </Option>
                ))}
              </Select>
              {this.state.fieldFalha.fornecedor ? (
                <p className="div-feedbackError">
                  {this.state.message.fornecedor}
                </p>
              ) : null}
            </div>
          </div>

          <div className="div-quant-entrada">
            <div className="div-text-entrada">Quant:</div>
            <InputNumber
              min={1}
              defaultValue={this.state.quant}
              style={{ width: "100%" }}
              value={this.state.quant}
              onChange={this.onChangeQuant}
            />
          </div>
        </div>

        <div className="div-button-entrada">
          {this.state.serial && (
            <div className="div-serial-entrada">
              <div className="div-textSerial-entrada">Número de série:</div>
              <TextArea
                className="input-100"
                placeholder="Digite o número de série"
                autosize={{ minRows: 2, maxRows: 4 }}
                rows={4}
                name="numeroSerie"
                value={this.state.numeroSerieTest}
                onChange={this.filter}
              />
            </div>
          )}
          {this.state.nomeProduto !== "Não selecionado" &&
          this.state.fornecedor !== "Não selecionado" ? (
            <Button
              className="button"
              type="primary"
              onClick={this.messagesError}
              loading={this.state.loading}
            >
              Salvar
            </Button>
          ) : null}
          <this.modalConfirm />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(NovaEntrada);
