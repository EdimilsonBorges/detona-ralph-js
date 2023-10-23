const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    dialog: document.querySelector(".container__dialog"),
    dialogText: document.querySelector(".corpo__dialog p"),
    lives: document.querySelector("#lives"),
    level: document.querySelector("#level"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    lives: 10,
    dificult:15,
    level:1,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;
  state.view.lives.textContent = state.values.lives;
  state.view.level.textContent = state.values.level;
  if (state.values.lives <= 0 || state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.view.dialogText.innerHTML = "Game Over! O seu resultado foi: " + state.values.result;
    state.view.dialog.classList.remove("hidden");
  }
}

const btnCloseDialog = document.getElementById("close");
btnCloseDialog.addEventListener("click", () => {
  state.view.dialog.classList.add("hidden");
  gameReset();
});

function playSound(audioName) {
  let audio = new Audio(`./src/sounds/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        state.values.curretTime = state.values.curretTime + 3;
        playSound("hit");

        if(state.values.result === state.values.dificult){
          state.values.dificult = state.values.dificult + 15;
            state.values.lives = state.values.lives + 5;
            state.values.level++;
            clearInterval(state.actions.timerId);
            state.values.gameVelocity = state.values.gameVelocity / 1.2;
            state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
        }
        
      } else if(state.values.lives > 0){
        state.values.lives--;
        state.view.lives.textContent = state.values.lives;
      }
    });
  });
}

function gameReset(){
  state.values.curretTime = 60;
  state.actions.timerId = setInterval(randomSquare, 1000);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.values.result = 0;
  state.view.score.textContent = 0;
  state.values.dificult = 15;
  state.values.lives = 10;
  state.values.level = 1;
  state.view.lives.textContent = state.values.lives;
  state.view.level.textContent = state.values.level;
}

function initialize() {
  addListenerHitBox();
  gameReset();
}

initialize();