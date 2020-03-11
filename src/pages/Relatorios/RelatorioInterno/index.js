import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import RelatorioInternoContainer from "./RelatorioInternoContainer";

class RelatorioInternoRoute extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/logged/relatorioInterno/dash"
          component={RelatorioInternoContainer}
        />
      </Switch>
    );
  }
}

export default RelatorioInternoRoute;
