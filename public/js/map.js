$(function () {

  // $('#viewport').on('click', '#manhattan', function (e) {
  //   e.preventDefault();
  //   userSelection.text("You Selected Manhattan");
  // });
  // $('#viewport').on('click', '#brooklyn', function (e) {
  //   e.preventDefault();
  //   userSelection.text("You Selected Brooklyn");
  // });
  // $('#viewport').on('click', '#queens', function (e) {
  //   e.preventDefault();
  //   userSelection.text("You Selected Queens");
  // });
  // $('#viewport').on('click', '#bronx', function (e) {
  //   e.preventDefault();
  //   userSelection.text("You Selected Bronx");
  // });
  // $('#viewport').on('click', '#staten-island', function (e) {
  //   e.preventDefault();
  //   userSelection.text("You Selected Staten Island");
  // });
});

// Add userSelection div to viewport

// var userSelection = $("<div class=userSelection>");
// $(".userSelection").empty();
// userSelection.text("Select A Borough");
// $("#viewport").prepend(userSelection);

// Create global variables for map
var centered, path, group, center, projection, areas,
    width = 700,
    height = 640;

// setting up canvas
var map_canvas = d3.select('#viewport').append('svg')
            .attr('width', width)
            .attr('height', height)

// Getting geojson data and displaying it as an svg
d3.json('https://rawgit.com/dwillis/nyc-maps/master/boroughs.geojson', function (data) {
  group = map_canvas.selectAll('g')
              .data(data.features)
              .enter()
              .append('g');

  // Create and configure a geographic projection
  center = d3.geo.centroid(data)
  projection = d3.geo.mercator().scale(80000).center(center)
                  .translate([1125/2, 650/2])

  // Create and configure a path generator
  path = d3.geo.path().projection(projection);

  // appending path to group, setting class, id, and color
  areas = group.append('path')
              .attr('d', path )
              .attr('class', 'borough')
              .attr('id', function (d) {return d.properties.BoroName.toLowerCase().replace(/\s+/g, '-')})
              .attr('fill', '#222')
              .attr('stroke', '#fff')
              .attr('stroke-width', '1')
              .on('click', clicked)
              .on('mouseover', function(){
                d3.select(this).style({opacity:'0.7'})
              })
              .on('mouseout', function() {
                d3.select(this).style({opacity:'1'})
              });

  // Enter borough name in center of the borough
  group.append('text')
        .attr('x', function (d) {return path.centroid(d)[0]})
        .attr('y', function (d) {return path.centroid(d)[1]})
        .attr('text-anchor', "middle")
        .text(function (d) {return d.properties.BoroName})
        .transition()
        .duration(1100)
        .attr('fill', '#fff');
});

function clicked(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 2;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  group.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });



  setTimeout(function() {
    d3.selectAll(".borough")
      .classed("active", false);
  }, 4500);

  group.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px")
      .transition()
        .delay(3000)
        .duration(1300)
        .attr("transform", "translate(" + 750 + "," + 640 + ")scale(" + 1 + ")translate(" + -750 + "," + -640 + ")")
        .attr('class', 'borough')
}
