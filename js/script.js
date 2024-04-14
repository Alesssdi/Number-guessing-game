"use strict";



const guessField = document.querySelector('.form_field')
const guesses = document.querySelector('.guesses')
const lastResult = document.querySelector('.last_result')
const lowOrHi = document.querySelector('.low_or_hi')
const remainingGuesses = document.querySelector('.remaining_guesses')
const timerField = document.querySelector('.timer_field')
const gamesAmount = document.querySelector('.games_amount')
const winningGames = document.querySelector('.winning_games')
const bestTime = document.querySelector('.best_time')
const minMoves = document.querySelector('.min_moves')
let guessSubmit = document.querySelector('.form_submit_button')


let randomNumber = Math.floor(Math.random() * 100) + 1
let resetButton;
let timerOn = false;
let lastGameIsWon = false;
let interval;

let guessCount = 0;
let gameDuration = 30;
let seconds = 0;

let bestTimeValue, minMovesValue, gamesAmountValue = 0, winningGamesValue = 0;


if (gameDuration<10){
    timerField.textContent+='0'+gameDuration;
}else{
    timerField.textContent+=gameDuration;
}

guessField.focus();

guessSubmit.addEventListener('click', () => {

    if (timerOn == false) {
        interval = setInterval(timer, 1000);
        timerOn = true;
    }
    checkGuess();
})


function checkGuess() {

    let currentGuess = Number(guessField.value)
    guessCount++;

    if (guessCount == 1) {
        guesses.textContent = "Введенные числа: ";
    }

    guesses.textContent += currentGuess + ' ';

    if (currentGuess == randomNumber) {
        lastResult.textContent = "Поздравляем! Вы выиграли!";
        lastResult.style.color = 'green';
        lowOrHi.textContent = '';
        gamesAmountValue++;
        winningGamesValue++;
        lastGameIsWon = true;

        if (winningGamesValue == 1) {
            bestTimeValue = seconds;
            minMovesValue = guessCount;
        }

        remainingGuesses.textContent = 'Попыток осталось: ' + `${10 - guessCount}`;
        gameOver()

    } else if (guessCount === 10) {
        lastResult.textContent = '!!ИГРА ОКОНЧЕНА!!!';
        lowOrHi.textContent = '';
        gamesAmountValue++;
        lastGameIsWon = false;
        remainingGuesses.textContent = 'Попыток осталось: ' + `${10 - guessCount}`;
        gameOver();
    } else {
        lastResult.textContent = 'Неправильно!';
        lastResult.style.color = 'red';
        remainingGuesses.textContent = 'Попыток осталось: ' + `${10 - guessCount}`;
        if (currentGuess < randomNumber) {
            lowOrHi.textContent = "Введенное число слишком маленькое!"
        } else {
            lowOrHi.textContent = "Введенное число слишком большое!"
        }
    }
    guessField.value = "";
    guessField.focus();
}


function gameOver() {

    guessField.disabled = true;
    guessSubmit.disabled = true;
    clearInterval(interval);

    if ((bestTimeValue >  seconds) && lastGameIsWon) {
        bestTimeValue =  seconds;
    }

    if ((minMovesValue > guessCount) && lastGameIsWon) {
        minMovesValue = guessCount;
    }

    timerOn = false;
    gamesAmount.textContent = 'Игр всего: ' + gamesAmountValue;
    winningGames.textContent = 'Игр выиграно: ' + winningGamesValue;


    if (winningGamesValue > 0) {
        if (bestTimeValue < 10) {
            bestTime.textContent = 'Лучшее время: 00:0' + bestTimeValue;
        } else {
            bestTime.textContent = 'Лучшее время: 00:' + bestTimeValue;
        }
        minMoves.textContent = 'Минимальное количество ходов: ' + minMovesValue;
    }
    guessSubmit.remove();

    resetButton = document.createElement("button");
    resetButton.textContent = "Новая игра";
    document.querySelector('.form').appendChild(resetButton);
    resetButton.classList.add("new_game_button");
    resetButton.addEventListener("click", resetGame);
}



function resetGame() {
    guessCount = 0;
    seconds = 0;
    guessField.disabled = false;
    
    timerField.textContent = 'Оставшееся время: 00:30';
    remainingGuesses.textContent = 'Попыток осталось: 10';
    guesses.textContent = 'Введенные числа:';
    lastResult.textContent = '';
    guessField.value = "";

    resetButton.parentNode.removeChild(resetButton);
    guessField.focus();
    
    guessSubmit = document.createElement("button");
    guessSubmit.textContent = "Проверить";
    document.querySelector('.form').appendChild(guessSubmit);
    guessSubmit.classList.add("form_submit_button");
    guessSubmit.addEventListener("click", () => {
        if (timerOn == false) {
            interval = setInterval(timer, 1000);
            timerOn = true;
        }
        checkGuess();
    });
    
    randomNumber = Math.floor(Math.random() * 100) + 1;
}


function timer() {
    if (seconds == gameDuration) {
        clearInterval(interval)

        lastResult.textContent = '!!ВРЕМЯ ВЫШЛО!!!';
        lowOrHi.textContent = '';
        remainingGuesses.textContent = 'Попыток осталось: ' + `${10 - guessCount}`;

        gamesAmountValue++;
        lastGameIsWon = false;
        gameOver();
    } else {
        seconds++;
    }

    timerField.textContent = 'Оставшееся время: 00:';
    let restTime = gameDuration - seconds;

    if (restTime < 10) {
        timerField.textContent += '0' + restTime;
    } else {
        timerField.textContent += restTime;
    }
}