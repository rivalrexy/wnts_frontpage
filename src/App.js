import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import Header from './components/Header';
// import Menu from './components/Menu';
import Menu from './components/Mainmenu';
// import Dashboard from './components/Dashboard';
import Dashboard from './components/Maindashboard';
import Footer from './components/Footer';

function App() {
  return (
  <div class="wrapper">
      <Header/>
      <Menu/>
      {/* <Dashboard/> */}
      <div className="content-wrapper">
                {/* Content Header (Page header) */}
                {/* /.content-header */}
                {/* Main content */}
                <div className="content">
                  {/* <div className="container"> */}
                    {/* <div className="row"> */}
                      {/* <div className="col-lg-20"> */}
                        <div className="card">
                          {/* <div className="card-header border-0">
                            <div className="d-flex justify-content-between">
                              <h3 className="card-title">WNTS</h3>
                              <a href="javascript:void(0);">View Report</a>
                            </div>
                          </div> */}
                          <div className="card-body">
                            <div className="d-flex">
                            <Switch>
                              <Route exact path={["/", "/home"]} component={Home} />
                              <Route path="/home/:id" component={Home} />
                            </Switch>
                            </div>
                            {/* /.d-flex */}
                            {/* <div className="position-relative mb-4">
                              <canvas id="visitors-chart" height={200} />
                            </div> */}
                            <div className="d-flex flex-row justify-content-end">
                            </div>
                          </div>
                        </div>
                        {/* /.card */}
                        {/* /.card */}
                      {/* </div> */}
                      {/* /.col-md-6 */}

                      {/* /.col-md-6 */}
                    {/* </div> */}
                    {/* /.row */}
                  {/* </div> */}
                  {/* /.container-fluid */}
                </div>
                {/* /.content */}
              </div>
              <Footer/>
      {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/home" className="navbar-brand">
          WNTS
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-2">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route path="/home/:id" component={Home} />
        </Switch>
      </div> */}
    </div>
  );
}

export default App;
