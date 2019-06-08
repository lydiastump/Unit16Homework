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

d3.csv("data.csv", function(error, data){
    if (error) return console.warn(error);

    console.log(data);

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
        .data(healthcare)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", d => yScale(d))
        .attr("r", "5")
        .attr("fill", "lightblue")
    
    var text = chartGroup.selectAll("text")
        .data(healthcare)
        .enter()
        .append ("text")

    var textLabels = text
        .attr("x", function(d) {return d.cx; })
        .attr("y", function(d) {return d.cy; })
        .text(function(d) {return "( " + d.cx + ", " + d.cy +" )";})
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "white");
})