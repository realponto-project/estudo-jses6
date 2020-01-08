import React, { Component } from "react";
import { Button, Select, Input, Modal, message, Icon, DatePicker } from "antd";

import "./index.css";
import { addEquip, getAllEquipsService } from "../../../../services/equip";
import { getItens } from "../../../../services/produto";
import { getSerial } from "../../../../services/serialNumber";
import { getTecnico } from "../../../../services/tecnico";

const { Option } = Select;

class EmprestimoContainer extends Component {
  state = {
    tecnicoArray: [],
    modalReservados: false,
    modalDisp: false,
    razaoSocial: "",
    nomeProduto: "",
    productId: "",
    textArea: "",
    visible: false,
    itemArray: [],
    select: "disponiveis",
    modalAdicionar: false,
    disponivel: [],
    page: 1,
    count: 1,
    show: 1
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
      modalDisp: false,
      modalReservados: false
    });
  };

  getAllTecnico = async () => {
    await getTecnico().then(resposta =>
      this.setState({
        tecnicoArray: resposta.data
      })
    );
  };

  componentDidMount = async () => {
    await this.getAllItens();
    await this.getAllTecnico();
    await this.getAllEquips();
  };

  getAllEquips = async () => {
    const query = {
      filters: {
        equip: {
          specific: {
            loan: true
          }
        }
      }
    };

    const { status, data } = await getAllEquipsService(query);

    if (status === 200) {
      this.setState({
        disponivel: data.rows
      });
    }
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

  ModalDisponiveis = () => (
    <Modal
      title="Reservar equipamento"
      visible={this.state.modalDisp}
      onOk={this.handleCancel}
      onCancel={this.handleCancel}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <div className="div-rs1-Os">
        <div className="div-textRs-Os">Razão social:</div>
        <div className="div-inputs">
          <Input
            className="input-100"
            style={{ width: "100%" }}
            name="razaoSocial"
            value={this.state.razaoSocial}
            placeholder="Digite a razão social"
            onChange={this.onChange}
          />
        </div>
      </div>

      <div className="div-linha1-emprestimo">
        <div className="div-cnpj-imprestimo">
          <div className="div-text-Os">Cnpj:</div>
          <div className="div-inputs">
            <Input
              className="input-100"
              style={{ width: "100%" }}
              name="cnpj"
              value={this.state.cnpj}
              placeholder="Digite o cnpj"
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className="div-data1-emprestimo">
          <div className="div-textData-imprestimo">Data do atendimento:</div>
          <div className="div-inputs">
            <DatePicker
              className="input-100"
              onChange={this.onChangeData}
              name="data"
              format="DD/MM/YYYY"
              value={this.state.data}
              placeholder="Selecione uma data"
            />
          </div>
        </div>
      </div>

      <div className="div-linha1-emprestimo">
        <div className="div-tecnico-emprestimo">
          <div className="div-text-Os">Técnico:</div>
          <div className="div-inputs">
            {this.state.tecnicoArray.length === 0 ? (
              <Select
                className="input-100"
                value="Nenhum tecnicos cadastrado"
                name="technician"
                // onFocus={this.onFocusTecnico}
                style={{ width: "100%" }}
              ></Select>
            ) : (
              <Select
                className="input-100"
                defaultValue="Não selecionado"
                style={{ width: "100%" }}
                // onChange={this.onChangeSelect}
                showSearch
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
          </div>
        </div>
      </div>
    </Modal>
  );

  ModalReservados = () => (
    <Modal
      title="Retorno ao estoque"
      visible={this.state.modalReservados}
      onOk={this.handleCancel}
      onCancel={this.handleCancel}
      okText="Retornar"
      cancelText="Cancelar"
    >
      <div className="div-rs1-Os">
        <div className="div-textRs-Os">Razão social:</div>
        <div className="div-inputs">
          <Input
            readOnly
            className="input-100"
            style={{ width: "100%" }}
            name="razaoSocial"
            value={this.state.razaoSocial}
            onChange={this.onChange}
          />
        </div>
      </div>

      <div className="div-rs1-emprestimo">
        <div className="div-cnpj-emprestimo">
          <div className="div-text-Os">Cnpj:</div>
          <div className="div-inputs">
            <Input
              readOnly
              className="input-100"
              style={{ width: "100%" }}
              name="cnpj"
              value={this.state.cnpj}
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className="div-dataSolici-emprestimo">
          <div className="div-textSolici-imprestimo">Data solicitação:</div>
          <div className="div-inputs">
            <Input
              readOnly
              className="input-100"
              style={{ width: "100%" }}
              name="razaoSocial"
              value={this.state.razaoSocial}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>

      <div className="div-linha-emprestimo">
        <div className="div-data-emprestimo">
          <div className="div-textData1-imprestimo">Data atendimento:</div>
          <div className="div-inputs">
            <Input
              readOnly
              className="input-100"
              style={{ width: "100%" }}
              name="razaoSocial"
              value={this.state.razaoSocial}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );

  render() {
    return (
      <>
        <this.ModalDisponiveis />
        <this.ModalReservados />
        <div className="div-card-Gentrada">
          <div className="linhaTexto-Gentrada">
            <h1 className="h1-Gentrada">Gerenciar empréstimos</h1>
          </div>
          {this.state.select === "disponiveis" ? (
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
                onClick={() => this.setState({ modalDisp: true })}
              >
                <Icon type="plus" />
              </Button>
            </div>
          ) : (
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
                onClick={() => this.setState({ modalReservados: true })}
              >
                <Icon type="rollback" />
              </Button>
            </div>
          )}

          {this.state.select === "disponiveis" ? (
            <div className="div-cabecalho-estoque">
              <div className="cel-produto-cabecalho-emprestimo">Produto</div>
              <div className="cel-fabricante-cabecalho-estoque">Fabricante</div>
              <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
              <div className="cel-estoque-cabecalho-estoque">Estoque</div>
              {this.state.disponivel.map(item => {
                console.log(item);
                return (
                  <>
                    <div className="cel-produto-cabecalho-estoque">
                      {item.name}
                    </div>
                    <div className="cel-fabricante-cabecalho-estoque">
                      {item.mark}
                    </div>
                    <div className="cel-numSerie-cabecalho-estoque">
                      {item.serialNumber}
                    </div>
                    <div className="cel-estoque-cabecalho-estoque">
                      EMPRESTIMO
                    </div>
                  </>
                );
              })}
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
}

export default EmprestimoContainer;
