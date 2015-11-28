$(function(){
  var $usernameField = $('#inputUserame');
  var $passwordField = $('#inputPassword');
  var $loginButton = $('#loginButton');
  var $newAccount = $('#newAccount');
  var $session = $('.container');
  var $farmbutton = $('#farms');
  var $loginArea = $('.user')


  $session.on('click','#loginButton',function(e){
    e.preventDefault()
    $usernameField = $('#inputUserame').val()
    $passwordField = $('#inputPassword').val()
    console.log($usernameField)
    $.post('/sessions' , {name:$usernameField, password:$passwordField},assignSession,'JSON')
  })

  $session.on('click','#newAccount',function(e){
    e.preventDefault()
    console.log('hihihihi')
    $.post('/users', {name:$usernameField, password:$passwordField},newAccountCreated,'JSON')
  });

  $session.on('click','#logout',function(e){
    e.preventDefault();
    console.log('LOGOUT');
    $.ajax({
      url:'/sessions',
      method: 'DELETE'
    }).done(loggedOut)
  });

  $session.on('click','#farms',function(e){
    e.preventDefault();
    $.get('/farm/',createArray,'JSON')
  })
  $session.on('click','#toilets',function(e){
    e.preventDefault();
    $.get('/toilet',createArray,'JSON')
  })
  $session.on('click','#payphone',function(){
    $.get('/payphone',createArrayFromDl,'JSON')
    console.log()
  })
  $session.on('click','#water',function(){
    $.get('/watercomplaints',createArrayFromDl,'JSON')
    console.log()
  })

  $session.on('click','#button',function(){
  //  console.log($( "#sel1 option:selected" ).text());
  var test  = $( "#sel1 option:selected" ).text()
  console.log(test)
   $.get('/data/'+test)

  })
  var test = function(data){
    console.log($('#wtf'))
  }
  var createArray = function(data){
    boroughData = [{borough:'Brooklyn',number:0, freq:0},{borough:'Queens',number:0,freq:0},{borough:'Manhattan',number:0,freq:0},{borough:'Bronx',number:0,freq:0},{borough:'Si',number :0,freq:0}]
    for (var i = 0; i <data.length; i++){
      if (data[i].borough==='Brooklyn'){
        boroughData[0].number +=1
      }else if(data[i].borough==='Queens'){
        boroughData[1].number  +=1
      }else if(data[i].borough==='Manhattan'){
        boroughData[2].number  +=1
      }else if(data[i].borough==='Bronx'){
        boroughData[3].number  +=1
      }else if(data[i].borough==='Staten Island'){
        boroughData[4].number  +=1
      }
    }
    boroughData.forEach(function(borough2){
      borough2.freq=Math.floor(((borough2.number/data.length)*100))
    })
     $.post('/data',{name:this.url,data:boroughData})
     getWinner(boroughData)
  }
  var createArrayFromDl = function(data){
    boroughData = [{borough:'Brooklyn',number:0, freq:0},{borough:'Queens',number:0,freq:0},{borough:'Manhattan',number:0,freq:0},{borough:'Bronx',number:0,freq:0},{borough:'Si',number :0,freq:0}]
    for (var i = 0; i <data.data.length; i++){
      if (data.data[i][35].toLowerCase()==='brooklyn'){
        boroughData[0].number +=1
      }else if(data.data[i][35].toLowerCase()==='queens'){
        boroughData[1].number  +=1
      }else if(data.data[i][35].toLowerCase()==='manhattan'){
        boroughData[2].number  +=1
      }else if(data.data[i][35].toLowerCase()==='bronx'){
        boroughData[3].number  +=1
      }else if(data.data[i][35].toLowerCase()==='staten island'){
        boroughData[4].number  +=1
      }
    }
    boroughData.forEach(function(borough2){
      borough2.freq=Math.floor(((borough2.number/data.data.length)*100))
    })
     $.post('/posts',{post:this.url,data:boroughData})
     console.log('all done')
    console.log(boroughData)
    test3
  }

  var getWinner =function(data){
    console.log(data)
    var result = 0
    winner = []
    for (var i=0; i<5; i++){
      if (data[i].freq > result){
        result = data[i].freq
        winner = data[i].borough
        winner =[]
        winner.push(data[i].borough)
      } else if (data[i].freq === result){
        winner.push(data[i].borough)
        }
      }console.log(winner)
    }


  var loggedOut = function () {
    var html = Handlebars.compile($("#login-view").html());
    $('.user').empty()
    $session.append(html)
  }

  var newAccountCreated = function(data){
    var $created = $('<div class=created>')
    $('.created').empty()
    $created.text(data.msg)
    $session.append($created)
  }

  var assignSession = function(data){
    console.log('session assigned')
    console.log(data)
    var html = Handlebars.compile($("#buttons").html());
    //
    if (data.msg){
      var $created = $('<div class=created>')
      $('.created').empty()
      $created.text(data.msg)
      $session.append($created)
    }else{
      $session.empty()
      $session.append(html(data[0]))}
  };





//Yuriy stuff starts here but Alex's onload function closes at the end!
  console.log("viz.js - donut!")


  $(function(){

    moveStuff()
    $('.container').on('click','#toilets',function(e){
      e.preventDefault();
      setTimeout(function(){realdata = boroughData;moveStuff()},1500)
    })



    $('#move').on('click', moveStuff)
    $('#finish').on('click', finishStuff)

  })

  var fakeData = [1]
  var data = [15,25,35,45]
  var realdata = [{borough:"Brooklyn",number:35},{borough:"Queens",number:11},{borough:"Manhattan",number:28},{borough:"Bronx",number:22},{borough:"Si",number:1}]
  var outerRadius = 250
  var innerRadius = 80
  var dataLabel = "Farmer's Market Share"


  var setDataVariables = function (d) {
    console.log("Hi There b")
    console.log(d)
    realdata = d
  }



  var color = d3.scale.ordinal()
                .range(["#3498db","#e74c3c","#95a5a6","#f1c40f","#2ecc71"])

  var canvas = d3.select('body').append('svg')
                .attr("width", 675)
                .attr("height", 600)
                //.style("border","5px ridge")
                .style("display","block")
                .style("position","absolute")
                .style("top","100px")
                .style("right","40px")
                .style("margin","auto");

  var group = canvas.append('g')
                    .attr("transform","translate(250,300)")

  var arc = d3.svg.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius)

  var donut = d3.layout.pie()
                .value(function(d){return d.number})

  var color = d3.scale.ordinal()
                .range(["#3498db","#e74c3c","#95a5a6","#f1c40f","#2ecc71"])

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

  // var textLabel = arcs.append('text')
  //                     .attr("transform","translate(-125,-400)")
  //                     .style('fill','white')
  //                     .transition()
  //                     .duration(400)
  //                     .text(dataLabel)
  //                     .style('fill','black')
  //                     .attr("font-size","1.7em")

  labelG = canvas.append('g')

  var circleLabels = labelG.selectAll('circle')
        .data(realdata)
        .enter()
        .append('circle')
        .attr("r","15")
        .attr("transform",function(d,i){return "translate(550," +(i*40+70)+ ")"})
        .attr("fill",function(d){return color(d.number)})

  circleTextG = canvas.append('g')

  var circleText = circleTextG.selectAll('text')
            .data(realdata)
            .enter()
            .append('text')
            .text(function(d){return d.borough})
            .attr("transform",function(d,i){return "translate(575," +(i*40+77)+ ")"})
            .style("font-size","1.3em")

   }

  var finishStuff = function(){
    d3.selectAll('.arc').transition().duration(00).remove()

  }



var mufasa = canvas.append("image")
                .attr("xlink:href", "http://dash.ponychan.net/chan/files/src/136167943291.gif")
                .attr("x", 1080)
                .attr("y", 20)
                .attr("width", 10)
                .attr("height", 10)
                .transition()
                .delay(21000)
                .duration(2000)
                .attr("x",0)
                .attr("y",0)
                .attr("width", 560)
                .attr("height", 560)
                .transition()
                .duration(500)
                .attr("width", 0)
                .attr("height", 0)





  // left = 11500
  // var mufasa = function() {
  //   var pony = $('#mufasa');
  //   left = left - 10
  //   $(pony).css("left", left + "px")
  //   $(pony).css("position","absolute")
  //   $(pony).css("top", "150px")
  //   if (left < -120000) {
  //     left = 120000
  //   }
  // };
  //
  // setInterval(mufasa,10)



});
