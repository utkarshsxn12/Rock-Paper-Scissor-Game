const choices = ['rock', 'paper', 'scissors'];
const emojis = { rock: '✊', paper: '✋', scissors: '✌️' };

let scores = { player: 0, computer: 0, tie: 0 };

const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const tieScoreEl = document.getElementById('tieScore');
const resultTextEl = document.getElementById('resultText');
const playDetailsEl = document.getElementById('playDetails');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resetBtn = document.getElementById('resetBtn');
const choiceBtns = document.querySelectorAll('.choice');
const popupOverlay = document.getElementById('popupOverlay');
const popupPlayerChoice = document.getElementById('popupPlayerChoice');
const popupComputerChoice = document.getElementById('popupComputerChoice');
const popupResult = document.getElementById('popupResult');
const popupMessage = document.getElementById('popupMessage');
const popupBtn = document.getElementById('popupBtn');

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => playGame(btn.dataset.choice));
});

resetBtn.addEventListener('click', resetScores);
popupBtn.addEventListener('click', closePopup);

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = determineWinner(playerChoice, computerChoice);

    showPopup(playerChoice, computerChoice, result);
    updateScores(result);
}

function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function showPopup(playerChoice, computerChoice, result) {
    popupPlayerChoice.textContent = emojis[playerChoice];
    popupComputerChoice.textContent = emojis[computerChoice];

    popupResult.className = 'popup-result ' + result;
    
    if (result === 'win') {
        popupResult.textContent = '🎉 You Win!';
        popupMessage.textContent = `${playerChoice} beats ${computerChoice}`;
    } else if (result === 'lose') {
        popupResult.textContent = '😔 You Lose!';
        popupMessage.textContent = `${computerChoice} beats ${playerChoice}`;
    } else {
        popupResult.textContent = '🤝 It\'s a Tie!';
        popupMessage.textContent = `Both chose ${playerChoice}`;
    }

    popupOverlay.classList.add('show');
}

function closePopup() {
    popupOverlay.classList.remove('show');
}

function displayResult(playerChoice, computerChoice, result) {
    playerChoiceEl.textContent = emojis[playerChoice];
    computerChoiceEl.textContent = emojis[computerChoice];

    playDetailsEl.classList.remove('show');
    resultTextEl.classList.remove('show');

    setTimeout(() => {
        playDetailsEl.classList.add('show');
        
        let resultMessage = '';
        if (result === 'win') {
            resultMessage = '🎉 You Win!';
            resultTextEl.style.color = '#28a745';
        } else if (result === 'lose') {
            resultMessage = '😔 You Lose!';
            resultTextEl.style.color = '#dc3545';
        } else {
            resultMessage = '🤝 It\'s a Tie!';
            resultTextEl.style.color = '#ffc107';
        }

        resultTextEl.textContent = resultMessage;
        resultTextEl.classList.add('show');
    }, 100);
}

function updateScores(result) {
    if (result === 'win') {
        scores.player++;
        playerScoreEl.textContent = scores.player;
        playerScoreEl.parentElement.classList.add('shake');
        setTimeout(() => playerScoreEl.parentElement.classList.remove('shake'), 500);
    } else if (result === 'lose') {
        scores.computer++;
        computerScoreEl.textContent = scores.computer;
        computerScoreEl.parentElement.classList.add('shake');
        setTimeout(() => computerScoreEl.parentElement.classList.remove('shake'), 500);
    } else {
        scores.tie++;
        tieScoreEl.textContent = scores.tie;
        tieScoreEl.parentElement.classList.add('shake');
        setTimeout(() => tieScoreEl.parentElement.classList.remove('shake'), 500);
    }

    resetBtn.classList.add('show');
}

function resetScores() {
    scores = { player: 0, computer: 0, tie: 0 };
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    tieScoreEl.textContent = '0';
    resultTextEl.textContent = 'Choose your move!';
    resultTextEl.style.color = '#333';
    playDetailsEl.classList.remove('show');
    resetBtn.classList.remove('show');
}
