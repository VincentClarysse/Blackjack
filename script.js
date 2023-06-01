const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const scorediv = document.querySelector("#scorediv");
const playfield = document.getElementById("section0");
const decksection = document.getElementById("section1");
const dealersection = document.getElementById("dealersection")
const presult = document.querySelector("#presult")


const dealCard_button = document.getElementById("dealcard");
dealCard_button.disabled="true"
const reset_button = document.getElementById("reset");
reset_button.disabled="true";
const hold_button = document.getElementById("hold");
hold_button.disabled="true";
const start_button = document.getElementById("start");

const deck = [];
function getDeck()
{
	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}

	return deck;
}
getDeck();

function shuffle(array) { //Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

shuffle(deck);

function renderDeck()
{
	for(let i = 0; i < deck.length; i++)
	{
		let card = document.createElement("div");
		let value = document.createElement("div");
		let suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].Suit;

		value.innerHTML = deck[i].Value;
		card.appendChild(value);
		card.appendChild(suit);

		document.getElementById("section1").appendChild(card);
	}
}

renderDeck();

function dealCard(deck){
    return deck.pop();
}

start_button.addEventListener("click", e => {
    hold_button.disabled="";
    dealCard_button.disabled="";
    start_button.disabled="true";

    dealbutton(e);
    dealbutton(e);
    dealercards();
    dealercards();

    const blurcard = dealersection.lastChild.querySelector(".value");
    blurcard.style = "filter: blur(4px)";
})

const dealercards = () => {
    let card = dealCard(deck);

    let dealtcard = document.getElementById("section1").lastChild;
    dealersection.appendChild(dealtcard);

    keepscore(card, dealerscore)
}

dealCard_button.addEventListener("click", dealbutton = (e) => {
    e.preventDefault;
    let card = dealCard(deck);

    let dealtcard = decksection.lastChild;
    playfield.appendChild(dealtcard);

    keepscore(card, playerscore)
})

hold_button.addEventListener("click", e => {
    const computerscore = scorediv.querySelector("#dealerscore");
    dealerscore = dealerscore + hiddenscore
    computerscore.innerHTML="dealerscore: "+ dealerscore;

    hold_button.disabled="true";
    dealCard_button.disabled="true";
    reset_button.disabled=""

    const blurcard = dealersection.lastChild.querySelector(".value");
    blurcard.style = "filter: blur(0px)"

    if (playerscore > dealerscore) {
        result("win");
    }

    else {
        result("loss");
    }
})

let dealerscore = 0;
let playerscore = 0;
let hiddenscore = 0;
const keepscore = (card, score) => {

    if(card.Value === "A") {
        
        switch (true){
            case score+11<22: card.Value = 11;
            break;
            case score+11>21: card.Value = 1;
            break;
    }
    }

    if(card.Value === "J"||card.Value === "K"||card.Value === "Q") {
        card.Value =10;
    }

    switch (score) {
        case playerscore: playerscore = playerscore + card.Value;
        break;
        case dealerscore: switch (dealerscore) {
                        case 0 : dealerscore = dealerscore + card.Value;
                        break;
                        default: hiddenscore = card.Value;
                                console.log(hiddenscore);
                        break;
        }
        break;
    }
    
    const yourscore = scorediv.querySelector("#yourscore")
    yourscore.innerHTML="your score: "+ playerscore;

    const computerscore = scorediv.querySelector("#dealerscore")
    computerscore.innerHTML="dealerscore: "+ dealerscore +" + ?";

    if (playerscore > 21) {
        dealerscore = dealerscore + hiddenscore;
        computerscore.innerHTML="dealerscore: "+dealerscore;

        dealCard_button.disabled="true"
        reset_button.disabled=""
        hold_button.disabled="true"

        result("loss");

        const blurcard = dealersection.lastChild.querySelector(".value");
        blurcard.style = "filter: blur(0px)"
    }
}

let wins = 0;
let losses =0;
const winspara = document.querySelector(".wins");
const lossespara = document.querySelector(".losses");
const result = (result) => {
    switch (result) {
        case "win": wins++;
        winspara.innerHTML="wins: "+wins;
        presult.innerHTML="You win!"
        break;
        case "loss": losses++;
        lossespara.innerHTML="losses: "+losses;
        presult.innerHTML="You lose!"
        break;
    }
}

reset_button.addEventListener("click", e => {
    e.preventDefault;
    score = 0;
    playerscore = 0;
    dealerscore = 0;

    presult.innerHTML="Give it a try!"
    const yourscore = scorediv.querySelector("#yourscore")
    yourscore.innerHTML="your score: "+score;
    const computerscore = scorediv.querySelector("#dealerscore")
    computerscore.innerHTML ="dealerscore: "+score;
    start_button.disabled="";
    reset_button.disabled="true";

    for(i=0; dealersection.children.length > 0; i++) {
        dealersection.removeChild(dealersection.lastChild)
    }

    for(i=0; playfield.children.length > 0; i++) {
        playfield.removeChild(playfield.lastChild)
    }

    for(i=0; decksection.children.length > 0; i++) {
        decksection.removeChild(decksection.lastChild)
    }

    for(let i=0; deck.length > 0 ; i++) {
        deck.pop();
    }

    getDeck();
    shuffle(deck);
    renderDeck(deck);
});