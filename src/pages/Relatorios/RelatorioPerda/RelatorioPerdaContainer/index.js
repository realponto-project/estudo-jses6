import React, { Component } from "react";
import "./index.css";
import { DatePicker, Select, Button, Input, Spin } from "antd";
import { getTecnico } from "../../../../services/tecnico";
import { getRelatorioPerda } from "../../../../services/realatorioPerda";
import { getTodasOs } from "../../../../services/reservaOs";

const { Option } = Select;

class GerenciarEntrada extends Component {
  state = {
    valueDate: { start: "2019/01/01" },
    avancado: false,
    tecnicoArray: [],
    tecnico: "",
    data: "",
    produto: "",
    relatorioArray: {
      rows: []
    },
    loading: false
  };

  getAllTecnico = async () => {
    await getTecnico().then(resposta =>
      this.setState({
        tecnicoArray: resposta.data
      })
    );
  };

  componentDidMount = async () => {
    await this.getAllTecnico();

    await this.getRelatorio();

    await this.getAllOs();
  };

  getAllOs = async () => {
    // this.setState({
    //   loading: true
    // });

    const query = {
      filters: {
        os: {
          specific: {
            deletedAt: { start: "2019/01/01" }
            // os: this.state.os,
            // razaoSocial: this.state.rs,
            // date: this.state.valueDate
          }
        },
        technician: {
          specific: {
            name: this.state.tecnico
          }
        },
        osParts: {
          specific: {
            missOut: "1"
          }
        }
      },
      order: {
        field: "deletedAt",
        acendent: true
      },
      page: 1,
      total: 10,
      required: false,
      paranoid: false
    };

    // await getTodasOs(query)
    // .then
    // resposta => console.log(resposta)
    // this.setState({
    //   OsArray: resposta.data,
    //   page: resposta.data.page,
    //   count: resposta.data.count,
    //   show: resposta.data.show
    // })
    // ();

    // this.setState({
    //   loading: false
    // });
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
        kitOut: {
          specific: {
            action: "perda",
            createdAt: this.state.valueDate
          }
        },
        technician: {
          specific: {
            name: this.state.tecnico
          }
        },
        product: {
          specific: {
            name: this.state.produto
          }
        },
        osParts: {
          specific: {
            createdAt: this.state.valueDate
          }
        }
      }
    };

    await getRelatorioPerda(query).then(resposta =>
      this.setState({
        relatorioArray: resposta.data
      })
    );

    this.setState({
      loading: false
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

  onChangeTecnico = value => {
    this.setState(
      {
        tecnico: value
      },
      this.getRelatorio
    );
  };

  test = () => {
    if (this.state.relatorioArray.rows.length !== 0) {
      return this.state.relatorioArray.rows.map(line => (
        <div className="div-100-Gentrada">
          <div className="div-lines-RPerda">
            <div className="cel-produto-cabecalho-RPerda">{line.name}</div>
            <div className="cel-quant-cabecalho-RPerda">{line.amount}</div>
            <div className="cel-usuario-cabecalho-RPerda">
              {line.technician}
            </div>
            <div className="cel-data-cabecalho-RPerda">{line.createdAt}</div>
            <div className="cel-os-cabecalho-RPerda">
              {line.os !== undefined ? line.os : "KIT"}
            </div>
          </div>
          <div className=" div-separate1-Gentrada" />
        </div>
      ));
    } else {
      return (
        <div className="div-naotemnada">Não há nenhuma perda até o momento</div>
      );
    }
  };

  render() {
    return (
      <div className="div-card-RPerda">
        <div className="linhaTexto-RPerda">
          <h1 className="h1-RPerda">Relatório de perda</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-produto-RPerda">
                <div className="div-text-Os">Produto:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="produto"
                  value={this.state.produto}
                  placeholder="Digite o produto"
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

              <div className="div-tecnico-RPerda">
                <div className="div-text-Rtecnico">Técnico:</div>
                {this.state.tecnicoArray.length === 0 ? (
                  <Select
                    value="Nenhum tecnico cadastrado"
                    style={{ width: "100%" }}
                  ></Select>
                ) : (
                  <Select
                    value={this.state.tecnico}
                    style={{ width: "100%" }}
                    onChange={this.onChangeTecnico}
                  >
                    <Option value="">TODOS</Option>
                    {this.state.tecnicoArray.map(valor => (
                      <Option value={valor.name}>{valor.name}</Option>
                    ))}
                  </Select>
                )}
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

        <div className="div-cabecalho-RPerda">
          <div className="cel-produto-cabecalho-RPerda">Produto</div>
          <div className="cel-quant-cabecalho-RPerda">Qnt.</div>
          <div className="cel-usuario-cabecalho-RPerda">Técnico</div>
          <div className="cel-data-cabecalho-RPerda">Data lançam.</div>
          <div className="cel-os-cabecalho-RPerda">Os</div>
        </div>

        <div className=" div-separate-ROs" />
        {this.state.loading ? (
          <div className="spin">
            <Spin spinning={this.state.loading} />
          </div>
        ) : (
          this.test()
        )}
      </div>
    );
  }
}

export default GerenciarEntrada;
