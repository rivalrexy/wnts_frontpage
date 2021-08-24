
import React from "react";
import IframeComm from "react-iframe-comm";


const Report = (props) => {


    // the html attributes to create the iframe with
    // make sure you use camelCase attribute names
    const attributes = {
        //src: "http://110.50.86.154:28080/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Freports%2FWNTS&reportUnit=%2Freports%2FWNTS%2FEMS&standAlone=true&StartDate=2019-09-11 00:00:00&EndDate=2019-09-10 00:00:00&j_username=admin&j_password=1m4dm1n&decorate=no",
        //src: "https://roadmap.sh/react",
        src: "http://110.50.86.154:28080/jasperserver/rest_v2/reports/reports/WNTS/EMS.html?StartDate=2019-08-20&EndDate=2021-08-20&j_username=admin&j_password=1m4dm1n",
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

    return ( <
        IframeComm attributes = { attributes }
        postMessageData = { postMessageData }
        handleReady = { onReady }
        handleReceiveMessage = { onReceiveMessage }
        />
    );

};
export default Report;
