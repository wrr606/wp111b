let tetris = {
  "i": [
    [10, 11, 12, 13],
    [2, 12, 22, 32],
    [20, 21, 22, 23],
    [1, 11, 21, 31],
  ],
  "o": [
    [0, 1, 10, 11],
    [0, 1, 10, 11],
    [0, 1, 10, 11],
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

let tetris_5x5 = {
  "i": [
    [0, 1, 2, 3],
  ],
  "o": [
    [0, 1, 5, 6],
  ],
  "j": [
    [0, 5, 6, 7],
  ],
  "l": [
    [2, 5, 6, 7],
  ],
  "s": [
    [1, 2, 5, 6],
  ],
  "t": [
    [1, 5, 6, 7],
  ],
  "z": [
    [0, 1, 6, 7],
  ],
};

let current = null,
  next = null,
  hold_temp = null,
  sequence = "",
  offset = 3,
  rotate = 0,
  can_hold = true;
let grids = Array.from(document.querySelectorAll(".grid div"));
let hold_grids = Array.from(document.querySelectorAll(".hold div"));
let next_grids = Array.from(document.querySelectorAll(".next div"));

//輸出格子
function begin() {
  let temp_grids = "";
  for (let i = 0; i < 200; i++) {
    temp_grids += `<div></div>`;
  }
  document.querySelector(".grid").innerHTML = temp_grids;
  temp_grids = "";
  for (let i = 0; i < 25; i++) {
    temp_grids += `<div></div>`;
  }
  document.querySelector(".hold").innerHTML = temp_grids;
  temp_grids = "";
  for (let i = 0; i < 100; i++) {
    temp_grids += `<div></div>`;
  }
  document.querySelector(".next").innerHTML = temp_grids;
  grids = Array.from(document.querySelectorAll(".grid div"));
  hold_grids = Array.from(document.querySelectorAll(".hold div"));
  next_grids = Array.from(document.querySelectorAll(".next div"));
}

begin();
startTimer();

current = tetris[sequence[0]];

//每個方塊的起始位置創建
function creat_tetris() {
  grids = Array.from(document.querySelectorAll(".grid div"));
  hold_grids = Array.from(document.querySelectorAll(".hold div"));
  next_grids = Array.from(document.querySelectorAll(".next div"));
  rotate = 0;
  if (sequence.length <= 7) {
    let s = "loszijt";
    s = s.split("");
    s.sort(function () {
      return 0.5 - Math.random();
    });
    sequence += s.join("");
  }
  if (!current) {
    current = tetris[sequence[0]];
    offset = 3;
  } else {
    sequence = sequence.substring(1);
    current = tetris[sequence[0]];
    offset = 3;
  }
  next_tetris();
  draw_grids();
}

//輸出下一個方塊的畫布
function draw_grids() {
  preview();
  current[rotate].forEach((index) => {
    grids[index + offset].classList.add(sequence[0]);
  });
}

//清除上一個方塊的畫布
function undraw_grids() {
  current[rotate].forEach((index) => {
    grids[index + offset].classList.remove(sequence[0]);
  });
}

creat_tetris();

//隨時間下降(重力)
function tetrdown() {
  undraw_grids();
  offset += 10;
  draw_grids();
  freeze();
}

//方塊固定條件判斷
function freeze() {
  gameover();
  let bool = true;
  for (let element of current[rotate]) {
    if (element + offset + 10 >= 200) {
      current[rotate].forEach((index) => {
        grids[index + offset].classList.add(`ed`);
      });
      bool = false;
      eliminate_line(), can_hold = true;
      creat_tetris();
    } else {
      if (grids[element + offset + 10].classList.contains(`ed`)) {
        current[rotate].forEach((index) => {
          grids[index + offset].classList.add(`ed`);
        });
        bool = false;
        eliminate_line(), can_hold = true;
        creat_tetris();
        break;
      }
    }
  }
  preview();
  return bool;
}

//Hold功能
function hold() {
  for (let i of hold_grids) {
    for (let j of "loszijt") {
      i.classList.remove(j);
    }
  }
  if (hold_temp) {
    let temp = sequence[0];
    //JS的string不可變，無法直接改值... =_=
    sequence = hold_temp + sequence.substring(1);
    hold_temp = temp;
    sequence = sequence[0] + sequence;
    can_hold = false;
    creat_tetris();
  } else {
    hold_temp = sequence[0];
    creat_tetris();
    can_hold = false;
  }
  for (let i of tetris_5x5[hold_temp][0]) {
    hold_grids[i + 6].classList.add(`${hold_temp}`);
  }
}

//顯示接下來四個方塊
function next_tetris() {
  for (let i of next_grids) {
    for (let j of "loszijt") {
      i.classList.remove(j);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j of tetris_5x5[sequence[i + 1]][0]) {
      next_grids[j + 6 + 25 * i].classList.add(`${sequence[i + 1]}`);
    }
  }
}

//顯示預覽方塊
function preview() {
  let width = 0, bool = true;
  for (let i of grids) {
    i.classList.remove(`preview`);
  }
  while (bool) {
    width += 10;
    for (let i of current[rotate]) {
      if (i + offset + width >= 200) {
        width -= 10;
        bool = false;
        break;
      }
      if (grids[i + offset + width].classList.contains(`ed`)) {
        width -= 10;
        bool = false;
        break;
      }
    }
  }
  let s = ["i", "o", "s", "z", "j", "l", "t"];
  for (let i of current[rotate]) {
    if (
      !(s.some((className) =>
        grids[i + offset + width].classList.contains(className)
      ))
    ) {
      grids[i + offset + width].classList.add(`preview`);
    }
  }
}

//消行條件判斷
function eliminate_line() {
  for (let i of current[rotate]) {
    let line_eliminate = true, rang = Math.floor((i + offset) / 10) * 10;
    for (let j = rang; j <= rang + 9; j++) {
      if (!(grids[j].classList.contains(`ed`))) {
        line_eliminate = false;
        break;
      }
      if (!line_eliminate) {
        break;
      }
    }
    if (line_eliminate) {
      for (let k = rang; k <= rang + 9; k++) {
        grids[k].remove();
      }
      let grid = document.querySelector(".grid");
      for (let i = 0; i < 10; i++) {
        let temp = document.createElement("div");
        grid.insertBefore(temp, grid.firstChild);
      }
      grids = Array.from(document.querySelectorAll(".grid div"));
    }
  }
}

//立刻放下方塊(Hard drop)
function click_space() {
  let width = 0, bool = true;
  while (bool) {
    width += 10;
    for (let i of current[rotate]) {
      if (i + offset + width >= 200) {
        width -= 10;
        bool = false;
        break;
      }
      if (grids[i + offset + width].classList.contains(`ed`)) {
        width -= 10;
        bool = false;
        break;
      }
    }
  }
  offset += width;
  gameover();
}

//是否可以右移條件判斷
function R_freeze() {
  for (let element of current[rotate]) {
    if ((element + offset) % 10 == 9) {
      return false;
    } else {
      if (grids[element + offset + 1].classList.contains(`ed`)) {
        return false;
      }
    }
  }
  return true;
}

//是否可以左移條件判斷
function L_freeze() {
  for (let element of current[rotate]) {
    if ((element + offset) % 10 == 0) {
      return false;
    } else {
      if (grids[element + offset - 1].classList.contains(`ed`)) {
        return false;
      }
    }
  }
  return true;
}

//遊戲結束條件判斷
function gameover() {
  let s = "loszijt";
  for (let i of current[rotate]) {
    if (grids[i + offset].classList.contains(`ed`)) {
      document.querySelector(".state").innerHTML = "GAME\nOVER";
      setTimeout(function () {
        document.querySelector(".state").innerHTML = "";
      }, 2000);
      reset();
      return;
    }
  }
}

//重製遊戲
function reset() {
  begin();
  current = null, sequence = "", can_hold = true;
  creat_tetris();
}

//方塊下落的秒數控制
function startTimer() {
  timer = setInterval(function () {
    // 要執行的程式碼
    freeze();
    tetrdown();
    preview();
    gameover();
  }, 1000);
}

//監測鍵盤輸入
window.addEventListener("keydown", function (input_key) {
  undraw_grids();
  gameover();
  if (input_key.code == "ArrowUp") {
    rotate++;
    rotate %= 4;
  }
  if (input_key.code == "KeyW") {
    rotate--;
    if (rotate < 0) {
      rotate = tetris[sequence[0]].length - 1;
    }
    rotate %= 4;
  }
  if (input_key.code == "KeyA") {
    rotate += 2;
    rotate %= 4;
  }
  if (input_key.code == "ArrowLeft") {
    if (L_freeze()) {
      offset -= 1;
    }
  }
  if (input_key.code == "ArrowRight") {
    if (R_freeze()) {
      offset += 1;
    }
  }
  if (input_key.code == "ArrowDown") {
    offset += 10;
  }
  if (input_key.code == "Space") {
    click_space();
  }
  if (input_key.code === "ShiftLeft" || input_key.code === "ShiftRight") {
    if (can_hold) {
      hold();
    }
  }
  if (input_key.code == "Space") {
    click_space();
  }
  draw_grids();
  freeze();
});

//按鍵介紹按鈕
document.querySelector(".instruct").addEventListener("click", function () {
  alert(
    `按鍵介紹\n\n方向鍵↑ 順時針轉動\n\n方向鍵↓ soft drop(軟降)\n\n方向鍵← 向左移動\n\n方向鍵→ 向右移動\n\nW鍵 逆時針轉動\n\nShift鍵 Hold功能\n\n空白鍵 Hard drop(硬降)`,
  );
});
