d3 = d3 || {};

var dataSet = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
    11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

const w = 600;
const h = 250;

//noinspection ES6ModulesDependencies
const xScale = d3.scale.ordinal()
    .domain(d3.range(dataSet.length))
    .rangeRoundBands([0, w], 0.05);

const yScale = d3.scale.linear()
    .domain([0, d3.max(dataSet)])
    .range([0, h]);

const colorScale = d3.scale.linear()
    .domain([0, d3.max(dataSet)])
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
        y: d => h - yScale(d),
        width: xScale.rangeBand(),
        height: d => yScale(d),
        fill: d => "rgb(0, 0, " + (d * 10) + ")"
    });
svg.selectAll("text")
    .data(dataSet)
    .enter()
    .append("text")
    .text(d => d)
    .attr({
        x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
        y: d => h - yScale(d) + 14,
        "font-family": "sans-serif",
        "font-size": "11px",
        fill: "white",
        "text-anchor": "middle"
    });

const maxValue = 25;
function newNumber() {
    return Math.floor(Math.random() * maxValue);
}

d3.select("#update")
    .on("click", () => {
        dataSet = dataSet.map(newNumber);

        yScale.domain([0, d3.max(dataSet)]);
        colorScale.domain([0, d3.max(dataSet)]);

        svg.selectAll("rect")
            .data(dataSet)
            .transition()
            .delay((d, i) => i / dataSet.length * 1000)
            .duration(500)
            .ease("linear")
            .attr({
                x: (d, i) => xScale(i),
                y: d => h - yScale(d),
                width: xScale.rangeBand(),
                height: d => yScale(d),
                fill: d => "rgb(0, 0, " + colorScale(d) + ")"
            });
        svg.selectAll("text")
            .data(dataSet)
            .transition()
            .delay((d, i) => i / dataSet.length * 1000)
            .duration(500)
            .ease("linear")
            .attr({
                x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
                y: d => h - yScale(d) + 14
            });
    });

const addDuration = 500;
d3.select("#add")
    .on("click", () => {
        dataSet.push(newNumber());
        xScale.domain(d3.range((dataSet.length)));
        yScale.domain([0, d3.max(dataSet)]);

        const bars = svg.selectAll("rect").data(dataSet);
        bars.enter()
            .append("rect")
            .attr({
                x: w,
                y: d => h - yScale(d),
                width: xScale.rangeBand(),
                height: d => yScale(d),
                fill: d => "rgb(0, 0, " + colorScale(d) + ")"
            });
        bars.transition().duration(addDuration)
            .attr({
                x: (d, i) => xScale(i),
                width: xScale.rangeBand()
            });

        const labels = svg.selectAll("text").data(dataSet);
        labels.enter().append("text").text(d => d).attr({
            x: w + xScale.rangeBand() / 2,
            y: d => h - yScale(d) + 14,
            "font-family": "sans-serif",
            "font-size": "11px",
            fill: "white",
            "text-anchor": "middle"
        });
        labels.transition().duration(addDuration).attr({
            x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
            y: d => h - yScale(d) + 14
        })
    });

const removeDuration = 500;
d3.select("#remove")
    .on("click", () => {
        dataSet.pop();
        svg.selectAll("rect").data(dataSet).exit()
            .transition().duration(removeDuration)
            .attr("x", w)
            .remove();
        svg.selectAll("text").data(dataSet).exit()
            .transition().duration(removeDuration)
            .attr("x", w + xScale.rangeBand() / 2)
            .remove();
    });