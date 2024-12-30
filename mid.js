let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let cheat = document.querySelector("#cheat");

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
const losser = new Audio('losser.mp3');
const cheatsound= new Audio('cheat.mp3');


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
                msg.innerText = `Bot Turn`;
                let clickedButtonAddress1 = event.target.dataset.address;
                
                all_index_o.push(clickedButtonAddress1);
             
 box.style.color = 'red';
                
                box.disabled = true;
                
            }}
      
            
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
                
       // for bot identify this is first move 
      if(all_index_o.length==3){
         for(let i=1;i<10;i++){
                    if(all_index_o[0]===`btn${i}`)
                {
                    
                    boxes[i-1].innerText="S";
                  boxes.forEach((button) => {
  if (button.innerText === "S") {
    const circle2= document.createElement("div");
    circle2.className = "circle2";
    button.appendChild(circle2);
    button.classList.add("S");
  }
          });
                  
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
      
        bot(); // bot function calling 
        
        
        
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
       
       msg2.innerText = `WINNER`;
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
       msg2.innerText = `LOSE`;
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
    msg.innerText = `Your Turn`;
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
const bot = () => {
    setTimeout(() => {
            if (turnO === false) {
              sound1.play();
                runRN= true;
                let seqns2=true;
msg.innerText = `Your Turn`;

//loop for find all possibilities of win box
 for(let i=0;i<=6;i+=3)
        {
          
if(boxes[i].innerText==="X"&&boxes[i+1].innerText==="X"&&seqns2){
if(boxes[i+2].innerText===""){
boxes[i+2].innerText="X";
boxes[i+2].disabled = true;
dataAddress = boxes[i+2].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
boxes[i+2].style.color = 'blue';
all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
                
                
          if(boxes[i+1].innerText==="X"&&boxes[i+2].innerText==="X"&&seqns2){

if(boxes[i].innerText===""){
boxes[i].innerText="X";
boxes[i].disabled = true;
                     dataAddress = boxes[i].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
boxes[i].style.color = 'blue';
all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
                
                
          if(boxes[i].innerText==="X"&&boxes[i+2].innerText==="X"&&seqns2){
if(boxes[i+1].innerText===""){
boxes[i+1].innerText="X";
boxes[i+1].disabled = true;
dataAddress = boxes[i+1].getAttribute('data-address');
                        runRN= false;
                        turnO = true;
boxes[i+1].style.color = 'blue';
all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
            
          

          if(boxes[i/3].innerText==="X"&&boxes[(i/3)+3].innerText==="X"&&seqns2){

if(boxes[(i/3)+6].innerText===""){
boxes[(i/3)+6].innerText="X";
boxes[(i/3)+6].disabled = true;
dataAddress = boxes[(i/3)+6].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
boxes[(i/3)+6].style.color = 'blue';
all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
                
          
                if(boxes[(i/3)+3].innerText==="X"&&boxes[(i/3)+6].innerText==="X"&&seqns2){
                
                    if(boxes[(i/3)].innerText===""){
                    boxes[(i/3)].innerText="X";
                        boxes[(i/3)].disabled = true;
                        
                        dataAddress = boxes[(i/3)].getAttribute('data-address');
runRN= false;
turnO = true;
boxes[(i/3)].style.color = 'blue';
                        all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
                
          
          
                if(boxes[(i/3)].innerText==="X"&&boxes[(i/3)+6].innerText==="X"&&seqns2){
               
                    
                    if(boxes[(i/3)+3].innerText===""){
                     boxes[(i/3)+3].innerText="X";
                        boxes[(i/3)+3].disabled = true;
                         dataAddress = boxes[(i/3)+3].getAttribute('data-address');
                        runRN= false;
                        turnO = true;
                        boxes[(i/3)+3].style.color = 'blue';
all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
            
          
if(boxes[0].innerText==="X"&&boxes[4].innerText==="X"&&seqns2){
                if(boxes[8].innerText===""){
     boxes[8].innerText="X";
boxes[8].disabled = true;
                     dataAddress = boxes[8].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[8].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
            
            
            if(boxes[0].innerText==="X"&&boxes[8].innerText==="X"&&seqns2){
                
              
              if(boxes[4].innerText===""){
     boxes[4].innerText="X";
boxes[4].disabled = true;
                     dataAddress = boxes[4].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[4].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
            if(boxes[4].innerText==="X"&&boxes[8].innerText==="X"&&seqns2){
                if(boxes[0].innerText===""){
     boxes[0].innerText="X";
boxes[0].disabled = true;
                     dataAddress = boxes[0].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[0].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
            if(boxes[2].innerText==="X"&&boxes[4].innerText==="X"&&seqns2){
                if(boxes[6].innerText===""){
     boxes[6].innerText="X";
boxes[6].disabled = true;
                     dataAddress = boxes[6].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[6].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
            if(boxes[2].innerText==="X"&&boxes[6].innerText==="X"&&seqns2){
                if(boxes[4].innerText===""){
     boxes[4].innerText="X";
boxes[4].disabled = true;
                     dataAddress = boxes[4].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
boxes[4].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns2=false;
                 break;
                }}
                if(boxes[4].innerText==="X"&&boxes[6].innerText==="X"&&seqns2){
                if(boxes[2].innerText===""){
     boxes[2].innerText="X";
boxes[2].disabled = true;
                     dataAddress = boxes[2].getAttribute('data-address');
                    all_index_x.push(dataAddress);
                    runRN= false;
                    turnO = true;
boxes[2].style.color = 'blue';
seqns2=false;
                 break;
                }}
        }


      


// checking all possibilities of opponent winning
              if (turnO === false){
                let seqns3=true;
        for(let i=0;i<=6;i+=3)
        {
          
if(boxes[i].innerText==="O"&&boxes[i+1].innerText==="O"&&seqns3){
if(boxes[i+2].innerText===""){
boxes[i+2].innerText="X";
boxes[i+2].disabled = true;
dataAddress = boxes[i+2].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
boxes[i+2].style.color = 'blue';
all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
                
                if(boxes[i+1].innerText==="O"&&boxes[i+2].innerText==="O"&&seqns3){
                
                if(boxes[i].innerText===""){
                    boxes[i].innerText="X";
                    boxes[i].disabled = true;
                     dataAddress = boxes[i].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[i].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
                
                if(boxes[i].innerText==="O"&&boxes[i+2].innerText==="O"&&seqns3){
                
                    if(boxes[i+1].innerText===""){
                    boxes[i+1].innerText="X";
                        boxes[i+1].disabled = true;
                         dataAddress = boxes[i+1].getAttribute('data-address');
                        runRN= false;
                        turnO = true;
                        boxes[i+1].style.color = 'blue';
                        all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
            
            if(boxes[i/3].innerText==="O"&&boxes[(i/3)+3].innerText==="O"&&seqns3){
                
                if(boxes[(i/3)+6].innerText===""){
                    boxes[(i/3)+6].innerText="X";
                    boxes[(i/3)+6].disabled = true;
                    dataAddress = boxes[(i/3)+6].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[(i/3)+6].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
                
                if(boxes[(i/3)+3].innerText==="O"&&boxes[(i/3)+6].innerText==="O"&&seqns3){
                
                    if(boxes[(i/3)].innerText===""){
                    boxes[(i/3)].innerText="X";
                        boxes[(i/3)].disabled = true;
                        
                        dataAddress = boxes[(i/3)].getAttribute('data-address');
runRN= false;
turnO = true;
boxes[(i/3)].style.color = 'blue';
                        all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
                
                if(boxes[(i/3)].innerText==="O"&&boxes[(i/3)+6].innerText==="O"&&seqns3){
               
                    
                    if(boxes[(i/3)+3].innerText===""){
                     boxes[(i/3)+3].innerText="X";
                        boxes[(i/3)+3].disabled = true;
                         dataAddress = boxes[(i/3)+3].getAttribute('data-address');
                        runRN= false;
                        turnO = true;
                        boxes[(i/3)+3].style.color = 'blue';
all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
            
          
if(boxes[0].innerText==="O"&&boxes[4].innerText==="O"&&seqns3){
                if(boxes[8].innerText===""){
     boxes[8].innerText="X";
boxes[8].disabled = true;
                     dataAddress = boxes[8].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[8].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
            
            
            if(boxes[0].innerText==="O"&&boxes[8].innerText==="O"&&seqns3){
                if(boxes[4].innerText===""){
     boxes[4].innerText="X";
boxes[4].disabled = true;
                     dataAddress = boxes[4].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[4].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
            if(boxes[4].innerText==="O"&&boxes[8].innerText==="O"&&seqns3){
                if(boxes[0].innerText===""){
     boxes[0].innerText="X";
boxes[0].disabled = true;
                     dataAddress = boxes[0].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[0].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
            if(boxes[2].innerText==="O"&&boxes[4].innerText==="O"&&seqns3){
                if(boxes[6].innerText===""){
     boxes[6].innerText="X";
boxes[6].disabled = true;
                     dataAddress = boxes[6].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
                    boxes[6].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
            if(boxes[2].innerText==="O"&&boxes[6].innerText==="O"&&seqns3){
                if(boxes[4].innerText===""){
     boxes[4].innerText="X";
boxes[4].disabled = true;
                     dataAddress = boxes[4].getAttribute('data-address');
                    runRN= false;
                    turnO = true;
boxes[4].style.color = 'blue';
                    all_index_x.push(dataAddress);
seqns3=false;
                 break;
                }}
                if(boxes[4].innerText==="O"&&boxes[6].innerText==="O"&&seqns3){
                if(boxes[2].innerText===""){
     boxes[2].innerText="X";
boxes[2].disabled = true;
                     dataAddress = boxes[2].getAttribute('data-address');
                    all_index_x.push(dataAddress);
                    runRN= false;
                    turnO = true;
boxes[2].style.color = 'blue';
seqns3=false;
                 break;
                }}
        }
              }
              }
            
                

      
      
      //  algorithm for hard levels ..
  if(runRN && turnO === false){
     let seqns=true;
    
     //code for row
    if(all_index_x.length<3)
    {
    
    for(let j=1;j<=7;j+=3){
      
    if(all_index_x[0]===`btn${j}`&&all_index_o[2]===`btn${j+1}`&&seqns){
if(boxes[j+1].innerText===""){boxes[j+1].innerText="X";
boxes[j+1].disabled = true;
  dataAddress = boxes[j+1].getAttribute('data-address');
  turnO = true;
boxes[j+1].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      
      if(all_index_x[0]===`btn${j+1}`&&all_index_o[2]===`btn${j}`&&seqns){
if(boxes[j+1].innerText===""){boxes[j+1].innerText="X";
boxes[j+1].disabled = true;
  dataAddress = boxes[j+1].getAttribute('data-address');
  turnO = true;
boxes[j+1].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      


    
      
    }
    
      //code for column
    
    for(let j=1;j<=3;j++){
      
      if(all_index_x[0]===`btn${j}`&&all_index_o[2]===`btn${j+3}`&&seqns){
if(boxes[j+5].innerText===""){boxes[j+5].innerText="X";
boxes[j+5].disabled = true;
  dataAddress = boxes[j+5].getAttribute('data-address');
  turnO = true;
boxes[j+5].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      
      if(all_index_x[0]===`btn${j+3}`&&all_index_o[2]===`btn${j}`&&seqns){
if(boxes[j+5].innerText===""){boxes[j+5].innerText="X";
boxes[j+5].disabled = true;
  dataAddress = boxes[j+5].getAttribute('data-address');
  turnO = true;
boxes[j+5].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      
  


       //diagonal code
       
   if(all_index_x[0]===`btn${1}`&&all_index_o[2]===`btn${5}`&&seqns){
if(boxes[8].innerText===""){boxes[8].innerText="X";
boxes[8].disabled = true;
  dataAddress = boxes[8].getAttribute('data-address');
  turnO = true;
boxes[8].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}


   if(all_index_x[0]===`btn${1}`&&all_index_o[2]===`btn${9}`&&seqns){
if(boxes[4].innerText===""){boxes[4].innerText="X";
boxes[4].disabled = true;
  dataAddress = boxes[4].getAttribute('data-address');
  turnO = true;
boxes[4].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}





//2nd diagonal code
   if(all_index_x[0]===`btn${3}`&&all_index_o[2]===`btn${5}`&&seqns){
if(boxes[6].innerText===""){boxes[6].innerText="X";
boxes[6].disabled = true;
  dataAddress = boxes[6].getAttribute('data-address');
  turnO = true;
boxes[6].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}



       }
       

       
       
       
    }
    
    
    
    //code for row
    for(let j=1;j<=7;j+=3){
      
    if(all_index_x[1]===`btn${j}`&&all_index_o[2]===`btn${j+1}`&&seqns){
if(boxes[j+1].innerText===""){boxes[j+1].innerText="X";
boxes[j+1].disabled = true;
  dataAddress = boxes[j+1].getAttribute('data-address');
  turnO = true;
boxes[j+1].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      
      if(all_index_x[1]===`btn${j+1}`&&all_index_o[2]===`btn${j}`&&seqns){
if(boxes[j+1].innerText===""){boxes[j+1].innerText="X";
boxes[j+1].disabled = true;
  dataAddress = boxes[j+1].getAttribute('data-address');
  turnO = true;
boxes[j+1].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      
      
   
   
    
      
    }
    
      //code for column
    
    for(let j=1;j<=3;j++){
      
      if(all_index_x[1]===`btn${j}`&&all_index_o[2]===`btn${j+3}`&&seqns){
if(boxes[j+5].innerText===""){boxes[j+5].innerText="X";
boxes[j+5].disabled = true;
  dataAddress = boxes[j+5].getAttribute('data-address');
  turnO = true;
boxes[j+5].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      
      if(all_index_x[1]===`btn${j+3}`&&all_index_o[2]===`btn${j}`&&seqns){
if(boxes[j+5].innerText===""){boxes[j+5].innerText="X";
boxes[j+5].disabled = true;
  dataAddress = boxes[j+5].getAttribute('data-address');
  turnO = true;
boxes[j+5].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}
      
    
   



//diagonal code

if(all_index_x[1]===`btn${1}`&&all_index_o[2]===`btn${5}`&&seqns){
if(boxes[8].innerText===""){boxes[8].innerText="X";
boxes[8].disabled = true;
  dataAddress = boxes[8].getAttribute('data-address');
  turnO = true;
boxes[8].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}


   if(all_index_x[1]===`btn${1}`&&all_index_o[2]===`btn${9}`&&seqns){
if(boxes[4].innerText===""){boxes[4].innerText="X";
boxes[4].disabled = true;
  dataAddress = boxes[4].getAttribute('data-address');
  turnO = true;
boxes[4].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}





//2nd diagonal code
   if(all_index_x[1]===`btn${3}`&&all_index_o[2]===`btn${5}`&&seqns){
if(boxes[6].innerText===""){boxes[6].innerText="X";
boxes[6].disabled = true;
  dataAddress = boxes[6].getAttribute('data-address');
  turnO = true;
boxes[6].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}


   if(all_index_x[1]===`btn${3}`&&all_index_o[2]===`btn${7}`&&seqns){
if(boxes[4].innerText===""){boxes[4].innerText="X";
boxes[4].disabled = true;
  dataAddress = boxes[4].getAttribute('data-address');
  turnO = true;
boxes[4].style.color = 'blue';
all_index_x.push(dataAddress);
  seqns=false;
  break;
}}




       }
       
       
       
   
       
       
       
  }
    

    
    
  
  
      
      
      
  //random no. generation

while(runRN && turnO === false){

randomNumber = Math.floor(Math.random() * 9);
if(boxes[randomNumber].innerText===""){
                    
                    boxes[randomNumber].innerText="X";
boxes[randomNumber].disabled = true;
                     dataAddress = boxes[randomNumber].getAttribute('data-address');
    turnO = true;
    boxes[randomNumber].style.color = 'blue';
    all_index_x.push(dataAddress);
                 break;
            }
            
      }
      
      boxes.forEach((button) => {
  if (button.innerText === "X") {
    const cross1= document.createElement("div");
    cross1.className = "cross1";
    button.appendChild(cross1);
    button.classList.add("X");
  }
          });
      
      
      
            //array indext 1st element remove
            
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
        
        
        }, 1200);
  
};

//bot source code end


const cheatGame = () => {

  cheatsound.play();

  for(let j=1;j<10;j++){

    if(all_index_x[0]===`btn${j}`){

      const cross2= document.createElement("div");
    cross2.className = "cross2";
    boxes[j-1].appendChild(cross2);
    boxes[j-1].classList.add("x");

      

      

    }

    

  }
                  msg.innerText = `${all_index_x[0]} will be removed`;

  
};


resetBtn.addEventListener("click", resetGame);
cheat.addEventListener("click", cheatGame);


navbtn1.addEventListener("click",navbtn);
navbtn2.addEventListener("click",navbtnn);