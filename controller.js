"use strict";

function bejewelledController(model) {
  let self = this;
  self.model = null;
  let gemIdPrefix = 'gem';  

  self.bind = function(model) {
    self.model = model;    
  };

  self.initiate = function() {    
    window.onresize = debounceSerie(self.model.resizeInit,1000/60,false);
    window.addEventListener('beforeunload', self.model.store);
    document.getElementById('GCONT').addEventListener('mousedown', self.mouseDownHandler);    
    document.getElementById('GCONT').addEventListener('mouseup', self.mouseUpHandler);
    document.getElementById('GCONT').addEventListener('touchstart', self.touchStartHandler);    
    document.getElementById('GCONT').addEventListener('touchend', self.touchEndHandler); 
    document.getElementById('HINTBUTTON').addEventListener('click', self.getHint);
    document.getElementById('SHUFFLEBUTTON').addEventListener('click', self.shuffleGems);
    document.getElementById('HINTBUTTON').addEventListener('touchstart', self.getHint);
    document.getElementById('SHUFFLEBUTTON').addEventListener('touchstart', self.shuffleGems);  
  };

  var debounceSerie = function(func,interval,immediate) {
    var timer;
    return function() {
      var context=this, args=arguments;
      var later=function() {
        timer=null;
        if ( !immediate )
        func.apply(context,args);
      };
      var callNow=immediate&&!timer;
      clearTimeout(timer);
      timer=setTimeout(later,interval);
      if ( callNow )
        func.apply(context,args);
    };
  };
  
  self.mouseDownHandler = function(EO) {
    EO=EO||window.event;
    EO.preventDefault();       
    self.model.mouseDownHandler(EO);
    document.getElementById('GCONT').onmousemove = debounceSerie(self.mouseMoveHandler,100,false);        
  };

  self.mouseMoveHandler = function(EO) {
    EO=EO||window.event;
    EO.preventDefault();
    self.model.mouseMoveHandler(EO);    
  };

  self.mouseUpHandler = function(EO) {
    EO=EO||window.event;
    EO.preventDefault();
    document.getElementById('GCONT').onmousemove = null;           
  };

  self.touchStartHandler = function(EO) {
    EO=EO||window.event;
    EO.preventDefault();
    self.model.mouseDownHandler(EO);
    document.getElementById('GCONT').ontouchmove = debounceSerie(self.touchMoveHandler,100,false);        
  };

  self.touchMoveHandler = function(EO) {
    EO=EO||window.event;
    EO.preventDefault();
    self.model.mouseMoveHandler(EO);    
  };

  self.touchEndHandler = function(EO) {
    EO=EO||window.event;
    EO.preventDefault();
    document.getElementById('GCONT').ontouchmove = null;           
  };

  self.getHint = function() {
    if (self.model.gameState === 'pick' && self.model.possibleSwitches) {
      self.model.getHint();
    }
  };

  self.shuffleGems = function() {
    if (self.model.gameState === 'pick'||self.model.gameState === 'gameover') {
      self.model.shuffleGems();
    }
  };

  self.lockButton = function(buttonID) { 
    let button = document.getElementById(buttonID);      
    button.disabled = true;   
  };
  
  self.unlockButton = function(buttonID) {
    let button = document.getElementById(buttonID);      
    button.disabled = false;
  };  
}
