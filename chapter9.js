var dataSet = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

const w = 25 * 22;
const h = 150;
const barPadding = 2;
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