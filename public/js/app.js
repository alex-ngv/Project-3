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
    $.get('/toilet/',createArray,'JSON')
  })
  $session.on('click','#payphone',function(){
    $.get('/payphone/',createArrayFromDl,'JSON')
  })
  $session.on('click','#water',function(){
    $.get('/watercomplaints/',createArrayFromDl,'JSON')
  })
  $session.on('click','#emergency',function(){
    $.get('/emergencyresponse/',createArrayFromDlE,'JSON')
  })


  $session.on('click','#button',function(){
  //  console.log($( "#sel1 option:selected" ).text());
  var test  = $( "#sel1 option:selected" )[0].id
   $.get('/data/'+test)
  console.log(test)

  })
  // var test = function(data){
  //   console.log($('#wtf'))
  // }
  var createArray = function(data){
    boroughData = [{borough:'Brooklyn',number:0, freq:0},{borough:'Queens',number:0,freq:0},{borough:'Manhattan',number:0,freq:0},{borough:'Bronx',number:0,freq:0},{borough:'Staten Island',number :0,freq:0}]
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
    //  $.post('/data',{name:this.url,data:boroughData})
     getWinner(boroughData)
  }
  var createArrayFromDl = function(data){
    boroughData = [{borough:'Brooklyn',number:0, freq:0},{borough:'Queens',number:0,freq:0},{borough:'Manhattan',number:0,freq:0},{borough:'Bronx',number:0,freq:0},{borough:'Staten Island',number :0,freq:0}]
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
    //  $.post('/data',{post:this.url,data:boroughData})
    getWinner(boroughData)
  }

  var createArrayFromDlE = function(data){
    boroughData = [{borough:'Brooklyn',number:0, freq:0},{borough:'Queens',number:0,freq:0},{borough:'Manhattan',number:0,freq:0},{borough:'Bronx',number:0,freq:0},{borough:'Staten Island',number :0,freq:0}]
    console.log(data.data[0][10].toLowerCase())
    for (var i = 0; i <data.data.length; i++){
      if (data.data[i][10]===null){
      }else if (data.data[i][10].toLowerCase()==='brooklyn'){
        boroughData[0].number +=1
      }else if(data.data[i][10].toLowerCase()==='queens'){
        boroughData[1].number  +=1
      }else if(data.data[i][10].toLowerCase()==='manhattan'){
        boroughData[2].number  +=1
      }else if(data.data[i][10].toLowerCase()==='bronx'){
        boroughData[3].number  +=1
      }else if(data.data[i][10].toLowerCase()==='staten island'){
        boroughData[4].number  +=1
      }
    }
    boroughData.forEach(function(borough2){
      borough2.freq=Math.floor(((borough2.number/data.data.length)*100))
    })
    //  $.post('/data',{post:this.url,data:boroughData})
    getWinner(boroughData)
  }

  var getWinner =function(data){
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
      }$.post('/data',{name:$( "#sel1 option:selected" )[0].id,data:boroughData,winner:winner})
      console.log(winner,data,$( "#sel1 option:selected" ).text())
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
    var mapSVG = $('#viewport').children();

      $(mapSVG[0]).on('click',function(e){
        if ($( "#sel1 option:selected" )[0].id === "gullible"){
        e.preventDefault();
        gullible()
        }else{
        e.preventDefault();
        setTimeout(function(){ pullData()},200)
      }
    })
  })



//  var boroughData = []
  var outerRadius = 250
  var innerRadius = 110


  var pullData = function () {
    var test  = $( "#sel1 option:selected" )[0].id
    $.get('/data/'+test).done(seedData)
  }

  var seedData = function (d) {
    boroughData = d[0].data
    winnerData = d[0].winner
    moveStuff()
  }


  var moveStuff = function(){

        $(".data-vis").remove()
        $(".winner-div").remove()

        var color = d3.scale.ordinal()
                .range(["#3498db","#e74c3c","#95a5a6","#f1c40f","#2ecc71"])

        var canvas = d3.select('body').append('svg')
                .attr("width", 675)
                .attr("height", 550)
                //.style("border","5px ridge")
                .style("display","block")
                .style("position","absolute")
                .style("top","320px")
                .style("right","30px")
                .style("margin","auto")
                .attr("class","data-vis")

        var group = canvas.append('g')
                .attr("transform","translate(250,260)")

        var arc = d3.svg.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius)

        var donut = d3.layout.pie()
                .value(function(d){return d.number})

        var arcs = group.selectAll('.arc')
                    .data(0)
                    .data(donut(boroughData))
                    .enter()
                    .append('g')
                    .attr('class','arc')

        arcs.append('path')
            .transition()
            .duration(500)
            .attr("d",arc)
            .attr("fill",function(d){return color(d.data.number)})

        arcs.append('text')
            .attr("transform", function(d){return "translate (" + arc.centroid(d) + ")"})
            .text(function(d){return d.data.number})
            .attr("font-size","1.3em")


        labelG = canvas.append('g')

        var circleLabels = labelG.selectAll('circle')
              .data(boroughData)
              .enter()
              .append('circle')
              .attr("r","15")
              .attr("transform",function(d,i){return "translate(550," +(i*40+50)+ ")"})
              .attr("fill",function(d){return color(d.number)})

        circleTextG = canvas.append('g')

        var circleText = circleTextG.selectAll('text')
                  .data(boroughData)
                  .enter()
                  .append('text')
                  .text(function(d){return d.borough})
                  .attr("transform",function(d,i){return "translate(575," +(i*40+57)+ ")"})
                  .style("font-size","1.3em")


        var winnerDiv = $('<div class=winner-div>')
            winnerDiv.css('position','absolute')
            winnerDiv.css('top','242px')
            winnerDiv.width('700')
            winnerDiv.height('50')
            winnerDiv.css('right','30px')
            winnerDiv.css('border-radius',"8px")
            //winnerDiv.css("border","5px ridge")  nobody likes my awesome boder!
            $('body').append(winnerDiv)
            winnerDiv.css('font-size','1.5em')
            winnerDiv.css('text-align',"center")
            winnerDiv.html("The borough with the most " + $("#sel1 option:selected")[0].text.toLowerCase() + " is " + winnerData)


    var mufasa = canvas.append("image")
                .attr("xlink:href", "http://dash.ponychan.net/chan/files/src/136167943291.gif")
                .attr("x", 1080)
                .attr("y", 20)
                .attr("width", 10)
                .attr("height", 10)
                .transition()
                .delay(32000)
                .duration(2000)
                .attr("x",0)
                .attr("y",0)
                .attr("width", 560)
                .attr("height", 560)
                .transition()
                .duration(500)
                .attr("width", 0)
                .attr("height", 0)

   }

  var finishStuff = function(){
      d3.selectAll(canvas).transition().duration(00).remove()

  }

  var gullible = function () {
    var frame = $('<iframe width="675" height="550" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allowfullscreen></iframe>').appendTo('body');
    frame.css("position","absolute")
    frame.css("top","250px")
    frame.css("right","30px")
  }


});
