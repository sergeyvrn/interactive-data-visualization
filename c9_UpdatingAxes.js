d3 = d3 || {};

var dataSet = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.floor(Math.random() * xRange);
    var newNumber2 = Math.floor(Math.random() * yRange);
    dataSet.push([newNumber1, newNumber2]);
}

const h = 300;
const w = 500;
const padding = 30;

const xScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d[0])])
    .range([padding, w - padding * 2]);
const yScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d[1])])
    .range([h - padding, padding]);
const rScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d[1])])
    .range([2, 5]);

const svg = d3.select("body")
    .append("svg")
    .attr({
        width: w,
        height: h
    });
svg.selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle")
    .attr({
        cx: d => xScale(d[0]),
        cy: d => yScale(d[1]),
        r: d => rScale(d[1])
    });

const xAxis = d3.svg.axis()
    .scale(xScale)
    .ticks(5)
    .orient("bottom");

svg.append("g")
    .attr({
        class: "axis",
        transform: "translate(0," + (h - padding) + ")"
    })
    .call(xAxis);

const yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(5)
    .orient("left");
svg.append("g")
    .attr({
        class: "axis",
        transform: "translate(" + padding + ",0)"
    })
    .call(yAxis);