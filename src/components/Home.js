import React, { useState, useEffect, useMemo, useRef } from "react";
import GasComponentDataService from "../services/GasComponentService";
import GasOperationDataService from "../services/GasOperationService";
import GasCoOpDataService from "../services/GasCoOp";
import { Link } from "react-router-dom";
import { useTable, useFilters } from "react-table";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { COLUMNS } from "./columns";

import "react-datepicker/dist/react-datepicker.css";

const Home = (props) => {
  const [home, setHome] = useState([]);
  const [homeDate, setHomeDate] = useState([]);
  const columns = useMemo(() => COLUMNS, []);

  useEffect(() => {
    getDate(convertDate(props.start), convertDate(props.end));
    console.log("didMount");
  }, []);

  useEffect(() => {
    if (homeDate.length > 0) {
      getDate(convertDate(props.start), convertDate(props.end));
      console.log("didUpdate");
    }
  }, [props.start, props.end]);

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
    GasCoOpDataService.getDate(startDate, endDate)
      .then((response) => {
        //const newJSON = uppercaseKeys(response.data);
        //response.data.map((row) => {});
        const newJSON = response.data;
        // const newJSON = response.data.filter(function (item) {
        //   return item.ASSET_ID == 1;
        // });
        setHomeDate(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const columns = useMemo(
  //   () => [
  //     // {
  //     //   Header: "DATE STAMP",
  //     //   accessor: "DATE_STAMP",
  //     // },
  //     {
  //       Header: "VOLUME",
  //       accessor: "VOLUME",
  //     },
  //     {
  //       Header: "ENERGY",
  //       accessor: "ENERGY",
  //     },
  //     {
  //       Header: "TEMPERATURE",
  //       accessor: "TEMPERATURE",
  //     },
  //     {
  //       Header: "PRESSURE",
  //       accessor: "PRESSURE",
  //     },
  //     {
  //       Header: "ENERGY RATE",
  //       accessor: "ENERGY_RATE",
  //     },
  //     {
  //       Header: "VOLUME RATE",
  //       accessor: "VOLUME_RATE",
  //     },
  //   ],
  //   []
  // );

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
          height: "90vh",
          // height: "850px",
          //height: "100%",
          //maxWidth: "100%",
        }}>
        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              //width: "10%",
              //height: "5%",
              width: "8vw",
              height: "10vh",
              fontSize: "10px",
              marginLeft: "500px",
              marginTop: "200px",
              // display: "inline-block",
              position: "absolute",
              zIndex: "0",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row, b) => {
                  if (b === 3) {
                    prepareRow(row);
                    return row.cells.map((cell, i) => {
                      if (a === i) {
                        if (column.render("Header") === "ASSET ID") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              onClick={() => console.log(row.original)}>
                              {/* <td></td> */}
                              <th colSpan="2">HANG TUAH</th>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              {...row.getRowProps()}
                              onClick={() => console.log(row.original)}>
                              <th>{column.render("Header")}</th>
                              <td>{cell.render("Cell")}</td>
                            </tr>
                          );
                        }
                      }
                    });
                  }
                })
              )
            )}
          </tbody>
        </table>

        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              //width: "10%",
              //height: "5%",
              width: "8vw",
              height: "10vh",
              fontSize: "10px",
              marginLeft: "750px",
              marginTop: "30px",
              // display: "inline-block",
              position: "absolute",
              zIndex: "0",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row, b) => {
                  if (b === 0) {
                    prepareRow(row);
                    return (
                      row.cells
                        // .filter((rows2) => rows2.ASSET_ID == 1)
                        .map((cell, i) => {
                          if (a === i) {
                            if (column.render("Header") === "ASSET ID") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  onClick={() => console.log(row.original)}>
                                  {/* <td></td> */}
                                  <th colSpan="2">ANOA</th>
                                </tr>
                              );
                            } else {
                              return (
                                <tr {...column.getHeaderProps()}>
                                  <th>{column.render("Header")}</th>
                                  <td>{cell.render("Cell")}</td>
                                </tr>
                              );
                            }
                          }
                        })
                    );
                  }
                })
              )
            )}
          </tbody>
        </table>

        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              //width: "10%",
              //height: "5%",
              width: "8vw",
              height: "10vh",
              fontSize: "10px",
              marginLeft: "1350px",
              marginTop: "20px",
              // display: "inline-block",
              position: "absolute",
              zIndex: "0",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row, b) => {
                  if (b === 4) {
                    prepareRow(row);
                    return row.cells.map((cell, i) => {
                      if (a === i) {
                        if (column.render("Header") === "ASSET ID") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              onClick={() => console.log(row.original)}>
                              {/* <td></td> */}
                              <th colSpan="2">PELIKAN</th>
                            </tr>
                          );
                        } else {
                          return (
                            <tr {...column.getHeaderProps()}>
                              <th>{column.render("Header")}</th>
                              <td>{cell.render("Cell")}</td>
                            </tr>
                          );
                        }
                      }
                    });
                  }
                })
              )
            )}
          </tbody>
        </table>

        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              // width: "10%",
              // height: "5%",
              width: "8vw",
              height: "10vh",
              fontSize: "10px",
              marginLeft: "1350px",
              marginTop: "300px",
              //display: "inline-block",
              position: "absolute",
              zIndex: "0",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row, b) => {
                  if (b === 1) {
                    prepareRow(row);
                    return row.cells.map((cell, i) => {
                      if (a === i) {
                        if (column.render("Header") === "ASSET ID") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              onClick={() => console.log(row.original)}>
                              {/* <td></td> */}
                              <th colSpan="2">GAJAH BARU</th>
                            </tr>
                          );
                        } else {
                          return (
                            <tr {...column.getHeaderProps()}>
                              <th>{column.render("Header")}</th>
                              <td>{cell.render("Cell")}</td>
                            </tr>
                          );
                        }
                      }
                    });
                  }
                })
              )
            )}
          </tbody>
        </table>

        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              // width: "10%",
              // height: "5%",
              width: "8vw",
              height: "10vh",
              fontSize: "10px",
              marginLeft: "1000px",
              marginTop: "350px",
              //display: "inline-block",
              position: "absolute",
              zIndex: "0",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row, b) => {
                  if (b === 3) {
                    prepareRow(row);
                    return row.cells.map((cell, i) => {
                      if (a === i) {
                        if (column.render("Header") === "ASSET ID") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              onClick={() => console.log(row.original)}>
                              {/* <td></td> */}
                              <th colSpan="2">KAKAP</th>
                            </tr>
                          );
                        } else {
                          return (
                            <tr {...column.getHeaderProps()}>
                              <th>{column.render("Header")}</th>
                              <td>{cell.render("Cell")}</td>
                            </tr>
                          );
                        }
                      }
                    });
                  }
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
