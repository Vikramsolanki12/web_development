let reset = document.querySelector('#reset-button');
let buttons = document.querySelectorAll('.button');
let message = document.getElementById('message');
let turn = true;


const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

buttons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        if(turn){
            button.textContent='X';
            turn= false;
        }else{
            button.textContent='O';
            turn= true;
        }
        button.disabled =true;
        checkWinner();
    });
});

function checkWinner(){
   for(let winner of winning){
    let pos1 = buttons[winner[0]].textContent;
    let pos2 = buttons[winner[1]].textContent;
    let pos3 = buttons[winner[2]].textContent;

    if(pos1 != "" && pos2 != "" && pos3 != ""){
        if(pos1 === pos2 && pos2 === pos3 && pos1 === pos3){
            message.textContent=` ${pos1} wins!`;
            buttons.forEach((button) => {
                button.disabled= true;
            })
        }}
   }

};

reset.addEventListener('click',() => {
    buttons.forEach((button) => {
        button.textContent='';
        button.disabled= false;
    })
    message.textContent= "";
    
})