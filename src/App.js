import React, { useState, useEffect, useMemo, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import { DatePicker, Space, TimePicker, Button } from "antd";
import moment from "moment";

import Home from "./components/Home";
import Performance from "./components/Performance";
import Header from "./components/Header";
// import Menu from './components/Menu';
import Menu from "./components/Mainmenu";
// import Dashboard from './components/Dashboard';
import Dashboard from "./components/Maindashboard";
import Footer from "./components/Footer";

const App = () => {
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date("2019-09-10 00:00:00"));
  const [endDate, setEndDate] = useState(new Date("2019-09-11 00:00:00"));
  const { RangePicker } = DatePicker;
  const dateTimeFormat = "YYYY/MM/DD HH:00";
  const [val, setVal] = useState(null);
  const customFormat = (value) => {
    value.format(dateTimeFormat);
  };
  const dateRange = [
    moment(startDate, dateTimeFormat),
    moment(endDate, dateTimeFormat),
  ];

  const onChange = (value, dateString) => {
    if (dateString !== undefined) {
      setStartDate(dateString[0]);
      setEndDate(dateString[1]);
      //console.log(dateString);
      //console.log(dateString[0]);
      //console.log(dateString[1]);
    }
  };

  const onClickNext = () => {
    //new Date(endDate);
    let valueEndDate = endDate.getHours();
    let valueStartDate = startDate.getHours();
    endDate.setMinutes(0);
    endDate.setSeconds(0);

    startDate.setMinutes(0);
    startDate.setSeconds(0);
    if (endDate !== undefined && startDate !== undefined) {
      if (valueEndDate < 24 || valueStartDate < 24) {
        valueEndDate = valueEndDate + 1;
        endDate.setHours(valueEndDate);
        console.log(endDate.getHours());
        console.log(endDate);
        setEndDate(new Date(endDate));

        valueStartDate = valueStartDate + 1;
        startDate.setHours(valueStartDate);
        console.log(startDate.getHours());
        console.log(startDate);
        setStartDate(new Date(startDate));
      }
    }
  };

  const onClickPrev = () => {
    //new Date(endDate);
    let valueEndDate = endDate.getHours();
    let valueStartDate = startDate.getHours();
    endDate.setMinutes(0);
    endDate.setSeconds(0);

    startDate.setMinutes(0);
    startDate.setSeconds(0);
    if (endDate !== undefined && startDate !== undefined) {
      if (valueEndDate < 24 || valueStartDate < 24) {
        valueEndDate = valueEndDate - 1;
        endDate.setHours(valueEndDate);
        console.log(endDate.getHours());
        console.log(endDate);
        setEndDate(new Date(endDate));

        valueStartDate = valueStartDate - 1;
        startDate.setHours(valueStartDate);
        console.log(startDate.getHours());
        console.log(startDate);
        setStartDate(new Date(startDate));
      }
    }
  };

  const onOk = (value) => {
    console.log(startDate);
    console.log(endDate);
  };

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };

  // useEffect(() => {
  //   //if (homeDate.length > 0) {
  //   setEndDate(endDate);
  //   console.log("DID UPDATE");
  //   //}
  // }, [endDate]);

  // const timePickerBlur = (time) => {
  //   //Ofc you can use state or whatever here :)
  //   this.formRef.current.setFieldsValue({
  //     time_of_day: time,
  //   });
  // };

  return (
    <div className="wrapper">
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button">
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* <Space direction="vertical" size={12}> */}
          {/* <TimePicker needsConfirmation={true} /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translate(-10%, 0%)",
            }}>
            <Button onClick={onClickPrev} type="primary" shape="circle">
              {"<"}
            </Button>
          </div>
          <RangePicker
            //defaultValue={dateRange}
            value={dateRange}
            //showTime={{ format: "HH" }}
            // ranges={{
            //   Today: [moment(), moment()],
            //   "This Month": [
            //     moment().startOf("month"),
            //     moment().endOf("month"),
            //   ],
            // }}
            showTime={{ format: "HH:00" }}
            format="YYYY-MM-DD HH:00"
            //needsConfirmation={false}
            onChange={onChange}
            //disabledMinutes={() => [...range(1, 59)]}
            onOk={onOk}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translate(10%, 0%)",
            }}>
            <Button onClick={onClickNext} type="primary" shape="circle">
              {">"}
            </Button>
          </div>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button">
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search">
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* Messages Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img
                    src="dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img
                    src="dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img
                    src="dist/img/user3-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li>
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">3 mins</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">12 hours</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">2 days</span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button">
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-slide="true"
              href="#"
              role="button">
              <i className="fas fa-th-large" />
            </a>
          </li>
        </ul>
      </nav>
      <Menu />
      <div className="content-wrapper">
        <div className="content">
          <div className="card">
            <div className="card-body">
              {/* <Home /> */}
              <Switch>
                <Route
                  exact
                  path={["/", "/home"]}
                  render={() => (
                    <Home start={startDate} end={endDate} isAuthed={true} />
                  )}
                />
                <Route
                  exact
                  path={["/performance"]}
                  render={() => (
                    <Performance
                      start={startDate}
                      end={endDate}
                      isAuthed={true}
                    />
                  )}
                />
                {/* <Route path="/home/:id" component={Home} /> */}
              </Switch>
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
