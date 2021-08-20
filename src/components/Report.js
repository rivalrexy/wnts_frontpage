/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import GasCoOpDataService from "../services/GasCoOp";

import "react-datepicker/dist/react-datepicker.css";

const Report = (props) => {
  const [performanceDate, setPerformanceDate] = useState([]);
  const [url, setUrl] = useState("");
  //const cors = require("cors");

  //Report.use(cors());

  useEffect(() => {
    getDate(convertDate(props.start), convertDate(props.end));
    reportIFrame(convertDate(props.start), convertDate(props.end));
    //console.log("didMount");
  }, []);

  useEffect(() => {
    if (performanceDate.length > 0) {
      getDate(convertDate(props.start), convertDate(props.end));
      // reportIFrame(convertDate(props.start), convertDate(props.end));
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

  const reportIFrame = (start, end) => {
    let timeto = start;
    let timefrom = end;

    let value2 = "admin";
    let value = value2.replace(/\"/g, "");
    let data =
      "http://110.50.86.154:28080/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FWNTS&reportUnit=%2Freports%2FWNTS%2FEMS&standAlone=true&StartDate=" +
      timefrom +
      "&EndDate=" +
      timeto +
      "&j_username=" +
      value +
      "&j_password=1m4dm1n&decorate=no";
    console.log(data);
    //return data
    //var test = document.getElementById("myFrame");
    //test.src = data;
    setUrl(data);
    //url = data;
  };

  return (
    <div>
      <iframe
        id="myFrame"
        //crossorigin
        src={
          "http://110.50.86.154:28080/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FWNTS&reportUnit=%2Freports%2FWNTS%2FEMS&standAlone=true"
        }
        style={{ height: "800px", width: "100%" }}
        title="Iframe Example"
      />
    </div>
  );
};

export default Report;
