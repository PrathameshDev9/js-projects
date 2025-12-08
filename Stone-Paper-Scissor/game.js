let userScore = 0 ; 
let compScore = 0 ; 

let choice = document.querySelectorAll(".choice"); 
let msg = document.querySelector("#msg"); 

let userScorediv = document.querySelector("#user-score"); 
let compScorediv = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["stone", "paper", "scissor"]; 
    const indx = Math.floor(Math.random()*3)
    console.log(options[indx]); // running perfectly
    
    return options[indx]; 
    
}

const drawGame = () => {
    msg.innerText = "Game is Draw ! Play Again "
    msg.style.color ="rgb(217, 216, 216)"
}


const showMessage = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++; 
        userScorediv.innerText = userScore ; 
        msg.innerText = `You win ${userChoice} beats ${compChoice}`;
        msg.style.color = "chartreuse";
    } else{
        compScore++; 
        compScorediv.innerText = compScore ; 
        msg.innerText = `You Loose ${compChoice} beats ${userChoice}`;
        msg.style.color = "coral";

    }
}


const playGame = (userChoice) => {
    let compChoice = genCompChoice(); 

    if(userChoice === compChoice){
        drawGame(); 
    } else {
        let userWin = true; 
        if(userChoice === "stone"){
            userWin = compChoice === "paper" ? false : true ; 
        } else if (userChoice === "paper"){
            userWin = compChoice === "scissor" ? false : true ; 
        } else {
            userWin = compChoice === "stone" ? false : true ; 
        }
         showMessage(userWin, userChoice, compChoice); 
    }

   

}





choice.forEach((elem)=> {
    elem.addEventListener("click", ()=> {
        const userChoice = elem.getAttribute("id"); 
        playGame(userChoice); 
    })
}); 