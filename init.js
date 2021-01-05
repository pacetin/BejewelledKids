'use strict';

window.addEventListener('load', function(){
  window.addEventListener('hashchange', switchToStateFromURLHash, false);    
  switchToStateFromURLHash();    
});

let spaState;

function switchToStateFromURLHash() {
  let urlHash = window.location.hash;
  let stateStr = urlHash.substr(1);
  if (stateStr == '') {
    spaState = {pageName: 'Main'};
  }
  else {       
    spaState = {pageName: stateStr};    
  }
  
  switch (spaState.pageName) {
    case 'Main':      
      buildPage('Main');   
      break;
    case 'Game':
      buildResumeGame();      
      break;
    case 'Rules':         
      buildPage('Rules');      
      break;
    case 'Highscore':         
      buildHighScorePage();      
      break;
  }  
}

function buildPage(pageName) {  
  $.ajax(pageName + '.html', { type:'GET', dataType:'html', success:dataLoaded, error:errorHandler });  

  function dataLoaded(data) {    
    document.getElementById('WRAPPER').innerHTML=data;  
  }
}

function buildHighScorePage() {  
  $.ajax('Highscore.html', { type:'GET', dataType:'html', success:dataLoaded, error:errorHandler });  

  function dataLoaded(data) {    
    document.getElementById('WRAPPER').innerHTML=data;
    getHighScore();
  }
}

function buildGamePage() {
  let playerName = document.getElementById('PLAYERNAME').value;  
  $.ajax('Game.html', { type:'GET', dataType:'html', success:dataLoaded, error:errorHandler });  

  function dataLoaded(data) {    
    document.getElementById('WRAPPER').innerHTML=data;
    setTimeout(function(){ 
      let model = new bejewelledModel(playerName);
      let view = new bejewelledView();
      let controller = new bejewelledController();  
      model.bind(view, controller);
      view.bind(model, controller);
      controller.bind(model);
      model.initiate();
      view.initiate();
      controller.initiate();
    }, 0);  
  }
}

function buildResumeGame() {  
  let playerName = document.getElementById('PLAYERNAME').value;  
  $.ajax('Game.html', { type:'GET', dataType:'html', success:dataLoaded, error:errorHandler });
  function dataLoaded(data) {    
    document.getElementById('WRAPPER').innerHTML=data;
    setTimeout(function(){ 
      let model = new bejewelledModel(playerName);
      let view = new bejewelledView();
      let controller = new bejewelledController();  
      model.bind(view, controller);
      view.bind(model, controller);
      controller.bind(model);
      model.initiateFromStorage();
      view.initiate();      
      controller.initiate();
    }, 0);  
  }
}

let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
let stringName='CETIN_HIGHSCORE';
let password;

function getHighScore() {
  $.ajax( {
    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'READ', n : stringName },
    success : getHighScoreCallback, error : errorHandler
  } );
  console.log('getHighScorecalled');
}

function getHighScoreCallback(callresult) {
  if ( callresult.error!=undefined )
    console.log(callresult.error);
  else if ( callresult.result!="" ) {
    let highScoreArray = JSON.parse(callresult.result);
    console.log(highScoreArray);
    renewHighScore(highScoreArray);
  }
}

function renewHighScore(highScoreArray) {
  let tableCont = document.getElementById('SCORETABLE');
  for (let i=0; i<highScoreArray.length; i++) {
    let row = document.createElement('tr');
    let rank = document.createElement('th');
    rank.innerText = i+1;
    let playerName = document.createElement('th');
    playerName.innerText = highScoreArray[i].name;
    let score = document.createElement('th');
    score.innerText = highScoreArray[i].score;
    row.appendChild(rank);
    row.appendChild(playerName);
    row.appendChild(score);
    tableCont.appendChild(row);
  }
}

function errorHandler(jqXHR,statusStr,errorStr) {
  console.log(statusStr+' '+errorStr);
}
