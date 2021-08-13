import React, { useState, useEffect, useMemo, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import Header from "./components/Header";
// import Menu from './components/Menu';
import Menu from "./components/Mainmenu";
// import Dashboard from './components/Dashboard';
import Dashboard from "./components/Maindashboard";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div class="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content">
          <div className="card">
            <div className="card-body">
              <Home />
              {/* <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route path="/home/:id" component={Home} />
              </Switch> */}
              <div className="d-flex flex-row justify-content-end"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
