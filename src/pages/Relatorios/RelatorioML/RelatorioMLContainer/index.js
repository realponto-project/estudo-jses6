import React, { Component } from "react";
import "./index.css";
import { Spin, Button, Input, DatePicker, Dropdown, Icon, Menu } from "antd";
import { getRelatorioML } from "../../../../services/relatorioML";

class GerenciarEntrada extends Component {
  state = {
    codigo: "",
    produto: "",
    data: "",
    avancado: false,
    lineSelected: {
      rows: []
    },
    mais: {},
    relatorioArray: {
      rows: []
    },
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    loading: false,
    valueDate: { start: "2019/01/01" }
  };

  componentDidMount = async () => {
    await this.getRelatorio();
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    });
  };

  getRelatorio = async () => {
    this.setState({
      loading: true
    });

    const query = {
      filters: {
        freeMarket: {
          specific: {
            createdAt: this.state.valueDate,
            name: this.state.produto,
            trackingCode: this.state.codigo
          }
        }
      },
      page: this.state.page,
      total: this.state.total
    };

    await getRelatorioML(query).then(resposta =>
      this.setState({
        relatorioArray: resposta.data,
        page: resposta.data.page,
        count: resposta.data.count,
        show: resposta.data.show
      })
    );

    this.setState({
      loading: false
    });
  };

  mais = async line => {
    await this.setState({
      mais: {
        [line.id]: !this.state.mais[line.id]
      },
      lineSelected: {
        rows: [line]
      }
    });
  };

  onChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });

    await this.getRelatorio();
  };

  searchDate = async e => {
    if (!e[0] || !e[1]) return;
    await this.setState({
      valueDate: { start: e[0]._d, end: e[1]._d }
    });

    await this.getRelatorio();
  };

  changePages = pages => {
    this.setState(
      {
        page: pages
      },
      () => {
        this.getRelatorio();
      }
    );
  };

  test = () => {
    if (this.state.relatorioArray.rows.length !== 0) {
      return this.state.relatorioArray.rows.map(line => (
        <div className="div-100-Gentrada">
          <div className="div-lines-RML">
            <div className="cel-mais-cabecalho-Rtecnico">
              <div className="button-mais" onClick={() => this.mais(line)}>
                +
              </div>
            </div>
            <div className="cel-codigo-cabecalho-RML">{line.trackingCode}</div>
            <div className="cel-nome-cabecalho-RML">{line.name}</div>
            <div className="cel-data-cabecalho-RML">{line.createdAt}</div>
          </div>
          {this.state.mais[line.id] ? (
            <div className="div-100-Rtecnico">
              <div className="div-mais-Rtecnico">
                <div className="div-normal-mais">
                  <div className="div-produtos-mais-ML ">Produtos</div>
                  <div className="div-serialnumbers-mais-ML" />
                  <div
                    className="div-quant-mais-ML"
                    style={{ "align-items": "center" }}
                  >
                    Quantidade
                  </div>
                </div>
              </div>
              {this.state.loading ? (
                <div className="spin">
                  <Spin spinning={this.state.loading} />
                </div>
              ) : (
                this.state.lineSelected.rows.map(line => (
                  <div className="div-branco-mais">
                    <div className="div-produtos-mais-ML ">
                      {line.products.map(valor => (
                        <div className="div-peca">{valor.name}</div>
                      ))}
                    </div>
                    <div className="div-serialnumbers-mais-ML">
                      {line.products.map(valor => {
                        return valor.serialNumbers ? (
                          <div className="div-serialnumbers">
                            <Dropdown
                              overlay={
                                <Menu>
                                  {valor.serialNumbers.map(serialnumber => {
                                    return (
                                      <Menu.Item>{serialnumber}</Menu.Item>
                                    );
                                  })}
                                </Menu>
                              }
                              placement="bottomCenter"
                            >
                              <Button>Números de série</Button>
                            </Dropdown>
                          </div>
                        ) : (
                          <div className="div-serialnumbers" />
                        );
                      })}
                    </div>

                    <div className="div-quant-mais-ML">
                      {line.products.map(valor => (
                        <div
                          className="div-peca"
                          style={{ "justify-content": "center" }}
                        >
                          {valor.amount}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}
          <div className=" div-separate1-Gentrada" />
        </div>
      ));
    } else {
      return (
        <div className="div-naotemnada">
          Não há nenhuma reserva finalizada até o momento
        </div>
      );
    }
  };

  Pages = () => (
    <div className="footer-Gentrada-button">
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

  render() {
    return (
      <div className="div-card-RML">
        <div className="linhaTexto-RML">
          <h1 className="h1-RML">Relatório do Mercado Livre</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-codigo-ROs">
                <div className="div-text-Rtecnico">Código:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="codigo"
                  value={this.state.codigo}
                  placeholder="Digite o código"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-produto-ROs">
                <div className="div-text-Os">Produto:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="produto"
                  value={this.state.produto}
                  placeholder="Digite o nome do produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>

            <div className="div-linha-avancado-RML">
              <div className="div-data-ROs">
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

        <div className="div-cabecalho-RML">
          <div className="cel-mais-cabecalho-Rtecnico"></div>
          <div className="cel-codigo-cabecalho-RML">Código</div>
          <div className="cel-nome-cabecalho-RML">Nome</div>
          <div className="cel-data-cabecalho-RML">Data lançamento</div>
        </div>

        <div className=" div-separate-RML"></div>
        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : (
          this.test()
        )}

        <this.Pages />
      </div>
    );
  }
}

export default GerenciarEntrada;
