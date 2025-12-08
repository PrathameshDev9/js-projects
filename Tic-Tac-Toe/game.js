
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg") ; 
let newBtn = document.querySelector("#new-btn"); 
let box = document.querySelectorAll(".box") ; 
let resetBtn = document.querySelector("#reset-btn");

let turnO = true ; 
let count = 0 ; 

let winPattern = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]


box.forEach((elem)=> {
    elem.addEventListener("click", ()=> {
        /* switching player from O and X and changing color */
        if(turnO){
            elem.innerText= "O"
            elem.style.backgroundColor = "#e42444ff"
            elem.style.color="#EEFFDB"; 
            turnO = false; 
        } else {
            elem.innerText= "X"
            elem.style.backgroundColor="#e42444ff" 
            elem.style.color="#8fd8ffff"; 
            turnO = true; 
        }
        count++ ; 

        elem.disabled ="true"

        /*winner = true/false based on checkWinner()  */
        let wiNner = checkWinner();
        
        if(count == 9 && !wiNner){
            gameDraw(); 
        }
    })
})


const checkWinner = () => {
    /*Selecting boxes according to val 
    Go for game.txt to know for working  */

    for(let val of winPattern){
          /*  console.log(box[val[0]], box[val[1]], box[val[2]]); */

          let pos1Val = box[val[0]].innerText;
          let pos2Val = box[val[1]].innerText; 
          let pos3Val = box[val[2]].innerText; 

          if(pos1Val !="" && pos2Val !="" && pos3Val !="" ){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner is :",pos1Val )
                showWinner(pos1Val); 
            }
          }
            
            
    }

}

const showWinner = (winner) => {
   msgContainer.classList.remove("hide"); 
    msg.innerText = `Congratulations winner is ${winner}`; 
    disabledBox();
}   

const gameDraw = () => {
    msgContainer.classList.remove("hide"); 
    msg.innerText = `Game is an Draw !`
    disabledBox(); 
}


const disabledBox = () => {
    for(let val of box){
        val.disabled = true ; 
    }
}


const resetGame = () => {
    turnO = true ; 
    count = 0 ;
    enableBox(); 
    msgContainer.classList.add("hide"); 

}   

const enableBox = () => {
    for(let val of box){
        val.disabled = false; 
        val.style.backgroundColor = "#66101F"
        val.innerText = ""; 
    }
}

newBtn.addEventListener("click", resetGame); 
resetBtn.addEventListener("click", resetGame); 