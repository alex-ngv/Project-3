console.log("viz.js - donut!")


$(function(){
  moveStuff()

  $('.container').on('click','#farms',function(e){
    e.preventDefault();
    $.get('/farm',setDataVariables)
  })



  $('#move').on('click', moveStuff)
  $('#finish').on('click', finishStuff)

})

var fakeData = [1]
var data = [15,25,35,45]
var realdata = [{borough:"Brooklyn",number:35},{borough:"Queens",number:11},{borough:"Manhattan",number:28},{borough:"Bronx",number:22},{borough:"Si",number:1}]
var outerRadius = 300
var innerRadius = 150
var dataLabel = "Farmer's Market Share"


var setDataVariables = function (d) {
  console.log("Hi There b")
  console.log(d)
  realdata = d
}



var color = d3.scale.ordinal()
              .range(["cornflowerblue","red","orange","green","yellow"])

var canvas = d3.select('body').append('svg')
              .attr("width", 1000)
              .attr("height", 850)
              .style("border","5px ridge")
              .style("display","block")
              .style("position","absolute")
              .style("top","100px")
              .style("margin","auto");

var group = canvas.append('g')
                  .attr("transform","translate(400,500)")

var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

var donut = d3.layout.pie()
              .value(function(d){return d.number})





var moveStuff = function(){

  var arcs = group.selectAll('.arc')
                  .data(0)
                  .data(donut(realdata))
                  .enter()
                  .append('g')
                  .attr('class','arc')

  arcs.append('path')
      .transition()
      .duration(900)
      .attr("d",arc)
      .attr("fill",function(d){return color(d.data.number)})

  arcs.append('text')
      .attr("transform", function(d){return "translate (" + arc.centroid(d) + ")"})
      .text(function(d){return d.data.number})
      .attr("font-size","2em")

var textLabel = arcs.append('text')
                    .attr("transform","translate(-125,-400)")
                    .style('fill','white')
                    .transition()
                    .duration(400)
                    .text(dataLabel)
                    .style('fill','black')
                    .attr("font-size","1.7em")

labelG = canvas.append('g')

var circleLabels = labelG.selectAll('circle')
      .data(realdata)
      .enter()
      .append('circle')
      .attr("r","15")
      .attr("transform",function(d,i){return "translate(750," +(i*40+100)+ ")"})
      .attr("fill",function(d){return color(d.number)})

circleTextG = canvas.append('g')

var circleText = circleTextG.selectAll('text')
          .data(realdata)
          .enter()
          .append('text')
          .text(function(d){return d.borough})
          .attr("transform",function(d,i){return "translate(775," +(i*40+107)+ ")"})
          .style("font-size","1.3em")

 }

var finishStuff = function(){
  d3.selectAll('.arc').transition().duration(00).remove()

}

left = 11500
var mufasa = function() {
  var pony = $('#pony');
  left = left - 10
  $(pony).css("left", left + "px")
  $(pony).css("top", "150px")
  if (left < -120000) {
    left = 120000
  }
};

setInterval(mufasa,10)




  // arcs.append('path')
  //     .attr("d",arc)
  //     .transition()
  //     .duration(500)
      //.attr("fill",function(d){return color(d.data)})

    //  dataLabel.style("fill","white")




