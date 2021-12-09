const scramWord = document.getElementById('scramWord');
const continueBtn = document.getElementById('continue');



const inital = document.querySelector('.scramWord');
const scoreText = document.getElementById('scoreText');
const enter = document.getElementById('enter');
const welcome = document.getElementById('welcome');


document.addEventListener('keypress', key); //Listens for the keypress of Enter to make it quick for the user to submit their word
function key(e) {
    if (`${e.code}` == "Enter") {
            sendWord();
    }
}

let end = false;
let prevWord = 'Void';
let score = 0;
let time = 20;
let start = true;
var t;


const entry = document.getElementById('entry');
const buttons = document.getElementById('buttons');





function sendWord() {
	
	if(!end){
	welcome.innerText = "Word Scramble";
	enter.select();

	if(start){
		timerFunc();
		buttons.hidden = false;	
		entry.hidden = true;
	}
	start = false;
	if(enter.value === prevWord){
		score++
	}
	
	pickedWord = createWords();

	scramedWord = jumbleWord(pickedWord.split(""));
	
	while (scramedWord === pickedWord){
		scramedWord = jumbleWord(pickedWord.split(""));
	}

	prevWord = pickedWord;
	console.log(scramedWord);
	scramWord.innerText = "Unscramble this word:    "+scramedWord;
	scoreText.innerText = "Your score: "+score;

	enter.value = '';
	}
}

var timer = document.getElementById('timer');

function timerFunc() { //Timer for the game
    timer.innerText = "Time: " + time.toString();
    time--;
    t = setTimeout("timerFunc()", 1000);
    if (time === -1) { //Counting down until -1 so that the game will fail
        clearInterval(t);
        console.log("Game over");
	end = true;
	endGame();
    }
}


function continueExecute(){
	entry.hidden=false;
}


function endGame(){


	
	scramWord.innerText = "Game Over";
	enter.hidden = true;
	continueBtn.hidden =true;	
	buttons.hidden = true;
	
	setTimeout(continueExecute, 1500);

document.getElementById("score").value = score;

}

function doFunction()
{
	console.log("sending jimmy");
        let name = 'Jimmy'

       	$.ajax({
            url: '{{ url_for("/") }}',
            type: 'POST',
            data: {
                name: name
            },
            success: function (response) {
            },
            error: function (response) {
            }
        });

};


const createWords = () => {
	const words1 = ['Address', 'Download', 'Databus', 'Internet', 'Wireless', 'Spyware', 'Software', 'Program','Input', 'Array', 'Binary', 'Clock', 'Cookie', 'Queue', 'Stack', 'Virus', 'Mouse','Test', 'Bit', 'Bug', 'Code', 'File', 'Load', 'Loop', 'Node', 'Wifi', 'LED'];

        let number = Math.floor(Math.random() * words1.length); //Picking a random word from the pool depending on difficulty
        let random = words1[number];
        return random;
}

const jumbleWord = (jWord) => {
    for (let i = jWord.length - 1; i >= 0; i--) { //Looping through each character in the word
        let temp = jWord[i];
        let j = Math.floor(Math.random() * (i + 1)); //Randomly changing them
        jWord[i] = jWord[j]; //Assigning their new position
        jWord[j] = temp;
    }
    return jWord.join("");
}
