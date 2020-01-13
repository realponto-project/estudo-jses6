import React, { Component } from "react";
import "./index.css";

import { Spin, Button, Input, DatePicker } from "antd";

import { getEprestimoService } from "../../../../services/emprestimo";

class RelatorioEmprestimoContainer extends Component {
  state = {
    rows: [],
    loading: false,
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    avancado: false,
    serialNumber: "",
    razaoSocial: "",
    valueDate: { start: "2019/01/01" }
  };

  componentDidMount = async () => {
    await this.getEprestimo();
  };

  searchDate = async e => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d }
    });
    await this.getEprestimo();
  };

  onChange = async e => {
    let { name, value } = e.target;

    if (name === "serialNumber") {
      value = value.replace(/\D/gi, "");
    }

    await this.setState({
      [name]: value
    });

    await this.getEprestimo();
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    });
  };

  getEprestimo = async () => {
    const query = {
      filters: {
        emprestimo: {
          specific: {
            razaoSocial: this.state.razaoSocial,
            createdAt: this.state.valueDate
          }
        },
        equip: {
          specific: {
            serialNumber: this.state.serialNumber
          }
        }
      },
      page: this.state.page,
      total: this.state.total,
      paranoid: false
    };
    const { status, data } = await getEprestimoService(query);

    if (status === 200) {
      const { page, count, show, rows } = data;
      this.setState({ page, count, show, rows });
    }
  };

  changePages = pages => {
    this.setState(
      {
        page: pages
      },
      () => {
        this.getEprestimo();
      }
    );
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

  rows = () => {
    return this.state.rows.map(row => (
      <div className="div-100-emprestimo-report">
        <div className="div-lines-emprestimo-report">
          <div className="cel-razaoSocial-cabecalho-emprestimo-report">
            <label>{row.razaoSocial}</label>
          </div>
          <div className="cel-serialNumber-cabecalho-emprestimo-report">
            <label>{row.serialNumber}</label>
          </div>
          <div className="cel-solicitacao-cabecalho-emprestimo-report">
            <label>{row.createdAt}</label>
          </div>
          <div className="cel-atendimento-cabecalho-emprestimo-report">
            <label>{row.dateExpedition}</label>
          </div>
          <div className="cel-retorno-cabecalho-emprestimo-report">
            <label>{row.deletedAt ? row.deletedAt : "-"}</label>
          </div>
        </div>
        <div className=" div-separate1-Gentrada" />
      </div>
    ));
  };

  render() {
    console.log(this.state);
    return (
      <>
        <div className="div-card-emprestimo-report">
          <div className="title-emprestimo-report">
            <h1 className="h1-Gentrada">Emprestimo</h1>
          </div>

          {this.state.avancado ? (
            <div className="div-linha-avancado-Rtecnico">
              <div className="div-ocultar-Rtecnico">
                <Button
                  type="primary"
                  className="button"
                  onClick={this.avancado}
                >
                  Ocultar
                </Button>
              </div>
              <div className="div-linha1-avancado-Rtecnico">
                <div className="div-rs-report">
                  <div className="div-textRs-report">Razão social:</div>
                  <Input
                    className="input-100"
                    style={{ width: "100%" }}
                    name="razaoSocial"
                    value={this.state.razaoSocial}
                    placeholder="Digite o razão social"
                    onChange={this.onChange}
                    allowClear
                  />
                </div>

                <div className="div-Os-report">
                  <div className="div-text-Rtecnico">Série:</div>
                  <Input
                    className="input-100"
                    style={{ width: "100%" }}
                    name="serialNumber"
                    value={this.state.serialNumber}
                    placeholder="Número de série"
                    onChange={this.onChange}
                    allowClear
                  />
                </div>

                <div className="div-data-RPerda">
                  <div className="div-text-Rtecnico">Data:</div>
                  <DatePicker.RangePicker
                    placeholder="Digite a data"
                    format="DD/MM/YYYY"
                    dropdownClassName="poucas"
                    onChange={this.searchDate}
                    onOk={this.searchDate}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="div-avancado-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Avançado
              </Button>
            </div>
          )}
          <div className="div-main-emprestimo">
            <div className="div-emprestimo-report">
              <div className="cel-razaoSocial-cabecalho-emprestimo-report">
                Razão social
              </div>
              <div className="cel-serialNumber-cabecalho-emprestimo-report">
                Número de série
              </div>
              <div className="cel-solicitacao-cabecalho-emprestimo-report">
                Solicitação
              </div>
              <div className="cel-atendimento-cabecalho-emprestimo-report">
                Atendimento
              </div>
              <div className="cel-retorno-cabecalho-emprestimo-report">
                Retorno
              </div>
            </div>
            <div className=" div-separate-Gentrada" />

            {this.state.loading ? (
              <div className="spin">
                <Spin spinning={this.state.loading} />
              </div>
            ) : (
              this.rows()
            )}
          </div>
          <div className="footer-ROs">
            <this.Pages />
          </div>
        </div>
      </>
    );
  }
}

export default RelatorioEmprestimoContainer;
