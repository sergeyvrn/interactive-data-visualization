var dataSet = [];
for (var i = 0; i < 25; i++) {
    var newNumber = Math.floor(Math.random() * 25);
    dataSet.push(newNumber);
}

//noinspection ES6ModulesDependencies
d3.select("body")
    .append("div")
    .selectAll("div")
    .data(dataSet).enter()
    .append("div")
    .attr("class", "bar")
    .style("height", function (d) {
        const barHeight = d * 5;
        return barHeight + "px"
    });

const w = 25 * 22;
const h = 150;
const barPadding = 2;
//noinspection JSUnusedGlobalSymbols
const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr({
        x: (d, i) => i * (w / dataSet.length),
        y: d => h - (d * 4),
        width: w / dataSet.length - barPadding,
        height: d => d * 4,
        fill: d => "rgb(0, 0, " + (d * 10) + ")"
    });
svg.selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .text(d => d)
    .attr({
        x: (d, i) => i * (w / dataSet.length) + 10,
        y: d => h - (d * 4) + 14,
        "font-family": "sans-serif",
        "font-size": "11px",
        fill: "white",
        "text-anchor": "middle"
    });