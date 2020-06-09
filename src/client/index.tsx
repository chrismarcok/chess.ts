import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NoMatch } from "./pages/NoMatch";
import { App } from "./pages/App";
import "./scss/app";
import { Room } from "./pages/Room";
import store from "./store";

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/rooms/:roomId" component={Room} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
