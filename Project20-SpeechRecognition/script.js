const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log(randomNum);


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start Recognition and game
recognition.start();

function onSpeek(e){
    // Capture user speech
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

function writeMessage(msg){
    msgEl.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
        
    `
}

function checkNumber(msg){
    const num = +msg;
    // validate
    if(Number.isNaN(num)){
        msgEl.innerHTML += `<div>That is not a valid Number!</div>`;
        return;
    }
    // Check Range
    if(num > 100 ||  num < 1){
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
        return;
    }

    // Check num
    if(num === randomNum){
        document.body.innerHTML = `
        <h2>Congrats!You have guessed the number!</h2><br><br>
        It was ${num}

        <button class="play-again" id="play-again">Play Again</button>
        `;
    }else if(num > randomNum){
        msgEl.innerHTML += `<div>GO LOWER</div>`;
    }else{
        msgEl.innerHTML += `<div>GO HIGHER</div>`;
    }
}



function getRandomNumber(){
    return Math.floor(Math.random()*100)+1;
}

// Speek Result
recognition.addEventListener('result', onSpeek);

// END SR Service
recognition.addEventListener('end', ()=> recognition.start());

document.body.addEventListener('click', (e)=>{
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
})