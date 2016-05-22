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

d3.select("p")
    .on("click", () => {
        const dataLength = dataSet.length;
        dataSet = [];
        for (let i = 0; i < dataLength; i++) {
            var newNumber = Math.floor(Math.random() * 25);
            dataSet.push(newNumber);
        }

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
                fill: d => "rgb(0, 0, " + (d * 10) + ")"
            });
        svg.selectAll("text")
            .data(dataSet)
            .transition()
            .delay((d, i) => i / dataSet.length * 1000)
            .duration(500)
            .ease("linear")
            .text(function (d) {
                return d;
            })
            .attr({
                x: (d, i) => xScale(i) + xScale.rangeBand() / 2,
                y: d => h - yScale(d) + 14,
                "font-family": "sans-serif",
                "font-size": "11px",
                fill: "white",
                "text-anchor": "middle"
            });
    });