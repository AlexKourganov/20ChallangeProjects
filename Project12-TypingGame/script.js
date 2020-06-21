const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];


// init word
let randomWord;

// Init Score
let score = 0;

// Init time
let time = 10;

// Difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime,1000);

function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)];
}

// Add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}


function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0){
        clearInterval(timeInterval);
        // endgame
        gameOver();
    }
}

function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your Final Score:${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}




addWordToDOM();




// Event listeners
text.addEventListener('input', e=>{
    const inseredText = e.target.value;
     if(inseredText === randomWord){
         addWordToDOM();
         updateScore();
        //  Clear
        e.target.value = '';

        if(difficulty === 'hard'){
            time+=2;
        }else if(difficulty === 'medium'){
            time+=3;
        }else{
            time+=5;
        }

        
        updateTime();

     }
})

settingsBtn.addEventListener('click', ()=>

settings.classList.toggle('hide')
);

// settings
settingsForm.addEventListener('change', e=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})
