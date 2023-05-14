function begin() {
  let temp_grids = "";
  for (let i = 0; i < 200; i++) {
    temp_grids += `<div></div>`;
  }
  document.querySelector(".grid").innerHTML = temp_grids;
}

function draw_grids(grids) {
  let temp_grids="";
  for(let i=0;i<grids.length;i++)
    temp_grids+=grids[i].outerHTML;
  document.querySelector(".grid").innerHTML = temp_grids;
}

let itetr=[
  [10,11,12,13],
  [2,12,22,32],
  [20,21,22,23],
  [1,11,21,31]
];

let otetr=[
  [0,1,10,11]
];

let jtetr=[
  [0,10,11,12],
  [2,1,11,21],
  [10,11,12,22],
  [1,11,21,20]
];

let ltetr=[
  [2,10,11,12],
  [1,11,21,22],
  [10,11,12,20],
  [0,1,11,21]
];

let stetr=[
  [1,2,10,11],
  [1,11,12,22],
  [11,12,20,21],
  [0,10,11,21]
];

let ttetr=[
  [1,10,11,12],
  [1,11,12,21],
  [10,11,12,21],
  [1,10,11,21]
];

let ztetr=[
  [0,1,11,12],
  [2,11,12,21],
  [10,11,21,22],
  [1,10,11,20]
];

begin();
let grids=Array.from(document.querySelectorAll(".grid div"));

draw_grids(grids);