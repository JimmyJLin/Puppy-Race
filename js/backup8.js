$(document).ready(function(){
  console.log("js loaded");

// global variables
  var $startGame = $('#startButton');
  var $resetGame = $('#resetButton');
  var $box0 = $("#box0");
  var $board = $('.board');
  var $dogOne = $(".dogOne")
  var $dogTwo = $(".dogTwo")
  var $redDice = $(".redDice");
  var playerOne = 'Lord Vader';
  var playerTwo = 'Sir Clementine';
  var turn = true;
  var dogOneCurrentStep = 0;
  var dogTwoCurrentStep = 0;
  var dogOneMoveCount = 0;
  var dogTwoMoveCount = 0;




  // message board
  function boardMsg(x){
    return $("#messageBoard").text(x) // pass the function value to the messageboard
  }
  function diceMsg(x){
    return $("#diceMessage").text(x) // pass dice rolled result to the diceboard
  }


  // playerTwo randomly roll dice and return result between 1-6
  function dogOneRollDice(){
    var dogOneRandomDice = Math.floor((Math.random() * 6) + 1); // randomly generate a whole number between 1-6
    return dogOneRandomDice; // return the value of the Math.Random
  }

  // playerTwo randomly roll dice and return result between 1-6
  function dogTwoRollDice(){
    var dogTwoRandomDice = Math.floor((Math.random() * 6) + 1); // randomly generate a whole number between 1-6
    return dogTwoRandomDice; // return the value of the Math.Random
  }

  // set player turn - turn is dafult to true, this fundction set the playerOne to start first
  // function setTurn(){
  //   if (turn == true){
  //     currentTurn = playerOne;
  //   } else {
  //     currentTurn = playerTwo;
  //   }
  //   return currentTurn
  // }


  // switches between playerOne and PlaerTwo; keep track of moves; and move the game pieces;
  var dogOneMove;
  var dogTwoMove;
  function switchPlayer(){
    if (turn == false){
      var diceRoll = dogTwoRollDice();
      diceMsg(playerTwo + " Rolled " + diceRoll);
      dogTwoCurrentStep += diceRoll
      dogTwoMove = "#box" + dogTwoCurrentStep.toString();
      $(dogTwoMove).append($("#dogTwo"));
      dogTwoMoveCount++
      turn = true;
      boardMsg("")
      goToCrate()
      checkWinner()
      return;
      } else if (turn == true) {
        var diceRoll = dogOneRollDice();
        diceMsg(playerOne + " Rolled " + diceRoll);
        dogOneCurrentStep += diceRoll
        dogOneMove = "#box" + dogOneCurrentStep.toString();
        $(dogOneMove).append($("#dogOne"));
        dogOneMoveCount++
        turn = false;
        boardMsg("")
        goToCrate()
        checkWinner()
        return;
      }
  }

  // winning condition - if player gets to starting position
  function checkWinner(){
    if (dogOneCurrentStep > 19){
      $box0.append($("#dogOne"));
      boardMsg(playerOne + " WINS!!!")
      // alert(playerOne + " WINS!!")
    } if (dogTwoCurrentStep > 19) {
      $box0.append($("#dogTwo"));
      boardMsg(playerTwo + " WINS!!!")
      // alert(playerTwo + " WINS!!")
    }
  }

  // sent to Kennel - if player lands on square 15 - sent back to start postion
  function goToCrate(){
    if (dogOneCurrentStep == 10) {
      $box0.append($("#dogOne"));
      boardMsg(playerOne + " was a bad boy! Go to Crate!!!")
      dogOneCurrentStep = 0;
      turn = false;
    } if (dogTwoCurrentStep == 10) {
      $box0.append($("#dogTwo"));
      boardMsg(playerTwo + " was a bad boy! Go to Crate!!!")
      dogTwoCurrentStep = 0;
      turn = true;
    }
  }

  // Random event - 1/4 move+2; 1/4 move-2; 1/4 +1; 1/4 move -1;

  // Roll dice to play the game - set player turn and switch between two players
  $redDice.on("click", function(event){
    console.log("dice clicked");
    // setTurn();
    switchPlayer();
  })



  // Start Game and postion two players at starting point
  $startGame.on("click", function(event){
    console.log("game started");
    $box0.append($("#dogTwo"));
    $box0.append($("#dogOne"));
  })

  // Reset game function & clear board
  $resetGame.on("click", function(event){
    console.log("reset button clicked");
    $box0.append($("#dogOne"));
    $box0.append($("#dogTwo"));
    $startGame.on("click")
  })



});
