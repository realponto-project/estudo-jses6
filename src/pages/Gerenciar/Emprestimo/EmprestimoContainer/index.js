import React, { Component } from "react";
import {
  Button,
  Select,
  Input,
  Modal,
  message,
  Icon,
  DatePicker,
  Spin
} from "antd";
import moment from "moment";

import "./index.css";
import { getAllEquipsService } from "../../../../services/equip";
import {
  addEprestimo,
  updateEprestimo,
  getEprestimoService,
  deleteEmprestimoService
} from "../../../../services/emprestimo";
import { getItens } from "../../../../services/produto";
import { getSerial } from "../../../../services/serialNumber";
import { getTecnico } from "../../../../services/tecnico";
import { validator, masks } from "./validator";

const { Option } = Select;

class EmprestimoContainer extends Component {
  state = {
    tecnicoArray: [],
    itemArray: [],
    disponiveis: [],
    reservados: [],
    loading: false,
    modalInClient: false,
    modalReservados: false,
    modalDisp: false,
    modalAdicionar: false,
    visible: false,
    page: 1,
    count: 1,
    show: 1,
    total: 10,
    retorno: {},
    atualizar: {},
    fieldFalha: {
      cnpj: false
    },
    tecnico: "Não selecionado",
    razaoSocial: "",
    nomeProduto: "",
    productId: "",
    technicianId: "",
    textArea: "",
    serialNumber: "",
    emprestimoId: "",
    select: "disponiveis"
  };

