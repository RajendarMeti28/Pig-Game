'use strict';

//Selecting elements...
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //just to show other way of getting id in another way...
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting conditions..

//dice.style.display = 'None'; Or we can create hidden class ub css..
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active'); //toggle method will add the class if not present; if present it will remove the method..
  activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll..
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display Dice..
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1:
    if (dice !== 1) {
      //add dice to current score..
      /*currentScore+=dice;
                if(activePlayer===0)
                    current0El.textContent=currentScore;
                else
                    current1El.textContent=currentScore;*/
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } //If yes, switch to next player..
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to current activePlayer's score...
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.Check if player's score is greater than or equal to 100..
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //Finish the game..
      playing = false;
      diceEl.classList.add('hidden');
    }

    //3. Sewitch to next player..
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
