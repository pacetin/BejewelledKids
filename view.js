"use strict";

function bejewelledView() {
  let self = this;
  self.model = null;
  self.controller = null;
  self.animatedItems = 0;
  
  const gameWrapper = document.getElementById('WRAPPER');
  const wallPaper = document.getElementById('WALLPAPER');
  const svgElemField = document.getElementById('FIELD');
  const svgElemBar = document.getElementById('GAMEBAR');
  const gemCont = document.getElementById('GCONT');
  const gemIdPrefix = 'gem';
  const gemClass = 'gem';
  const gemClassSelected = 'gem__selected';  
  const gemSrc = 'gemsprite.svg#';
  const arrowSize = 40;
  const arrowCont = document.getElementById('ARROWSCONT');  

  self.bind = function(model,controller) {
    self.model = model;
    self.controller = controller;  
  };  
  
  self.initiate = function() {
        
    self.changeWallpaper(self.model.gameLevel);
    
  
    const c = self.model.fieldSize;   
    const d = self.model.gemSize;
    
    self.replaceGameBar();

    for (let i=0; i<c; i+=2) {
      for (let j=0; j<c; j+=2) {
        let grid = document.createElementNS('http://www.w3.org/2000/svg','rect');
        grid.setAttribute('x', i*d);  
        grid.setAttribute('y', j*d);
        grid.setAttribute('width', d);
        grid.setAttribute('height', d);    
        grid.setAttribute('fill','#643208');
        grid.setAttribute('fill-opacity','0.8');         
        svgElemField.appendChild(grid);
      }
    }
    for (let i=1; i<c; i+=2) {
      for (let j=0; j<c; j+=2) {
        let grid = document.createElementNS('http://www.w3.org/2000/svg','rect');
        grid.setAttribute('x', i*d);  
        grid.setAttribute('y', j*d);
        grid.setAttribute('width', d);
        grid.setAttribute('height', d);    
        grid.setAttribute('fill','#2b1d12');
        grid.setAttribute('fill-opacity','0.8');         
        svgElemField.appendChild(grid);
      }
    }
    for (let i=1; i<c; i+=2) {
      for (let j=1; j<c; j+=2) {
        let grid = document.createElementNS('http://www.w3.org/2000/svg','rect');
        grid.setAttribute('x', i*d);  
        grid.setAttribute('y', j*d);
        grid.setAttribute('width', d);
        grid.setAttribute('height', d);    
        grid.setAttribute('fill','#643208');
        grid.setAttribute('fill-opacity','0.8');         
        svgElemField.appendChild(grid);
      }
    }
    for (let i=0; i<c; i+=2) {
      for (let j=1; j<c; j+=2) {
        let grid = document.createElementNS('http://www.w3.org/2000/svg','rect');
        grid.setAttribute('x', i*d);  
        grid.setAttribute('y', j*d);
        grid.setAttribute('width', d);
        grid.setAttribute('height', d);    
        grid.setAttribute('fill','#2b1d12');
        grid.setAttribute('fill-opacity','0.8');         
        svgElemField.appendChild(grid);
      }
    }
    // gameBar    
    let gameBarGradient = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
    gameBarGradient.setAttribute('id', 'LNG1');
    gameBarGradient.setAttribute('x1', '0%');
    gameBarGradient.setAttribute('y1', '0%');
    gameBarGradient.setAttribute('x2', '0%');
    gameBarGradient.setAttribute('y2', '100%');    
    let stop1 = document.createElementNS('http://www.w3.org/2000/svg','stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'brown');
    gameBarGradient.appendChild(stop1);
    let stop2 = document.createElementNS('http://www.w3.org/2000/svg','stop');
    stop2.setAttribute('offset', '50%');
    stop2.setAttribute('stop-color', 'yellow');
    gameBarGradient.appendChild(stop2);
    let stop3 = document.createElementNS('http://www.w3.org/2000/svg','stop');
    stop3.setAttribute('offset', '100%');
    stop3.setAttribute('stop-color', 'brown');
    gameBarGradient.appendChild(stop3);
    svgElemBar.appendChild(gameBarGradient);

    let barGradient = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
    barGradient.setAttribute('id', 'RAINBOW');
    barGradient.setAttribute('x1', '0%');
    barGradient.setAttribute('y1', '0%');
    barGradient.setAttribute('x2', '100%');
    barGradient.setAttribute('y2', '100%');
    let stop4 = document.createElementNS('http://www.w3.org/2000/svg','stop');
    stop4.setAttribute('offset', '0%');
    stop4.setAttribute('stop-color', '#ff0000');
    stop4.setAttribute('stop-opacity', '1');
    barGradient.appendChild(stop4);
    let animate1 = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate1.setAttribute('attributeName', 'stop-color');
    animate1.setAttribute('values', '#ff0000;#ffa500;#ffff00;#00ff00;#008000;#00ffff;#0000ff;#800080');
    animate1.setAttribute('dur', '14s');
    animate1.setAttribute('repeatCount', 'indefinite');
    stop4.appendChild(animate1);
    let stop5 = document.createElementNS('http://www.w3.org/2000/svg','stop');
    stop5.setAttribute('offset', '100%');
    stop5.setAttribute('stop-color', '#800080');
    stop5.setAttribute('stop-opacity', '1');
    barGradient.appendChild(stop5);
    let animate2 = document.createElementNS('http://www.w3.org/2000/svg','animate');
    animate2.setAttribute('attributeName', 'stop-color');
    animate2.setAttribute('values', '#800080;#0000ff;#00ffff;#008000;#00ff00;#ffff00;#ffa500;#ff0000');
    animate2.setAttribute('dur', '14s');
    animate2.setAttribute('repeatCount', 'indefinite');
    stop5.appendChild(animate2);    
    svgElemBar.appendChild(barGradient);

    let gameBar = document.createElementNS('http://www.w3.org/2000/svg','rect');
    gameBar.setAttribute('x', '0');
    gameBar.setAttribute('id', 'BAR');  
    gameBar.setAttribute('y', '0');
    gameBar.setAttribute('width', '0');
    gameBar.setAttribute('height', '60');    
    gameBar.setAttribute('fill','url(#RAINBOW)');          
    svgElemBar.appendChild(gameBar);
    let gameBarUp = document.createElementNS('http://www.w3.org/2000/svg','rect');
    gameBarUp.setAttribute('x', '0');  
    gameBarUp.setAttribute('y', '0');
    gameBarUp.setAttribute('width', c*d);
    gameBarUp.setAttribute('height', '15');    
    gameBarUp.setAttribute('fill','url(#LNG1)');          
    svgElemBar.appendChild(gameBarUp);
    let gameBarDown = document.createElementNS('http://www.w3.org/2000/svg','rect');
    gameBarDown.setAttribute('x', '0');  
    gameBarDown.setAttribute('y', '45');
    gameBarDown.setAttribute('width', c*d);
    gameBarDown.setAttribute('height', '15');    
    gameBarDown.setAttribute('fill','url(#LNG1)');          
    svgElemBar.appendChild(gameBarDown);
    let gameBarLeft = document.createElementNS('http://www.w3.org/2000/svg','rect');
    gameBarLeft.setAttribute('x', '0');  
    gameBarLeft.setAttribute('y', '0');
    gameBarLeft.setAttribute('width', '15');
    gameBarLeft.setAttribute('height', '60');    
    gameBarLeft.setAttribute('fill','url(#LNG1)');          
    svgElemBar.appendChild(gameBarLeft);
    let gameBarRight = document.createElementNS('http://www.w3.org/2000/svg','rect');
    gameBarRight.setAttribute('x', c*d-15);  
    gameBarRight.setAttribute('y', '0');
    gameBarRight.setAttribute('width', '15');
    gameBarRight.setAttribute('height', '60');    
    gameBarRight.setAttribute('fill','url(#LNG1)');          
    svgElemBar.appendChild(gameBarRight);

    //buttons
    const buttonsCont = document.getElementById('BCONT');
    let divHint = document.createElement('div');
    let buttonHint = document.createElement('button');
    buttonHint.setAttribute('class', 'hint');
    buttonHint.setAttribute('id', 'HINTBUTTON');
    buttonHint.innerHTML = '<span>Hint</span>';
    let spanHint = document.createElement('span');
    spanHint.setAttribute('id', 'HINT');    
    divHint.appendChild(buttonHint);
    divHint.appendChild(spanHint);
    buttonsCont.appendChild(divHint);
    let divShuffle = document.createElement('div');
    let buttonShuffle = document.createElement('button');
    buttonShuffle.setAttribute('class', 'shuffle');
    buttonShuffle.setAttribute('id', 'SHUFFLEBUTTON');
    buttonShuffle.innerHTML = '<span>Shuffle</span>';
    let spanShuffle = document.createElement('span');
    spanShuffle.setAttribute('id', 'SHUFFLE');    
    divShuffle.appendChild(buttonShuffle);
    divShuffle.appendChild(spanShuffle);
    buttonsCont.appendChild(divShuffle);
    
    //level and score
    const levelCont = document.getElementById('LSCONT');
    let divLevel = document.createElement('div');
    divLevel.setAttribute('class', 'level');
    divLevel.innerHTML = '<span>Level: </span>';
    let spanLevel = document.createElement('span');
    spanLevel.setAttribute('id', 'LEVEL');    
    divLevel.appendChild(spanLevel);
    levelCont.appendChild(divLevel);
    let divScore = document.createElement('div');
    divScore.setAttribute('class', 'score');
    divScore.innerHTML = '<span>Score: </span>';
    let spanScore = document.createElement('span');
    spanScore.setAttribute('id', 'SCORE');    
    divScore.appendChild(spanScore);
    levelCont.appendChild(divScore);    
    
    self.changeLevel(self.model.gameLevel);
    self.changeScore(self.model.score);
    self.changeHint(self.model.hints);
    self.changeShuffle(self.model.shuffles);
    self.changeGameBar(self.model.leftSwitches);    

    // marker
    gemCont.insertAdjacentHTML('afterbegin', ' <use class="marker" id="MARKER" xlink:href="gemsprite.svg#marker" style="opacity:0" x=0 y=0 /> ');   
    
  };

  self.changeWallpaper = function(level) {    
    switch(level) {
      case 1:          
        wallPaper.style.backgroundImage = 'url(images/background1.jpg)';              
        break;
      case 2:          
        wallPaper.style.backgroundImage = 'url(images/background2.jpg)';              
        break;
      case 3:          
        wallPaper.style.backgroundImage = 'url(images/background3.jpg)';              
        break;
      case 4:          
        wallPaper.style.backgroundImage = 'url(images/background4.jpg)';              
        break;
    }
  };

  self.changeLevel = function(level) {
    document.getElementById('LEVEL').innerText = level;
  };

  self.changeHint = function(amount) {
    document.getElementById('HINT').innerText = amount;
  };

  self.changeShuffle = function(amount) {
    document.getElementById('SHUFFLE').innerText = amount;
  };

  self.drawGem = function(color, i, j) {        
    let coordX = j*self.model.gemSize;
    let coordY = i*self.model.gemSize;
    gemCont.insertAdjacentHTML('beforeend', ' <use class="gem" id="'+gemIdPrefix+'_'+i+'_'+j+'" xlink:href="' +gemSrc+color+ '" x=' + coordX + ' y=' + coordY + ' />');  
  };

  self.drawGems = function(array) {
    for (let i=0; i<array.length; i++) {
      let row = array[i];
      for (let j=0; j<row.length; j++) {
        let color = array[i][j];
        let coordX = j*self.model.gemSize;
        let coordY = i*self.model.gemSize;
        gemCont.insertAdjacentHTML('beforeend', ' <use class="gem" id="'+gemIdPrefix+'_'+i+'_'+j+'" xlink:href="' +gemSrc+color+ '" x=' + coordX + ' y=' + coordY + ' />');
      }
    }
  };
  
  self.startGemAppearance = function() {
    gemCont.addEventListener('transitionend', self.startGemAppearanceCallback);
    gemCont.style.transform="translateZ(0px) translateX(-50%) translateY(calc(-50% + 550px))";
  };
  
  self.startGemAppearanceCallback = function() {
    gemCont.removeEventListener('transitionend', self.startGemAppearanceCallback);
    self.model.gameState = 'pick';
    self.showCongrats('go!');
    self.model.soundPlay(self.model.soundDroppedStart);
    self.model.soundBackPlay(self.model.gameSound);
  };


  self.showSelectedGem = function(row, column) {        
    let coordX = column*self.model.gemSize;
    let coordY = row*self.model.gemSize;
    let markerElem = document.getElementById('MARKER');    
    markerElem.setAttribute('x', coordX);
    markerElem.setAttribute('y', coordY);
    markerElem.style.opacity = "1";    
    let gemID = self.getGemID(row, column);  
    self.addClass(gemID, gemClassSelected);       
  };

  self.hideSelectedGem = function(gemID) {    
    let markerElem = document.getElementById('MARKER');
    markerElem.style.opacity = "0";    
    self.removeClass(gemID);           
  };  
  
  self.switchGems = function(selectedRow, selectedColumn, switchedRow, switchedColumn) {
    let offsetX = selectedColumn - switchedColumn;
    let offsetY = selectedRow - switchedRow;
    let selectedGemID = self.getGemID(selectedRow, selectedColumn);
    let selectedGem = document.getElementById(selectedGemID);
    let switchedGemID = self.getGemID(switchedRow, switchedColumn);      
    let switchedGem = document.getElementById(switchedGemID);
    selectedGem.addEventListener('transitionend', self.switchGemsCallback);
    switchedGem.addEventListener('transitionend', self.switchGemsCallback);
    self.addClass(selectedGemID, 'gem__switched');
    self.addClass(switchedGemID, 'gem__switched');
    let temp = selectedGemID;
    selectedGem.setAttribute('id', switchedGemID);
    switchedGem.setAttribute('id', temp); 
    if (offsetX == 1 || offsetX == -1) {  
      selectedGem.setAttribute('x', self.model.gemSize*switchedColumn);      
      switchedGem.setAttribute('x', self.model.gemSize*selectedColumn);          
    }
    else if (offsetY == 1 || offsetY == -1) {  
      selectedGem.setAttribute('y', self.model.gemSize*switchedRow);      
      switchedGem.setAttribute('y', self.model.gemSize*selectedRow);          
    }
    self.animatedItems = 2;
    self.model.soundPlay(self.model.soundSwitchedGem);    
  };

  self.switchGemsCallback = function (EO) {
    EO=EO||window.event;    
    self.animatedItems--;
    let gemID = EO.target.getAttribute('id');
    document.getElementById(gemID).removeEventListener('transitionend', self.switchGemsCallback);
    self.removeClass(gemID);
    if (self.animatedItems == 0) {
      self.model.checkSwitchBack();
    }
  };
  
  self.removeGems = function(removedGemsIDArray) {
    removedGemsIDArray.forEach((gemID) => {
      self.addClass(gemID, 'gem__removed');      
      document.getElementById(gemID).addEventListener('transitionend', self.removeGemsCallback);
      self.animatedItems++;     
      document.getElementById(gemID).style.opacity = "0";    
    });
    self.model.soundPlay(self.model.soundRemovedGem);
  };
  
  self.removeGemsCallback = function(EO) {
    EO=EO||window.event;    
    self.animatedItems--;
    let gemID = EO.target.getAttribute('id');
    let gem = document.getElementById(gemID);
    gem.removeEventListener('transitionend', self.removeGemsCallback);    
    gem.parentNode.removeChild(gem);    
    if (self.animatedItems == 0) {
      self.model.checkDropping();      
    }
  };

  self.showDroppedGems = function(row, column) {
    let gemID = self.getGemID(row, column);
    let gem = document.getElementById(gemID);    
    setTimeout ( () => {
      self.addClass(gemID, 'gem__dropped');
      gem.addEventListener('transitionend', self.showDroppedGemsCallback);
      gem.setAttribute('y', (row+1)*self.model.gemSize);
      self.animatedItems++;
      let newID = self.getGemID(row+1, column);
      gem.setAttribute('id', newID); 
    }, 0 );       
  };

  self.showDroppedGemsCallback = function(EO) {
    EO=EO||window.event;    
    self.animatedItems--;
    let gemID = EO.target.getAttribute('id');
    let gem = document.getElementById(gemID);
    gem.removeEventListener('transitionend', self.showDroppedGemsCallback);
    self.removeClass(gemID);
    if (self.animatedItems == 0) {      
      self.model.checkDropping();      
    }        
  };  
  
  self.drawRefilledGem = function(color, i, j) {        
    let coordX = j*self.model.gemSize;
    let coordY = (i-4)*self.model.gemSize;   // -4, чтобы появились за пределами поля
    gemCont.insertAdjacentHTML('afterbegin', ' <use class="gem" id="'+gemIdPrefix+'_'+i+'_'+j+'" xlink:href="' +gemSrc+color+ '" x=' + coordX + ' y=' + coordY + ' />');  
  };
  
  self.showRefilledGems = function(array) {
    for (let i=array.length-1; i>=0; i--) {
      let gemID = array[i];
      let gem = document.getElementById(gemID);
      let row = getRow(gemID);
      let column = getColumn(gemID);     
      setTimeout ( () => {
        self.addClass(gemID, 'gem__refilled');
        gem.addEventListener('transitionend', self.showRefilledGemsCallback);
        gem.setAttribute('x', column*self.model.gemSize);
        gem.setAttribute('y', row*self.model.gemSize);
        self.animatedItems++;        
      }, 0 );
    }
  };

  self.showRefilledGemsCallback = function(EO) {
    EO=EO||window.event;    
    self.animatedItems--;
    let gemID = EO.target.getAttribute('id');
    let gem = document.getElementById(gemID);
    gem.removeEventListener('transitionend', self.showRefilledGemsCallback);
    self.removeClass(gemID);
    if (self.animatedItems == 0) {
      self.model.soundPlay(self.model.soundDroppedGem);
      self.model.checkRefilledGemsMatches();      
    }
  };

  self.showPoints = function(removedGemsIDArray) {
    let pointsText;
    switch (removedGemsIDArray.length) {
      case 3:        
        pointsText = removedGemsIDArray.length*self.model.gameLevel*self.model.gemValue;                
        break;
      case 4:
        pointsText = removedGemsIDArray.length*self.model.gameLevel*self.model.gemValue*2;
        self.showCongrats('good!');                
        break;
      default:
        pointsText = removedGemsIDArray.length*self.model.gameLevel*self.model.gemValue*3;
        self.showCongrats('awesome!');                
        break;        
    }    
    let coordX = getColumn(removedGemsIDArray[1])*self.model.gemSize + self.model.gemSize/2;
    let coordY = getRow(removedGemsIDArray[1])*self.model.gemSize + self.model.gemSize/2;    
    let points = document.createElementNS('http://www.w3.org/2000/svg','text');                
    points.setAttribute("x", coordX);           
    points.setAttribute("y", coordY);
    points.textContent = pointsText;            
    points.setAttribute('class', 'points');          
    points.addEventListener('animationend', self.showPointsCallback);
    gemCont.appendChild(points);  
  };

  self.showCongrats = function(word) {    
    let coordX = self.model.fieldSize*self.model.gemSize/2;
    let coordY = self.model.fieldSize*self.model.gemSize/2;    
    let congrats = document.createElementNS('http://www.w3.org/2000/svg','text');                
    congrats.setAttribute("x", coordX);           
    congrats.setAttribute("y", coordY);
    congrats.textContent = word;
    congrats.setAttribute('class', 'congrats');          
    congrats.addEventListener('animationend', self.showCongratsCallback);        
    gemCont.appendChild(congrats);    
  };

  self.changeScore = function(score) {
    document.getElementById('SCORE').innerText = score;
  };


  self.changeGameBar = function(leftSwitches) {
    let width = self.model.fieldSize*self.model.gemSize*(self.model.validSwitches-leftSwitches)/self.model.validSwitches;
    document.getElementById('BAR').setAttribute('width', width);
  };


  self.showPointsCallback = function(EO) {
    EO=EO||window.event;        
    EO.target.removeEventListener('animationend', self.showPointsCallback);
    gemCont.removeChild(EO.target);
  };

  self.showCongratsCallback = function(EO) {
    EO=EO||window.event;        
    EO.target.removeEventListener('animationend', self.showCongratsCallback);
    gemCont.removeChild(EO.target);    
  };
  
  self.showAdvice = function(sentence) {
    alert(sentence);
  };

  self.showGameOver = function() {    
    let coordX = self.model.fieldSize*self.model.gemSize/2;
    let coordY = self.model.fieldSize*self.model.gemSize/2;    
    let congrats = document.createElementNS('http://www.w3.org/2000/svg','text');                
    congrats.setAttribute("x", coordX);           
    congrats.setAttribute("y", coordY);
    congrats.textContent = 'game over';
    congrats.setAttribute('class', 'game-over');          
    congrats.addEventListener('animationend', self.showGameOverCallback);        
    gemCont.appendChild(congrats);
  };

  self.showGameOverCallback = function(EO) {
    EO=EO||window.event;        
    EO.target.removeEventListener('animationend', self.showGameOverCallback);
    gemCont.removeChild(EO.target);  
  };

  self.showLevelCompleted = function() {
    let coordX = self.model.fieldSize*self.model.gemSize/2;
    let coordY = self.model.fieldSize*self.model.gemSize/2;    
    let congrats = document.createElementNS('http://www.w3.org/2000/svg','text');                
    congrats.setAttribute("x", coordX);           
    congrats.setAttribute("y", coordY);
    congrats.innerHTML = 'level completed';
    congrats.setAttribute('class', 'level-completed');            
    gemCont.appendChild(congrats);    
  };
  
  self.showCurtainClosed = function() {
    const curtainLeft = document.getElementById('CURTAINLEFT');
    const curtainRight = document.getElementById('CURTAINRIGHT');
    curtainLeft.style.transform = 'translateZ(0px) translateX(100%) translateY(0px)';
    curtainRight.style.transform = 'translateZ(0px) translateX(-100%) translateY(0px)';
    curtainLeft.style.opacity = '1';
    curtainRight.style.opacity = '1';
    curtainLeft.addEventListener('transitionend', self.showLevelChanged);  
  };

  self.showLevelChanged = function(EO) {
    EO=EO||window.event;    
    EO.target.removeEventListener('transitionend', self.showLevelChanged);
    self.changeWallpaper(self.model.gameLevel);
    self.changeGameBar(self.model.leftSwitches);
    self.changeLevel(self.model.gameLevel);    
    let congrats = document.getElementsByClassName('level-completed')[0];
    gemCont.removeChild(congrats);    
    self.model.renewGems();        
    self.showCurtainOpen();
  };

  self.showCurtainOpen = function() {
    const curtainLeft = document.getElementById('CURTAINLEFT');
    const curtainRight = document.getElementById('CURTAINRIGHT');
    curtainLeft.style.transform = 'translateZ(0px) translateX(0%) translateY(0px)';
    curtainRight.style.transform = 'translateZ(0px) translateX(0%) translateY(0px)';
    curtainLeft.style.opacity = '0';
    curtainRight.style.opacity = '0';
    curtainLeft.addEventListener('transitionend', self.showCurtainOpenCallBack);  
  };

  self.showCurtainOpenCallBack = function(EO) {
    EO=EO||window.event;
    EO.target.removeEventListener('transitionend', self.showCurtainOpenCallBack);
  };

  self.showShuffledGems = function(array) {
    self.hideGems();    
    self.redrawGems(array);    
  };

  self.hideGems = function() {
    gemCont.addEventListener('transitionend', self.hideGemsCallback);
    gemCont.style.opacity = '0';
    gemCont.style.transform = 'translateZ(0) translateX(-50%) translateY(calc(-50% - 550px))';
  };

  self.hideGemsCallback = function() {      
    gemCont.removeEventListener('transitionend', self.hideGemsCallback);
    gemCont.style.opacity = '1';
    self.startGemAppearance();
    self.controller.unlockButton("SHUFFLEBUTTON");
  };

  self.redrawGems = function(array) {
    for (let i=0; i<array.length; i++) {
      let row = array[i];
      for (let j=0; j<row.length; j++) {
        let gem = document.getElementById(self.getGemID(i,j));
        let color = array[i][j];
        gem.setAttribute('xlink:href', gemSrc+color);
      }
    }
  };

  self.showHintArrows = function(gemID) {        
    let row = getRow(gemID);
    let column = getColumn(gemID);
    const leftCont = gemCont.getBoundingClientRect().left;
    const topCont = gemCont.getBoundingClientRect().top;
    const widthCont = gemCont.getBoundingClientRect().width; 
    const ratio = widthCont/(self.model.fieldSize*self.model.gemSize);    
    arrowCont.style.left = (column-0.5)*self.model.gemSize*ratio+leftCont +'px';
    arrowCont.style.top = (row-0.5)*self.model.gemSize*ratio+topCont +'px';
    arrowCont.style.width = self.model.gemSize*2*ratio + 'px';
    arrowCont.style.height = self.model.gemSize*2*ratio + 'px';
    self.drawHintArrows();   
    let arrow = document.getElementById('ARROWLEFT');
    arrow.addEventListener('animationend', self.hideHintArrows);    
  };

  self.drawHintArrows = function() {    
    arrowCont.insertAdjacentHTML('beforeend', ` <use class="arrow left" id="ARROWLEFT" xlink:href="gemsprite.svg#arrow-left"
     x= ${self.model.gemSize/2-arrowSize} y= ${self.model.gemSize-arrowSize/2} /> `);
    arrowCont.insertAdjacentHTML('beforeend', ` <use class="arrow right" xlink:href="gemsprite.svg#arrow-right"
     x= ${1.5*self.model.gemSize} y= ${self.model.gemSize-arrowSize/2} /> `);
    arrowCont.insertAdjacentHTML('beforeend', ` <use class="arrow top" xlink:href="gemsprite.svg#arrow-top"
     x= ${self.model.gemSize-arrowSize/2} y= ${self.model.gemSize/2-arrowSize} /> `);
    arrowCont.insertAdjacentHTML('beforeend', ` <use class="arrow bottom" xlink:href="gemsprite.svg#arrow-bottom"
     x= ${self.model.gemSize-arrowSize/2} y= ${1.5*self.model.gemSize} /> `);
  };

  self.hideHintArrows = function() {
    let arrow = document.getElementById('ARROWLEFT');
    arrow.removeEventListener('animationend', self.hideHintArrows);
    let arrows = document.querySelectorAll('.arrow');    
    for (let i=0; i<arrows.length; i++) {
      arrowCont.removeChild(arrows[i]);
    }
    arrowCont.style.left = 0 +'px';
    arrowCont.style.top = 0 +'px';
    self.controller.unlockButton("HINTBUTTON");
  };

  self.removeClass = function(elemID) {
    document.getElementById(elemID).setAttribute('class', gemClass);    
  };

  self.getGemID = function(row, column) {
    let gemID = gemIdPrefix + '_' +row+ '_' + column;    
    return gemID;    
  };

  self.addClass = function(elemID, className) {
    document.getElementById(elemID).setAttribute('class', gemClass+' '+className);    
  };

  function getRow(gemID) {
    let row = parseInt(gemID.split('_')[1]);    
    return row;
  }

  function getColumn(gemID) {    
    let column = parseInt(gemID.split('_')[2]);
    return column;
  }

  self.resize = function() {
    self.replaceGameBar();
  }

  self.replaceGameBar = function() {
    let fieldWidth = svgElemField.getBoundingClientRect().width;
    let fieldTop = svgElemField.getBoundingClientRect().top;
    svgElemBar.style.top = Math.floor(fieldTop + fieldWidth) +'px';
  };

  self.showGameResult = function() {
    document.getElementById('NAME').innerText = self.model.name;    
    document.getElementById('RESULT').innerText = self.model.score;
    document.getElementById('GRMESSAGE').style = 'opacity: 1; z-index: 20';
    window.localStorage.setItem('bejewelled', null);
  };
}
