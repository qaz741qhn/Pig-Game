'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};
let playing = true;
const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

let scores, currentScore, activePlayer;

const init = function () {
	playing = true;
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	score0El.textContent = 0;
  score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
  diceEl.classList.add('hidden');
	closeModal();
	player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
	player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}
init();
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. 生成隨機數字的骰子
		const dice = Math.trunc(Math.random()*6)+1;
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`
		// 2. 數字是否為1？如是，就換另一個人擲骰子，如否，即繼續進行
		if (dice !== 1) {
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore; // change later
		} else {
			// switch to next player
			switchPlayer();
		}
		// 3. 將隨機數字加到current和total
	}
})

btnHold.addEventListener('click', function () {
	if (playing) {
		// 1. add current score to the active player
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
		// 2. check if score is >= 100
		if(scores[activePlayer] >= 20) {
			// finish the game
			playing = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
			modal.classList.remove('hidden');
			overlay.classList.remove('hidden');
			document.querySelector('.winner').textContent = `PLAYER ${activePlayer + 1} is the winner 🎉`;
		} else {
			switchPlayer();
		}
	}
})
document.querySelector('.close-modal').addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
btnNew.addEventListener('click', init);
