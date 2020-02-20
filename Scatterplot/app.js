var width = 500
var height = 500
var padding = 40

var data = regionData.filter(mustHaveKeys)

function mustHaveKeys(obj) {
    var keys = [
        "subscribersPer100",
        "adultLiteracyRate",
        "medianAge",
        "urbanPopulationRate"
    ]

    for (var i = 0; i < keys.length; i++) {
        if (obj[keys[i]] === null) return false
    }

    return true
}


var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.adultLiteracyRate))
    .range([padding, width - padding])

var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.subscribersPer100))
    .range([height - padding, padding])

var rScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.medianAge))
    .range([5, 30])

var fScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.urbanPopulationRate))
    .range(["green", "blue"])

var xAxis = d3.axisBottom(xScale)
    .tickSize(-height + 2 * padding)
    .tickSizeOuter(0)

var yAxis = d3.axisLeft(yScale)
    .tickSize(-width + 2 * padding)
    .tickSizeOuter(0)

d3.select("svg")
    .append("g")
    .attr("transform", `translate(0, ${height - padding})`)
    .call(xAxis)

d3.select("svg")
    .append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis)

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.adultLiteracyRate))
    .attr("cy", d => yScale(d.subscribersPer100))
    .attr("r", d => rScale(d.medianAge))
    .attr("fill", d => fScale(d.urbanPopulationRate))
    .attr("stroke", "#fff")


d3.select("svg")
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - padding)
    .attr("dy", padding / 2)
    .style("text-anchor", "middle")
    .text("Adult Literacy Rate")

d3.select("svg")
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", - height / 2)
    .attr("y", padding)
    .attr("dy", "-1.1em")
    .style("text-anchor", "middle")
    .text("Cell phone subscriptions per 100 people")

d3.select("svg")
    .append("text")
    .attr("x", width / 2)
    .attr("y", padding / 2)
    .attr("font-size", "1.5em")
    .style("text-anchor", "middle")
    .text("Data on Subscriptions vs Literacy")

