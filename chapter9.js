d3 = d3 || {};

var dataSet = [
    {key: 0, value: 5},
    {key: 1, value: 10},
    {key: 2, value: 13},
    {key: 3, value: 19},
    {key: 4, value: 21},
    {key: 5, value: 25},
    {key: 6, value: 22},
    {key: 7, value: 18},
    {key: 8, value: 15},
    {key: 9, value: 13},
    {key: 10, value: 11},
    {key: 11, value: 12},
    {key: 12, value: 15},
    {key: 13, value: 20},
    {key: 14, value: 18},
    {key: 15, value: 17},
    {key: 16, value: 16},
    {key: 17, value: 18},
    {key: 18, value: 23},
    {key: 19, value: 25}
];

const w = 600;
const h = 250;

//noinspection ES6ModulesDependencies
const xScale = d3.scale.ordinal()
    .domain(d3.range(dataSet.length))
    .rangeRoundBands([0, w], 0.05);

const yScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d.value)])
    .range([0, h]);

const colorScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d.value)])
    .rangeRound([0, 255]);

const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr({
        x: (d, i) => xScale(i),
        y: d => h - yScale(d.value),
        width: xScale.rangeBand(),
        height: d => yScale(d.value),
        fill: d => "rgb(0, 0, " + (d.value * 10) + ")"
    });
svg.selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .text(d => d.value)
    .attr({
        x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
        y: d => h - yScale(d.value) + 14,
        "font-family": "sans-serif",
        "font-size": "11px",
        fill: "white",
        "text-anchor": "middle"
    });

const maxValue = 25;
function newNumber() {
    return {
        key: d3.max(dataSet, d => d.key) + 1,
        value: Math.floor(Math.random() * maxValue)
    }
}

d3.select("#update")
    .on("click", () => {
        dataSet = dataSet.map(newNumber);

        yScale.domain([0, d3.max(dataSet, d => d.value)]);
        colorScale.domain([0, d3.max(dataSet, d => d.value)]);

        svg.selectAll("rect")
            .data(dataSet)
            .transition()
            .delay((d, i) => i / dataSet.length * 1000)
            .duration(500)
            .ease("linear")
            .attr({
                x: (d, i) => xScale(i),
                y: d => h - yScale(d.value),
                width: xScale.rangeBand(),
                height: d => yScale(d.value),
                fill: d => "rgb(0, 0, " + colorScale(d.value) + ")"
            });
        svg.selectAll("text")
            .data(dataSet)
            .transition()
            .delay((d, i) => i / dataSet.length * 1000)
            .duration(500)
            .ease("linear")
            .attr({
                x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
                y: d => h - yScale(d.value) + 14
            });
    });

const addDuration = 500;
d3.select("#add")
    .on("click", () => {
        dataSet.push(newNumber());
        xScale.domain(d3.range((dataSet.length)));
        yScale.domain([0, d3.max(dataSet, d => d.value)]);

        const bars = svg.selectAll("rect").data(dataSet);
        bars.enter()
            .append("rect")
            .attr({
                x: w,
                y: d => h - yScale(d.value),
                width: xScale.rangeBand(),
                height: d => yScale(d.value),
                fill: d => "rgb(0, 0, " + colorScale(d.value) + ")"
            });
        bars.transition().duration(addDuration)
            .attr({
                x: (d, i) => xScale(i),
                width: xScale.rangeBand()
            });

        const labels = svg.selectAll("text").data(dataSet);
        labels.enter().append("text").text(d => d.value).attr({
            x: w + xScale.rangeBand() / 2,
            y: d => h - yScale(d.value) + 14,
            "font-family": "sans-serif",
            "font-size": "11px",
            fill: "white",
            "text-anchor": "middle"
        });
        labels.transition().duration(addDuration).attr({
            x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
            y: d => h - yScale(d.value) + 14
        })
    });

const removeDuration = 500;
d3.select("#remove")
    .on("click", () => {
        dataSet.shift();
        svg.selectAll("rect").data(dataSet, d => d.key).exit()
            .transition().duration(removeDuration)
            .attr("x", -xScale.rangeBand())
            .remove();
        svg.selectAll("text").data(dataSet, d => d.key).exit()
            .transition().duration(removeDuration)
            .attr("x", -xScale.rangeBand() / 2)
            .remove();
    });