/* eslint-disable react-hooks/exhaustive-deps */

import React , { useState, useEffect } from "react";
import IframeComm from "react-iframe-comm";
import GasCoOpDataService from "../services/GasCoOp";
import "react-datepicker/dist/react-datepicker.css";
const Report = (props) => {
    const [performanceDate, setPerformanceDate] = useState([]);
    // const [url, setUrl] = useState("");

    useEffect(() => {
        getDate(convertDate(props.start), convertDate(props.end));
        //attributes(convertDate(props.start), convertDate(props.end));
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

    

    // the html attributes to create the iframe with
    // make sure you use camelCase attribute names
    const attributes =  {
        //src: "http://110.50.86.154:28080/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FWNTS&reportUnit=%2Freports%2FWNTS%2FEMS&standAlone=true&StartDate=2019-09-11 00:00:00&EndDate=2019-09-10 00:00:00&j_username=admin&j_password=1m4dm1n&decorate=no",
        //src: "https://roadmap.sh/react",
   
      
       src: "http://110.50.86.154:28080/jasperserver/rest_v2/reports/reports/WNTS/EMS.html?StartDate="+convertDate(props.start)+"&EndDate="+ convertDate(props.end)+"&j_username=admin&j_password=1m4dm1n",
       width: "100%",
       height: "700px",
       frameBorder: 1, // show frame border just for fun...

    };

    // the postMessage data you want to send to your iframe
    // it will be send after the iframe has loaded
    const postMessageData = "hello iframe";

    // parent received a message from iframe
    const onReceiveMessage = () => {
        console.log("onReceiveMessage");
    };

    // iframe has loaded
    const onReady = () => {
        console.log("onReady");
    };

    return ( 
        
       <
        IframeComm attributes = { attributes}
        postMessageData = { postMessageData }
        handleReady = { onReady }
        handleReceiveMessage = { onReceiveMessage }
        />
        

          
    );

};
export default Report;

