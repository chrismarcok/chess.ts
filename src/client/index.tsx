import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NoMatch } from "./pages/NoMatch";
import { HomePage } from "./pages/HomePage";
import "./scss/app";
import { Room } from "./pages/Room";
import store from "./store";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { VerifyLoginWrapper } from "./components/utils/VerifyLoginWrapper";

render(
  <Provider store={store}>
    <VerifyLoginWrapper>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/rooms/:roomId" component={Room} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </VerifyLoginWrapper>
  </Provider>,
  document.getElementById("root")
);