// var man = canvas.append('path')
//       .attr("d","M1230.248,212.129   c1.777,7.582-1.148,19.387-5.84,25.516c-2.008,2.604-4.941,4.584-7.91,5.867c-2.176,0.924-5.309,1.057-6.859,2.867   c2.469,1.156,4.188,1.98,3.82,5.014c-0.293,2.572-1.977,3-3.621,4.879c-2.176,2.439-4.223,5.045-6.629,7.221   c-1.586,1.484-3,4.484-4.813,5.572c-2.102,1.283-2.902-1.553-5.043,0.131c-2.012,1.549-2.344,6.857-3.035,9.201   c-3.625,12.428-10.883,22.684-17.254,33.791c-2.141,3.729-3.363,7.781-5.34,11.605c-2.102,4.055-4.086,7.979-5.637,12.299   c-1.277,3.592-3.586,6.232-5.176,9.629c-1.223,2.572-1.52,6.164-1.969,9.068c0,0.066-0.047,0.164-0.047,0.23   c-1.109,6.527-3.453,12.691-6.066,18.859c-2.707,6.297-4.027,11.014-4.355,17.938c-0.234,5.668-0.621,11.604,0,17.309   c1.086,10.055,3.586,19.914,4.391,30c0.691,9.199-0.734,18.299-1.613,27.432c-0.457,5.08-0.293,10.252-0.293,15.363   c0,4.088,0,8.145,0,12.232c0,3.395,0,6.824,0,10.219c0,3.824-0.164,5.77,2.469,8.605c2.438,2.57,4.977,4.748,7.156,7.615   c4.523,5.904,9.293,12.1,10.754,19.354c1.055,5.176,0.527,11.012,0.527,16.387c0,4.484,0.824,9.428-1.883,13.221   c-2.539,3.627-6.293,5.736-9.656,8.375c-4.449,3.561-9.367,6.725-13.285,10.912c-3.066,3.332-4.023,7.453-5.672,11.539   c-1.316,3.297-2.836,6.266-5.012,9.037c-4.914,6.164-15.07,10.68-16.414,19.221c-0.5,3.1,0.688,6,1.91,8.734   c1.387,3.133,2.113,6.266,3.238,9.465c0.859,2.504,3.398,6.068,3.367,8.736c-0.043,3.068-4.359,5.867-6.242,8.143   c-2.898,3.529-5.602,6.988-8.836,10.189c-7.555,7.516-12.691,16.484-18.035,25.615c-3.066,5.244-6.129,10.289-9.754,15.232   c-8.082,10.98-17.305,21.332-25.355,32.439c-6.496,8.969-12.168,18.598-18.332,27.828c-5.508,8.176-12.496,15.297-16.223,24.527   c-1.586,3.957-3.754,7.754-3.824,12.074c-0.094,4.646,1.648,9.23-1.121,12.992c-1.441,2.012-1.777,3.098-1.648,5.703   c0.266,4.451,3.535,6.66,4.418,10.451c1.813,7.686-6.727,3.297-9.039,6.893c-2.871,4.551,6.367,6.133,8.105,7.352   c-2.047,2.045-6.785,0.428-9.121,2.836c-2.441,2.537,0.727,4.252,2.758,6.068c5.914,5.176,9.363,10.881,8.637,18.824   c-0.402,4.252-1.285,8.408-1.918,12.66c-0.367,2.34-0.699,5.012-1.391,6.893c0,0.031-0.914,0.586-1.086,1.082   c-0.199,0.561,0.094,1.354,0,1.918c-1.484,10.283-2.082,21.131-6.035,30.791c-2.047,4.98-4.414,9.855-6.328,14.836   c-1.52,3.992-3.402,6.855-6.664,9.529c-2.871,2.34-5.604,3.59-9.131,4.68c-3.791,1.156-7.32,2.867-11.34,2.867   c-4.389,0-8.637,0.824-12.992,2.012c-2.904,0.793-6.033,4.68-9.264,3.363c-3.168-1.25-1.844-4.219-1.98-6.758   c-0.164-2.637,0-2.242-2.504-2.506c-1.484-0.131-2.928,0.133-4.352,0.264c-4.648,0.43-9.426,1.09-13.748,2.77   c-4.389,1.68-8.178,4.547-12.465,6.428c-2.932,1.32-5.34,2.375-4.584,6.199c0.496,2.668,2.637,4.221,1.717,7.221   c-2.473,7.918-10.389,13.711-16.416,18.891c-8.836,7.52-5.309-6.914-11.672-5.242c-7.02,1.879,5.906,11.012-1.912,12.09   c-4.389,0.59-2.869-1.313-4.389-3.859c-1.912-3.125-5.572-0.625-7.219,1.449c-2.109,2.629-3,3.621-6.793,3.234   c-2.764-0.293-5.34-1.914-7.449-3.75c-1.516-1.352-2.41-2.934-3.234-4.754c-0.889-2.012-2.869-4.609-3.359-6.582   c-1.025-4.156,2.635-3.199,3.887-5.773c1.648-3.459-1.973-3.955-4.219-3.523c-2.377,0.461-6.758,2.008-8.213-0.893   c-1.02-2.076,0.92-7.023,1.385-8.967c1.055-4.617,2.307-8.934,3.1-13.549c0.691-4.057,2.271-7.816,2.967-11.867   c0.922-5.275,1.385-10.553,1.648-15.92c0.625-12.893,5.18-25.389,6.592-38.148c0.264-2.637,0.133-8.408,1.447-10.648   c1.484-2.539,7.285-2.768,10.086-3.297c2.738-0.527,5.043-0.922,1.914-3.295c-2.738-2.045-14.672-3.824-10.154-8.869   c1.15-1.283,3.951-2.371,4.482-4.582c0.789-3.594-2.176-1.484-3.914-3.102c-4.121-3.791,9.59-3.992,11.207-4.451   c1.648-5.932-8.836-2.439-9.855-6.529c-0.793-3.168,2.275-7.582,3.031-10.451c0.859-3.264,0.793-4.088,4.721-4.947   c1.811-0.428,6.66-0.625,5.244-3.66c-1.188-2.572-5.602-2.012-7.748-2.375c-2.908-0.496-3.264-2.441-0.564-3.857   c2.08-1.088,4.813-0.496,3.855-4.119c-0.459-1.752-2.305-3.824-3.656-5.145c-2.078-2.08-2.41-2.504-1.355-5.572   c1.023-2.867,1.584-5.307,1.453-8.504c-0.365-7.287,0.066-13.553,5.738-19.023c3.332-3.201,7.516-4.453,3.789-9.756   c-2.371-3.43-7.385-4.549-3.988-9.957c2.309-3.691,4.813-7.516,4.648-12.332c2.768,0.133,1.883,2.836,3.295,4.088   c1.846,1.648,4.121-0.195,5.178-1.879c0.955-1.484,1.814-4.354,0.891-6.168c-0.787-1.549-2.836-2.045-3.23-3.857   c-0.234-1.119,0.691-3.723,0.986-4.844c0.988-3.727,3.264-6.891,5.408-10.023c0.859-1.285,1.289-2.309,2.545-3.195   c0.855-0.561,2.764-0.594,3.291-1.09c3.264-2.738-1.645-2.34-3.26-3.33c-1.813-6.496,12.693-0.857,11.176-5.969   c-1.352-1.32-3.691-1.02-4.057-3.332c-0.295-1.912,1.518-3.855,3.293-4.119c1.484-0.236,4.617,1.943,4.943-0.561   c0.201-1.717-2.504-2.604-3.822-2.805c-1.156-5.008,6.168-0.496,7.879-0.822c0.564-2.41-2.107-1.713-3.031-3.234   c-0.729-1.154-0.033-3.426,0.096-4.646c1.023,0.824,8.08,4.68,8.012,0.988c-0.068-2.473-4.549-1.977-5.373-4.021   c-1.32-3.363,3.129-0.627,4.754-1.383c3.422-1.68-2.014-1.945-2.504-3.297c-0.957-2.734,3.559-2.604,4.715-3.66   c2.539-2.307-0.625-3-1.188-5.406c-0.588-2.504,1.088-3.594,2.604-5.441c2.541-3.031,2.74-12.195,7.881-11.275   c0.164,1.057,0.691,3.463,1.615,4.057c1.748,1.184,3.396,0.23,3.627-1.617c0.426-3.297-3.955-5.207-1.582-8.805   c0.955-1.414,2.535-2.074,3.459-3.855c0.693-1.352,0.955-2.668,1.98-3.855c1.979-2.309,7.611-2.9,5.572-6.855   c-0.92-1.781-4.68-1.945-5.045-3.297c-0.66-2.637,4.189-1.912,5.504-1.912c2.473,0,4.025,0.332,5.705-1.385   c1.719-1.746,2.836-4.715,3.992-6.891c3.428-6.232,7.516-12.199,10.582-18.66c1.682-3.465,2.801-7.289,4.648-10.717   c2.176-3.955,5.34-6.264,7.813-9.822c2.309-3.332,3.625-7.254,5.668-10.717c3.695-6.26,6.695-12.92,10.289-19.252   c2.768-4.881,5.307-9.264,7.09-14.605c0.82-2.504,1.18-4.914,2.203-7.352c3.73-9,9.895-17.439,15.039-25.684   c3.789-6.068,6.895-12.559,10.152-18.891c2.145-4.121,3.363-8.705,5.375-12.893c1.777-3.793,4.391-7.084,6.531-10.682   c1.117-1.943,4.754-6.295,4.645-8.57c-0.063-2.637-3.75-2.441-2.961-4.68c0.785-2.209,5.375-2.408,6.824-4.32   c1.715-2.277,1.191-5.908,4.191-7.416c0.984-0.496,2.246,0.096,3.234-0.332c1.25-0.529,1.75-1.912,2.41-3.033   c5.379-9.131,12.098-17.508,18.004-26.439c5.668-8.604,9.727-18.664,13.391-28.225c3.492-9.199,5.344-18.664,8.242-27.992   c2.215-7.02,7.781-14.406,8.25-21.76c0.422-6.791-4.32-10.68-6.531-16.879c-1.387-3.893-0.625-7.484,1.719-10.779   c2.082-2.934,4.059-3.496,6.82-5.309c4.855-3.133,8.016-9.197,10.984-13.98c6.293-10.252,11.672-21,17.762-31.32   c4.648-7.879,8.707-15.695,12.402-24c3.238-7.32,4.918-13.916,4.918-21.891c0-3.102-0.418-6.66,0.297-9.629   c0.824-3.428,3.621-6.957,5.762-9.629c2.582-3.295,5.672-6.199,8.438-9.264c1.945-2.143,3.266-3.855,6.43-3.627   c6.066,0.395,9.891,5.604,10.109,11.242c0.133,3.361,0.164,6.926,2.75,9.365c1.844,1.713,6.625,3.561,8.734,1.385   c1.98-2.012-0.125-5.441,2.805-6.629c3.328-1.32,8.043,1.844,10.879,3.031C1218.346,203.953,1228.732,205.732,1230.248,212.129z")
//       .attr('stroke-width',"3")
//       .attr("stroke","#E0584E")
//
//       var thing = function(){
//         console.log( man.attr("transform","scale("+ Math.random()+")"))
//       }
//
//     man
//       .transition()
//       .delay(500)
//       setInterval(thing,500)
//      .attr("transform","scale(.5)")