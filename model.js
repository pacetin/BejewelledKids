"use strict";

function bejewelledModel(playerName) {
  let self = this;
  self.view = null;
  self.name = playerName.trim()||'Player';
  self.fieldSize = 8;
  self.gemSize = 100;
  let gemIdPrefix = 'gem';
  self.gemClass = 'gem';
  self.gemClassSelected = 'gem__selected';
  self.gameLevel = 1;
  self.gameLevelTotal = 4;
  self.gameState = '';
  self.score = 0;
  self.gemValue = 25; // награда за 1 гем
  self.hints = 5;
  self.shuffles = 3;
  self.validSwitches = 20; // количество результативных смен на одном уровне игры
  self.leftSwitches = 20;
  self.possibleSwitches = null;
  self.counter = 0;
  
  let selectedElemID = null;
  let selectedRow = null;
  let selectedColumn = null;
  let switchedRow = null;
  let switchedColumn = null;
  let posXStart = null;
  let posYStart = null;
  let gems = [];
  let savedModel = {name:"", gamelevel:"", score:"", hints:"", shuffles:"", leftswitches:"", gems:""};
  let movingItems;
  let gemColors = [
    'red', 
    'yellow', 
    'blue', 
    'violet', 
    'green', 
    'pink', 
    'grey'
  ];

  self.gameSound = new Audio('sounds/pirates.mp3');  
  self.soundDroppedStart = new Audio('sounds/dropped1.mp3');
  self.soundDroppedGem = new Audio('sounds/dropped2.mp3');
  self.soundRemovedGem = new Audio('sounds/removed.mp3');
  self.soundSwitchedGem = new Audio('sounds/switch.mp3');
  self.soundGameOver = new Audio('sounds/game_over.mp3');
  self.soundLevelCompleted = new Audio('sounds/level_completed.mp3');  

  self.bind = function(view, controller) {
    self.view = view;
    self.controller = controller;
  };

    
  self.initiate = function() {
    self.createGemArray();
    self.createGemColorArray();
    self.findSwitches(gems);
    let matchedGemsIDArray = [];
    while (self.possibleSwitches.length == 0 || matchedGemsIDArray.length != 0) {
      self.shuffleGemsInArray(gems);
      self.findSwitches(gems);
      matchedGemsIDArray = self.getMatchesArray(); 
    };
  
    self.view.startGemAppearance();
  };

  self.initiateFromStorage = function() {
    let isResume = self.checkStorage();   
    if (isResume) {
      self.view.drawGems(gems);          
      self.view.startGemAppearance();
    }
    else {
      self.initiate();
    }     
  };

  self.createGemColorArray = function() {
    for (let i=0; i<self.fieldSize; i++) {      
      for (let j=0; j<self.fieldSize; j++) {        
        let color;
        do {
          let colorNum = Math.floor(Math.random()*gemColors.length);
          color = gemColors[colorNum];
          gems[i][j] = color;          
        }
        while (isMatch3(i,j));
        self.view.drawGem(color, i, j);        
      }
    }

    function isMatch3(row, column) {      
      return (isHorizontalMatch3(row, column)||isVerticalMatch3(row, column));
    }

    function isHorizontalMatch3(row, column) {
      let match = 1;
      let gemColor = gems[row][column];      
      while (column>0 && gems[row][column-1] == gemColor) {
        match++;
        column--;
      }      
      return (match>2);
    }

    function isVerticalMatch3(row, column) {
      let match = 1;
      let gemColor = gems[row][column];      
      while (row>0 && gems[row-1][column] == gemColor) {
        match++;
        row--;
      }       
      return (match>2);
    }
  };

  self.createGemArray = function() {      
    for (let i=0; i<self.fieldSize; i++) {
      gems[i] = [];
      for (let j=0; j<self.fieldSize; j++) {
        gems[i][j] = -1;
      }
    }
  };

  self.findSwitches = function(array) {
    self.possibleSwitches = [];
    self.counter = 0;
    for (let i=0; i<self.fieldSize; i++) {      
      for (let j=0; j<self.fieldSize; j++) {
        if (array[i][j]===self.getColor(i+1, j)) {
          let color = array[i][j];
          if (self.getColor(i+2, j-1)===color){
            self.possibleSwitches.push(getGemID(i+2, j-1))
          }
          if (self.getColor(i+2, j+1)===color){
            self.possibleSwitches.push(getGemID(i+2, j+1))
          }
          if (self.getColor(i+3, j)===color){
            self.possibleSwitches.push(getGemID(i+3, j))
          }
          if (self.getColor(i-1, j-1)===color){
            self.possibleSwitches.push(getGemID(i-1, j-1))
          }
          if (self.getColor(i-1, j+1)===color){
            self.possibleSwitches.push(getGemID(i-1, j+1))
          }
          if (self.getColor(i-2, j)===color){
            self.possibleSwitches.push(getGemID(i-2, j))
          }
        }
        if (array[i][j]===self.getColor(i, j+1)) {
          let color = array[i][j];
          if (self.getColor(i-1, j+2)===color){
            self.possibleSwitches.push(getGemID(i-1, j+2))
          }
          if (self.getColor(i+1, j+2)===color){
            self.possibleSwitches.push(getGemID(i+1, j+2))
          }
          if (self.getColor(i, j+3)===color){
            self.possibleSwitches.push(getGemID(i, j+3))
          }
          if (self.getColor(i-1, j-1)===color){
            self.possibleSwitches.push(getGemID(i-1, j-1))
          }
          if (self.getColor(i+1, j-1)===color){
            self.possibleSwitches.push(getGemID(i+1, j-1))
          }
          if (self.getColor(i, j-2)===color){
            self.possibleSwitches.push(getGemID(i, j-2))
          }
        }
        if (array[i][j]===self.getColor(i, j+2)) {
          let color = array[i][j];
          if (self.getColor(i-1, j+1)===color){
            self.possibleSwitches.push(getGemID(i-1, j+1))
          }
          if (self.getColor(i+1, j+1)===color){
            self.possibleSwitches.push(getGemID(i+1, j+1))
          }          
        }
        if (array[i][j]===self.getColor(i+2, j)) {
          let color = array[i][j];
          if (self.getColor(i+1, j-1)===color){
            self.possibleSwitches.push(getGemID(i+1, j-1))
          }
          if (self.getColor(i+1, j+1)===color){
            self.possibleSwitches.push(getGemID(i+1, j+1))
          }          
        }
      }
    }
  };

  self.shuffleGemsInArray = function(array) {    
    for (let i=array.length-1; i>0; i--) {      
      let j = Math.floor(Math.random()*(i+1));
      [array[i], array[j]] = [array[j], array[i]];      
    }
  };  

  self.mouseDownHandler = function(EO) {    
    let elemClass = EO.target.getAttribute('class');       
    if (elemClass == self.gemClass || elemClass == (self.gemClass +' '+ self.gemClassSelected)){
      if (self.gameState === 'pick') {
        let elemID = EO.target.getAttribute('id');
        let row = getRow(elemID);
        let column = getColumn(elemID); 
        // 1-ой - гем выбран, но этот же        
        if (selectedRow !== null) {
          if (selectedRow === row && selectedColumn === column) {            
            self.view.hideSelectedGem(elemID);
            selectedRow = null;
            selectedColumn = null;
            selectedElemID = null;
          }
          // 2-ый - гем выбран, и он соседний
          else if ((Math.abs(selectedRow-row) == 1 && selectedColumn-column == 0)
          ||(Math.abs(selectedColumn-column) == 1 && selectedRow-row == 0)) {
            self.view.hideSelectedGem(selectedElemID);
            self.gameState = 'switch';  
            switchedRow = row;
            switchedColumn = column;
            self.switchGemsInArray();
          }
          // 3-й - гем выбран, и он не соседний
          else {            
            self.view.hideSelectedGem(selectedElemID);
            self.view.showSelectedGem(row, column);
            selectedRow = row;
            selectedColumn = column;
            selectedElemID = elemID;
          } 
        }
        // 4-й - гем не был выбран до этого
        else {
          posXStart = EO.pageX||EO.changedTouches[0].pageX;
          posYStart = EO.pageY||EO.changedTouches[0].pageY;
          selectedRow = row;
          selectedColumn = column;
          selectedElemID = elemID;
          self.view.showSelectedGem(row, column);
        }        
      }
    }
    
  };

  self.mouseMoveHandler = function(EO) {    
    if (selectedRow != null && self.gameState === 'pick') {             
      let posXEnd = EO.pageX||EO.changedTouches[0].pageX;
      let posYEnd = EO.pageY||EO.changedTouches[0].pageY;
      let shiftX = posXEnd-posXStart;
      let shiftY = posYEnd-posYStart;
      if (Math.max( Math.abs(shiftX), Math.abs(shiftY)) === Math.abs(shiftX)) {
        if (shiftX>10 && (selectedColumn+1)<self.fieldSize) {            
          switchedRow = selectedRow;
          switchedColumn = selectedColumn + 1;  
        }
        else if (shiftX<-10 && (selectedColumn-1)>=0) {            
          switchedRow = selectedRow;
          switchedColumn = selectedColumn - 1;  
        }
        else
          return;
      }
      else {
        if (shiftY>10  && (selectedRow+1)<self.fieldSize) {            
          switchedRow = selectedRow + 1;
          switchedColumn = selectedColumn;
        }
        else if (shiftY<-10  && (selectedRow-1)>=0) {            
          switchedRow = selectedRow - 1;
          switchedColumn = selectedColumn;  
        }
        else
          return;
      }
      self.view.hideSelectedGem(selectedElemID);
      self.gameState = 'switch';
      self.switchGemsInArray();      
    }         
  };
  
  self.switchGemsInArray = function() {
    let temp = gems[selectedRow][selectedColumn];    
    gems[selectedRow][selectedColumn] = gems[switchedRow][switchedColumn];
    gems[switchedRow][switchedColumn] = temp;  
    self.view.switchGems(selectedRow, selectedColumn, switchedRow, switchedColumn);    
  };
  
  self.checkSwitchBack = function() { 
    if (self.gameState == 'switch') {
      let matchedGemsIDArray = self.getMatchesArray();              
      if (matchedGemsIDArray.length != 0) {
        self.gameState = 'remove';                
        self.leftSwitches--;            
        self.removeGemsInArray(matchedGemsIDArray);            
      }          
      else {
        self.gameState = 'revert';
        self.switchGemsInArray();
      } 
    }
    if (self.gameState == 'revert') {      
      self.gameState = 'pick';
      selectedElemID = null;
      selectedRow = null;
      selectedColumn = null;
      switchedRow = null;
      switchedColumn = null; 
    }              
  };  

  self.removeGemsInArray = function (removedGemsIDArray) {
    removedGemsIDArray.forEach((gemID) => {
      let row = getRow(gemID);
      let column = getColumn(gemID);
      gems[row][column] = -1;      
    });          
    self.view.removeGems(removedGemsIDArray);
    self.view.showPoints(removedGemsIDArray);
    self.countScore(removedGemsIDArray.length);
    self.view.changeScore(self.score);
    self.view.changeGameBar(self.leftSwitches);
  };

  self.checkDropping = function() {
    let droppingItems = 0;
    for (let j=0; j<self.fieldSize; j++) {
      for (let i=self.fieldSize -1; i>0; i--) {
        if (gems[i][j] == -1 && gems[i-1][j] != -1 ) {                    
          self.view.showDroppedGems(i-1, j);
          gems[i][j] = gems[i-1][j];
          gems[i-1][j] = -1;
          droppingItems++;  
        }        
      }
    }
    if (droppingItems == 0) { 
      self.soundPlay(self.soundDroppedGem);     
      let matchedGemsIDArray = self.getMatchesArray();               
      if (matchedGemsIDArray.length != 0) {               
        self.removeGemsInArray(matchedGemsIDArray);                    
      }          
      else {
        self.gameState = 'refill';
        self.addNewGemsInArray();        
      }    
    }        
  };

  self.addNewGemsInArray = function() {
    let refilledGemsID = [];    
    for (let i=0; i<self.fieldSize; i++) {
      for (let j=0; j<self.fieldSize; j++) {
        if (gems[i][j] == -1) {
          let colorNum = Math.floor(Math.random()*gemColors.length);
          let color = gemColors[colorNum];
          gems[i][j] = color;
          self.view.drawRefilledGem(color, i, j);
          refilledGemsID.push( getGemID(i, j) );          
        }
      }
    }
    self.view.showRefilledGems(refilledGemsID);
  };

  self.checkRefilledGemsMatches = function() {
    let matchedGemsIDArray = self.getMatchesArray();              
    if (matchedGemsIDArray.length != 0) {
      self.gameState = 'remove';
      self.removeGemsInArray(matchedGemsIDArray);                   
    }          
    else {
      self.findSwitches(gems); 
      if (self.possibleSwitches.length == 0) {
        self.soundBackPause(self.gameSound);        
        self.soundPlay(self.soundGameOver);
        self.view.showGameOver();
        self.gameState = 'game over';
        if (self.shuffles) {
          self.view.showAdvice('You still can shuffle gems and continue to play');  
          self.gameState = 'pick';
        } else {
          self.updateHighScore();
          setTimeout(self.view.showGameResult.bind(this), 1500);
        }             
      } else if (self.leftSwitches != 0) {
      self.gameState = 'pick';
      selectedElemID = null;
      selectedRow = null;
      selectedColumn = null;
      switchedRow = null;
      switchedColumn = null;
      } else if (self.leftSwitches == 0) {
        if (self.gameLevel == self.gameLevelTotal) {
          self.soundBackPause(self.gameSound);
          self.soundPlay(self.soundGameOver);
          self.view.showGameOver();
          self.gameState = 'game over';
          self.updateHighScore();
          setTimeout(self.view.showGameResult.bind(this), 1500);
        }
        else {
          self.gameState = 'level completed';
          self.soundBackPause(self.gameSound);
          self.soundPlay(self.soundLevelCompleted);        
          self.view.showLevelCompleted();
          self.increaseLevel();
          selectedElemID = null;
          selectedRow = null;
          selectedColumn = null;
          switchedRow = null;
          switchedColumn = null;
        }
      }      
    }  
  };
  
  self.increaseLevel = function() {
    self.gameLevel++;
    self.leftSwitches = self.validSwitches;
    self.view.showCurtainClosed();
  };

  self.getMatchesArray = function() {
    let matches = [];    
    for (let i = 0; i < self.fieldSize; i++) {
      for (let j = 0; j < self.fieldSize; j++) {
        if (self.isMatches(i, j)){
          matches.push(getGemID(i,j));
        }
      }
    }    
    return matches;
  };

  self.isMatches = function(row, column) {          
    return (self.isHorizontalMatch(row, column)||self.isVerticalMatch(row, column));
  };

  self.isHorizontalMatch = function(row, column) {    
    return ( 
      self.getColor(row, column) === self.getColor(row, column-1) && self.getColor(row, column) === self.getColor(row, column-2) && self.getColor(row, column) !== -1 || 
      self.getColor(row, column) === self.getColor(row, column+1) && self.getColor(row, column) === self.getColor(row, column+2) && self.getColor(row, column) !== -1 ||   
      self.getColor(row, column) === self.getColor(row, column-1) && self.getColor(row, column) === self.getColor(row, column+1) && self.getColor(row, column) !== -1
    )   
  };

  self.isVerticalMatch = function(row, column) {    
    return ( 
    self.getColor(row, column) === self.getColor(row-1, column) && self.getColor(row, column) === self.getColor(row-2, column) && self.getColor(row, column) !== -1 || 
    self.getColor(row, column) === self.getColor(row+1, column) && self.getColor(row, column) === self.getColor(row+2, column) && self.getColor(row, column) !== -1 ||   
    self.getColor(row, column) === self.getColor(row-1, column) && self.getColor(row, column) === self.getColor(row+1, column) && self.getColor(row, column) !== -1
    )
  };

  self.getColor = function(row, column) {
    if (self.isValidPick(row, column)) {
      return gems[row][column];
    }
    else 
      return undefined;        
  };


  self.isValidPick = function(row, column) {
    return row >= 0 && row < self.fieldSize && column >= 0 && column < self.fieldSize;
  };
  

  function getGemID(row, column) {
    let gemID = gemIdPrefix + '_' +row+ '_' + column;    
    return gemID;    
  }

  function getRow(gemID) {
    let row = parseInt(gemID.split('_')[1]);    
    return row;
  }

  function getColumn(gemID) {    
    let column = parseInt(gemID.split('_')[2]);
    return column;
  }

  self.soundPlay = function(sound) {
    sound.currentTime=0;
    sound.play();
  };

  self.soundBackPlay = function(sound) {
    sound.volume = 0.3;
    sound.loop = true;
    sound.play();
  };

  self.soundBackPause = function(sound) {
    sound.pause();
  };

  self.countScore = function (gemsAmount) {
    switch(gemsAmount) {
      case 3:          
        self.score += gemsAmount*self.gemValue*self.gameLevel;             
        break;
      case 4:          
        self.score += gemsAmount*self.gemValue*self.gameLevel*2;              
        break;
      default :          
        self.score += gemsAmount*self.gemValue*self.gameLevel*3;             
        break;      
    }    
  };

  self.shuffleGems = function() {
    if (self.shuffles) {
      self.controller.lockButton('SHUFFLEBUTTON');      
      do {
        self.shuffleGemsInArray(gems);
        self.findSwitches(gems);
        var matchedGemsIDArray = self.getMatchesArray();
      }
      while (self.possibleSwitches.length == 0 || matchedGemsIDArray.length != 0);      
      self.view.showShuffledGems(gems);
      self.shuffles--;
      self.view.changeShuffle(self.shuffles); 
    }
    else {
      self.view.showAdvice('Unfortunately, your shuffle opportunity has already finished')
    }    
  };

  self.getHint = function() {
    if (self.hints) {    
      self.controller.lockButton('HINTBUTTON');
      self.view.showHintArrows(self.possibleSwitches[self.counter]);
      self.counter++;
      self.hints--;
      self.view.changeHint(self.hints);
    }
    else {
      self.view.showAdvice('Unfortunately, your hint opportunity has already finished')
    }
  };

  self.renewGems = function() {    
    do {
      self.shuffleGemsInArray(gems);
      self.findSwitches(gems);
      var matchedGemsIDArray = self.getMatchesArray(); 
    }
    while (self.possibleSwitches.length == 0 || matchedGemsIDArray.length != 0);    
    self.view.showShuffledGems(gems);
  };

  self.resizeInit = function() {        
    self.view.resize();
  };

  self.updateHighScore = function() {
    let password;
    let ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    let stringName='CETIN_HIGHSCORE';
    let highScoreArray = [];
    lockHighScore();


    function lockHighScore() {
      password=Math.random();
      $.ajax( {
              url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
              data : { f : 'LOCKGET', n : stringName, p : password },
              success : pushScore, error : errorHandler
      } );
    }
    
    function pushScore(callresult) {
      if ( callresult.error != undefined )
        console.log(callresult.error);
      else { 
        highScoreArray = JSON.parse(callresult.result);          
        if ( !Array.isArray(highScoreArray) ) {
          highScoreArray = [];
        }
        if ( self.score > highScoreArray[highScoreArray.length-1].score || highScoreArray === []) {
          highScoreArray.pop();
          highScoreArray.push( {name:self.name, score: self.score} );
          highScoreArray.sort( (a,b) => b.score-a.score );
        }        
        $.ajax( {
          url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
          data : { f : 'UPDATE', n : stringName, v : JSON.stringify(highScoreArray), p : password },
          success : updateReady, error : errorHandler
        } );  
      }
    }

    function updateReady(callresult) {
      if ( callresult.error != undefined )
        console.log(callresult.error);      
    }

    function errorHandler(jqXHR,statusStr,errorStr) {
      console.log(statusStr+' '+errorStr);
    }
  };

  self.store = function() {
    savedModel.name = self.name;
    savedModel.gamelevel = self.gameLevel;
    savedModel.score = self.score;    
    savedModel.hints = self.hints;
    savedModel.shuffles = self.shuffles;
    savedModel.leftswitches = self.leftSwitches;
    savedModel.gems = gems;
    let savedModelString = JSON.stringify(savedModel);
    window.localStorage.setItem('bejewelled', savedModelString);
    savedModel = {name:"", gamelevel:"", score:"", hints:"", shuffles:"", leftswitches:"", gems:""};
  };

  self.checkStorage = function() {
    let savedModelString = window.localStorage.getItem('bejewelled');
    let savedModel = JSON.parse(savedModelString);    
    if (!savedModel) {
      return false;
    }    
    else if (savedModel.leftswitches == 0 && savedModel.gamelevel == self.gameLevelTotal) {
      return false; 
    }   
    else {
      self.name = savedModel.name;
      self.gameLevel = savedModel.gamelevel;
      self.score = savedModel.score;    
      self.hints = savedModel.hints;
      self.shuffles = savedModel.shuffles;
      self.leftSwitches = savedModel.leftswitches;
      gems = savedModel.gems;
      return true;
    }               
  };

}