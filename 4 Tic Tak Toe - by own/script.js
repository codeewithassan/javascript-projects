let boxes;
const game = document.querySelector('.game');
const msg = document.querySelector('#msg');
const mgsContainer = document.querySelector('.msg-container')
const newGame = document.querySelector('#new-btn')
const reset = document.querySelector('#reset-btn')


const turnIndicator = document.querySelector('#turn-indicator')
const xPlayer = document.querySelector('#score-x')
const oPlayer = document.querySelector('#score-o')
const resetScore = document.querySelector('#reset-score')

let turnX = true;
let turn0;
let xScore = 0;
let oScore = 0;

let count = 0;

const winPatterens = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


const resetGame = () => {
    createGame();
    mgsContainer.classList.add('hide')
    boxStatus(false);
    turnIndicator.innerText = "Player X's Turn"
    turnX = true;
    count = 0;
}
const boxStatus = (status) => {
    for (let box of boxes) {
        box.disabled = status;
    }
}
const disableBox = (checkBox, status) => {
    checkBox.disabled = status;
}
const createGame = () => {
    game.innerHTML = ""
    for (let i = 0; i < 9; i++) {
        let newBox = document.createElement('button')
        newBox.classList.add('box')
        game.appendChild(newBox)

        newBox.addEventListener('click', () => {

            if (!turnX || newBox.innerText !== "") return;
            if (turnX) {
                newBox.innerText = "X"
                turnX = false;
                newBox.classList.add('turnx')
                newBox.classList.remove('turn0')
                turnIndicator.innerText = "Computer is thinking..."

                disableBox(newBox, true);
                count++;
                let isWinner = checkWinner();

                if (!isWinner && count < 9) {
                    setTimeout(() => {
                        computerTurn();
                    }, 700);
                } else if (count == 9 && !isWinner) {
                    draw();
                }
            }
        })
    }
    boxes = document.querySelectorAll('.box')
}
createGame();

const computerTurn = () => {

    let selectedBox = null;
    selectedBox = findBestMove("O");

    if (!selectedBox) {
        selectedBox = findBestMove("X");
    }
    if (!selectedBox) {
        let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
        if (emptyBoxes.length === 0) return;

        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        selectedBox = emptyBoxes[randomIndex];
    }

    selectedBox.innerHTML = "O";
    selectedBox.classList.add('turn0');
    selectedBox.classList.remove('turnx');

    turnX = true;
    count++;
    turnIndicator.innerText = "Player X's Turn";

    disableBox(selectedBox, true);

    let isWinner = checkWinner();
    if (count == 9 && !isWinner) {
        draw();
    }
}
const draw = () => {
    msg.innerText = "Game Draw"
    mgsContainer.classList.remove('hide')
    // console.log("game draw")
    boxStatus(true)
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`
    mgsContainer.classList.remove('hide')
    boxStatus(true)
    if (winner === "X") {
        xScore++;
        xPlayer.innerText = xScore;
    } else {
        oScore++;
        oPlayer.innerText = oScore;
    }
}

const getPatternBoxes = (pattern) => {
    return [
        boxes[pattern[0]],
        boxes[pattern[1]],
        boxes[pattern[2]]
    ]
}
const checkWinner = () => {
    for (let pattern of winPatterens) {
        let [box1, box2, box3] = getPatternBoxes(pattern);

        if (box1.innerText != "" && box2.innerText != "" && box3.innerText != "") {
            if (box1.innerText == box2.innerText && box2.innerText == box3.innerText) {
                showWinner(box1.innerText);
                return true;
            }
        }
    } return false;
}
const findBestMove = (PlayerSign) => {
    for (const pattern of winPatterens) {
        let [box1, box2, box3] = getPatternBoxes(pattern);
        if (box1.innerText === PlayerSign && box2.innerText === PlayerSign && box3.innerText === "") {
            return box3;
        }
        if (box1.innerText === PlayerSign && box2.innerText === "" && box3.innerText === PlayerSign) {
            return box2;
        }
        if (box1.innerText === "" && box2.innerText === PlayerSign && box3.innerText === PlayerSign) {
            return box1;
        }
    }
    return null;
};
newGame.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);
resetScore.addEventListener('click', () => {
    resetGame();
    xScore = 0;
    oScore = 0;
    xPlayer.innerText = xScore;
    oPlayer.innerText = oScore;
})