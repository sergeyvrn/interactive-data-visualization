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
const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

const maxValue = 25;
function newData() {
    return {
        key: d3.max(dataSet, d => d.key) + 1,
        value: Math.floor(Math.random() * maxValue)
    }
}

const xScale = d3.scale.ordinal()
    .domain(d3.range(dataSet.length))
    .rangeRoundBands([0, w], 0.05);

const yScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d.value)])
    .range([0, h]);

const colorScale = d3.scale.linear()
    .domain([0, d3.max(dataSet, d => d.value)])
    .rangeRound([0, 255]);

function redraw(delay, duration) {
    delay = delay || 0;
    duration = duration || 0;

    xScale.domain(d3.range(dataSet.length));
    yScale.domain([0, d3.max(dataSet, d => d.value)]);
    colorScale.domain([0, d3.max(dataSet, d => d.value)]);

    const bars = svg.selectAll("rect").data(dataSet, d => d.key);
    bars.enter()
        .append("rect")
        .attr({
            x: w,
            y: d => h - yScale(d.value),
            width: xScale.rangeBand(),
            height: d => yScale(d.value),
            fill: d => "rgb(0, 0, " + colorScale(d.value) + ")"
        })
        .on("mouseover", function () {
            d3.select(this)
                .attr({
                    fill: "orange"
                })
        })
        .on("mouseout", function () {
            d3.select(this)
            // .transition().duration(250)
                .attr({
                    fill: d => "rgb(0, 0, " + colorScale(d.value) + ")"
                })
        });
    bars.transition().delay(delay).duration(duration).attr({
        x: (d, i) => xScale(i),
        y: d => h - yScale(d.value),
        width: xScale.rangeBand(),
        height: d => yScale(d.value),
        fill: d => "rgb(0, 0, " + colorScale(d.value) + ")"
    });
    bars.exit()
        .transition().duration(duration)
        .attr({
            x: -xScale.rangeBand(),
            y: d => h - yScale(d.value),
            width: xScale.rangeBand(),
            height: d => yScale(d.value),
            fill: d => "rgb(0, 0, " + colorScale(d.value) + ")"
        })
        .remove();


    const labels = svg.selectAll("text").data(dataSet, d => d.key);
    labels.enter()
        .append("text")
        .text(d => d.value)
        .style("pointer-events", "none")
        .attr({
            x: w + xScale.rangeBand() / 2,
            y: d => h - yScale(d.value) + 14,
            "font-family": "sans-serif",
            "font-size": "11px",
            fill: "white",
            "text-anchor": "middle"
        });
    labels.transition().delay(delay).duration(duration).text(d => d.value).attr({
        x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
        y: d => h - yScale(d.value) + 14
    });
    labels.exit()
        .transition().duration(duration)
        .attr("x", -xScale.rangeBand() / 2)
        .remove();
}

redraw();

var isAscendingSort = false;
d3.selectAll("input")
    .on("click", function () {
        let delay;
        switch (d3.select(this).attr("id")) {
            case "update":
                dataSet = dataSet.map(d => {
                    d.value = Math.floor(Math.random() * maxValue);
                    return d;
                });
                delay = (d, i) => i / dataSet.length * 1000;
                break;
            case "add":
                dataSet.push(newData());
                break;
            case "remove":
                dataSet.shift();
                break;
            case "sort":
                dataSet = dataSet.sort((a, b) =>
                    isAscendingSort
                        ? d3.ascending(a.value, b.value)
                        : d3.descending(a.value, b.value));
                delay = (d, i) => i / dataSet.length * 500;
                isAscendingSort = !isAscendingSort;
                break;
        }
        redraw(delay, 500);

    });