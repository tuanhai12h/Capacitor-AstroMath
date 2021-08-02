import {
    getLocal,
    updateLocal,
    secondsLeft,
    timer,
    classWorker,
    clearTime,
    getLevelTime,
  } from "./modules/utils.js";
<<<<<<< HEAD

  const quotes= {
    "positve" : ["You Did it!", "You crushed! your previous score!!!", "AHHHH Improved!!!!"],
    "negative" : ["OOOPS!! You didn't make it", "No worries!! Try again", "Don't lose hope, you can!!!!"],
    "nothin" : ["Yep!!! Same level"]
  }
=======
>>>>>>> origin/survival
  
  const operators = ["+", "-", "*", "/"];
  let qaMap = {};
  let randomAnswer1,
    randomAnswer2,
    score = 0;
  let answers = [];
  
  function getRandomOperator() {
    return operators[Math.floor(Math.random() * operators.length)];
  }
  
  function getRandomNumber() {
    return Math.floor(Math.random() * 10 + 1);
  }
  
  function getRandomAnswer(ans) {
    if (ans < 10) {
      return getRandomNumber();
    }
    let randomAnswers = [
      Math.floor(Math.random() * ans),
      Math.floor(Math.random() * (ans + 100 - ans) + ans),
    ];
    return randomAnswers[Math.floor(Math.random() * 2)];
  }
  
  function getRandomAnswers(ans) {
    randomAnswer1 = getRandomAnswer(ans);
    randomAnswer2 = getRandomAnswer(ans);
    console.log(randomAnswer1, randomAnswer2);
    if (ans < 0) {
      randomAnswer1 = -1 * randomAnswer1;
      randomAnswer2 = -1 * randomAnswer2;
    }
    if (!Number.isInteger(ans)) {
      let randomValue1 = Math.random();
      let randomValue2 = Math.random();
      randomAnswer1 = Number((randomAnswer1 + randomValue1).toFixed(1));
      randomAnswer2 = Number((randomAnswer2 + randomValue2).toFixed(1));
    }
    if (
      randomAnswer1 === ans ||
      randomAnswer2 === ans ||
      randomAnswer1 === randomAnswer2 ||
      answers.includes(randomAnswer1) ||
      answers.includes(randomAnswer2)
    ) {
      return getRandomAnswers(ans);
    } else {
      return [randomAnswer1, randomAnswer2];
    }
  }
  
  function generateRandomChoices(qaMap) {
    for (let val in qaMap) {
      let randomAnswers = getRandomAnswers(qaMap[val]);
      qaMap[val] = [qaMap[val], randomAnswers[0], randomAnswers[1]];
    }
  }
  
  function returnAnswer(op1, op2, op) {
    switch (op) {
      case "+":
        return op1 + op2;
      case "-":
        return op1 - op2;
      case "*":
        return op1 * op2;
      case "/":
        return +(op1 / op2).toFixed(1);
    }
  }
  
<<<<<<< HEAD
=======
  function checkEquation(eq) {
    return eq in qaMap;
  }
  
