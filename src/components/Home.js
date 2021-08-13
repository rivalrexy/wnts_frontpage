import React, { useState, useEffect, useMemo, useRef } from "react";
import GasComponentDataService from "../services/GasComponentService";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Home = (props) => {
  const [home, setHome] = useState([]);
  //const [paramStart, setParamStart] = useState([]);
  //const [paramEnd, setParamEnd] = useState([]);
  // const [currentHome, setCurrentHome] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");
  //const homeRef = useRef();

  //homeRef.current = home;

  useEffect(() => {
    retrieveHome();
    // console.log(props.start);
    //setParamStart(props.end);
    //setParamEnd(props.end);
    //getDate(convertDate(props.end), convertDate(props.end));
    //console.log("MOUNTED");
    //return () => console.log("UNMOUNTED");
  }, []);

  // const [startDate, setStartDate] = useState(new Date());

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
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    // current hours
    //let hours = date_ob.getHours();
    let hours = "00";
    // current minutes
    //let minutes = date_ob.getMinutes();
    let minutes = "00";
    // current seconds
    //let seconds = date_ob.getSeconds();
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

  // const uppercaseKeys = obj =>
  //   Object.keys(obj[0]).reduce((acc, key) => {
  //     acc[key.toUpperCase()] = obj[key];
  //     return acc;
  // }, {});

  // const onChangeSearchTitle = (e) => {
  //   const searchTitle = e.target.value;
  //   setSearchTitle(searchTitle);
  // };

  const retrieveHome = () => {
    GasComponentDataService.getAll()
      .then((response) => {
        const newJSON = uppercaseKeys(response.data);
        setHome(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getDate = (startDate, endDate) => {
    GasComponentDataService.getDate(startDate, endDate)
      .then((response) => {
        //setParamStart(props.end);
        //setParamEnd(props.end);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   getDate(convertDate(props.end), convertDate(props.end));
  // }, [props.end]);

  // const refreshList = () => {
  //   retrieveHome();
  //   setCurrentHome(null);
  //   setCurrentIndex(-1);
  // };

  // const setActiveHome = (home, index) => {
  //   setCurrentHome(home);
  //   setCurrentIndex(index);
  // };

  // const removeAllHome = () => {
  //   GasComponentDataService.removeAll()
  //     .then((response) => {
  //       const newJSON = uppercaseKeys(response.data);
  //       console.log(newJSON);
  //       refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const findByTitle = () => {
  //   GasComponentDataService.findByTitle(searchTitle)
  //     .then((response) => {
  //       const newJSON = uppercaseKeys(response.data);
  //       setHome(newJSON);
  //       console.log(newJSON);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  // const openHome = (rowIndex) => {
  //   const id = homeRef.current[rowIndex].id;

  //   props.history.push("/home/" + id);
  // };

  // const deleteHome = (rowIndex) => {
  //   const id = homeRef.current[rowIndex].id;

  //   GasComponentDataService.remove(id)
  //     .then((response) => {
  //       props.history.push("/home");

  //       let newHome = [...homeRef.current];
  //       newHome.splice(rowIndex, 1);

  //       setHome(newHome);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const columns = useMemo(
    () => [
      {
        Header: "Date Stamp",
        accessor: "DATE_STAMP",
      },
      {
        Header: "C1",
        accessor: "C1",
      },
      {
        Header: "C2",
        accessor: "C2",
      },
      // {
      //   Header: "Status",
      //   accessor: "published",
      //   Cell: (props) => {
      //     return props.value ? "Published" : "Pending";
      //   },
      // },
      // {
      //   Header: "Actions",
      //   accessor: "actions",
      //   Cell: (props) => {
      //     const rowIdx = props.row.id;
      //     return (
      //       <div>
      //         <span onClick={() => openHome(rowIdx)}>
      //           <i className="far fa-edit action mr-2"></i>
      //         </span>

      //         <span onClick={() => deleteHome(rowIdx)}>
      //           <i className="fas fa-trash action"></i>
      //         </span>
      //       </div>
      //     );
      //   },
      // },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: home,
    });

  return (
    <div className="list row">
      <div
        style={{
          // display: "flex",
          // justifyContent:'center',
          // alignItems:'center',
          backgroundImage: `url(${process.env.PUBLIC_URL + "/bgWNTSRev2.png"})`,
          backgroundRepeat: "no-repeat",
          height: "850px",
          width: "100%",
        }}>
        <table
          className="table table-striped table-bordered table-dark"
          {...getTableProps({
            style: {
              width: "295px",
              height: "300px",
              marginLeft: "200px",
              display: "inline-block",
            },
          })}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <table
          className="table table-striped table-bordered table-dark"
          {...getTableProps({
            style: {
              width: "295px",
              height: "300px",
              marginTop: "250px",
              marginLeft: "800px",
              display: "inline-block",
            },
          })}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
