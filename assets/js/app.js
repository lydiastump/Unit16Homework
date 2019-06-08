// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

var chartGroup2 = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

var xaxis = "poverty";
var yaxis = "healthcare";

d3.csv("assets/data/data.csv", function(data){
   

    data.forEach(function(respose){
        response.healthcare = +response.healthcare;
        response.poverty = +response.poverty;
    

    });

    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty))
        .range([0, svgWidth]);

    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.healthcare))
        .range([0, svgWidth]);
    var bottomAxis = d3.axisBottom(xScale)
    var leftAxis = d3.axisLeft(yScale)
    
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)
    chartGroup.append("g")
        .call(leftAxis);
    
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .classed("xaxis text", true)
        .text("In Poverty (%)")

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
        .classed("yaxis text", true)
        .text("Healthcare")
        
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d[xaxis]))
        .attr("cy", d => yScale(d[yaxis]))
        .attr("r", "5")
        .attr("fill", "lightblue")
    
    var text = chartGroup2.selectAll("text")
        .data(data)
        .enter()
        .append ("text")
        .attr("x", d => xScale(d[xaxis]))
        .attr("y", d => yScale(d[yaxis]))
        .text(d => d.abbr)
        .style("text-anchor", "middle")
        .attr("font-size", 9);

   
})