>>>>>>> origin/survival
  function generateProblem() {
    console.log(answers);
    let [op1, op2, op] = [
      getRandomNumber(),
      getRandomNumber(),
      getRandomOperator(),
    ];
    let eq = `${op1} ${op} ${op2}`;
    let ans = returnAnswer(op1, op2, op);
  
    while (answers.includes(ans)) {
      [op1, op2, op] = [
        getRandomNumber(),
        getRandomNumber(),
        getRandomOperator(),
      ];
      eq = `${op1} ${op} ${op2}`;
      ans = returnAnswer(op1, op2, op);
    }
    answers.push(ans);
    qaMap[eq] = ans;
  }
  
  function generateQA(questions) {
<<<<<<< HEAD
=======
    // let questions = getLocal("gameQuestions");
>>>>>>> origin/survival
    for (let i = 0; i < questions; i++) {
      generateProblem();
    }
    generateRandomChoices(qaMap);
  }
  
  generateQA(5);
  console.table(qaMap);
  
  // asteroids
  let asteroids_container = document.querySelector(".main__asteroids");
  let asteroid_containers = document.querySelectorAll(
      ".main__asteroid-containerr"
  );
  let asteroids = "";
  let eqAnswer, gameAsteroids;
  let gameOptions = document.querySelectorAll(".footer__option");
  function updateAsteroids(){
    asteroid_containers.forEach((container) => {
      container.remove();
    });
    
    for (let q in qaMap) {
      eqAnswer = qaMap[q][0];
      asteroids += `<div class="main__asteroid-container" data-ans="${eqAnswer}" data-all="${qaMap[q]}">
      <h2 class="main__asteroid-problem">${q}</h2>
      <img src="./assets/images/asteroid.png" alt="" class="main__asteroid" />
    </div>`;
    }
    asteroids_container.innerHTML = asteroids;
    gameAsteroids = [...document.querySelectorAll(".main__asteroid-container")];
  }
  updateAsteroids();
  
  // options
  function randIndex(index) {
    return Math.floor(Math.random() * index);
  }
  
  let randomAsteroid;
  const scoreTag = document.querySelector(".header__info--score");
  
  function assignOptions() {
    randomAsteroid = gameAsteroids.splice(randIndex(gameAsteroids.length), 1)[0];
    console.log(randomAsteroid);
    if (!randomAsteroid) {
        console.log("hello");
<<<<<<< HEAD
=======
    //   endGame();
    //   return;
>>>>>>> origin/survival
        asteroids = "";
        answers.splice(0, answers.length);
        qaMap = {};
        generateQA(5);
        updateAsteroids();
        assignOptions();
    return;
    }
    let values = randomAsteroid.dataset.all.split(",");
    let done = [];
    values.forEach((e) => {
      let ri = randIndex(3);
      while (done.includes(ri)) {
        ri = randIndex(3);
      }
      done.push(ri);
      gameOptions[ri].textContent = e;
      gameOptions[ri].dataset.value = e;
    });
  }
  
  window.addEventListener("load", assignOptions);
  
  const keys = {
    a: gameOptions[0],
    s: gameOptions[1],
    d: gameOptions[2],
    1: gameOptions[0],
    2: gameOptions[1],
    3: gameOptions[2],
  };
  
  function answerValidate(value) {
    let target = document.querySelector(`[data-ans="${value}"]`);
    if (target) {
      target.remove();
      scoreTag.innerText = ++score;
    } else {
      randomAsteroid.querySelector("h2").style.color = "red";
    }
    assignOptions();
  }
  
  gameOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      answerValidate(e.target.textContent.trim());
    });
  });
  
  // end Game
  const resultCont = document.querySelector(".result");
  const footer = document.querySelector(".footer");
  
  function endGame() {
    let qono = Math.floor(Math.random()*3);

    clearTime();
    window.removeEventListener("keyup", listenKeys);

    let bestScore = +getLocal("survivalScore");
    let score = +scoreTag.innerText;
    let giphyAttr = document.querySelector(".giphy__attr");
    let quoteTag = document.querySelector(".result__quotes");

    console.log(score, bestScore)

    if(score > bestScore){
        classWorker("none", "remove", giphyAttr);
        classWorker("none", "remove", highImg);
        quoteTag.innerText = quotes.positve[qono];
    }
    else if(score < bestScore){
      quoteTag.innerText = quotes.negative[qono];
    }
    else{
      quoteTag.innerText = quotes.nothin[0];
    }
    endResult(bestScore);
  }
  
  function naviCaller() {
    console.log("clicked");
<<<<<<< HEAD
    location.reload();
=======
    if (this.dataset.value === "next") {
      let nextLevel = `${(+getLocal("gameLevel") + 1) % 10}`;
      if (nextLevel === 0) {
        nextLevel = 10;
      }
      let localjson = JSON.parse(getLocal("levelValue"));
  
      updateLocal("gameLevel", nextLevel);
      updateLocal("gameTime", getLevelTime(nextLevel));
      updateLocal("gameBestTime", localjson[nextLevel][1]);
      updateLocal("gamePercentage", localjson[nextLevel][2]);
      updateLocal("gameQuestions", localjson[nextLevel][3]);
  
      location.reload();
    } else if (this.dataset.value === "again") {
      location.reload();
    }
>>>>>>> origin/survival
  }
  
  function updateText(element, text) {
    document.querySelector(element).textContent = text;
  }
  
<<<<<<< HEAD
  function endResult(bs) {
=======
  function endResult() {
>>>>>>> origin/survival
    classWorker(
      "none",
      "add",
      asteroids_container,
      footer,
      document.querySelector(".header")
    );
    classWorker("none", "remove", resultCont);
<<<<<<< HEAD
    updateText(".result__score span", `${scoreTag.textContent}`);
    updateText(".result__prescore span", `${bs}`);
=======
    // updateText(".result__percent", `${percent} %`);
    updateText(".result__score span", `${scoreTag.textContent}`);
    // updateText(".result__time span", `${seconds} s`);
    // updateText(".result__targets span", `${gameQues}`);
    // updateText(".result__missed span", `${gameQues - scoreTag.textContent}`);
    // closeFullscreen();
>>>>>>> origin/survival
  }
  
  const buttons = resultCont.querySelectorAll("button");
  buttons.forEach((data) => {
    data.addEventListener("click", naviCaller);
  });
  
  function timerCheck() {
    if (secondsLeft < 0) {
      endGame();
      return;
    }
    setTimeout(timerCheck, 1000);
  }
  
  function listenKeys(e) {
    switch (e.key) {
      case "a":
      case "s":
      case "d":
        answerValidate(keys[e.key].textContent.trim());
    }
  }
  
  let elem = document.documentElement;
  
  /* View in fullscreen */
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  }
  
  const start = document.querySelector(".popup__button--start");
  start.addEventListener("click", () => {
    window.addEventListener("keyup", listenKeys);
    footer.style.pointerEvents = "unset";
    timer(10);
    timerCheck();
    classWorker("none", "add", start.parentElement);
    classWorker("none", "remove", document.querySelector(".main__asteroids"));
    // openFullscreen();
  });
  
  footer.style.pointerEvents = "none";
  