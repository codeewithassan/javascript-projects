let userScore = 0;
let compScore = 0;
let userScores = document.querySelector('#your-score')
let compScores = document.querySelector('#comp-score')
let reset = document.querySelector("#reset")

let userChoice;
let compChoice;

let rock = document.querySelector('#rock');
let paper = document.querySelector('#paper');
let scissors = document.querySelector('#scissors');

let msg = document.querySelector('#msg');


const resetGame =()=>{
    userScore = 0;
    compScore = 0;
    userScores.innerText = userScore;
    compScores.innerText = compScore;
    msg.innerText = "Play your move"
}

reset.addEventListener('click', ()=>{
    resetGame();
})
const genCompChoice = () =>{
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3)
    return options[randomIndex]
}
const choices = document.querySelectorAll('.choice');
choices.forEach((choice)=>{
    // console.log(choice)
    choice.addEventListener('click', ()=>{
        // console.log("choice was clicked")
        userChoice = choice.id;
        console.log(userChoice)

        compChoice = genCompChoice();    
        console.log(compChoice) 

        Game();
    })
})

const Game = () =>{
    
    if(userChoice === compChoice){
        msg.innerText = `Game Draw! ${userChoice} = ${compChoice}`;
        msg.style.backgroundColor = '#081b31';
    }
    else if( userChoice === "rock" && compChoice === "scissors" ||
        userChoice === "paper" && compChoice === "rock" || 
        userChoice === "scissors" && compChoice === "paper"){   
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = 'green';
        userScore++;
        userScores.innerText = userScore;
    }
    else{
        msg.innerText = `You lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = 'red';
        compScore++;
        compScores.innerText = compScore;
    }
}



