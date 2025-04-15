let choices = document.querySelectorAll('.choice');
let massage = document.getElementById('msg');
let your_score = document.getElementById('user-score');
let comp_score = document.getElementById('com-score');
let reset_button= document.getElementById('reset');
let score1=0;
let score2=0;

let user_choice = choices.forEach((choice) =>{
    choice.addEventListener('click',() =>{
        let c_c =computer_choice();
        let selected = choice.getAttribute('id');

        if(c_c === selected){
            massage.textContent="draw!";
        }else if(selected === "stone"){
            if(c_c === "paper"){
                massage.textContent="you loose";
                score2++;


            }else{
                massage.textContent= "you won!";
                score1++;
            }
        }else if (selected === "paper"){
            if(c_c === "stone"){
                massage.textContent = "you won!";
                score1++;
            }else{
                massage.textContent = "you loose!";
                score2++;
            }
        }else{
            if(c_c === "stone"){
                massage.textContent = "you lose!";
                score2++;
            }else{
                massage.textContent = "you won!";
                score1++;
            }
        }
        your_score.textContent=score1;
        comp_score.textContent=score2;

    })
})

function computer_choice(){
    const data =[ 'stone', 'paper', 'scissors'];
    let idx = Math.floor(Math.random()*3);
    return data[idx];
}

reset_button.addEventListener('click', () => {
    score1=0;
    score2=0;
    your_score.textContent=0;
    comp_score.textContent=0;
})


