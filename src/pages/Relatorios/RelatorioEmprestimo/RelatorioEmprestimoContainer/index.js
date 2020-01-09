import React, { Component } from "react";
import "./index.css";

import { Spin } from "antd";

import { getEprestimoService } from "../../../../services/emprestimo";

class RelatorioEmprestimoContainer extends Component {
  state = {
    rows: [],

    loading: false,

    page: 1,
    total: 10,
    count: 0,
    show: 0
  };

  componentDidMount = async () => {
    await this.getEprestimo();
  };

  getEprestimo = async () => {
    const query = {
      paranoid: false
    };
    const { status, data } = await getEprestimoService(query);

    if (status === 200) {
      const { page, total, count, show, rows } = data;
      this.setState({ page, total, count, show, rows });
    }
  };

  rows = () => {
    console.log(this.state.rows);
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
      </div>
    ));
  };

  render() {
    return (
      <>
        <div className="div-card-emprestimo-report">
          <div className="title-emprestimo-report">
            <h1 className="h1-Gentrada">Emprestimo</h1>
          </div>
          <div className="div-main-emprestimo">
            <div className="div-emprestimo-report">
              <div className="cel-razaoSocial-cabecalho-emprestimo-report">
                RazaoSocial
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
        </div>
      </>
    );
  }
}

export default RelatorioEmprestimoContainer;
