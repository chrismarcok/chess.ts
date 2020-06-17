import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NoMatch } from "./pages/NoMatch";
import { LoginPage } from "./pages/LoginPage";
import { App } from "./pages/App";
import { RoomPage } from "./pages/RoomPage";
import store from "./store";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Wrapper } from "./components/utils/Wrapper";
import { Header } from "./components/common/Header";
import { ActivatePage } from "./pages/ActivatePage";
import "./scss/app";
import "./scss/scroll";
import { AppContainer } from "./components/utils/AppContainer";

render(
  <Provider store={store}>
    <Wrapper>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Header/>
        <AppContainer>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/activate/:userId" component={ActivatePage} />
          <Route exact path="/rooms/:roomId" component={RoomPage} />
          <Route component={NoMatch} />
        </Switch>
        </AppContainer>
      </BrowserRouter>
    </Wrapper>
  </Provider>,
  document.getElementById("root")
);