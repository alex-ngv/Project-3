$(function () {
  $('#viewport').on('click', '#manhattan', function (e) {
    e.preventDefault()
    console.log('Manhattan');
  });
  $('#viewport').on('click', '#brooklyn', function (e) {
    e.preventDefault()
    console.log('Brooklyn');
  });
  $('#viewport').on('click', '#queens', function (e) {
    e.preventDefault()
    console.log('Queens');
  });
  $('#viewport').on('click', '#bronx', function (e) {
    e.preventDefault()
    console.log('Bronx');
  });
  $('#viewport').on('click', '#staten-island', function (e) {
    e.preventDefault()
    console.log('Staten Island');
  });
});

// setting up canvas
var map_canvas = d3.select('#viewport').append('svg')
            .attr('width', 960)
            .attr('height', 650)

// Getting geojson data and displaying it as an svg
d3.json('https://rawgit.com/dwillis/nyc-maps/master/boroughs.geojson', function (data) {
  var group = map_canvas.selectAll('g')
              .data(data.features)
              .enter()
              .append('g');

  // Create and configure a geographic projection
  var center = d3.geo.centroid(data)
  var projection = d3.geo.mercator().scale(70000).center(center)
                  .translate([1600/2, 650/2]);

  // Create and configure a path generator
  var path = d3.geo.path().projection(projection);

  // appending path to group, setting class, id, and color
  var areas = group.append('path')
              .attr('d', path )
              .attr('class', 'borough')
              .attr('id', function (d) {return d.properties.BoroName.toLowerCase().replace(/\s+/g, '-')})
              .attr('fill', '#222')
              .attr('stroke', '#fff')
              .attr('stroke-width', '1');

  // Enter borough name in center of the borough
  group.append('text')
        .attr('x', function (d) {return path.centroid(d)[0]})
        .attr('y', function (d) {return path.centroid(d)[1]})
        .attr('text-anchor', "middle")
        .text(function (d) {return d.properties.BoroName})
        .attr('fill', '#fff');
});
