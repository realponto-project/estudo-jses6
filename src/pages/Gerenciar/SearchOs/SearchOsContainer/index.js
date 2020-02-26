import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import moment from "moment";
import * as R from "ramda";
import "./index.css";
import {
  Input,
  DatePicker,
  InputNumber,
  Button,
  message,
  Select,
  Icon,
  Modal
} from "antd";
import { validators, masks } from "./validators";
import { getOsByOs, updateReservaOs } from "../../../../services/reservaOs";
import {
  getAllStatusExpedition,
  addStatusExpedition
} from "../../../../services/statusExpedition";
import { getProdutoByEstoque, getProdutos } from "../../../../services/produto";
import { getTecnico } from "../../../../services/tecnico";
import { getSerial } from "../../../../services/serialNumber";

const { TextArea } = Input;
const { Option } = Select;

class SearchOsDash extends Component {
  state = {
    redirect: false,
    newStatus: "",
    modalAddStatus: false,
    readOnly: false,
    serial: false,
    numeroSerieTest: "",
    tecnicoArray: [],
    itemArray: [],
    status: "Não selecionado",
    allStatus: [],
    messageError: false,
    messageSuccess: false,
    // data: this.props.osUpdateValue.date,
    data: moment(this.props.osUpdateValue.date),
    tecnico: this.props.osUpdateValue.technician,
    nomeProduto: "Não selecionado",
    productBaseId: "",
    tecnicoId: this.props.osUpdateValue.technicianId,
    quant: 1,
    quantObj: {},
    carrinho: this.props.osUpdateValue.products,
    estoque: "REALPONTO",
    disp: 1,
    fieldFalha: {
      Os: false,
      razaoSocial: false,
      cnpj: false,
      data: false,
      technician: false
    },
    message: {
      Os: "",
      razaoSocial: "",
      cnpj: "",
      data: "",
      technician: ""
    }
  };

  redirectGerenciarOs = () => {
    this.setState({
      redirect: true
    });
  };

  openModais = e => {
    this.setState({
      modalAddStatus: true
    });
  };

  renderRedirect = () => {
    if (!this.props.auth.updateRos) {
      return <Redirect to="/logged/dash" />;
    }

    if (this.state.redirect) {
      return <Redirect push to="/logged/Os/dash" />;
    }
  };

  getAllTecnico = async name => {
    const query = {
      filters: {
        technician: {
          specific: {
            name
          }
        }
      }
    };
    await getTecnico(query).then(resposta =>
      this.setState({
        tecnicoArray: resposta.data
      })
    );
  };

  errorNumeroSerie = value => {
    message.error(value, 10);
  };

