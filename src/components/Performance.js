
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import GasCoOpDataService from "../services/GasCoOp";
import * as d3 from "d3";
import "../index.css";
import "react-datepicker/dist/react-datepicker.css";


const Performance = (props) => {
  const [performanceDate, setPerformanceDate] = useState([]);

  useEffect(() => {

    get(props.id, convertDate(props.start), convertDate(props.end));


  }, []);

  useEffect(() => {
    if (performanceDate.length > 0) {
      get(props.id, convertDate(props.start), convertDate(props.end));

      //console.log("didUpdate");
    }
  }, [props.id, props.start, props.end]);

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

  const get = (id, startDate, endDate) => {
    GasCoOpDataService.get(id, startDate, endDate)
      .then((response) => {
        const newJSON = response.data;
        setPerformanceDate(newJSON);

        d3.selectAll("div div svg").remove();
        renderMultiChartVolume(newJSON);
        renderMultiChartEnergy(newJSON);
        renderMultiChartTemperature(newJSON);
        renderMultiChartPressure(newJSON);
        // console.log(newJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // function tick (data) 
  // {
  //   let totalTick = Math.ceil(data[0].values.length)
  //   let total = 0;
  //   if(totalTick < 10)
  //   {
  //     total = 3;
  //     return total 
  //   }
  //   if(totalTick >= 10 && totalTick < 100)
  //   {
  //     total = 5;
  //     return total 
  //   }
  //   if(totalTick >= 100)
  //   {
  //     total = 8;
  //     return total 
  //   }
      
  // }

  // function yDomainMax (data) 
  // {
  //   let totalTick = Math.ceil(data[0].values.length * 0.25)
    
  //     return totalTick
  
  // }

  // definition var for line chart

  var width = 600;
  var height = 300;
  var margin = 50;
  var marginBotDomain = 0.8;
  var marginTopDomain = 1.2;
  var botDomain = 10;
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
//////////////////////////////////////////////////////// VOLUME /////////////////////////////////////////////////////////////////////////////////////////
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
   

    /* Format Data */
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        d.VOLUME_RATE = +d.VOLUME_RATE;
      });
    });
    
    // var total_tick = tick(data);

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin])
      
    var yScale = d3
      .scaleLinear()
      .domain([d3.min(data[0].values, (d) => d.VOLUME_RATE) * marginBotDomain - botDomain, d3.max(data[0].values, (d) => d.VOLUME_RATE) * marginTopDomain])
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
      .y((d) => yScale(d.VOLUME_RATE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0).tickFormat(d3.timeFormat("%d %b %H:%M"));
    var yAxis = d3.axisLeft(yScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0) ;
    
    
    svg
      .append("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", `translate(${X_posXLeg}, ${X_posYLeg}) rotate(${rotateXLabel})`);
      
    // d3.selectAll("g.x_axis g.tick text").node().remove();
    // d3.selectAll("g.x_axis g.tick line").node().remove();

    d3.selectAll("g.x_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", xGridSize)
      .attr("x2", 0)
      .attr("y2", 0)
      .filter(function (d) { return d === 0;  }).remove();
    
    svg
      .append("g")
      .attr("class", "y_axis")
      .call(yAxis)
      .append("text")
      .attr("y", Y_posYLab)
      .attr("x", Y_posXLab)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Volume (BBTU/D)");
    
    d3.selectAll("g.y_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", yGridSize)
      .attr("y2", 0);
      
  };
//////////////////////////////////////////////////////// ENERGY /////////////////////////////////////////////////////////////////////////////////////////
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
   

    /* Format Data */
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        d.ENERGY_RATE = +d.ENERGY_RATE;
      });
    });
    
    // var total_tick = tick(data);

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin])
      
    var yScale = d3
      .scaleLinear()
      .domain([d3.min(data[0].values, (d) => d.ENERGY_RATE) * marginBotDomain - botDomain, d3.max(data[0].values, (d) => d.ENERGY_RATE) * marginTopDomain])
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
      .y((d) => yScale(d.ENERGY_RATE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0).tickFormat(d3.timeFormat("%d %b %H:%M"));
    var yAxis = d3.axisLeft(yScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0) ;
    
    
    svg
      .append("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", `translate(${X_posXLeg}, ${X_posYLeg}) rotate(${rotateXLabel})`);
      
    // d3.selectAll("g.x_axis g.tick text").node().remove();
    // d3.selectAll("g.x_axis g.tick line").node().remove();

    d3.selectAll("g.x_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", xGridSize)
      .attr("x2", 0)
      .attr("y2", 0)
      .filter(function (d) { return d === 0;  }).remove();
    
    
    svg
      .append("g")
      .attr("class", "y_axis")
      .call(yAxis)
      .append("text")
      .attr("y", Y_posYLab)
      .attr("x", Y_posXLab)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Energy (MMSCFD)");
    
    d3.selectAll("g.y_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", yGridSize)
      .attr("y2", 0);
  };
