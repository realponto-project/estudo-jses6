import React, { Component } from "react";
import "./index.css";
import { Spin, Button, Input, Select } from "antd";
import { stock } from "../../../../services/estoque";

const { Option } = Select;

class Estoque extends Component {
  state = {
    numeroSerie: "",
    produto: "",
    fabricante: "",
    estoqueBase: "TODOS",
    avancado: false,
    loading: false,
    estoque: {
      rows: []
    },
    page: 1,
    total: 10,
    count: 0,
    show: 0
  };

  changePages = pages => {
    this.setState(
      {
        page: pages
      },
      () => {
        this.getStock();
      }
    );
  };

  onChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value,
      page: 1
    });

    this.getStock();
  };

  onChangeSelect = async value => {
    await this.setState({
      estoqueBase: value
    });

    this.getStock();
  };

  getStock = async () => {
    this.setState({
      loading: true
    });

    const estoqueBase =
      this.state.estoqueBase === "TODOS" ? "" : this.state.estoqueBase;

    const query = {
      filters: {
        manufacturer: {
          specific: {
            manufacturer: this.state.fabricante
          }
        },
        product: {
          specific: {
            name: this.state.produto
          }
        },
        stockBase: {
          specific: {
            stockBase: estoqueBase
          }
        }
      },
      page: this.state.page,
      total: this.state.total
    };

    await stock(query).then(resposta =>
      this.setState(
        {
          estoque: resposta.data,
          page: resposta.data.page,
          count: resposta.data.count,
          show: resposta.data.show
        },
      )
    );

    this.setState({
      loading: false
    });
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado
    });
  };

  componentDidMount = async () => {
    await this.getStock();
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

  render() {
    return (
      <div className="div-card-estoque">
        <div className="linhaTexto-estoque">
          <h1 className="h1-estoque">Gerenciar estoque</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-produto-Rtecnico">
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

              <div className="div-fabricante-Rtecnico">
                <div className="div-text-Rtecnico">Fabricante:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="fabricante"
                  value={this.state.fabricante}
                  placeholder="Digite o fabricante"
                  onChange={this.onChange}
                  allowClear
                />
              </div>

              <div className="div-estoque-Rtecnico">
                <div className="div-text-Rtecnico">Estoque:</div>
                <Select
                  value={this.state.estoqueBase}
                  style={{ width: "100%" }}
                  onChange={this.onChangeSelect}
                >
                  <Option value="TODOS">TODOS</Option>
                  <Option value="REALPONTO">REALPONTO</Option>
                  <Option value="NOVAREAL">NOVA REALPONTO</Option>
                  <Option value="PONTOREAL">PONTOREAL</Option>
                </Select>
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
        <div className="div-cabecalho-estoque">
          <div className="cel-produto-cabecalho-estoque">Produto</div>
          <div className="cel-fabricante-cabecalho-estoque">Fabricante</div>
          <div className="cel-quant-cabecalho-estoque">Disp.</div>
          <div className="cel-quant-cabecalho-estoque">Min.</div>
          <div className="cel-estoque-cabecalho-estoque">Estoque</div>
        </div>

        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : (
          <div className="div-separate-estoque">
            {this.state.estoque.rows.length !== 0 ? (
              this.state.estoque.rows.map(line => (
                <div className="div-100-estoque">
                  <div className="div-lines-estoque">
                    <div className="cel-produto-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          line.minimumStock > line.available
                          ? { color: "red" }
                          : null
                        }
                        >
                        {line.name}
                      </label>
                    </div>
                    <div className="cel-fabricante-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          line.minimumStock > line.available
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.manufacturer}
                      </label>
                    </div>
                    <div className="cel-quant-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          line.minimumStock > line.available
                            ? { color: "red" }
                            : null
                        }
                        // style={{ color: "red" }}
                      >
                        {line.available}
                      </label>
                    </div>
                    <div className="cel-quant-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          line.minimumStock > line.available
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.minimumStock}
                      </label>
                    </div>
                    <div className="cel-estoque-cabecalho-estoque">
                      <label
                        className="div-table-label-cel-estoque"
                        style={
                          line.minimumStock > line.available
                            ? { color: "red" }
                            : null
                        }
                      >
                        {line.stockBase}
                      </label>
                    </div>
                  </div>
                  <div className=" div-separate1-estoque" />
                </div>
              ))
            ) : (
              <div className="div-naotemnada">Não há nada no estoque</div>
            )}
            <this.Pages />
          </div>
        )}
      </div>
    );
  }
}

export default Estoque;
