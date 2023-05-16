let tetris = {
  "i": [
    [10, 11, 12, 13],
    [2, 12, 22, 32],
    [20, 21, 22, 23],
    [1, 11, 21, 31],
  ],
  "o": [
    [0, 1, 10, 11],
  ],
  "j": [
    [0, 10, 11, 12],
    [2, 1, 11, 21],
    [10, 11, 12, 22],
    [1, 11, 21, 20],
  ],
  "l": [
    [2, 10, 11, 12],
    [1, 11, 21, 22],
    [10, 11, 12, 20],
    [0, 1, 11, 21],
  ],
  "s": [
    [1, 2, 10, 11],
    [1, 11, 12, 22],
    [11, 12, 20, 21],
    [0, 10, 11, 21],
  ],
  "t": [
    [1, 10, 11, 12],
    [1, 11, 12, 21],
    [10, 11, 12, 21],
    [1, 10, 11, 21],
  ],
  "z": [
    [0, 1, 11, 12],
    [2, 11, 12, 21],
    [10, 11, 21, 22],
    [1, 10, 11, 20],
  ],
};

function begin() {
  let temp_grids = "";
  for (let i = 0; i < 200; i++) {
    temp_grids += `<div></div>`;
  }
  document.querySelector(".grid").innerHTML = temp_grids;
}

begin();

let current = null, next = null, hold = null, sequence = "",offset=3;
let grids = Array.from(document.querySelectorAll(".grid div"));

current = tetris[sequence[0]];
function creat_tetris() {
  if (sequence.length<=7) {
    let s = "loszijt";
    s=s.split("");
    s.sort(function () {
      return 0.5 - Math.random();
    });
    sequence+=s.join("");
    console.log(sequence);
  }
  if (!current) {
    current = tetris[sequence[0]];
    next--;
  }
  else{
    sequence=sequence.substring(1);
    current = tetris[sequence[0]];
    offset=3;
  }
}

function draw_grids() {
  current[0].forEach(index=>{
    grids[index+offset].classList.add(sequence[0]);
  })
}

function undraw_grids() {
  current[0].forEach(index=>{
    grids[index+offset].classList.remove(sequence[0]);
  })
}

creat_tetris();



function tetrdown() {
  undraw_grids();
  offset+=10;
  draw_grids();
}

function freeze() {
  current[0].forEach(index=>{
    console.log(index+offset);
    if(index+offset+10>=200){
      creat_tetris();
    }
    else{
      let s = "loszijt";
      s=s.replace(sequence[0],"");
      for(let i of s){
        if(grids[index+offset+10].classList.contains(i)){
          creat_tetris();
          break;
        }
      }
    }
  })
}

setInterval(function(){
  freeze();
  tetrdown();
},30);

window.addEventListener('keydown', function(e){
  if(e.code=="ArrowLeft"){
    undraw_grids();
    offset-=1;
    draw_grids();
  }
  else if(e.code=="ArrowRight"){
    undraw_grids();
    offset+=1;
    draw_grids();
  }
  else if(e.code=="ArrowDown"){
    undraw_grids();
    offset+=1;
    draw_grids();
  }
});