import React, { useState, useEffect, useMemo, useRef } from "react";
import GasComponentDataService from "../services/GasComponentService";
import GasOperationDataService from "../services/GasOperationService";
import GasCoOpDataService from "../services/GasCoOp";
import { Link } from "react-router-dom";
import * as d3 from "d3";

import "react-datepicker/dist/react-datepicker.css";

const Performance = (props) => {
  const [performance, setHome] = useState([]);
  const [performanceDate, setPerformanceDate] = useState([]);

  useEffect(() => {
    getDate("1", convertDate(props.start), convertDate(props.end));
    console.log(performanceDate);
  }, []);

  useEffect(() => {
    if (performanceDate.length > 0) {
      getDate("1", convertDate(props.start), convertDate(props.end));

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

  const getDate = (id, startDate, endDate) => {
    GasCoOpDataService.get(id, startDate, endDate)
      .then((response) => {
        const newJSON = response.data;
        setPerformanceDate(newJSON);

        d3.selectAll("div div svg").remove();
        renderMultiChartVolume(newJSON);
        renderMultiChartEnergy(newJSON);
        renderMultiChartTemperature(newJSON);
        renderMultiChartPressure(newJSON);
        console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderMultiChartVolume = (datas) => {
    //d3.selectAll("div div svg").remove();

    var group_to_values = datas.reduce(function (obj, item) {
      obj[item.ASSET_ID] = obj[item.ASSET_ID] || [];
      obj[item.ASSET_ID].push(item);
      return obj;
    }, {});

    var data = Object.keys(group_to_values).map(function (key) {
      return { name: key, values: group_to_values[key] };
    });
    //console.log(data);
    // var data = [
    //   {
    //     name: "USA",
    //     values: [
    //       { date: "2000", price: "100" },
    //       { date: "2001", price: "110" },
    //       { date: "2002", price: "145" },
    //       { date: "2003", price: "241" },
    //       { date: "2004", price: "101" },
    //       { date: "2005", price: "90" },
    //       { date: "2006", price: "10" },
    //       { date: "2007", price: "35" },
    //       { date: "2008", price: "21" },
    //       { date: "2009", price: "201" },
    //     ],
    //   },
    //   {
    //     name: "Canada",
    //     values: [
    //       { date: "2000", price: "200" },
    //       { date: "2001", price: "120" },
    //       { date: "2002", price: "33" },
    //       { date: "2003", price: "21" },
    //       { date: "2004", price: "51" },
    //       { date: "2005", price: "190" },
    //       { date: "2006", price: "120" },
    //       { date: "2007", price: "85" },
    //       { date: "2008", price: "221" },
    //       { date: "2009", price: "101" },
    //     ],
    //   },
    //   {
    //     name: "Maxico",
    //     values: [
    //       { date: "2000", price: "50" },
    //       { date: "2001", price: "10" },
    //       { date: "2002", price: "5" },
    //       { date: "2003", price: "71" },
    //       { date: "2004", price: "20" },
    //       { date: "2005", price: "9" },
    //       { date: "2006", price: "220" },
    //       { date: "2007", price: "235" },
    //       { date: "2008", price: "61" },
    //       { date: "2009", price: "10" },
    //     ],
    //   },
    // ];

    var width = 600;
    var height = 300;
    var margin = 50;
    var duration = 250;

    // var lineOpacity = "0.25";
    // var lineOpacityHover = "0.85";
    // var otherLinesOpacityHover = "0.1";
    // var lineStroke = "1.5px";
    // var lineStrokeHover = "2.5px";

    var lineOpacity = "0.90";
    var lineOpacityHover = "1";
    var otherLinesOpacityHover = "1";
    var lineStroke = "5px";
    var lineStrokeHover = "8px";

    var circleOpacity = "0.85";
    var circleOpacityOnLineHover = "0.25";
    var circleRadius = 1;
    var circleRadiusHover = 6;

    /* Format Data */
    //var parseDate = d3.timeParse("%YYYY-%MM-%DD %hh:%mm:%ss");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H:%M:%S");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        //d.DATE_STAMP = parseDate(new Date(d.DATE_STAMP));
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        d.VOLUME_RATE = +d.VOLUME_RATE;
      });
    });

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, (d) => d.VOLUME_RATE)])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3
      .select("#chart1")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    var line = d3
      .line()
      .x((d) => xScale(d.DATE_STAMP))
      .y((d) => yScale(d.VOLUME_RATE));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 4)
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
          .text(`${d.VOLUME_RATE}`)
          .attr("x", (d) => xScale(d.DATE_STAMP) + 5)
          .attr("y", (d) => yScale(d.VOLUME_RATE) - 10);
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
      .attr("cy", (d) => yScale(d.VOLUME_RATE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      //.outerTickSize(0)
      //.ticks(10)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", -30)
      .attr("x", -90)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Volume (BBTU/D)");
  };

  const renderMultiChartEnergy = (datas) => {
    //d3.selectAll("div div svg").remove();

    var group_to_values = datas.reduce(function (obj, item) {
      obj[item.ASSET_ID] = obj[item.ASSET_ID] || [];
      obj[item.ASSET_ID].push(item);
      return obj;
    }, {});

    var data = Object.keys(group_to_values).map(function (key) {
      return { name: key, values: group_to_values[key] };
    });
    //console.log(data);
    // var data = [
    //   {
    //     name: "USA",
    //     values: [
    //       { date: "2000", price: "100" },
    //       { date: "2001", price: "110" },
    //       { date: "2002", price: "145" },
    //       { date: "2003", price: "241" },
    //       { date: "2004", price: "101" },
    //       { date: "2005", price: "90" },
    //       { date: "2006", price: "10" },
    //       { date: "2007", price: "35" },
    //       { date: "2008", price: "21" },
    //       { date: "2009", price: "201" },
    //     ],
    //   },
    //   {
    //     name: "Canada",
    //     values: [
    //       { date: "2000", price: "200" },
    //       { date: "2001", price: "120" },
    //       { date: "2002", price: "33" },
    //       { date: "2003", price: "21" },
    //       { date: "2004", price: "51" },
    //       { date: "2005", price: "190" },
    //       { date: "2006", price: "120" },
    //       { date: "2007", price: "85" },
    //       { date: "2008", price: "221" },
    //       { date: "2009", price: "101" },
    //     ],
    //   },
    //   {
    //     name: "Maxico",
    //     values: [
    //       { date: "2000", price: "50" },
    //       { date: "2001", price: "10" },
    //       { date: "2002", price: "5" },
    //       { date: "2003", price: "71" },
    //       { date: "2004", price: "20" },
    //       { date: "2005", price: "9" },
    //       { date: "2006", price: "220" },
    //       { date: "2007", price: "235" },
    //       { date: "2008", price: "61" },
    //       { date: "2009", price: "10" },
    //     ],
    //   },
    // ];

    var width = 600;
    var height = 300;
    var margin = 50;
    var duration = 250;

    // var lineOpacity = "0.25";
    // var lineOpacityHover = "0.85";
    // var otherLinesOpacityHover = "0.1";
    // var lineStroke = "1.5px";
    // var lineStrokeHover = "2.5px";

    var lineOpacity = "0.90";
    var lineOpacityHover = "1";
    var otherLinesOpacityHover = "1";
    var lineStroke = "5px";
    var lineStrokeHover = "8px";

    var circleOpacity = "0.85";
    var circleOpacityOnLineHover = "0.25";
    var circleRadius = 1;
    var circleRadiusHover = 6;

    /* Format Data */
    //var parseDate = d3.timeParse("%YYYY-%MM-%DD %hh:%mm:%ss");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H:%M:%S");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        //d.DATE_STAMP = parseDate(new Date(d.DATE_STAMP));
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        d.ENERGY_RATE = +d.ENERGY_RATE;
      });
    });

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, (d) => d.ENERGY_RATE)])
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
      .y((d) => yScale(d.ENERGY_RATE));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 4)
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
          .text(`${d.ENERGY_RATE}`)
          .attr("x", (d) => xScale(d.DATE_STAMP) + 5)
          .attr("y", (d) => yScale(d.ENERGY_RATE) - 10);
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
      .attr("cy", (d) => yScale(d.ENERGY_RATE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      //.outerTickSize(0)
      //.ticks(10)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", -30)
      .attr("x", -90)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Energy (MMSCFD)");
  };

  const renderMultiChartTemperature = (datas) => {
    //d3.selectAll("div div svg").remove();

    var group_to_values = datas.reduce(function (obj, item) {
      obj[item.ASSET_ID] = obj[item.ASSET_ID] || [];
      obj[item.ASSET_ID].push(item);
      return obj;
    }, {});

    var data = Object.keys(group_to_values).map(function (key) {
      return { name: key, values: group_to_values[key] };
    });
    //console.log(data);
    // var data = [
    //   {
    //     name: "USA",
    //     values: [
    //       { date: "2000", price: "100" },
    //       { date: "2001", price: "110" },
    //       { date: "2002", price: "145" },
    //       { date: "2003", price: "241" },
    //       { date: "2004", price: "101" },
    //       { date: "2005", price: "90" },
    //       { date: "2006", price: "10" },
    //       { date: "2007", price: "35" },
    //       { date: "2008", price: "21" },
    //       { date: "2009", price: "201" },
    //     ],
    //   },
    //   {
    //     name: "Canada",
    //     values: [
    //       { date: "2000", price: "200" },
    //       { date: "2001", price: "120" },
    //       { date: "2002", price: "33" },
    //       { date: "2003", price: "21" },
    //       { date: "2004", price: "51" },
    //       { date: "2005", price: "190" },
    //       { date: "2006", price: "120" },
    //       { date: "2007", price: "85" },
    //       { date: "2008", price: "221" },
    //       { date: "2009", price: "101" },
    //     ],
    //   },
    //   {
    //     name: "Maxico",
    //     values: [
    //       { date: "2000", price: "50" },
    //       { date: "2001", price: "10" },
    //       { date: "2002", price: "5" },
    //       { date: "2003", price: "71" },
    //       { date: "2004", price: "20" },
    //       { date: "2005", price: "9" },
    //       { date: "2006", price: "220" },
    //       { date: "2007", price: "235" },
    //       { date: "2008", price: "61" },
    //       { date: "2009", price: "10" },
    //     ],
    //   },
    // ];

    var width = 600;
    var height = 300;
    var margin = 50;
    var duration = 250;

    // var lineOpacity = "0.25";
    // var lineOpacityHover = "0.85";
    // var otherLinesOpacityHover = "0.1";
    // var lineStroke = "1.5px";
    // var lineStrokeHover = "2.5px";

    var lineOpacity = "0.90";
    var lineOpacityHover = "1";
    var otherLinesOpacityHover = "1";
    var lineStroke = "5px";
    var lineStrokeHover = "8px";

    var circleOpacity = "0.85";
    var circleOpacityOnLineHover = "0.25";
    var circleRadius = 1;
    var circleRadiusHover = 6;

    /* Format Data */
    //var parseDate = d3.timeParse("%YYYY-%MM-%DD %hh:%mm:%ss");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H:%M:%S");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        //d.DATE_STAMP = parseDate(new Date(d.DATE_STAMP));
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        d.TEMPERATURE = +d.TEMPERATURE;
      });
    });

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, (d) => d.TEMPERATURE)])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3
      .select("#chart3")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    var line = d3
      .line()
      .x((d) => xScale(d.DATE_STAMP))
      .y((d) => yScale(d.TEMPERATURE));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 4)
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
          .text(`${d.TEMPERATURE}`)
          .attr("x", (d) => xScale(d.DATE_STAMP) + 5)
          .attr("y", (d) => yScale(d.TEMPERATURE) - 10);
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
      .attr("cy", (d) => yScale(d.TEMPERATURE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      //.outerTickSize(0)
      //.ticks(10)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", -30)
      .attr("x", -90)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Temperature (Deg F)");
  };

  const renderMultiChartPressure = (datas) => {
    //d3.selectAll("div div svg").remove();

    var group_to_values = datas.reduce(function (obj, item) {
      obj[item.ASSET_ID] = obj[item.ASSET_ID] || [];
      obj[item.ASSET_ID].push(item);
      return obj;
    }, {});

    var data = Object.keys(group_to_values).map(function (key) {
      return { name: key, values: group_to_values[key] };
    });
    //console.log(data);
    // var data = [
    //   {
    //     name: "USA",
    //     values: [
    //       { date: "2000", price: "100" },
    //       { date: "2001", price: "110" },
    //       { date: "2002", price: "145" },
    //       { date: "2003", price: "241" },
    //       { date: "2004", price: "101" },
    //       { date: "2005", price: "90" },
    //       { date: "2006", price: "10" },
    //       { date: "2007", price: "35" },
    //       { date: "2008", price: "21" },
    //       { date: "2009", price: "201" },
    //     ],
    //   },
    //   {
    //     name: "Canada",
    //     values: [
    //       { date: "2000", price: "200" },
    //       { date: "2001", price: "120" },
    //       { date: "2002", price: "33" },
    //       { date: "2003", price: "21" },
    //       { date: "2004", price: "51" },
    //       { date: "2005", price: "190" },
    //       { date: "2006", price: "120" },
    //       { date: "2007", price: "85" },
    //       { date: "2008", price: "221" },
    //       { date: "2009", price: "101" },
    //     ],
    //   },
    //   {
    //     name: "Maxico",
    //     values: [
    //       { date: "2000", price: "50" },
    //       { date: "2001", price: "10" },
    //       { date: "2002", price: "5" },
    //       { date: "2003", price: "71" },
    //       { date: "2004", price: "20" },
    //       { date: "2005", price: "9" },
    //       { date: "2006", price: "220" },
    //       { date: "2007", price: "235" },
    //       { date: "2008", price: "61" },
    //       { date: "2009", price: "10" },
    //     ],
    //   },
    // ];

    var width = 600;
    var height = 300;
    var margin = 50;
    var duration = 250;

    // var lineOpacity = "0.25";
    // var lineOpacityHover = "0.85";
    // var otherLinesOpacityHover = "0.1";
    // var lineStroke = "1.5px";
    // var lineStrokeHover = "2.5px";

    var lineOpacity = "0.90";
    var lineOpacityHover = "1";
    var otherLinesOpacityHover = "1";
    var lineStroke = "5px";
    var lineStrokeHover = "8px";

    var circleOpacity = "0.85";
    var circleOpacityOnLineHover = "0.25";
    var circleRadius = 1;
    var circleRadiusHover = 6;

    /* Format Data */
    //var parseDate = d3.timeParse("%YYYY-%MM-%DD %hh:%mm:%ss");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H:%M:%S");
    //var parseDate = d3.timeFormat("%Y-%m-%d %H");
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        //d.DATE_STAMP = parseDate(new Date(d.DATE_STAMP));
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        //d.DATE_STAMP = parseDate(d.DATE_STAMP);
        d.PRESSURE = +d.PRESSURE;
      });
    });

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[0].values, (d) => d.PRESSURE)])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3
      .select("#chart4")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    var line = d3
      .line()
      .x((d) => xScale(d.DATE_STAMP))
      .y((d) => yScale(d.PRESSURE));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 4)
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
          .text(`${d.PRESSURE}`)
          .attr("x", (d) => xScale(d.DATE_STAMP) + 5)
          .attr("y", (d) => yScale(d.PRESSURE) - 10);
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
      .attr("cy", (d) => yScale(d.PRESSURE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      //.outerTickSize(0)
      //.ticks(10)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", -30)
      .attr("x", -90)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Pressure (Psig)");
  };

  return (
    <div className="list row">
      <div id="chart1" style={{ width: "800px", float: "left" }}></div>
      <div id="chart2" style={{ width: "800px", float: "right" }}></div>
      <div id="chart3" style={{ width: "800px", float: "left" }}></div>
      <div id="chart4" style={{ width: "800px", float: "right" }}></div>
    </div>
  );
};

export default Performance;
