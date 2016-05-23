d3 = d3 || {};

const w = 800;
const h = 300;
const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

const projection = d3.geo.albersUsa()
    .translate([w / 2, h / 2])
    .scale([500]);
const path = d3.geo.path()
    .projection(projection);

d3.json("us-states.json", (json) => {
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr({
            d: path
        })
});
