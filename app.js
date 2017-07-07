var gameController = (function(){
})();

var UIController = (function(){
    var DOMstrings = {
        dialogue: '.dialogue',
        speaker: '.speaker',
        horsebox: '#horsebox',
        furyBar: '#furybar',
        yes: '#yes',
        no: '#no',
        refresh: '#refresh',
        hidden__noPeriod: 'hidden',
        laverne: '#laverneBlock',
        garrett: '#garrettBlock',
        fade__noPeriod: 'fade',
        invert__noPeriod: 'invert',
        answer: '.answer',
        endButton: '#endButton',
        game: '.game',
        endgame: '.endGame',
        playAgain: '#playAgain',
        endBtn: '.endBtn'
    };
    
    var DOMgarrettDialogue = {
        dialogue1: 'That\'s not my horse, Laverne.',
        dialogue2: 'Laverne, seriously, it\'s not my horse.',
        dialogue3: 'It\'s my landlord\'s.',
        dialogue4: 'I\'ve got things to do, seriously.',
        dialogue5: '[sarcastic] Is that your corn, Laverne?',
        dialogue6: 'I\'m gonna loose my shit.',
        endDialogue: 'Fine Laverne. Whatever.'
    }
    
    var DOMdialogue = {
        init: "Some horse got itself intah mah curn! Is this yer varmint?!",
        laverne: 'Laverne',
        garrett: 'Garrett',
        dialogue1: 'How \'bout this mangy excuse fer a pony?',
        dialogue2: 'Is this dusty saddle bag yers then?',
        dialogue3: 'This\'n yers then?',
        dialogue4: 'How about this sad excuse fer a dandy?',
        dialogue5: 'Is this apple-muncher yers or not?',
        dialogue6: 'Yeh seen this squat-trotter befer?',
        endDialogue: 'TAKE THIS HORSE AWAY NOW!!!'
    };
        
    var updateTextContent = function(target, newText){
        document.querySelector(target).textContent = newText;
    };
    
    var horseNum = function(){
       return Math.round(Math.random() * 5 + 1);
    };
    
    var randomHorse = function(){
       var num;
        num = horseNum();
        document.querySelector(UIController.DOMstrings.horsebox).style.background = 'url("horse_' + num + '.png") center center no-repeat'
    };
    var curWidth = 0;
    
    var updateFuryMeter= function(endFunction){
       console.log(curWidth);
        if(curWidth === 0){
            document.querySelector(UIController.DOMstrings.furyBar).style.width = "44px";
            curWidth = 44;
        } else if (curWidth > 0 && curWidth < 570){
            curWidth += 62;
            console.log(curWidth);
            document.querySelector(UIController.DOMstrings.furyBar).style.width = curWidth + "px";
               } else {
                   console.log('Death');
                   endFunction();
               }
        
            }
    var toggleClass = function(target, className){
        document.querySelector(target).classList.toggle(className);

    }
    
    var toggleBtns = function(){
        toggleClass(UIController.DOMstrings.no, UIController.DOMstrings.hidden__noPeriod);
        toggleClass(UIController.DOMstrings.yes, UIController.DOMstrings.hidden__noPeriod);
        toggleClass(UIController.DOMstrings.refresh, UIController.DOMstrings.hidden__noPeriod);
    }
        
    var toggleSpeaker = function(){
        toggleClass(UIController.DOMstrings.laverne, UIController.DOMstrings.fade__noPeriod);
        toggleClass(UIController.DOMstrings.garrett, UIController.DOMstrings.fade__noPeriod);

    }
    
    var visibleButtons = function(className, addRemove){
         var classArray = document.querySelectorAll(className);
        classArray.forEach(function(cur){
            cur.classList[addRemove](DOMstrings.hidden__noPeriod);
            console.log(cur.classList);
        })

        
        
    }
    
    var resetCurWidth = function(){
            curWidth = 0;
            document.querySelector(UIController.DOMstrings.furyBar).style.width = curWidth + "px";
        }
    return {
        DOMstrings: DOMstrings,
        updateText: updateTextContent,
        DOMdialogue: DOMdialogue,
        randomHorse: randomHorse,
        updateFuryMeter: updateFuryMeter,
        DOMgarrett: DOMgarrettDialogue,
        toggleBtns: toggleBtns,
        toggleSpeaker: toggleSpeaker,
        horseNum: horseNum,
        toggleClass: toggleClass,
        visibleButtons: visibleButtons,
        resetCurWidth: resetCurWidth
    }
})();

