import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NoMatch } from "./pages/NoMatch";
import { App } from "./pages/App";
import { RoomPage } from "./pages/RoomPage";
import store from "./store";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import { Header } from "./components/common/Header";
import "./scss/app";
import "./scss/scroll";
import { AppContainer } from "./components/utils/AppContainer";
import { ToastContainer } from "react-toastify";

render(
  <Provider store={store}>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Header/>
        <AppContainer>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/rooms/:roomId" component={RoomPage} />
          <Route component={NoMatch} />
        </Switch>
        </AppContainer>
      </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);