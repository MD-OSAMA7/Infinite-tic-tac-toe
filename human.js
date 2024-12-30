let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");


let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let msgContainer2 = document.querySelector(".msg-container2");
let msg2= document.querySelector("#msg2");

let turnO = true;
const colors = ["#ff0000"];
const sound1 = new Audio('soundx.mp3');
const sound= new Audio('soundo.mp3');
const reset = new Audio('reset.mp3');
const winner1= new Audio('winner.mp3');
const losser = new Audio('winner.mp3');



const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let count1=null;
 let count2=null;
 let all_index_o=[];
 let all_index_x=[];
let dataAddress=null;
let randomNumber=null;
let runRN= true;
let insideIf=true;

let navbtn1 = document.querySelector("#nav-btn");
let navbtn2 = document.querySelector("#nav-btn1");
let nav1= document.querySelector(".nav");



const navbtn = () => {
nav1.classList.add("active");
    navbtn1.classList.add("active");
    navbtn2.classList.add("active");
};
const navbtnn = () => {
nav1.classList.remove("active");
    navbtn1.classList.remove("active");
    navbtn2.classList.remove("active");
};




// listener for human move
boxes.forEach(box => {
    box.addEventListener("click", () => {
        
        if (box.innerText === "") {
          sound.play();
            if (turnO) {
              box.innerText = "O";
                turnO = false;
                msg.innerText = `TURN : X`;
                let clickedButtonAddress1 = event.target.dataset.address;
                
                all_index_o.push(clickedButtonAddress1);
             
 box.style.color = 'red';
                
                box.disabled = true;
                
            }
            
            
                    //code for remove array index 
            if(all_index_o.length>3)
            {
                for(let i=1;i<10;i++){
                    if(all_index_o[0]===`btn${i}`)
                {
                    boxes[i-1].innerText="";
                    boxes[i-1].disabled = false;
                    
                    all_index_o.splice(0,1);
                    break;
                }}}            


      
      boxes.forEach((button) => {
  if (button.innerText === "O") {
    const circle1 = document.createElement("div");
    circle1.className = "circle1";
    button.appendChild(circle1);
    button.classList.add("O");
  }
      });
            
           
checkWinner(); // winner checking
  
//colour change of 1st move
        if(all_index_x.length==3&&insideIf){
         for(let i=1;i<10;i++){
                    if(all_index_x[0]===`btn${i}`)
                {
                    boxes[i-1].innerText="x";
                    
                    boxes[i-1].style.color = 'green';
                  boxes.forEach((button) => {
  if (button.innerText === "x") {
    const cross2= document.createElement("div");
    cross2.className = "cross2 animateCircle";
    button.appendChild(cross2);
    button.classList.add("x");
  }
          });
                  
                    break;
                }}}
             
               
            
            }
      
        TurnX();
        
        
        
    });
});



const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // Pass the winner's symbol
            
            }
        }
    }
};




const showWinner = (winner) => {

msgContainer2.classList.add("active");
  
    msg.innerText = `Winner is: ${winner}`;
     turnO = true;
     runRN= false;
     insideIf=false;
     if(`${winner}`==="O"){
winner1.play();
       
       msg2.innerText = `Winner : O`;
boxes.forEach((button) => {
  if (button.innerText === `${winner}`) {
    const winner1= document.createElement("div");
    winner1.className = "winner1";
    button.appendChild(winner1);
    button.classList.add("w1");
  }
          });

     }else{
       losser.play();
       msg2.innerText = `Winner : X`;
boxes.forEach((button) => {
  if (button.innerText === `${winner}`) {
    const winner2= document.createElement("div");
    winner2.className = "winner2";
    button.appendChild(winner2);
    button.classList.add("w2");
  }
          });
         
     
     }
    
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
        
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
reset.play();
  msgContainer2.classList.remove("active");
    msg.innerText = `TURN : O`;
    turnO = true;
    count1=null;
    count2=null;
    all_index_o=[];
    all_index_x=[];
    dataAddress=null;
    randomNumber=null;
    runRN= true;
    insideIf=true;
    insideIf1=true;
    enableBoxes();
};


//bot source code
const TurnX = () => {
    
boxes.forEach(box => {
    box.addEventListener("click", () => {
        
        if (box.innerText === "") {
          sound1.play();
            if (turnO === false) {
              box.innerText = "X";
                turnO = true;
                msg.innerText = `TURN : O`;
                let clickedButtonAddress1 = event.target.dataset.address;
                
                all_index_x.push(clickedButtonAddress1);
             
 box.style.color = 'red';
                
                box.disabled = true;
                
            }
            
        
        
boxes.forEach((button) => {
  if (button.innerText === "X") {
    const cross1= document.createElement("div");
    cross1.className = "cross1";
    button.appendChild(cross1);
    button.classList.add("X");
  }
          });
        
                
   
        
        
            if(all_index_x.length>3)
            {
                for(let i=1;i<10;i++){
                    if(all_index_x[0]===`btn${i}`)
                {
                    boxes[i-1].innerText="";
                    boxes[i-1].disabled = false;
                    
                    all_index_x.splice(0,1);
                    break;
                }}}
            
            checkWinner(); // check winner
//change colour of 1st move 
            if(all_index_o.length==3&&insideIf){
         for(let i=1;i<10;i++){
                    if(all_index_o[0]===`btn${i}`)
                {
                    
                    boxes[i-1].innerText="o";
                    
                    boxes[i-1].style.color = 'green';
                  boxes.forEach((button) => {
  if (button.innerText === "o") {
    const circle = document.createElement("div");
    circle.className = "circle animateCircle";
    button.appendChild(circle);
    button.classList.add("o");
  }
          });
                  
                    break;
                }}}
            
            
            
            }
        
        
        
    });
});


};


resetBtn.addEventListener("click", resetGame);



navbtn1.addEventListener("click",navbtn);
navbtn2.addEventListener("click",navbtnn);