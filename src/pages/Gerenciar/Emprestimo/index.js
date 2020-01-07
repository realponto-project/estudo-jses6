import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import EmprestimoContainer from "./EmprestimoContainer";

export default class EmprestimoRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/notificacao/dash"
          component={EmprestimoContainer}
        />
      </Switch>
    );
  }
}