var appCtrl = (function(gameCtrl, UICtrl){
    var noClick = function(){
        // 1. update dialogue
        UICtrl.updateText(UICtrl.DOMstrings.dialogue, UICtrl.DOMgarrett['dialogue' + UICtrl.horseNum()]);
        
        UICtrl.updateText(UICtrl.DOMstrings.speaker, UICtrl.DOMdialogue.garrett);
        
        // 2. fade in garrett, out laverne
        UICtrl.toggleSpeaker();
        
        // 3. update fury meter
        UICtrl.updateFuryMeter(endGame);
        // 4. display refresh button, hide other buttons
        
        UICtrl.toggleBtns();
        
        // 
    }
    
    var refreshClick = function(){
         // 1. update dialogue
        UICtrl.updateText(UICtrl.DOMstrings.dialogue, UICtrl.DOMdialogue['dialogue' + UICtrl.horseNum()]);
        
        UICtrl.updateText(UICtrl.DOMstrings.speaker, UICtrl.DOMdialogue.laverne);
        
        // 2. fade in garrett, out laverne
        UICtrl.toggleSpeaker();
        
        // 3. display refresh button, hide other buttons
        
        UICtrl.toggleBtns();
        
        // 4. change animal photo
        
        UICtrl.randomHorse();
    }
    
    
    var endGame = function(){
        // 1. Update dialogue
        UICtrl.updateText(UICtrl.DOMstrings.dialogue, UICtrl.DOMdialogue.endDialogue);
        // 2. Invert laverne
        UICtrl.toggleClass(UICtrl.DOMstrings.game, UICtrl.DOMstrings.invert__noPeriod);
        // 3. hide all buttons
        
        UICtrl.visibleButtons(UICtrl.DOMstrings.answer, 'remove');
        // 4. add new button
        UICtrl.toggleClass(UICtrl.DOMstrings.endButton, UICtrl.DOMstrings.hidden__noPeriod);
        // 5. toggle speaker
        UICtrl.updateText(UICtrl.DOMstrings.speaker, UICtrl.DOMdialogue.laverne);
       
                UICtrl.toggleSpeaker();}

    var mushroom = function(){
        // 1. hide all html
        UICtrl.toggleClass(UICtrl.DOMstrings.game, UICtrl.DOMstrings.hidden__noPeriod);
         UICtrl.toggleClass(UICtrl.DOMstrings.endgame, UICtrl.DOMstrings.hidden__noPeriod);
        UICtrl.visibleButtons(UICtrl.DOMstrings.playAgain, 'remove');
        
    }
    
    return{
        init: function(){
            UICtrl.resetCurWidth();
           UICtrl.visibleButtons(UICtrl.DOMstrings.answer, 'remove');
            UICtrl.visibleButtons(UICtrl.DOMstrings.endBtn, 'add');
            UICtrl.visibleButtons(UICtrl.DOMstrings.refresh, 'add');
            UICtrl.updateText(UICtrl.DOMstrings.speaker, UICtrl.DOMdialogue.laverne);
          document.querySelector(UICtrl.DOMstrings.game).classList.remove(UICtrl.DOMstrings.invert__noPeriod);
            document.querySelector(UICtrl.DOMstrings.game).classList.remove(UICtrl.DOMstrings.hidden__noPeriod);
document.querySelector(UICtrl.DOMstrings.laverne).classList.remove(UICtrl.DOMstrings.invert__noPeriod);
document.querySelector(UICtrl.DOMstrings.endgame).classList.add(UICtrl.DOMstrings.hidden__noPeriod);

           UICtrl.randomHorse(); UICtrl.updateText(UICtrl.DOMstrings.dialogue, UICtrl.DOMdialogue.init);
           
  document.querySelector(UICtrl.DOMstrings.yes).addEventListener('click', endGame);
document.querySelector(UICtrl.DOMstrings.no).addEventListener('click', noClick);
            document.querySelector(UICtrl.DOMstrings.refresh).addEventListener('click', refreshClick)
            document.querySelector(UICtrl.DOMstrings.endButton).addEventListener('click', mushroom);
            document.querySelector(UICtrl.DOMstrings.playAgain).addEventListener('click', appCtrl.init);
        }
    }
})(gameController, UIController);   
appCtrl.init();

    