  onChangeTechnician = (value, props) => {
    this.setState({
      tecnico: value,
      technicianId: props.props.props.id
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = e => {
    this.setState({
      modalDisp: false,
      modalInClient: false,
      modalReservados: false,
      cnpj: "",
      razaoSocial: "",
      serialNumber: "",
      data: "",
      tecnico: "Não  selecionado",
      retorno: {},
      atualizar: {}
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

    await this.getEprestimo();
  };

  getEprestimo = async () => {
    await this.setState({
      loading: true
    });
    const { select } = this.state;

    let dateExpedition = null;

    if (select === "emCliente") {
      dateExpedition = {
        start: "2019/01/01",
        end: new Date()
      };
    } else {
      dateExpedition = {
        start: new Date()
      };
    }

    const query = {
      filters: {
        emprestimo: {
          specific: {
            dateExpedition
          }
        }
      },
      page: this.state.page,
      total: this.state.total
    };
    const { status, data } = await getEprestimoService(query);

    if (status === 200) {
      await this.setState({
        reservados: data.rows
      });
    }
    await this.setState({
      loading: false
    });
  };

  getAllEquips = async () => {
    await this.setState({
      loading: true
    });

    const query = {
      filters: {
        equip: {
          specific: {
            loan: true,
            inClient: false
          }
        }
      }
    };

    const { status, data } = await getAllEquipsService(query);

    if (status === 200) {
      this.setState({
        disponiveis: data.rows
      });
    }
    this.setState({
      loading: false
    });
  };

  changePages = pages => {
    this.setState(
      {
        page: pages
      },
      () => {
        this.getAllEquips();
      }
    );
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

  onChangeTecnico = async value => {
    await this.setState({
      tecnico: value
    });
  };

  newEprestimo = async () => {
    const {
      razaoSocial,
      cnpj,
      data: dateExpedition,
      serialNumber,
      technicianId
    } = this.state;

    const value = {
      cnpj,
      razaoSocial,
      dateExpedition,
      serialNumber,
      technicianId
    };

    // eslint-disable-next-line no-unused-vars
    const { status, data } = await addEprestimo(value);

    if (status === 200) {
      this.setState({
        modalDisp: false,
        cnpj: "",
        razaoSocial: "",
        dateExpedition: "",
        serialNumber: "",
        technicianId: ""
      });
      await this.getAllEquips();

      await this.getEprestimo();
    }
  };

  onChange = async e => {
    const { name, value } = masks(e.target.name, e.target.value);

    await this.setState({
      [name]: value
    });
  };

  onBlur = e => {
    const { fieldFalha } = validator(e.target.name, e.target.value, this.state);

    this.setState({
      fieldFalha
    });
  };

  onFocus = e => {
    const { name } = e.target;
    const { fieldFalha } = this.state;

    fieldFalha[name] = false;

    this.setState({
      fieldFalha
    });
  };

  onChangeData = date => {
    this.setState({
      data: date
    });
  };

  disabledDate = current => {
    return current && current < moment().subtract(1, "day");
  };

  ModalDisponiveis = () => (
    <Modal
      title="Reservar equipamento"
      visible={this.state.modalDisp}
      onOk={this.newEprestimo}
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
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
        </div>
      </div>

      <div className="div-linha1-emprestimo">
        <div className="div-cnpj-imprestimo">
          <div className="div-text-Os">Cnpj:</div>
          <div className="div-inputs">
            <Input
              className={`input-100 ${this.state.fieldFalha.cnpj &&
                "div-inputError"}`}
              style={{ width: "100%" }}
              name="cnpj"
              value={this.state.cnpj}
              placeholder="Digite o cnpj"
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
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
              disabledDate={this.disabledDate}
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
                onChange={this.onChangeTechnician}
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

  deleteEmprestimo = async () => {
    const { id } = this.state.retorno;

    const { status, data } = await deleteEmprestimoService({ id });

    if (status === 200 && data === "sucesso") {
      await this.getAllEquips();

      await this.getEprestimo();
    }
    this.setState({
      modalInClient: false
    });
  };

  ModalInClient = () => (
    <Modal
      title="Retorno ao estoque"
      visible={this.state.modalInClient}
      onOk={this.deleteEmprestimo}
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
            value={this.state.retorno.razaoSocial}
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
              value={this.state.retorno.cnpj}
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
              value={this.state.retorno.createdAt}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>

      <div className="div-linha-emprestimo">
        <div className="div-data-emprestimo">
          <div className="div-textData1-emprestimo">Data atendimento:</div>
          <div className="div-inputs">
            <Input
              readOnly
              className="input-100"
              style={{ width: "100%" }}
              name="razaoSocial"
              value={this.state.retorno.dateExpedition}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );

  ModalConfirmDelet = () => (
    <Modal
      title="Atualizar reserva"
      visible={this.state.modalConfirmDelet}
      onOk={this.excluirEmprestimo}
      onCancel={() =>
        this.setState({ modalConfirmDelet: false, emprestimoId: "" })
      }
      okText="Confirmar"
      cancelText="Cancelar"
    >
      <h3>Aperte em "Confirmar" se deseja excluir a solicitação</h3>
    </Modal>
  );

  ModalReservados = () => (
    <Modal
      title="Atualizar reserva"
      visible={this.state.modalReservados}
      onOk={this.handleUpdate}
      onCancel={this.handleCancel}
      okText="Retornar"
      cancelText="Cancelar"
    >
      <div className="div-rs1-Os">
        {console.log(this.state.atualizar)}
        <div className="div-textRs-Os">Razão social:</div>
        <div className="div-inputs">
          <Input
            readOnly
            className="input-100"
            style={{ width: "100%" }}
            name="razaoSocial"
            value={this.state.atualizar.razaoSocial}
            onChange={this.onChange}
          />
        </div>
      </div>

      <div className="div-rs1-emprestimo">
        <div className="div-data-emprestimo">
          <div className="div-textData1-emprestimo">Data solicitação:</div>
          <div className="div-inputs">
            <Input
              readOnly
              className="input-100"
              style={{ width: "100%" }}
              name="razaoSocial"
              value={this.state.atualizar.createdAt}
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className="div-data-emprestimo">
          <div className="div-textData1-emprestimo">Data atendimento:</div>
          <div className="div-inputs">
            <Input
              readOnly
              className="input-100"
              style={{ width: "100%" }}
              name="razaoSocial"
              value={this.state.atualizar.dateExpedition}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>

      <div className="div-linha-emprestimo">
        <div className="div-cnpj-emprestimo">
          <div className="div-text-Os">Cnpj:</div>
          <div className="div-inputs">
            <Input
              readOnly
              className="input-100"
              style={{ width: "100%" }}
              name="cnpj"
              value={this.state.atualizar.cnpj}
              onChange={this.onChange}
            />
          </div>
        </div>

        <div className="div-tecnico-update-emprestimo">
          <div>Técnico:</div>
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
                onChange={this.onChangeTechnician}
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

  testDisponivel = () => {
    if (this.state.disponiveis.length !== 0) {
      return this.state.disponiveis.map(item => {
        return (
          <div className="div-100-Gentrada">
            <div className="div-lines-RPerda">
              <div className="cel-produto-cabecalho-emprestimo">
                {item.name}
              </div>
              <div className="cel-fabricante-cabecalho-estoque">
                {item.mark}
              </div>
              <div className="cel-numSerie-cabecalho-estoque">
                {item.serialNumber}
              </div>
              <div className="cel-acao-cabecalho-emprestimo">
                <Button
                  type="primary"
                  className="button"
                  onClick={() =>
                    this.setState({
                      modalDisp: true,
                      serialNumber: item.serialNumber
                    })
                  }
                >
                  <Icon type="plus" />
                </Button>
              </div>
            </div>
            <div className=" div-separate1-Gentrada" />
          </div>
        );
      });
    } else {
      return (
        <div className="div-naotemnada">
          Não há nenhum empréstimo até o momento
        </div>
      );
    }
  };

  handleUpdate = async () => {
    const { atualizar, technicianId } = this.state;

    const { dateExpedition } = atualizar;

    await updateEprestimo({
      ...atualizar,
      dateExpedition: moment(dateExpedition.replace(/\D/gi, ""), "DDMMYYYY"),
      technicianId
    });

    this.handleCancel();
    await this.getEprestimo();
  };

  excluirEmprestimo = async () => {
    const { emprestimoId: id } = this.state;

    this.setState({
      modalConfirmDelet: false,
      emprestimoId: ""
    });

    const value = { id, force: true };

    await deleteEmprestimoService(value);
    await this.getEprestimo();
  };

  update = async item => {
    const {
      razaoSocial,
      cnpj,
      createdAt,
      dateExpedition,
      id,
      technician,
      technicianId
    } = item;

    const { name, value } = masks("cnpj", cnpj);

    this.setState({
      modalReservados: true,
      atualizar: {
        razaoSocial,
        createdAt,
        dateExpedition,
        [name]: value,
        id
      },
      tecnico: technician,
      technicianId
    });
  };

  tableReserved = () => {
    if (this.state.reservados.length !== 0) {
      return this.state.reservados.map(item => {
        return (
          <div className="div-100-Gentrada">
            <div className="div-lines-RPerda">
              <div className="cel-produto-cabecalho-estoque">{item.name}</div>
              <div className="cel-razaosocial-cabecalho-emprestimo">
                {item.razaoSocial}
              </div>
              <div className="cel-numSerie-cabecalho-estoque">
                {item.serialNumber}
              </div>
              <div className="cel-acao-cabecalho-emprestimo">
                <Button
                  type="primary"
                  className="button"
                  onClick={() => this.update(item)}
                >
                  <Icon type="edit" />
                </Button>
                <Button
                  type="primary"
                  className="button-icon-remove"
                  onClick={() =>
                    this.setState({
                      modalConfirmDelet: true,
                      emprestimoId: item.id
                    })
                  }
                >
                  <Icon type="delete" />
                </Button>
              </div>
            </div>
            <div className=" div-separate1-Gentrada" />
          </div>
        );
      });
    } else {
      return (
        <div className="div-naotemnada">
          Não há nenhum empréstimo até o momento
        </div>
      );
    }
  };

  tableInClient = () => {
    if (this.state.reservados.length !== 0) {
      return this.state.reservados.map(item => {
        return (
          <div className="div-100-Gentrada">
            <div className="div-lines-RPerda">
              <div className="cel-produto-cabecalho-estoque">{item.name}</div>
              <div className="cel-razaosocial-cabecalho-emprestimo">
                {item.razaoSocial}
              </div>
              <div className="cel-numSerie-cabecalho-estoque">
                {item.serialNumber}
              </div>
              <div className="cel-acao-cabecalho-emprestimo">
                <Button
                  type="primary"
                  className="button"
                  onClick={() => this.retorno(item)}
                >
                  <Icon type="rollback" />
                </Button>
              </div>
            </div>
            <div className=" div-separate1-Gentrada" />
          </div>
        );
      });
    } else {
      return (
        <div className="div-naotemnada">
          Não há nenhum empréstimo até o momento
        </div>
      );
    }
  };

  Pages = () => (
    <div className="footer-Gentrada100-button">
      {Math.ceil(this.state.count / this.state.total) >= 5 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 4)}
        >
          {this.state.page - 4}
        </Button>
      ) : null}
      {Math.ceil(this.state.count / this.state.total) >= 4 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 2 &&
      this.state.page > 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 3)}
        >
          {this.state.page - 3}
        </Button>
      ) : null}
      {this.state.page >= 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 2)}
        >
          {this.state.page - 2}
        </Button>
      ) : null}
      {this.state.page >= 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 1)}
        >
          {this.state.page - 1}
        </Button>
      ) : null}
      <div className="div-teste">{this.state.page}</div>
      {this.state.page < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 1)}
        >
          {this.state.page + 1}
        </Button>
      ) : null}
      {this.state.page + 1 < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 2)}
        >
          {this.state.page + 2}
        </Button>
      ) : null}
      {this.state.page + 2 < this.state.count / this.state.total &&
      this.state.page < 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 3)}
        >
          {this.state.page + 3}
        </Button>
      ) : null}
      {this.state.page + 3 < this.state.count / this.state.total &&
      this.state.page < 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 4)}
        >
          {this.state.page + 4}
        </Button>
      ) : null}
    </div>
  );

  onChangeSelect = async value => {
    await this.setState({
      select: value,
      loading: true,
      page: 1,
      count: 1,
      show: 1,
      total: 10
    });

    switch (value) {
      case "emCliente":
      case "reservados":
        await this.getEprestimo();
        break;
      case "disponivel":
        await this.getAllEquips();
        break;
      default:
    }

    this.setState({
      loading: false
    });
  };

  retorno = item => {
    const { razaoSocial, cnpj, createdAt, dateExpedition, id } = item;

    const { name, value } = masks("cnpj", cnpj);

    this.setState({
      modalInClient: true,
      retorno: {
        razaoSocial,
        createdAt,
        dateExpedition,
        [name]: value,
        id
      }
    });
  };

  render() {
    return (
      <>
        <this.ModalDisponiveis />
        <this.ModalReservados />
        <this.ModalInClient />
        <this.ModalConfirmDelet />
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
              <Option value="emCliente">EM CLIENTE</Option>
            </Select>
          </div>

          {this.state.select === "disponiveis" && (
            <div className="div-main-emprestimo">
              <div className="div-cabecalho-estoque">
                <div className="cel-produto-cabecalho-emprestimo">Produto</div>
                <div className="cel-fabricante-cabecalho-estoque">
                  Fabricante
                </div>
                <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
                <div className="cel-acao-cabecalho-emprestimo" />
              </div>
              <div className=" div-separate-Gentrada" />
              {this.state.loading ? (
                <div className="spin">
                  <Spin spinning={this.state.loading} />
                </div>
              ) : (
                this.testDisponivel()
              )}
              <div className="footer-ROs">
                <this.Pages />
              </div>
            </div>
          )}
          {this.state.select === "reservados" && (
            <div className="div-main-emprestimo">
              <div className="div-cabecalho-estoque">
                <div className="cel-produto-cabecalho-estoque">Produto</div>
                <div className="cel-razaosocial-cabecalho-emprestimo">
                  Razão social
                </div>
                <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
                <div className="cel-acao-cabecalho-emprestimo" />
              </div>
              <div className=" div-separate-Gentrada" />
              {this.state.loading ? (
                <div className="spin">
                  <Spin spinning={this.state.loading} />
                </div>
              ) : (
                this.tableReserved()
              )}
              <div className="footer-ROs">
                <this.Pages />
              </div>
            </div>
          )}
          {this.state.select === "emCliente" && (
            <div className="div-main-emprestimo">
              <div className="div-cabecalho-estoque">
                <div className="cel-produto-cabecalho-estoque">Produto</div>
                <div className="cel-razaosocial-cabecalho-emprestimo">
                  Razão social
                </div>
                <div className="cel-numSerie-cabecalho-estoque">Num. Serie</div>
                <div className="cel-acao-cabecalho-emprestimo" />
              </div>
              <div className=" div-separate-Gentrada" />
              {this.state.loading ? (
                <div className="spin">
                  <Spin spinning={this.state.loading} />
                </div>
              ) : (
                this.tableInClient()
              )}
              <div className="footer-ROs">
                <this.Pages />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default EmprestimoContainer;
