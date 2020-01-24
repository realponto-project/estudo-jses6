/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./index.css";
import { Input, Icon, Button, message } from "antd";
import "antd/dist/antd.css";
import * as R from "ramda";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeValue, onSubmit } from "../LoginRedux/action";
import { authentic } from "../../../services/auth";
import uuidValidate from "uuid-validate";

class Login extends Component {
  state = {
    fieldFalha: {
      username: false,
      password: false
    }
  };
  hasAuth = R.has("auth");
  hasToken = R.has("token");

  enterKey = async e => {
    if (e.which === 13 || e.keyCode === 13) {
      await this.props.onSubmit({
        ...this.props.value,
        typeAccount: { stock: true }
      });
    }
  };

  onFocus = e => {
    const { name } = e.target;
    const { fieldFalha } = this.state;

    this.setState({
      fieldFalha: {
        ...fieldFalha,
        [name]: false
      }
    });
  };

  onSubmit = async () => {
    const { status, data } = await authentic({
      ...this.props.value,
      typeAccount: { stock: true }
    });

    switch (status) {
      case 200:
        await this.props.onSubmit({
          ...this.props.value,
          typeAccount: { stock: true }
        });
        if (this.hasAuth(this.props)) {
          if (this.hasToken(this.props.auth)) {
            if (uuidValidate(this.props.auth.token)) {
            }
          }
        }
        break;
      case 401:
        const { fieldFalha } = this.state;

        this.setState({
          fieldFalha: { ...fieldFalha, ...data.fields[0].field }
        });

        message.error(data.fields[0].message);

        break;
      default:
    }
  };

  render() {
    return (
      <div className="div-all">
        <div className="div-main-login">
          <label>
            <h1 className="LabelLogin">Estoque - RP</h1>
          </label>
          <img src="../../retina.png" className="img-Login" />
          <Input
            className={`InputUsernameLogin ${this.state.fieldFalha.username &&
              "div-inputError"}`}
            placeholder="Digite seu username"
            name="username"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            onFocus={this.onFocus}
            value={this.props.value.username}
            onChange={this.props.changeValue}
            onKeyPress={this.enterKey}
          />
          <Input.Password
            className={`InputPasswordLogin ${this.state.fieldFalha.password &&
              "div-inputError"}`}
            placeholder="Digite a senha"
            name="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.props.value.password}
            onChange={this.props.changeValue}
            onKeyPress={this.enterKey}
            onFocus={this.onFocus}
          />
          <div className="div-ButtonLogin">
            <Button onClick={this.onSubmit} className="button" type="primary">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispacthToProps(dispach) {
  return bindActionCreators({ changeValue, onSubmit }, dispach);
}

function mapStateToProps(state) {
  return {
    value: state.login,
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(Login);
