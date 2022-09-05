(function(){
    var startGame = document.getElementById("startgame");
    var gameControl = document.getElementById("gamecontrol");
    var game = document.getElementById("game");
    var score = document.getElementById("score");
    var actionArea = document.getElementById("action");

    var gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg', '6die.jpg'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 100
    };

    startGame.addEventListener('click', function(){
        gameData.index = Math.round(Math.random());
        gameControl.innerHTML = '<h2>The game has started</h2>';
        gameControl.innerHTML = '<button id="quit">Do you want to quit?</button>';

        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });
        console.log(gameData.index);
        setUpTurn();

    });

    function setUpTurn(){
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</P>`;
        actionArea.innerHTML = '<button id="roll">Roll the dice!</button>';
        document.getElementById('roll').addEventListener('click', function(){
            throwdice();
        });
    }

    function throwdice(){
        // clear the actionArea
        actionArea.innerHTML='';
        // to generate a random number between zero and six
        gameData.roll1 = Math.floor(Math.random() * 6) + 1;
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;
        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        //picture of the dice
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}" alt="die">`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll2 - 1]}" alt="die">`;
        //sum of the dice
        gameData.rollSum = gameData.roll1 + gameData.roll2;
      
        if(gameData.rollSum === 2){
            game.innerHTML += '<p>Oh snap! you got snake eyes!</p>';
            gameData.score[gameData.index] = 0;
            //if index = 0, set it to 1, if index = 1, set it to 0 
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //show the current score
            checkWinningCondition();
            setTimeout(setUpTurn, 4000);
        }
        else if(gameData.roll1 === 1 || gameData.roll2 === 1){
            //if index = 0, set it to 1, if index = 1, set it to 0 
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`; 
            //show the current score
            setTimeout(setUpTurn, 4000);
        }
        else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id ="rollagain">Roll again</button> or <button id="pass">Pass</button>';
            document.getElementById('rollagain').addEventListener('click', function(){
                setUpTurn();
            });
            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });
            checkWinningCondition();
        }

    }
    //check winning condition
    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd){
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;
            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a New Game?";
        }
        else{
            //show current score
            score.innerHTML = `<p>The score for <strong> ${gameData.players[0]} is ${gameData.score[0]}</strong> and the score for <strong>${gameData.players[1]} is ${gameData.score[1]}</strong></p>`
        }
    }
})();