  filter = async e => {
    await this.setState({
      numeroSerieTest: e.target.value
    });

    const teste = this.state.numeroSerieTest.split(/\n/, 10);

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

      let mensagem = "Este equipamento ja foi inserido nessa reserva";

      const resp = await getSerial(teste[teste.length - 2]);

      if (resp.data) {
        if (resp.data.productBase.product.name !== this.state.nomeProduto) {
          mensagem = "Este equipamento não contém esse número de série";
          count++;
        }
        if (resp.data.reserved) {
          count++;
          if (resp.data.deletedAt) {
            if (resp.data.osParts) {
              mensagem = `Este equipamento ja foi liberado para a OS: ${resp.data.osPart.o.os}`;
            } else if (resp.data.freeMarketPart) {
              mensagem = `Este equipamento foi liberado para mercado livre com código de restreamento: ${resp.data.freeMarketPart.freeMarket.trackingCode}`;
            }
          } else {
            mensagem = `Este equipamento ja foi reservado para a OS: ${resp.data.osPart.o.os}`;
          }
        }
      } else {
        mensagem = "Este equipamento não consta na base de dados";
        count++;
      }

      if (count > 1) {
        this.errorNumeroSerie(mensagem);

        teste.splice(teste.length - 2, 1);

        const testeArray = teste.toString();

        this.setState({
          numeroSerieTest: testeArray.replace(/,/gi, "\n")
        });
      }
    }
  };

  getAllStatusExpedition = async () => {
    const { status, data } = await getAllStatusExpedition();

    if (status === 200) {
      this.setState({
        allStatus: data
          .map(item => item.status)
          .filter(item => item !== "EMPRESTIMO")
      });
    }
  };

  componentDidMount = async () => {
    await this.getAllItens();
    await this.getAllTecnico();
    await this.getAllStatusExpedition();

    // eslint-disable-next-line array-callback-return
    await this.state.carrinho.map(item => {
      this.setState({
        quantObj: {
          ...this.state.quantObj,
          [`quant${item.name}`]: item.amount
        }
      });
    });

    let textArea = {};

    // eslint-disable-next-line array-callback-return
    this.state.carrinho.map(item => {
      if (item.serial) {
        textArea = {
          ...textArea,
          [item.id]: item.serialNumbers
            .map(testeValor => testeValor.serialNumber)
            .toString()
            .replace(/,/gi, "\n")
        };
      }
    });

    await this.setState({
      textArea
    });
  };

  getAllItens = async name => {
    const query = {
      filters: {
        product: {
          specific: {
            name
          }
        },
        stockBase: {
          specific: {
            stockBase: this.state.estoque
          }
        }
      }
    };

    await getProdutoByEstoque(query).then(resposta =>
      this.setState({
        itemArray: resposta.data
      })
    );
  };

  onChangeItem = async (value, props) => {
    await this.setState({
      nomeProduto: value,
      productBaseId: props.props.props.id,
      serial: props.props.props.serial,
      disp: parseInt(props.props.props.available, 10)
    });
  };

  success = () => {
    message.success("A reserva foi efetuada");
  };

  error = () => {
    message.error("A reserva não foi efetuada");
  };

  errorProduto = () => {
    message.error("Verifique se todos os campos estão selecionados");
  };

  onChangeData = date => {
    this.setState({
      data: date
    });
  };

  getAllProducts = async () => {
    const query = {
      filters: {
        product: {
          specific: {
            serial: true
          }
        }
      }
    };

    await getProdutos(query).then(resposta =>
      this.setState({
        itemArray: resposta.data.rows.map(item => {
          const resp = { name: item.name, id: item.id };
          return resp;
        })
      })
    );
  };

  onChangeStatus = async valor => {
    if (this.state.status === "CONSERTO" || valor === "CONSERTO") {
      await this.setState({
        serialNumber: "",
        numeroSerieTest: "",
        productBaseId: "",
        nomeProduto: "Não selecionado"
      });
    }

    await this.setState({
      serialNumber: "",
      status: valor,
      nomeProduto: "Não selecionado",
      serial: false
    });

    if (valor === "CONSERTO") {
      this.getAllProducts();
    } else {
      await this.getAllItens();
    }
  };

  getOs = async () => {
    const os = await getOsByOs(this.state.Os);

    if (os.status === 200) {
      if (os.data.razaoSocial) {
        await this.setState({
          razaoSocial: os.data.razaoSocial,
          cnpj: os.data.cnpj,
          data: moment(os.data.data),
          tecnico: os.data.technician,
          carrinho: os.data.reserve,
          readOnly: true,
          fieldFalha: {
            Os: false,
            razaoSocial: false,
            cnpj: false,
            data: false,
            technician: false
          },
          message: {
            Os: "",
            razaoSocial: "",
            cnpj: "",
            data: "",
            technician: ""
          }
        });
      } else {
        this.setState({
          readOnly: false
        });
      }
    }
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

  onFocus = e => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        [e.target.name]: false
      },
      message: {
        ...this.state.message,
        [e.target.name]: false
      }
    });
  };

  onFocusTecnico = () => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        technician: false
      },
      message: {
        ...this.state.message,
        technician: false
      }
    });
  };

  updateTargetReservaOs = async () => {
    const osParts = await this.state.carrinho.map(item => {
      let resp = {};
      if (R.prop("id", item)) {
        resp = {
          id: item.id,
          amount: this.state.quantObj[`quant${item.name}`].toString()
        };
      } else {
        resp = {
          ...item,
          amount: this.state.quantObj[`quant${item.name}`].toString()
        };
      }
      return resp;
    });

    const value = {
      id: this.props.osUpdateValue.id,
      date: this.state.data,
      technicianId: this.state.tecnicoId,
      osParts
    };

    this.setState({
      loading: true
    });

    const resposta = await updateReservaOs(value);

    if (resposta.status === 422) {
      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message
      });
      await this.error();
      this.setState({
        loading: false,
        messageError: false
      });
    }
    if (resposta.status === 200) {
      this.setState({
        Os: "",
        razaoSocial: "",
        cnpj: "",
        data: "",
        carrinho: [],
        // tecnicoId: '',
        messageSuccess: true
      });
      await this.success();
      this.setState({
        loading: false,
        messageSuccess: false,
        redirect: true
      });
    }
  };

  onChangeEstoque = async value => {
    await this.setState({
      estoque: value,
      nomeProduto: "Não selecionado",
      productBaseId: "",
      serial: "",
      disp: 0
    });
    await this.getAllItens();
  };

  onChangeSelect = (value, props) => {
    this.setState({
      tecnico: value,
      technicoId: props.props.props.id
    });
  };

  onChange = e => {
    const { nome, valor } = masks(e.target.name, e.target.value);

    this.setState({
      [nome]: valor
    });
  };

  onChangeTextArea = e => {
    this.setState({
      textArea: {
        ...this.state.textArea,
        [e.target.name]: e.target.value
      }
    });
  };

  onChangeQuant = value => {
    this.setState({
      quant: value
    });
  };

  onChangeUpdateQuant = (name, value) => {
    this.setState({
      quantObj: {
        ...this.state.quantObj,
        [`quant${name}`]: value
      }
    });
  };

  errorSelecionado = value => {
    message.error(value);
  };

  modalStatus = () => (
    <Modal
      title="Adicionar status"
      visible={this.state.modalAddStatus}
      onOk={this.handleOk}
      okText="Salvar"
      onCancel={this.handleOk}
      cancelText="Cancelar"
    >
      <div className="linhaModal-produtos">
        <div className="div-marcaModal-produtos">
          <div className="div-text-produtos">Status:</div>
          <Input
            allowClear={!this.state.fieldFalha.newStatus}
            className={
              this.state.fieldFalha.newStatus
                ? "div-inputError-tecnico"
                : "input-100"
            }
            placeholder="Digite o status"
            name="newStatus"
            value={this.state.newStatus}
            onChange={this.onChange}
            onBlur={this.onBlurValidator}
            onFocus={this.onFocus}
          />
          {this.state.fieldFalha.newStatus ? (
            <p className="div-feedbackError">{this.state.message.status}</p>
          ) : null}
        </div>
      </div>
    </Modal>
  );

  handleOk = async () => {
    const value = {
      status: this.state.newStatus
    };

    await addStatusExpedition(value);
    this.setState({
      modalAddStatus: false
    });

    await this.getAllStatusExpedition();
  };

  addCarrinho = () => {
    if (
      this.state.nomeProduto !== "Não selecionado" &&
      this.state.status !== "Não selecionado"
    ) {
      const array = this.state.carrinho.map(value => value.name);

      if (array.filter(value => value === this.state.nomeProduto).length > 0) {
        this.errorSelecionado("Este item já foi selecionado");
        this.setState({
          nomeProduto: "Não selecionado",
          status: "Não selecionado"
        });
        return;
      }

      if (
        this.state.serial &&
        this.state.numeroSerieTest
          .split(/\n/)
          .filter(item => (item ? item : null)).length !== this.state.quant
      ) {
        this.errorSelecionado(
          "Quantidade de numero de serie não condiz com a quantidade adicionada"
        );
        return;
      }

      this.setState({
        quantObj: {
          ...this.state.quantObj,
          [`quant${this.state.nomeProduto}`]: this.state.quant
        },
        carrinho: [
          {
            name: this.state.nomeProduto,
            productBaseId: this.state.productBaseId,
            amount: this.state.quant.toString(),
            stockBase: this.state.estoque,
            serialNumberArray: this.state.numeroSerieTest
              .split(/\n/)
              .filter(item => (item ? item : null)),
            serial: this.state.serial
          },
          ...this.state.carrinho
        ],
        nomeProduto: "Não selecionado",
        status: "Não selecionado",
        quant: 1,
        estoque: "REALPONTO",
        serial: false,
        numeroSerieTest: ""
      });
      let textArea = {};

      // eslint-disable-next-line array-callback-return
      this.state.carrinho.map(item => {
        if (item.serial) {
          textArea = {
            ...textArea,
            [item.id]: ""
          };
        }
      });

      this.setState({
        textArea
      });
    } else this.errorProduto();
  };

  remove = value => {
    const oldCarrinho = this.state.carrinho;
    const newCarrinho = oldCarrinho.filter(valor => valor !== value);

    this.setState({
      carrinho: newCarrinho
    });
  };

  disabledDate = current => {
    return current && current < moment().subtract(1, "day");
  };

  render() {
    return (
      <div className="div-card-Os">
        <div className="linhaTexto-GOs">
          <div className="div-nome-40">
            <div>
              <Icon
                type="arrow-left"
                onClick={() => this.redirectGerenciarOs()}
              />
            </div>
            {this.renderRedirect()}
          </div>
          <div className="div-nome-60">
            <h1 className="h1-Os">Buscas por Os</h1>
          </div>
        </div>

        <div className="div-linha-Os">
          <div className="div-nOs-Os">
            <div className="div-textOs-Os">Nº Os:</div>
            <div className="div-inputs">
              <Input
                readOnly
                className="input-100"
                style={{ width: "100%" }}
                value={this.props.osUpdateValue.Os}
              />
              {this.state.fieldFalha.Os ? (
                <p className="div-feedbackError">{this.state.message.Os}</p>
              ) : null}
            </div>
          </div>

          <div className="div-rs-Os">
            <div className="div-textRs-Os">Razão social:</div>
            <div className="div-inputs">
              <Input
                readOnly
                className="input-100"
                style={{ width: "100%" }}
                value={this.props.osUpdateValue.razaoSocial}
              />
              {this.state.fieldFalha.razaoSocial ? (
                <p className="div-feedbackError">
                  {this.state.message.razaoSocial}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="div-linha1-Os">
          <div className="div-cnpj-Os">
            <div className="div-text-Os">Cnpj:</div>
            <div className="div-inputs">
              <Input
                readOnly
                className="input-100"
                style={{ width: "100%" }}
                value={this.props.osUpdateValue.cnpj.replace(
                  /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                  "$1.$2.$3/$4-$5"
                )}
              />
              {this.state.fieldFalha.cnpj ? (
                <p className="div-feedbackError">{this.state.message.cnpj}</p>
              ) : null}
            </div>
          </div>

          <div className="div-data-Os">
            <div className="div-textData-Os">Data do atendimento:</div>
            <div className="div-inputs">
              <DatePicker
                disabledDate={this.disabledDate}
                className={
                  this.state.fieldFalha.data ? "div-inputError-OS" : "input-100"
                }
                onChange={this.onChangeData}
                name="data"
                onFocus={this.onFocus}
                format="DD/MM/YYYY"
                value={this.state.data}
                placeholder="Selecione uma data"
              />
              {this.state.fieldFalha.data ? (
                <p className="div-feedbackError">{this.state.message.data}</p>
              ) : null}
            </div>
          </div>

          <div className="div-tecnico-Os">
            <div className="div-text-Os">Técnico:</div>
            <div className="div-inputs">
              {this.state.tecnicoArray.length === 0 ? (
                <Select
                  className={
                    this.state.fieldFalha.technician
                      ? "div-inputError-OS"
                      : "input-100"
                  }
                  value="Nenhum tecnicos cadastrado"
                  name="technician"
                  onFocus={this.onFocusTecnico}
                  style={{ width: "100%" }}
                ></Select>
              ) : (
                <Select
                  className={
                    this.state.fieldFalha.technician
                      ? "div-inputError-OS"
                      : "input-100"
                  }
                  defaultValue="Não selecionado"
                  style={{ width: "100%" }}
                  onChange={this.onChangeSelect}
                  showSearch
                  onSearch={name => this.getAllTecnico(name)}
                  placeholder="Nenhum tecnicos cadastrado"
                  optionFilterProp="children"
                  value={this.state.tecnico}
                  name="technician"
                  onFocus={this.onFocusTecnico}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.tecnicoArray.map(valor => (
                    <Option props={valor} value={valor.name}>
                      {valor.name}
                    </Option>
                  ))}
                </Select>
              )}
              {this.state.fieldFalha.technician ? (
                <p className="div-feedbackError">
                  {this.state.message.technician}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="linhaTextoPecas-Os">
          <h1 className="h1-Os">Reservar peças</h1>
        </div>

        <div className="div-linha-Os">
          <div className="div-nome-Os">
            <div className="div-textNome-Os">Nome do produto:</div>
            {this.state.itemArray.length !== 0 ? (
              <Select
                showSearch
                onSearch={name => this.getAllItens(name)}
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
                  <Option props={value} value={value.name}>
                    {value.name}
                  </Option>
                ))}
              </Select>
            ) : (
              <Select
                style={{ width: "100%" }}
                value="Nenhum produto cadastrado"
              ></Select>
            )}
          </div>

          <div className="div-quant-Os">
            <div className="div-text-Os">Quant:</div>
            <InputNumber
              min={1}
              max={this.state.disp}
              defaultValue={this.state.quant}
              value={this.state.quant}
              onChange={this.onChangeQuant}
            />
          </div>
        </div>
        <div className="div-linha-Os">
          <div className="div-numeroSerie-Os">
            {this.state.status !== "CONSERTO" ? (
              <div className="div-estoqueConserto-Os">
                <div className="div-text-Os">Estoque:</div>
                <Select
                  value={this.state.estoque}
                  style={{ width: "100%" }}
                  onChange={this.onChangeEstoque}
                >
                  <Option value="REALPONTO">REALPONTO</Option>
                  <Option value="NOVAREAL">NOVA REALPONTO</Option>
                  <Option value="PONTOREAL">PONTOREAL</Option>
                </Select>
              </div>
            ) : (
              <>
                <div className="div-serial-Os">Número de série:</div>
                <Input
                  allowClear={!this.state.fieldFalha.serialNumber}
                  className={
                    this.state.fieldFalha.serialNumber
                      ? "div-inputError-tecnico"
                      : "input-100"
                  }
                  placeholder="Digite o número"
                  name="serialNumber"
                  value={this.state.serialNumber}
                  onChange={this.onChange}
                  onBlur={this.onBlurValidator}
                  onFocus={this.onFocus}
                />
              </>
            )}
          </div>
          <div className="div-status-Os">
            <div className="div-text-Os">Status:</div>
            <div style={{ display: "flex", width: "100%" }}>
              <Select
                value={this.state.status}
                style={{ width: "100%" }}
                onChange={this.onChangeStatus}
              >
                {this.state.allStatus.map(item => {
                  return <Option value={item}>{item.toUpperCase()}</Option>;
                })}
              </Select>
              <this.modalStatus />
              {this.props.auth.addStatus ? (
                <Button
                  className="buttonadd-marca-produtos"
                  type="primary"
                  icon="plus"
                  name="modalMarca"
                  onClick={this.openModais}
                />
              ) : null}
            </div>
          </div>
        </div>

        {this.state.status === "CONSERTO" ? (
          <div className="linha1-produtos">
            <div className="div-descricao-produtos">
              <div className="div-text-produtos">Observação:</div>
              <TextArea
                className="input-100"
                placeholder="Digite a observação"
                autosize={{ minRows: 2, maxRows: 4 }}
                rows={4}
                name="observacao"
                value={this.state.observacao}
                onChange={this.onChange}
              />
            </div>
          </div>
        ) : null}

        {this.state.serial && this.state.status !== "CONSERTO" ? (
          <div className="div-linha-Os">
            <div className="div-serial-AddKit">
              <div className="div-textSerial-AddKit">Número de série:</div>
              <TextArea
                className="input-100"
                placeholder="Digite o número de série"
                autosize={{ minRows: 2, maxRows: 3 }}
                rows={3}
                name="numeroSerie"
                value={this.state.numeroSerieTest}
                onChange={this.filter}
              />
            </div>
            <Button
              className="button"
              type="primary"
              onClick={
                this.state.status === "Não selecionado"
                  ? this.errorStatus
                  : this.addCarrinho
              }
            >
              Adicionar
            </Button>
          </div>
        ) : (
          <div className="div-button-add-reservaOs">
            <Button
              className="button"
              type="primary"
              onClick={this.addCarrinho}
            >
              Adicionar
            </Button>
          </div>
        )}

        <div className="div-linhaSeparete-Os"></div>

        {this.state.carrinho.length === 0 ? null : (
          <div className="div-maior-Os">
            <div className="div-linhaSelecionados-Os">
              <h2 className="h2-Os">Produtos selecionados</h2>
            </div>
            <div className="div-linha1-Os">
              <label className="label-produto-Os">Produto</label>
              <label className="label-quant-SearchOs">Quantidade</label>
            </div>
            <div className="div-linhaSepareteProdutos-Os"></div>
            {this.state.carrinho.map(valor => (
              <div className="div-linha-Os">
                <label className="label-produto-Os">{valor.name}</label>
                <label className="label-quant-SearchOs">
                  <InputNumber
                    min={1}
                    disabled={valor.serial}
                    value={this.state.quantObj[`quant${valor.name}`]}
                    onChange={value =>
                      this.onChangeUpdateQuant(valor.name, value)
                    }
                  />
                  UN
                </label>
                <Button
                  type="primary"
                  className="button-remove-Os"
                  onClick={() => this.remove(valor)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        )}

        {this.state.carrinho.length !== 0 ? (
          <div className="div-buttonSalvar-Os">
            <Button
              type="primary"
              className="button"
              onClick={this.updateTargetReservaOs}
            >
              Salvar
            </Button>
          </div>
        ) : null}

        {this.state.redirect ? <Redirect to="/logged/Os/dash" /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    osUpdateValue: state.osUpdateValue,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(SearchOsDash);
