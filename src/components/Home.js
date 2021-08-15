import React, { useState, useEffect, useMemo, useRef } from "react";
import GasComponentDataService from "../services/GasComponentService";
import GasOperationDataService from "../services/GasOperationService";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

const Home = (props) => {
  const [home, setHome] = useState([]);
  const [homeDate, setHomeDate] = useState([]);

  useEffect(() => {
    getDate(convertDate(props.start), convertDate(props.end));
    console.log("didMount");
  }, []);

  useEffect(() => {
    if (homeDate.length > 0) {
      getDate(convertDate(props.start), convertDate(props.end));
      console.log("didUpdate");
    }
  }, [props.end]);

  const uppercaseKeys = (jsonVal) => {
    for (var i = 0; i < jsonVal.length; i++) {
      var a = jsonVal[i];
      for (var key in a) {
        if (a.hasOwnProperty(key)) {
          a[key.toUpperCase()] = a[key];
          delete a[key];
        }
      }
      jsonVal[i] = a;
    }
    return jsonVal;
  };

  const convertDate = (dates) => {
    let date_ob = new Date(dates);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = "00";
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

  // const retrieveHome = () => {
  //   GasComponentDataService.getAll()
  //     .then((response) => {
  //       const newJSON = uppercaseKeys(response.data);
  //       setHome(newJSON);
  //       console.log(newJSON);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const getDate = (startDate, endDate) => {
    GasOperationDataService.getDate(startDate, endDate)
      .then((response) => {
        const newJSON = uppercaseKeys(response.data);
        setHomeDate(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: "DATE STAMP",
      //   accessor: "DATE_STAMP",
      // },
      {
        Header: "VOLUME",
        accessor: "VOLUME",
      },
      {
        Header: "ENERGY",
        accessor: "ENERGY",
      },
      {
        Header: "TEMPERATURE",
        accessor: "TEMPERATURE",
      },
      {
        Header: "PRESSURE",
        accessor: "PRESSURE",
      },
      {
        Header: "ENERGY RATE",
        accessor: "ENERGY_RATE",
      },
      {
        Header: "VOLUME RATE",
        accessor: "VOLUME_RATE",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: homeDate,
      //data: home,
    });

  return (
    <div className="list row">
      {/* {console.log("rendered")} */}
      <div
        style={{
          // display: "flex",
          // justifyContent:'center',
          // alignItems:'center',
          backgroundImage: `url(${process.env.PUBLIC_URL + "/bgWNTSRev2.png"})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          // height: "850px",
          //height: "100%",
          //maxWidth: "100%",
        }}>
        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              width: "10%",
              height: "5%",
              fontSize: "10px",
              marginLeft: "300px",
              marginTop: "50px",
              display: "inline-block",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row) => {
                  prepareRow(row);
                  return row.cells.map((cell, i) => {
                    if (a === i) {
                      return (
                        // <tr {...column.getHeaderProps()}>
                        <tr
                          {...row.getRowProps()}
                          onClick={() => console.log(row.original)}>
                          <th>{column.render("Header")}</th>
                          <td>{cell.render("Cell")}</td>
                        </tr>
                      );
                    }
                  });
                })
              )
            )}
          </tbody>
        </table>

        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              width: "10%",
              height: "5%",
              fontSize: "10px",
              marginLeft: "700px",
              marginTop: "50px",
              display: "inline-block",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row) => {
                  prepareRow(row);
                  return row.cells.map((cell, i) => {
                    if (a === i) {
                      return (
                        <tr {...column.getHeaderProps()}>
                          <th>{column.render("Header")}</th>
                          <td>{cell.render("Cell")}</td>
                        </tr>
                      );
                    }
                  });
                })
              )
            )}
          </tbody>
        </table>

        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              width: "10%",
              height: "5%",
              fontSize: "10px",
              marginLeft: "1100px",
              marginTop: "200px",
              display: "inline-block",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row) => {
                  prepareRow(row);
                  return row.cells.map((cell, i) => {
                    if (a === i) {
                      return (
                        <tr {...column.getHeaderProps()}>
                          <th>{column.render("Header")}</th>
                          <td>{cell.render("Cell")}</td>
                        </tr>
                      );
                    }
                  });
                })
              )
            )}
          </tbody>
        </table>

        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              width: "10%",
              height: "5%",
              fontSize: "10px",
              marginLeft: "600px",
              marginTop: "-300px",
              display: "inline-block",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row) => {
                  prepareRow(row);
                  return row.cells.map((cell, i) => {
                    if (a === i) {
                      return (
                        <tr {...column.getHeaderProps()}>
                          <th>{column.render("Header")}</th>
                          <td>{cell.render("Cell")}</td>
                        </tr>
                      );
                    }
                  });
                })
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
