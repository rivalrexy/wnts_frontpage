/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import GasCoOpDataService from "../services/GasCoOp";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useFilters,
} from "react-table";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import { COLUMNS } from "./columnsdatabrowser";
import { CSVLink } from "react-csv";
import Modal from "react-modal";
import * as d3 from "d3";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

const DataBrowser = (props) => {
  const [homeDate, setHomeDate] = useState([]);
  const [, setHomeDate2] = useState([]);
  const [optionData, setOption] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const [headerVal, setHeaderVal] = useState("");

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  useEffect(() => {
    get(props.id, convertDate(props.start), convertDate(props.end));
    getPivot(props.id, convertDate(props.start), convertDate(props.end))
    console.log("didMount");
  }, []);
  
  
  const options = [
    { value: 'C1', label: 'C1' },
    { value: 'C2', label: 'C2' },
    { value: 'C3', label: 'C3' },
    { value: 'C4', label: 'C4' },
    { value: 'C5', label: 'C5' },
    { value: 'C6', label: 'C6' },
    { value: 'C7', label: 'C7' },
    { value: 'C8', label: 'C8' },
    { value: 'C9', label: 'C9' },
    { value: 'N2', label: 'N2' },
    { value: 'C02', label: 'C02' },
    { value: 'H20', label: 'H20' },
    { value: 'GHV', label: 'GHV' },
    { value: 'VOLUME_RATE', label: 'VOLUME' },
    { value: 'ENERGY_RATE', label: 'ENERGY' },
    { value: 'TEMPERATUR', label: 'TEMPERATUR' },
    { value: 'PRESSURE', label: 'PRESSURE' }
  ]
  useEffect(() => {
    if (homeDate.length > 0) {
      get(props.id, convertDate(props.start), convertDate(props.end));
      getPivot(props.id, convertDate(props.start), convertDate(props.end))
      console.log("didUpdate");
    }
  }, [optionData,props.id, props.start, props.end]);

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

  const get = (id, startDate, endDate) => {
    GasCoOpDataService.get(id, startDate, endDate)
      .then((response) => {
        //const newJSON = uppercaseKeys(response.data);
        //response.data.map((row) => {});
        const newJSON = response.data;
        setHomeDate(newJSON);
        // d3.selectAll("div div svg").remove();
        // if (headerVal === "VOLUME") {
        //   renderMultiChartVolume(newJSON);
        // }
        // if (headerVal === "ENERGY") {
        //   renderMultiChartEnergy(newJSON);
        //   //closeModal();
        // }
        // const newJSON = response.data.filter(function (item) {
        //   return item.ASSET_ID == 1;
        // });
        //setHomeDate(newJSON);
        console.log("get");
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const getPivot = (id ,startDate, endDate) => {
    GasCoOpDataService.getPivot(id, startDate, endDate)
      .then((response) => {
        //const newJSON = uppercaseKeys(response.data);
        //response.data.map((row) => {});
        const newJSON = response.data;
        setHomeDate2(newJSON);
        //let filter1 = 'C1'
        //let filter2 = 'GHV'
        const filters = optionData;
        console.log("pivot");
        console.log(optionData);
        d3.selectAll("div div svg").remove();
        if (headerVal === "VOLUME") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          
        }
        if (headerVal === "ENERGY") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C1") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C2") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C3") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C4") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C5") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C6") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C7") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C8") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C9") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "N2") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "C02") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "H20") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "GHV") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "TEMP") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        if (headerVal === "PRESS") {
          const newJSON2 = newJSON.filter(({ ASSET_PROPERTY }) => filters.includes(ASSET_PROPERTY));
          renderMultiChart(newJSON2);
          //renderMultiChartEnergy(newJSON);
          //closeModal();
        }
        console.log("get");
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const headers = [
    { label: "NAME", key: "NAME" },
    { label: "DATE STAMP", key: "DATE_STAMP" },
    { label: "C1", key: "C1" },
    { label: "C2", key: "C2" },
    { label: "C3", key: "C3" },
    { label: "C4", key: "C4" },
    { label: "C5", key: "C5" },
    { label: "C6", key: "C6" },
    { label: "C7", key: "C7" },
    { label: "C8", key: "C8" },
    { label: "C9", key: "C9" },
    { label: "N2", key: "N2" },
    { label: "C02", key: "C02" },
    { label: "H20", key: "H20" },
    { label: "GHV", key: "GHV" },
    { label: "VOLUME", key: "VOLUME_RATE" },
    { label: "ENERGY", key: "ENERGY_RATE" },
    { label: "TEMPERATURE", key: "TEMPERATURE" },
    { label: "PRESSURE", key: "PRESSURE" },
  ];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
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
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: homeDate,
      defaultColumn,
      // initialState: { pageIndex: 2 },
      //data: home,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal2IsOpen, set2IsOpen] = React.useState(false);

  const openModal = (e) => {
    setIsOpen(true);
    setHeaderVal(e.target.id);
    // if(headerVal==='VOLUME'){
    //   setOption('VOLUME_RATE');
    // }
    // if(headerVal==='ENERGY'){
    //   setOption('ENERGY_RATE');
    // }
    console.log(e.target.id);
  };

  function openModal2() {
    set2IsOpen(true);
  }
//for line chart
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //if(headerVal==='VOLUME'){
      subtitle.style.color = "#f00";
    //}
    getPivot(props.id, convertDate(props.start), convertDate(props.end));

    if(headerVal==='VOLUME'){
      setOption('VOLUME_RATE');
    }
    if(headerVal==='ENERGY'){
      setOption('ENERGY_RATE');
    }
    if(headerVal==='C1'){
      setOption('C1');
    }
    if(headerVal==='C2'){
      setOption('C2');
    }
    if(headerVal==='C3'){
      setOption('C3');
    }
    if(headerVal==='C4'){
      setOption('C4');
    }
    if(headerVal==='C5'){
      setOption('C5');
    }
    if(headerVal==='C6'){
      setOption('C6');
    }
    if(headerVal==='C7'){
      setOption('C7');
    }
    if(headerVal==='C8'){
      setOption('C8');
    }
    if(headerVal==='C9'){
      setOption('C9');
    }
    if(headerVal==='N2'){
      setOption('N2');
    }
    if(headerVal==='C02'){
      setOption('C02');
    }
    if(headerVal==='H20'){
      setOption('H20');
    }
    if(headerVal==='GHV'){
      setOption('GHV');
    }
    if(headerVal==='TEMP'){
      setOption('TEMPERATURE');
    }
    if(headerVal==='PRESS'){
      setOption('PRESSURE');
    }
  }

  function closeModal() {
    setIsOpen(false);
  }
  function close2Modal() {
    set2IsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const customStyles2 = {
    content: {
      top: "5%",
      left: "17%",
    },
    overlay: { zIndex: 1000 },
  };
  //d3.selectAll("div div svg").remove();
  var width = 600;
  var height = 400;
  var margin = 50;
  // var marginBotDomain = 0.8;
  // var marginTopDomain = 1.2;
  // var botDomain = 10;
  var duration = 250;
  var tickSizeInner = 5;
  var xGridSize = -height + margin;
  var yGridSize = width - margin;
  var lineOpacity = "0.90";
  var lineOpacityHover = "1";
  var otherLinesOpacityHover = "1";
  var lineStroke = "3px";
  var lineStrokeHover = "5px";
  var circleOpacity = "0.85";
  var circleOpacityOnLineHover = "0.25";
  var circleRadius = 3;
  var circleRadiusHover = 6;
  var rotateXLabel = 0;
  var X_posXLeg = 35;
  var X_posYLeg = 10;
  var Y_posXLab = -90;
  var Y_posYLab = -40;

  //////////////////////////////////////////////////////// ENERGY /////////////////////////////////////////////////////////////////////////////////////////
  const handleChange = e => {
    //let value = Array.from(e.target.selectedOptions, option => option.value);
    //let value = e.target.selectedOptions
    setOption(Array.isArray(e) ? e.map(x => x.value) : []);
    //setOption(selectedOptions);
  }
  const renderMultiChart = (datas) => {
    var group_to_values = datas.reduce(function (obj, item) {
      obj[item.ASSET_PROPERTY] = obj[item.ASSET_PROPERTY] || [];
      obj[item.ASSET_PROPERTY].push(item);
      return obj;
    }, {});
    

    var data = Object.keys(group_to_values).map(function (key) {
      return { name: key, values: group_to_values[key] };
    });
    console.log("ADATATES")
    console.log(data)
    /* Format Data */
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        d.VALUE = +d.VALUE;
      });
    });

    // var total_tick = tick(data);

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([
        0,1700
        // d3.min(data[0].values, (d) => d.VALUE) * marginBotDomain -
        //   botDomain,
        // d3.max(data[0].values, (d) => d.VALUE) * marginTopDomain,
      ])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3
      .select("#chart2")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    var line = d3
      .line()
      .x((d) => xScale(d.DATE_STAMP))
      .y((d) => yScale(d.VALUE))
      .curve(d3.curveMonotoneX);
    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", lineStroke)
      .attr("class", "line-group")
      .on("mouseover", function (d, i) {
        svg
          .append("text")
          .attr("class", "title-text")
          .style("fill", color(i))
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width - margin) / 2)
          .attr("y", 5);
      })
      .on("mouseout", function (d) {
        svg.select(".title-text").remove();
      })
      .append("path")
      .attr("class", "line")
      .attr("d", (d) => line(d.values))
      .style("stroke", (d, i) => color(i))
      .style("opacity", lineOpacity)
      .on("mouseover", function (d) {
        d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
        d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
        d3.select(this)
          .style("opacity", lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
      .on("mouseout", function (d) {
        d3.selectAll(".line").style("opacity", lineOpacity);
        d3.selectAll(".circle").style("opacity", circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });

    /* Add circles in the line */
    lines
      .selectAll("circle-group")
      .data(data)
      .enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data((d) => d.values)
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function (d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.VALUE}`)
          .attr("x", (d) => xScale(d.DATE_STAMP) + 5)
          .attr("y", (d) => yScale(d.VALUE) - 10);
      })
      .on("mouseout", function (d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text")
          .remove();
      })
      .append("circle")
      .attr("cx", (d) => xScale(d.DATE_STAMP))
      .attr("cy", (d) => yScale(d.VALUE))
      .attr("r", circleRadius)
      .style("opacity", circleOpacity)
      .on("mouseover", function (d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function (d) {
        d3.select(this).transition().duration(duration).attr("r", circleRadius);
      });

    /* Add Axis into SVG */
    var xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSizeInner(tickSizeInner)
      .tickSizeOuter(0)
      .tickFormat(d3.timeFormat("%d %b %H:%M"));
    var yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSizeInner(tickSizeInner)
      .tickSizeOuter(0);

    svg
      .append("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr(
        "transform",
        `translate(${X_posXLeg}, ${X_posYLeg}) rotate(${rotateXLabel})`
      );

    // d3.selectAll("g.x_axis g.tick text").node().remove();
    // d3.selectAll("g.x_axis g.tick line").node().remove();

    d3.selectAll("g.x_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", xGridSize)
      .attr("x2", 0)
      .attr("y2", 0)
      .filter(function (d) {
        return d === 0;
      })
      .remove();

    svg
      .append("g")
      .attr("class", "y_axis")
      .call(yAxis)
      .append("text")
      .attr("y", Y_posYLab)
      .attr("x", Y_posXLab)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Data (BBTU/D)");

    d3.selectAll("g.y_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", yGridSize)
      .attr("y2", 0);
  };

  return (
    <div className="list row">
      <div>
        {/* modal untuk chart */}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">
          <h8 ref={(_subtitle) => (subtitle = _subtitle)}></h8>
          <button onClick={closeModal} style={{backgroundColor: 'red', color: 'white'}}>close</button>
          <div>
          {
            homeDate && homeDate.map((homeDate, i)=>{
              if (i === 0) {
                return(
                  <div id="outer">
                    <div id="inner">
                      <h2 style={{ textAlign: 'center'}}>{homeDate.NAME}</h2>  
                    </div>
                  </div>
                )
              }
              return null
              

            })
          }
          
              <Select onChange={handleChange}
                defaultValue={(
                  headerVal==='C1'?[options[0]]:
                  headerVal==='C2'?[options[1]]:
                  headerVal==='C3'?[options[2]]:
                  headerVal==='C4'?[options[3]]:
                  headerVal==='C5'?[options[4]]:
                  headerVal==='C6'?[options[5]]:
                  headerVal==='C7'?[options[6]]:
                  headerVal==='C8'?[options[7]]:
                  headerVal==='C9'?[options[8]]:
                  headerVal==='N2'?[options[9]]:
                  headerVal==='C02'?[options[10]]:
                  headerVal==='H20'?[options[11]]:
                  headerVal==='GHV'?[options[12]]:
                  headerVal==='VOLUME'?[options[13]]:
                  headerVal==='ENERGY'?[options[14]]:
                  headerVal==='TEMP'?[options[15]]:
                  headerVal==='PRESS'?[options[16]]:
                  [])}
                closeMenuOnSelect={false}
                components={options}
                isMulti
                options={options} 
              />
          <div id="chart2" style={{ width: "650px", float: "right" }}></div>
          </div>
        </Modal>

        <Modal
          // modal untuk filter table
          isOpen={modal2IsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={close2Modal}
          style={customStyles2}
          contentLabel="Example Modal">
          <div>
            <h8 ref={(_subtitle) => (subtitle = _subtitle)}></h8>
            <button onClick={close2Modal}>close</button>
            <table className="table table-striped" {...getTableProps({})}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        style={{
                          borderBottom: "solid 3px red",
                          background: "aliceblue",
                          color: "black",
                          fontWeight: "bold",
                          textAlign: 'center'
                        }}>
                        {column.render("Header")}
                        <div>
                          {column.canFilter ? column.render("Filter") : null}
                        </div>
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: "0px",
                              border: "solid 1px gray",
                            }}>
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}>
                {"<"}
              </button>{" "}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}>
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
      </div>
      {/* {console.log("rendered")} */}
      <div>
        <CSVLink data={homeDate} filename="Data Browser.csv" headers={headers}>
          <button
            type="button"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              textAlign: "center",
            }}>
            Download CSV
          </button>
        </CSVLink>
        <div style={{ textAlign: "right" }}>
          <button onClick={openModal2}><i class="fas fa-filter"></i></button>
          &nbsp;
          &nbsp;
          <input
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <table className="table table-striped" {...getTableProps({})}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderBottom: "solid 3px red",
                      background: "aliceblue",
                      color: "black",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}>
                    <button id={column.render("Header")} onClick={openModal} 
                    style={{
                          background: "aliceblue",
                          color: "black",
                          fontWeight: "bold",
                        }}>
                      {column.render("Header")}
                    </button>
                    {/* <div>{column.canFiltesr ? column.render('Filter') : null}</div> */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "0px",
                          border: "solid 1px gray",
                        }}>
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}>
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
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
