/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useLocation } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import { DatePicker, Button } from "antd";
import moment from "moment";
import GasCoOpDataService from "./services/GasCoOp";

import Home from "./components/Home";
import Performance from "./components/Performance";
import Menu from "./components/Mainmenu";
import DataBrowser from "./components/DataBrowser";
import Footer from "./components/Footer";
import Report from "./components/Report";

const App = ({ children }) => {
  //const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = useState(new Date());
  const [asset, setAsset] = useState([]);
  const [ assetValue, setValue] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2019-09-10 00:00:00"));
  const [endDate, setEndDate] = useState(new Date("2019-09-11 00:00:00"));
  const { RangePicker } = DatePicker;
  const dateTimeFormat = "YYYY/MM/DD HH:00";
  const dateRange = [
    moment(startDate, dateTimeFormat),
    moment(endDate, dateTimeFormat),
  ];

  useEffect(() => {
    retrieveAsset(convertDate(startDate), convertDate(endDate));
    console.log("didMountapp");
  }, []);

  const convertDate = (dates) => {
    let date_ob = new Date(dates);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = "00";
    let seconds = "00";
    return (
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  const retrieveAsset = (startDate, endDate) => {
    GasCoOpDataService.getDate(startDate, endDate)
      .then((response) => {
        const newJSON = response.data;
        setAsset(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
  const handleChange =(e) => {
    setValue(  e.target.value );
    console.log(e.target.value);
  }
  return (
    <div className="wrapper">
      {/* {(() => {
        switch (userType) {
          case "Admin":
            return <div>You are a Admin.</div>;
          case "Manager":
            return <div>You are a Manager.</div>;
          default:
            return <div>You are a User.</div>;
        }
      })()} */}

      {/* <Home /> */}
      <Switch>
        <Route
          exact
          path={["/", "/home"]}
          render={() => (
            <div>
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
                    <a href="/" className="nav-link">
                      Home
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
                    {/* <select>
                      {asset.map((option) => (
                        <option value={option.ASSET_ID}>
                          {option.ASSET_ID}
                        </option>
                      ))}
                    </select> */}
                    <Button onClick={onClickPrev} type="primary" shape="circle">
                      {"<"}
                    </Button>
                  </div>

                  <RangePicker
                    //defaultValue={dateRange}
                    value={dateRange}
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
                </ul>
              </nav>
              <Menu />
              <div className="content-wrapper">
                <div className="content">
                  <div className="card">
                    <div className="card-body">
                      <Home start={startDate} end={endDate} isAuthed={true} />
                      <div className="d-flex flex-row justify-content-end"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
        <Route
          exact
          path={["/performance"]}
          render={() => (
            <Performance start={startDate} end={endDate} isAuthed={true} />
          )}
        />
        <Route
          exact
          path={["/report"]}
          render={() => (
            <Report start={startDate} end={endDate} isAuthed={true} />
          )}
        />
        <Route
          exact
          path={["/databrowser"]}
          
          render={() => (
            <div>
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
                    <a href="/" className="nav-link">
                      Home
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
                    <select onChange={handleChange}>
                      {asset.map((option) => (
                        <option value={option.ASSET_ID}>
                          {option.ASSET_ID}
                        </option>
                      ))}
                    </select>
                    <Button onClick={onClickPrev} type="primary" shape="circle">
                      {"<"}
                    </Button>
                  </div>

                  <RangePicker
                    //defaultValue={dateRange}
                    value={dateRange}
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
                </ul>
              </nav>
              <Menu />
              <div className="content-wrapper">
                <div className="content">
                  <div className="card">
                    <div className="card-body">
                      <DataBrowser
                        start={startDate}
                        end={endDate}
                        isAuthed={true}
                        id ={assetValue}
                      />
                      <div className="d-flex flex-row justify-content-end"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
        {/* <Route path="/home/:id" component={Home} /> */}
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
