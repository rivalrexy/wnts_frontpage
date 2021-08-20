import React, { useState, useEffect, useMemo } from "react";
import GasCoOpDataService from "../services/GasCoOp";
import { useTable, useSortBy, usePagination,useGlobalFilter} from "react-table";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import { COLUMNS } from "./columns";

import "react-datepicker/dist/react-datepicker.css";

const DataBrowser = (props) => {
  const [homeDate, setHomeDate] = useState([]);
  const columns = useMemo(() => COLUMNS, []);

  useEffect(() => {
    getAll(convertDate(props.start), convertDate(props.end));
    console.log("didMount");
  }, []);

  useEffect(() => {
    if (homeDate.length > 0) {
      getAll(convertDate(props.start), convertDate(props.end));
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

  const getAll = (startDate, endDate) => {
    GasCoOpDataService.getAll(startDate, endDate)
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,page, // Instead of using 'rows', we'll use page,
  // which has only the rows for the active page

  // The rest of these things are super handy, too ;)
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  state: { pageIndex, pageSize,globalFilter },setGlobalFilter } =
    useTable({
      columns,
      data: homeDate,
      // initialState: { pageIndex: 2 },
      //data: home,
    },
    useGlobalFilter,useSortBy,usePagination);
    
  return (
    <div className="list row">
      {/* {console.log("rendered")} */}
      <div>
      <input
        type="text"
        value={globalFilter || ""}
        onChange={e => setGlobalFilter(e.target.value)}
      />
        <table
          className="table table-striped"
          {...getTableProps({
            
          })}>
            <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{
                          borderBottom: 'solid 3px red',
                          background: 'aliceblue',
                          color: 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
                  <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '10px',
                              border: 'solid 1px gray',
                            }}
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
        </table>
        <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    
      </div>
    </div>
  );
};

  export default DataBrowser;