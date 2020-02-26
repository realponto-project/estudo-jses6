import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import EmprestimoContainer from "./EmprestimoContainer";

class EmprestimoRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/emprestimo/dash"
          component={EmprestimoContainer}
        />
      </Switch>
    );
  }
}

export default EmprestimoRoute;
