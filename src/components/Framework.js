/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import GasCoOpDataService from "../services/GasCoOp";

import "react-datepicker/dist/react-datepicker.css";

const Framework = (props) => {
  const [performanceDate, setPerformanceDate] = useState([]);

  useEffect(() => {
    getDate(convertDate(props.start), convertDate(props.end));
    //console.log("didMount");
  }, []);

  useEffect(() => {
    if (performanceDate.length > 0) {
      getDate(convertDate(props.start), convertDate(props.end));
      //console.log("didUpdate");
    }
  }, [props.start, props.end]);

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

  const getDate = (startDate, endDate) => {
    GasCoOpDataService.getDate(startDate, endDate)
      .then((response) => {
        const newJSON = response.data;
        setPerformanceDate(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <div className="list row"> </div>;
};

export default Framework;