//////////////////////////////////////////////////////// TEMPERATURE /////////////////////////////////////////////////////////////////////////////////////////
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
   

    /* Format Data */
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        d.TEMPERATURE = +d.TEMPERATURE;
      });
    });
    
    // var total_tick = tick(data);
    
    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin])
      
    var yScale = d3
      .scaleLinear()
      .domain([d3.min(data[0].values, (d) => d.TEMPERATURE) * marginBotDomain - botDomain, d3.max(data[0].values, (d) => d.TEMPERATURE) * marginTopDomain])
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
      .y((d) => yScale(d.TEMPERATURE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0).tickFormat(d3.timeFormat("%d %b %H:%M"));
    var yAxis = d3.axisLeft(yScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0) ;
    
    
    svg
      .append("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", `translate(${X_posXLeg}, ${X_posYLeg}) rotate(${rotateXLabel})`);
      
    // d3.selectAll("g.x_axis g.tick text").node().remove();
    // d3.selectAll("g.x_axis g.tick line").node().remove();

    d3.selectAll("g.x_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", xGridSize)
      .attr("x2", 0)
      .attr("y2", 0)
      .filter(function (d) { return d === 0;  }).remove();
    
    
    svg
      .append("g")
      .attr("class", "y_axis")
      .call(yAxis)
      .append("text")
      .attr("y", Y_posYLab)
      .attr("x", Y_posXLab)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Temperature (Deg F)");
    
    d3.selectAll("g.y_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", yGridSize)
      .attr("y2", 0);
      
  };
//////////////////////////////////////////////////////// PRESSURE /////////////////////////////////////////////////////////////////////////////////////////
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
   

    /* Format Data */
    data.forEach(function (d) {
      d.values.forEach(function (d) {
        d.DATE_STAMP = new Date(d.DATE_STAMP);
        d.PRESSURE = +d.PRESSURE;
      });
    });
    
    // var total_tick = tick(data);

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, (d) => d.DATE_STAMP))
      .range([0, width - margin])
      
    var yScale = d3
      .scaleLinear()
      .domain([d3.min(data[0].values, (d) => d.PRESSURE) * marginBotDomain - botDomain, d3.max(data[0].values, (d) => d.PRESSURE) * marginTopDomain])
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
      .y((d) => yScale(d.PRESSURE))
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
    var xAxis = d3.axisBottom(xScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0).tickFormat(d3.timeFormat("%d %b %H:%M"));
    var yAxis = d3.axisLeft(yScale).ticks(5).tickSizeInner(tickSizeInner).tickSizeOuter(0) ;
    
    
    svg
      .append("g")
      .attr("class", "x_axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", `translate(${X_posXLeg}, ${X_posYLeg}) rotate(${rotateXLabel})`);
      
    // d3.selectAll("g.x_axis g.tick text").node().remove();
    // d3.selectAll("g.x_axis g.tick line").node().remove();

    d3.selectAll("g.x_axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", xGridSize)
      .attr("x2", 0)
      .attr("y2", 0)
      .filter(function (d) { return d === 0;  }).remove();
    
    
    svg
      .append("g")
      .attr("class", "y_axis")
      .call(yAxis)
      .append("text")
      .attr("y", Y_posYLab)
      .attr("x", Y_posXLab)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Pressure (Psig)");
    
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

      {
        performanceDate && performanceDate.map((performanceDate, i)=>{
          if (i === 0) {
            return(
              <div id="outer">
                <div id="inner">
                  <h2 style={{ textAlign: 'center'}}>Performance {performanceDate.NAME}</h2>  
                </div>
              </div>
            )
          }
          

        })
      }
      

     
      <div id="chart1" style={{ width: "800px", float: "left" }}></div>
      <div id="chart2" style={{ width: "800px", float: "right" }}></div>
      <div id="chart3" style={{ width: "800px", float: "left" }}></div>
      <div id="chart4" style={{ width: "800px", float: "right" }}></div>
    </div>
  );
};

export default Performance;