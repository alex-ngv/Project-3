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

  $session.on('click','#farms',function(e){
    e.preventDefault();
    console.log()
    $.get('/farm',createArray,'JSON')
  })
  $session.on('click','#toilets',function(e){
    e.preventDefault();
    console.log('hi')
    $.get('/toliet',createArray,'JSON')
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
    console.log(this.text)
  })
  var test = function(data){
    console.log('hello')
  }
  var createArray = function(data){
    boroughData = [{borough:'Brooklyn',number:0, freq:0},{borough:'Queens',number:0,freq:0},{borough:'Manhattan',number:0,freq:0},{borough:'Bronx',number:0,freq:0},{Borough:'Si',number :0,freq:0}]
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
     $.post('/posts',{post:this.url,data:boroughData})
     console.log('all done')
  }
  var createArrayFromDl = function(data){
    boroughData = [{borough:'Brooklyn',number:0, freq:0},{borough:'Queens',number:0,freq:0},{borough:'Manhattan',number:0,freq:0},{borough:'Bronx',number:0,freq:0},{Borough:'Si',number :0,freq:0}]
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
  }

  $newAccount.click(function(e){
    e.preventDefault()
    $.post('/users', {name:$usernameField.val(), password:$passwordField.val()},newAccountCreated,'JSON')
  });


  $($session).on('click','#logout',function(e){
    e.preventDefault();
    console.log('LOGOUT');
    $.ajax({
      url:'/sessions',
      method: 'DELETE'
    }).done(loggedOut)
  });

  var loggedOut = function () {
    var html = Handlebars.compile($("#login-view").html());
    $('.user').empty()
    $session.append(html)
  }

  var newAccountCreated = function(data){
    $($session).empty()
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
    }else{
      $session.empty()
      $session.append(html(data[0]))}
  };

});
