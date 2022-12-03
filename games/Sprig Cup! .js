/*
@title: Sprig Cup!
@author: Upama R

Controls ;
W for Up
S for Down
A for Left
D for Right


Get the ball into the goal!
*/


const playerone = "p";
const enemy = "e";
const wall = "w";
const grass = 'g';
const goal = 'o';
const ball = 'b';
const defender = 'd';


setLegend(
  [playerone, bitmap`
................
......0000......
.....06660......
.....0606.......
......666.......
......6.........
....99999.......
....909996......
....6999..6.....
....6999..6666..
...66999........
.....2222.......
.....2..2.......
....40..0.......
....44..44......
................`],
  [enemy, bitmap`
................
......00000.....
......06660.....
.......066......
.......666......
........6.......
......333333....
......333303....
......0333330.2.
...22.03333.002.
....200.LLL.....
........LLL.....
.......0..0.....
......03..3.....
....3333.33.....
.........33.....`],
  [defender, bitmap`
................
................
................
.......000......
........660.....
.......6606.....
........666.....
.........66.....
.......55555....
.......65505....
.....66..5566...
.........55.6...
........LLL.....
.......00.00....
......000.00....
................`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ball,bitmap`
................
................
................
................
................
................
................
................
................
.......0002.....
......220202....
.....02020002...
.....20002022...
.....02020002...
.....0020222....
......20002.....`],
    [goal, bitmap`
4444440000000000
4444444022222222
4444444402224244
4444444422424244
4444444424422022
4444444422222244
4444444424422022
4444444422422004
4444444402422222
4444444402422404
4444444002422202
4444444022222222
4444444022222224
4444444024424202
4444444000220004
4444400000000000`],
  [grass,bitmap`
44D4444444444444
4444DD4D44D44DD4
D4D44D4DD44D4D44
4DDD44D44DD44D4D
D4D4D44DDDDDDD44
D4D4DDD444444D4D
D4D44444DD44DD4D
4D4D4D4D4D444D44
D4444DD4DDDD4DD4
44DD4D4DD44D44D4
DDDD444D444D4DD4
DD4444DD44DD4D44
4D4DDD4DDD444DD4
4D44D44DDD44DD4D
4DDDD4444DD4D44D
44D444D4444DD4D4`]

);

let level = 0;
const levels = [
  map `
gggggggw
gggggg.w
gggggg.w
ggggdgeo
ggpbgggw
gggggggw
gggggggw`
];

  
const currentlevel = levels[level]
setMap(currentlevel);
setBackground(grass);

setSolids([playerone,wall,ball])

setPushables({
  [playerone]:[ball]
})




// player movements

onInput("d", () => {
  // Move the player one tile to the right
  getFirst(playerone).x += 1

})

onInput("a", () => {
  // Move the player one tile to the left
  getFirst(playerone).x -= 1
})

onInput("w", () => {
  // Move the player one tile to down
  getFirst(playerone).y -= 1

})

onInput("s", () => {
  // Move the player one tile down
  getFirst(playerone).y += 1

})

onInput("j", () => {
  setMap(currentlevel);
  clearText();
})

var rot = 0

function moveGoalieDefense(){
  const e1 = getFirst(enemy);
  const e2 = getFirst(defender);
  e1.y = Math.floor(Math.random() * 7) + 1;
  e2.x = Math.floor(Math.random() *  4) + 2; 
  afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, ball).length;
  const captured = tilesWith(ball, defender).length;
  const balllock = tilesWith(ball).length;
  if (numberCovered === targetNumber) {
    addText("GOAL",{ x :7, y: 7, color : color `3` })
    const melody = tune`
789.4736842105264,
197.3684210526316: a4-197.3684210526316,
394.7368421052632,
197.3684210526316: a4-197.3684210526316,
394.7368421052632,
197.3684210526316: a4-197.3684210526316,
197.3684210526316,
197.3684210526316: b4-197.3684210526316,
197.3684210526316: c5-197.3684210526316 + d5-197.3684210526316 + f5-197.3684210526316 + g5-197.3684210526316,
197.3684210526316,
197.3684210526316: f5-197.3684210526316 + d5-197.3684210526316,
197.3684210526316,
197.3684210526316: c5-197.3684210526316,
197.3684210526316: e5-197.3684210526316 + g5-197.3684210526316 + f5-197.3684210526316,
197.3684210526316: g5-197.3684210526316 + f5-197.3684210526316 + e5-197.3684210526316 + d5-197.3684210526316,
197.3684210526316: a4~197.3684210526316,
197.3684210526316: a4/197.3684210526316,
1973.6842105263158`
    playTune(melody)
  }

  if (balllock == captured){
    addText("GAMEOVER, PRESS J",{ x :1, y: 7, color : color `5` })
    
  }

})

}
function update(){
  moveGoalieDefense(rot);
  rot++;
  setTimeout(update,500);
};
update();






