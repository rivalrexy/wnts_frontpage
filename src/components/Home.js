import React, { useState, useEffect, useMemo, useRef } from "react";
import WntsDataService from "../services/WntsService";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

const Home = (props) => {
    const [home, setHome] = useState([]);
    const [currentHome, setCurrentHome] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const homeRef = useRef();

    homeRef.current = home;

    useEffect(() => {
      retrieveHome();
    }, []);

    const uppercaseKeys = (jsonVal) => {
      for(var i = 0; i<jsonVal.length;i++) {
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
    }

    // const uppercaseKeys = obj =>
    //   Object.keys(obj[0]).reduce((acc, key) => {
    //     acc[key.toUpperCase()] = obj[key];
    //     return acc;
    // }, {});
    
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrieveHome = () => {
      WntsDataService.getAll()
        .then((response) => {
          const newJSON = uppercaseKeys(response.data);
          setHome(newJSON);
          console.log(newJSON);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
      retrieveHome();
      setCurrentHome(null);
      setCurrentIndex(-1);
    };
  
    const setActiveHome = (home, index) => {
      setCurrentHome(home);
      setCurrentIndex(index);
    };
  
    const removeAllHome = () => {
      WntsDataService.removeAll()
        .then((response) => {
          const newJSON = uppercaseKeys(response.data);
          console.log(newJSON);
          refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const findByTitle = () => {
      WntsDataService.findByTitle(searchTitle)
        .then((response) => {
          const newJSON = uppercaseKeys(response.data);
          setHome(newJSON);
          console.log(newJSON);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    
    const openHome = (rowIndex) => {
      const id = homeRef.current[rowIndex].id;
  
      props.history.push("/home/" + id);
    };
  
    const deleteHome = (rowIndex) => {
      const id = homeRef.current[rowIndex].id;
  
      WntsDataService.remove(id)
        .then((response) => {
          props.history.push("/home");
  
          let newHome = [...homeRef.current];
          newHome.splice(rowIndex, 1);
  
          setHome(newHome);
        })
        .catch((e) => {
          console.log(e);
        });
    };

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
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data: home,
    });
  
    return (
      <div className="list row">
        <div style={{ 
            display: 'flex',
            // justifyContent:'center', 
            // alignItems:'center',
            backgroundImage: `url(${process.env.PUBLIC_URL+"/bgWNTS.png"})`,
            backgroundRepeat: 'no-repeat',
            height:'800px',
            width:'1800px' 
        }}>
        {/* <div className="col-md-8"> */}
          {/* <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div> */}
        {/* </div> */}
        {/* <div className="col-md-3"> */}
          <table
            className="table table-striped table-bordered table-dark"
            {...getTableProps({style: {width: '300px',height: '300px'}})}
          >
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
  
        {/* <div className="col-md-8">
          <button className="btn btn-sm btn-danger" onClick={removeAllHome}>
            Remove All
          </button>
        </div> */}
        </div>
      // </div>
    
    );
  };
  
  export default Home;
  