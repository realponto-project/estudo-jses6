import React, { Component } from "react";
import "./index.css";
import { Input, Button, InputNumber, Select, message } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAddressByZipCode } from "../../../../services/fornecedores";
import * as R from "ramda";

import { validators, masks } from "./validators";
import { NewReservaML } from "../../../../services/mercadoLivre";
import { getItens } from "../../../../services/produto";
import { getSerial } from "../../../../services/serialNumber";

const { TextArea } = Input;
const { Option } = Select;

class ReservaML extends Component {
  state = {
    serial: false,
    numeroSerieTest: "",
    disp: 1,
    itemArray: [],
    messageError: false,
    messageSuccess: false,
    nomeProduto: "Não selecionado",
    quant: 1,
    carrinho: [],
    estoque: "REALPONTO",
    codigo: "",
    razaoSocial: "",
    cpfOuCnpj: "",
    email: "",
    telefone: "",
    loading: false,
    fieldFalha: {
      cpfOuCnpj: false,
      razaoSocial: false,
    },
    message: {
      cpfOuCnpj: "",
      razaoSocial: "",
    },
  };

  errorNumeroSerie = (value) => {
    message.error(value, 10);
  };

  filter = async (e) => {
    await this.setState({
      numeroSerieTest: e.target.value,
    });

    const teste = this.state.numeroSerieTest.split(/\n/, 10);

    if (
      /\n/.test(
        this.state.numeroSerieTest[this.state.numeroSerieTest.length - 1]
      )
    ) {
      let count = 0;

      // eslint-disable-next-line array-callback-return
      teste.map((valor) => {
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
          numeroSerieTest: testeArray.replace(/,/gi, "\n"),
        });
      }
    }
  };

  onChangeItem = (value, product) => {
    this.setState({
      nomeProduto: value,
      productBaseId: product.props.product.id,
      serial: product.props.product.serial,
      disp: parseInt(product.props.product.available, 10),
    });
  };

  componentDidMount = async () => {
    await this.getAllItens();
  };

  getAllItens = async (name) => {
    const query = {
      filters: {
        product: {
          specific: {
            name,
          },
        },
      },
    };

    await getItens(query).then((resposta) =>
      this.setState({
        itemArray: resposta.data,
      })
    );
  };

  success = () => {
    message.success("A reserva foi efetuada");
  };

  error = () => {
    message.error("A reserva não foi efetuada");
  };

  getAddress = async (e) => {
    const cep = e.target.value;
    try {
      const { fieldFalha, message } = this.state;

      fieldFalha.estado = false;
      fieldFalha.cidade = false;
      fieldFalha.bairro = false;
      fieldFalha.rua = false;
      const address = await getAddressByZipCode(cep);

      if (R.has("erro", address.data)) {
        fieldFalha.cep = true;
        message.cep = "Cep não encontrado.";

        this.setState({
          fieldFalha,
          message,
        });
      } else {
        this.setState({
          rua: address.data.logradouro,
          cidade: address.data.localidade,
          bairro: address.data.bairro,
          estado: address.data.uf,
        });
      }
    } catch (error) {
      const { fieldFalha, message } = this.state;

      fieldFalha.cep = true;
      message.cep = "Cep inválido.";

      this.setState({
        fieldFalha,
        message,
      });
    }
  };

  onBlurValidator = (e) => {
    const { nome, valor, fieldFalha, message } = validators(
      e.target.name,
      e.target.value,
      this.state
    );

    this.setState({
      [nome]: valor,
      fieldFalha,
      message,
    });
  };

  onFocus = (e) => {
    this.setState({
      fieldFalha: {
        ...this.state.fieldFalha,
        [e.target.name]: false,
      },
      message: {
        ...this.state.message,
        [e.target.name]: false,
      },
    });
  };

  errorCarrinho = () => {
    message.error("Selecione ao menos um produto");
  };

  saveTargetNewReservaML = async () => {
    this.setState({
      loading: true,
    });

    if (this.state.carrinho.length === 0) {
      this.setState({
        loading: false,
      });
      this.errorCarrinho();
      return;
    }

    const values = {
      trackingCode: this.state.codigo,
      name: this.state.razaoSocial,
      cnpjOrCpf: this.state.cpfOuCnpj,
      freeMarketParts: this.state.carrinho,
    };

    const resposta = await NewReservaML(values);

    if (resposta.status === 422) {
      this.setState({
        messageError: true,
        fieldFalha: resposta.data.fields[0].field,
        message: resposta.data.fields[0].message,
      });
      await this.error();
      this.setState({
        loading: false,
        messageError: false,
      });
    }
    if (resposta.status === 200) {
      this.setState({
        cpfOuCnpj: "",
        razaoSocial: "",
        carrinho: [],
        codigo: "",
        messageSuccess: true,
      });
      await this.success();
      this.setState({
        loading: false,
        messageSuccess: false,
      });
    }
  };

  onChangeSelect = async (value) => {
    await this.setState({
      estoque: value,
      nomeProduto: "Não Selecionado",
      productBaseId: "",
      serial: "",
      disp: 0,
    });

    await this.getAllItens();
  };

  errorProduto = () => {
    message.error(
      "O nome do produto é obrigatório para essa ação ser realizada"
    );
  };

  onChangeQuant = (value) => {
    this.setState({
      quant: value,
    });
  };

  errorSelecionado = (value) => {
    message.error(value);
  };

  addCarrinho = () => {
    if (this.state.nomeProduto !== "Não selecionado" || "") {
      const array = this.state.carrinho.map(
        (value) => value.nomeProdutoCarrinho
      );

      if (
        array.filter((value) => value === this.state.nomeProduto).length > 0
      ) {
        this.errorSelecionado("Este item já foi selecionado");
        this.setState({
          nomeProduto: "",
        });
        return;
      }

      if (
        this.state.serial &&
        this.state.numeroSerieTest
          .split(/\n/)
          .filter((item) => (item ? item : null)).length !== this.state.quant
      ) {
        this.errorSelecionado(
          "Quantidade de numero de serie não condiz com a quantidade adicionada"
        );
        return;
      }

      this.setState({
        carrinho: [
          {
            productBaseId: this.state.productBaseId,
            nomeProdutoCarrinho: this.state.nomeProduto,
            amount: this.state.quant,
            stockBase: this.state.estoque,
            serialNumberArray: this.state.numeroSerieTest
              .split(/\n/)
              .filter((item) => (item ? item : null)),
          },
          ...this.state.carrinho,
        ],
        nomeProduto: "Não selecionado",
        serial: false,
        numeroSerieTest: "",
        quant: 1,
        estoque: "REALPONTO",
      });
    } else this.errorProduto();
  };

  remove = (value) => {
    const oldCarrinho = this.state.carrinho;
    const newCarrinho = oldCarrinho.filter((valor) => valor !== value);

    this.setState({
      carrinho: newCarrinho,
    });
  };

  onChange = (e) => {
    const { nome, valor } = masks(e.target.name, e.target.value);

    this.setState({
      [nome]: valor,
    });
  };

  renderRedirect = () => {
    if (!this.props.auth.addRML) {
      return <Redirect to="/logged/dash" />;
    }
  };

  render() {
    return (
      <div className="div-card-ML">
        {this.renderRedirect()}
        <div className="linhaTexto-ML">
          <h1 className="h1-ML">Reserva mercado-livre</h1>
        </div>

        <div className="div-linha-ML">
          <div className="div-codigo-ML">
            <div className="div-textCodigo-ML">Código de rastreio:</div>
            <div className="div-inputs">
              <Input
                className={
                  this.state.fieldFalha.codigo
                    ? "div-inputError-ML"
                    : "input-100"
                }
                style={{ width: "100%" }}
                name="codigo"
                value={this.state.codigo}
                placeholder="Código de rastreio"
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
                // allowClear
              />
              {this.state.fieldFalha.codigo ? (
                <p className="div-feedbackError">{this.state.message.codigo}</p>
              ) : null}
            </div>
          </div>

          <div className="div-rs-ML">
            <div className="div-textNome-ML">Nome ou razão social:</div>
            <div className="div-inputs">
              <Input
                className={
                  this.state.fieldFalha.razaoSocial
                    ? "div-inputError-ML"
                    : "input-100"
                }
                style={{ width: "100%" }}
                name="razaoSocial"
                value={this.state.razaoSocial}
                placeholder="Digite o nome ou a razão social"
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
                // allowClear
              />
              {this.state.fieldFalha.razaoSocial ? (
                <p className="div-feedbackError">
                  {this.state.message.razaoSocial}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="div-linha-ML">
          <div className="div-cpf-ML">
            <div className="div-textRef-ML">Cpf ou Cnpj:</div>
            <div className="div-inputs">
              <Input
                className={
                  this.state.fieldFalha.cpfOuCnpj
                    ? "div-inputError-ML"
                    : "input-100"
                }
                placeholder="Digite o cpf/cnpj"
                name="cpfOuCnpj"
                value={this.state.cpfOuCnpj}
                onChange={this.onChange}
                onBlur={this.onBlurValidator}
                onFocus={this.onFocus}
                // allowClear
              />
              {this.state.fieldFalha.cpfOuCnpj ? (
                <p className="div-feedbackError">
                  {this.state.message.cpfOuCnpj}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="div-linhaSepareted-ML"></div>

        <div className="linhaTextoPecas-ML">
          <h1 className="h1-ML">Selecionar peças</h1>
        </div>

        <div className="div-linha-ML">
          <div className="div-nome-ML">
            <div className="div-textNomeProduto-ML">Nome do produto:</div>
            <Select
              showSearch
              onSearch={(name) => this.getAllItens(name)}
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
              {this.state.itemArray.map((value) => (
                <Option product={value} value={value.name}>
                  {value.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="div-quant-ML">
            <div className="div-text-ML">Quant:</div>
            <InputNumber
              min={1}
              max={this.state.disp}
              defaultValue={this.state.quant}
              value={this.state.quant}
              onChange={this.onChangeQuant}
            />
          </div>
        </div>

        <div className="div-linha-ML">
          <div className="div-estoque-ML">
            <div className="div-text-ML">Estoque:</div>
            <Select
              value={this.state.estoque}
              style={{ width: "100%" }}
              onChange={this.onChangeSelect}
            >
              <Option value="REALPONTO">REALPONTO</Option>
              <Option value="NOVAREAL">NOVA REALPONTO</Option>
              <Option value="PONTOREAL">PONTOREAL</Option>
            </Select>
          </div>

          {this.state.serial ? (
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
          ) : null}

          <Button className="button" type="primary" onClick={this.addCarrinho}>
            Adicionar
          </Button>
        </div>

        <div className="div-linhaSeparete-ML"></div>

        {this.state.carrinho.length === 0 ? null : (
          <div className="div-maior-ML">
            <div className="div-linhaSelecionados-ML">
              <h2 className="h2-ML">Produtos selecionados</h2>
            </div>
            <div className="div-linha1-ML">
              <label className="label-produto-ML">Produto</label>
              <label className="label-quant-ML">Quantidade</label>
            </div>
            <div className="div-linhaSepareteProdutos-ML"></div>
            {this.state.carrinho.map((valor) => (
              <div className="div-linha-ML">
                <label className="label-produto-ML">
                  {valor.nomeProdutoCarrinho}
                </label>
                <label className="label-quant-ML">{valor.amount} UN</label>
                <Button
                  type="primary"
                  className="button-remove-ML"
                  onClick={() => this.remove(valor)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="div-buttonSalvar-ML">
          {this.state.carrinho.length === 0 ? null : (
            <Button
              type="primary"
              className="button"
              onClick={this.saveTargetNewReservaML}
            >
              Salvar
            </Button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(ReservaML);
