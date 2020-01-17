import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import ErrorBoundary from "react-error-boundary";

import "./App.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/signin">로그인</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
