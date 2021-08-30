/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import GasCoOpDataService from "../services/GasCoOp";
import { useTable } from "react-table";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import { COLUMNS } from "./columns";

import "react-datepicker/dist/react-datepicker.css";

const Home = (props) => {
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

  // const uppercaseKeys = (jsonVal) => {
  //   for (var i = 0; i < jsonVal.length; i++) {
  //     var a = jsonVal[i];
  //     for (var key in a) {
  //       if (a.hasOwnProperty(key)) {
  //         a[key.toUpperCase()] = a[key];
  //         delete a[key];
  //       }
  //     }
  //     jsonVal[i] = a;
  //   }
  //   return jsonVal;
  // };

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
          height: "95vh",
          // height: "850px",
          //height: "100%",
          //maxWidth: "100%",
        }}>
        <table
          className="table table-striped  table-dark"
          {...getTableProps({
            style: {
              width: "10vw",
              height: "10vh",
              //width: "10%",
              //height: "20%",
              fontSize: "10px",
              top: "25%",
              left: "20%",
              transform: `translate(50%, 50%)`,
              //marginLeft: "500px",
              //marginTop: "200px",
              // display: "inline-block",
              position: "absolute",
              zIndex: "0",
              overflowX: "auto",
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
                              onClick={() => console.log(row.original.ASSET_ID)}>
                              {/* <td></td> */}
                              <th colSpan="2" style={{ textAlign: "center" }}>
                                HANG TUAH
                              </th>
                            </tr>
                          );
                        } else if (column.render("Header") === "VOLUME") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} BBTU/D
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "ENERGY") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} MMSCFD
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "TEMPERATURE") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Deg F
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Psig
                              </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "2%",
              left: "35%",
              transform: `translate(50%, 5%)`,
              // display: "inline-block",
              position: "absolute",
              //zIndex: "0",
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
                                  <th
                                    colSpan="2"
                                    style={{
                                      textAlign: "center",
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    ANOA
                                  </th>
                                </tr>
                              );
                            } else if (column.render("Header") === "VOLUME") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {cell.render("Cell")} BBTU/D
                                  </td>
                                </tr>
                              );
                            } else if (column.render("Header") === "ENERGY") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {cell.render("Cell")} MMSCFD
                                  </td>
                                </tr>
                              );
                            } else if (
                              column.render("Header") === "TEMPERATURE"
                            ) {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {cell.render("Cell")} Deg F
                                  </td>
                                </tr>
                              );
                            } else {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {cell.render("Cell")} Psig
                                  </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "25%",
              left: "70%",
              transform: `translate(75%, 2%)`,
              // width: "8vw",
              // height: "10vh",
              // fontSize: "10px",
              // marginLeft: "1350px",
              // marginTop: "20px",
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
                              <th
                                colSpan="2"
                                style={{
                                  textAlign: "center",
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                PELIKAN
                              </th>
                            </tr>
                          );
                        } else if (column.render("Header") === "VOLUME") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} BBTU/D
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "ENERGY") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} MMSCFD
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "TEMPERATURE") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Deg F
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Psig
                              </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "2%",
              left: "70%",
              transform: `translate(75%, 2%)`,

              // width: "8vw",
              // height: "10vh",
              // fontSize: "10px",
              // marginLeft: "1350px",
              // marginTop: "300px",
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
                              <th
                                colSpan="2"
                                style={{
                                  textAlign: "center",
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                GAJAH BARU
                              </th>
                            </tr>
                          );
                        } else if (column.render("Header") === "VOLUME") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} BBTU/D
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "ENERGY") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} MMSCFD
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "TEMPERATURE") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Deg F
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Psig
                              </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "42%",
              left: "60%",
              transform: `translate(75%, 2%)`,
              // width: "8vw",
              // height: "10vh",
              // fontSize: "10px",
              // marginLeft: "1000px",
              // marginTop: "350px",
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
                              <th
                                colSpan="2"
                                style={{
                                  textAlign: "center",
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                KAKAP
                              </th>
                            </tr>
                          );
                        } else if (column.render("Header") === "VOLUME") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} BBTU/D
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "ENERGY") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} MMSCFD
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "TEMPERATURE") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Deg F
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Psig
                              </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "65%",
              left: "2%",
              transform: `translate(2%, 50%)`,
              // width: "8vw",
              // height: "10vh",
              // fontSize: "10px",
              // marginLeft: "50px",
              // marginTop: "550px",
              position: "absolute",
              zIndex: "0",
            },
          })}>
          <tbody {...getTableBodyProps()}>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, a) =>
                rows.map((row, b) => {
                  if (b === 5) {
                    prepareRow(row);
                    return row.cells.map((cell, i) => {
                      if (a === i) {
                        if (column.render("Header") === "ASSET ID") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              onClick={() => console.log(row.original)}>
                              <th
                                colSpan="2"
                                style={{
                                  textAlign: "center",
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                ORF
                              </th>
                            </tr>
                          );
                        }
                        if (column.render("Header") === "VOLUME") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} BBTU/D
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "ENERGY") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} MMSCFD
                              </td>
                            </tr>
                          );
                        } else if (column.render("Header") === "TEMPERATURE") {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Deg F
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              {...row.getRowProps()}
                              //data-href="#"
                              onClick={() => console.log("test")}>
                              <th
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {column.render("Header")}
                              </th>
                              <td
                                style={{
                                  paddingTop: "2px",
                                  paddingBottom: "2px",
                                }}>
                                {cell.render("Cell")} Psig
                              </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "15%",
              left: "37%",
              transform: `translate(50%, 5%)`,
              // display: "inline-block",
              position: "absolute",
              //zIndex: "0",
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
                                  <th
                                    colSpan="2"
                                    style={{
                                      textAlign: "center",
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    GBTI
                                  </th>
                                </tr>
                              );
                            } else if (column.render("Header") === "VOLUME") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 BBTU/D
                                  </td>
                                </tr>
                              );
                            } else if (column.render("Header") === "ENERGY") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 MMSCFD
                                  </td>
                                </tr>
                              );
                            } else if (
                              column.render("Header") === "TEMPERATURE"
                            ) {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 Deg F
                                  </td>
                                </tr>
                              );
                            } else {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 Psig
                                  </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "28%",
              left: "37%",
              transform: `translate(50%, 5%)`,
              // display: "inline-block",
              position: "absolute",
              //zIndex: "0",
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
                                  <th
                                    colSpan="2"
                                    style={{
                                      textAlign: "center",
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    SSTI-N
                                  </th>
                                </tr>
                              );
                            } else if (column.render("Header") === "VOLUME") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 BBTU/D
                                  </td>
                                </tr>
                              );
                            } else if (column.render("Header") === "ENERGY") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 MMSCFD
                                  </td>
                                </tr>
                              );
                            } else if (
                              column.render("Header") === "TEMPERATURE"
                            ) {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 Deg F
                                  </td>
                                </tr>
                              );
                            } else {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 Psig
                                  </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "55%",
              left: "46%",
              transform: `translate(50%, 5%)`,
              // display: "inline-block",
              position: "absolute",
              //zIndex: "0",
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
                                  <th
                                    colSpan="2"
                                    style={{
                                      textAlign: "center",
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    SSTI-S
                                  </th>
                                </tr>
                              );
                            } else if (column.render("Header") === "VOLUME") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 BBTU/D
                                  </td>
                                </tr>
                              );
                            } else if (column.render("Header") === "ENERGY") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 MMSCFD
                                  </td>
                                </tr>
                              );
                            } else if (
                              column.render("Header") === "TEMPERATURE"
                            ) {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 Deg F
                                  </td>
                                </tr>
                              );
                            } else {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 Psig
                                  </td>
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
              width: "10vw",
              height: "10vh",
              fontSize: "10px",
              top: "2%",
              left: "54%",
              transform: `translate(50%, 5%)`,
              // display: "inline-block",
              position: "absolute",
              //zIndex: "0",
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
                                  <th
                                    colSpan="2"
                                    style={{
                                      textAlign: "center",
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    PTI
                                  </th>
                                </tr>
                              );
                            } else if (column.render("Header") === "VOLUME") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 BBTU/D
                                  </td>
                                </tr>
                              );
                            } else if (column.render("Header") === "ENERGY") {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 MMSCFD
                                  </td>
                                </tr>
                              );
                            } else if (
                              column.render("Header") === "TEMPERATURE"
                            ) {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {/* {cell.render("Cell")}  */}0 Deg F
                                  </td>
                                </tr>
                              );
                            } else {
                              return (
                                <tr
                                  {...row.getRowProps()}
                                  //data-href="#"
                                  onClick={() => console.log("test")}>
                                  <th
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {column.render("Header")}
                                  </th>
                                  <td
                                    style={{
                                      paddingTop: "2px",
                                      paddingBottom: "2px",
                                    }}>
                                    {" "}
                                    0 Psig
                                    {/* {cell.render("Cell")} Psig */}
                                  </td>
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
      </div>
    </div>
  );
};

export default Home;
