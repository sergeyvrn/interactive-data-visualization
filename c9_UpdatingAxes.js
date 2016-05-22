d3 = d3 || {};

const h = 300;
const w = 500;
const padding = 30;

const svg = d3.select("body")
    .append("svg")
    .attr({
        width: w,
        height: h
    });

function generateDataSet() {
    var result = [];
    var numDataPoints = 50;
    var xRange = Math.random() * 1000;
    var yRange = Math.random() * 1000;
    for (var i = 0; i < numDataPoints; i++) {
        var newNumber1 = Math.floor(Math.random() * xRange);
        var newNumber2 = Math.floor(Math.random() * yRange);
        result.push([newNumber1, newNumber2]);
    }
    return result;
}

var dataSet = generateDataSet();
const xScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d[0])])
    .range([padding, w - padding * 2]);
const yScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d[1])])
    .range([h - padding, padding]);

const xAxis = d3.svg.axis()
    .scale(xScale)
    .ticks(5)
    .orient("bottom");

const yAxis = d3.svg.axis()
    .scale(yScale)
    .ticks(5)
    .orient("left");

svg.append("g")
    .attr({
        class: "x axis",
        transform: "translate(0," + (h - padding) + ")"
    })
    .call(xAxis);

svg.append("g")
    .attr({
        class: "y axis",
        transform: "translate(" + padding + ",0)"
    })
    .call(yAxis);

svg.selectAll("circle")
    .data(dataSet).enter()
    .append("circle")
    .attr({
        cx: d => xScale(d[0]),
        cy: d => yScale(d[1]),
        r: 2
    });

d3.select("p")
    .on("click", () => {
        dataSet = generateDataSet();

        xScale.domain([0, d3.max(dataSet, d => d[0])]);
        yScale.domain([0, d3.max(dataSet, d => d[1])]);

        svg.selectAll("circle")
            .data(dataSet)
            .transition().duration(1000)
            .attr({
                cx: d => xScale(d[0]),
                cy: d => yScale(d[1])
            });

        svg.select(".x.axis")
            .transition().duration(1000)
            .call(xAxis);
        svg.select(".y.axis")
            .transition().duration(1000)
            .call(yAxis);
    });
