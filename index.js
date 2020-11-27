//VARIABLES LANDING PAGE
const landingPage = document.getElementById("landing-page");
const playbtn = document.getElementById("start-playing");
const rulesbtn = document.getElementById("btnRules");

//VARIABLE RULE PAGE
const rulesPage = document.getElementById("rules-page");
const closeRulesPage = document.getElementById("btn-close");
const rulesPlayBtn = document.getElementById("start-via-rules");

//VARIABLES QUIZ
let quizz = document.getElementById("quizz");
const question = document.getElementById("question");
const imageQuestion = document.getElementById("image-qst");
const choiceA = document.getElementById("a");
const choiceB = document.getElementById("b");
const choiceC = document.getElementById("c");
const choiceD = document.getElementById("d");
const counter = document.getElementById("counter");
const tempsJauge = document.getElementById("contentu-jauge");
const progress = document.getElementById("progress");

//RESULT PAGE
const result = document.getElementById("results");

let choixRetenu = "";

let questions = [
  {
    text: "In which country did the Bandung Conference take place?",
    imgSrc: "./img/martin-luther-king.png",
    choiceA: "China",
    choiceB: "India",
    choiceC: "Indonesia",
    choiceD: "The Philippines",
    correct: "Indonesia",
  },
  {
    text: "Which country doesn't have the UN Security Council veto power?",
    imgSrc: "./img/martin-luther-king.png",
    choiceA: "China",
    choiceB: "Germany",
    choiceC: "France",
    choiceD: "Russia",
    correct: "Germany",
  },
  {
    text: "What is the official language of the United-State?",
    imgSrc: "./img/martin-luther-king.png",
    choiceA: "English",
    choiceB: "Spanish",
    choiceC: "None",
    choiceD: "Swahili",
    correct: "None",
  },
  {
    text: "What is the disputed capital city of the State of Israel?",
    imgSrc: "./img/martin-luther-king.png",
    choiceA: "Damascus",
    choiceB: "Tel Aviv",
    choiceC: "Jerusalem",
    choiceD: "Tehran",
    correct: "Jerusalem",
  },
  {
    text: "What was the operation name of the first Gulf War?",
    imgSrc: "./img/martin-luther-king.png",
    choiceA: "Operation Desert Storm",
    choiceB: "Operation Storm Troopers",
    choiceC: "Operation Desert Shield",
    choiceD: "Operation Dust Blizzard",
    correct: "Operation Desert Storm",
  },
];

const lastQuestion = questions.length - 1; //THE LAST QUESTION INDEX OF MY ARRAY
let runningQuestion = 0; //LA QUESTION A LAQUELLE LE JOUEUR EST EN TRAIN DE REPONDRE
const tempsParQuestion = 10; // 10s
const jaugeWidth = 150; // 150px
const jaugeUnit = jaugeWidth / tempsParQuestion;
let count = 0;
let timerGame;
let score = 0;

function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = `<p>${q.text}</p>`;
  imageQuestion.innerHTML = `<img src=${q.imgSrc}>`;
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

rulesbtn.addEventListener("click", function openRulesPage() {
  landingPage.style.display = "none";
  rulesPage.style.display = "block";
});

closeRulesPage.addEventListener("click", function closePage() {
  rulesPage.style.display = "none";
  landingPage.style.display = "block";
});

rulesPlayBtn.addEventListener("click", function playAfterRules() {
  rulesPage.style.display = "none";
  startQuiz();
});

// startOver.addEventListener("click", function startAgain() {
//   result.style.display = "none";
//   startQuiz();
// });

// backToLanding.addEventListener("click", function goBackToLanding() {
//   result.style.display = "none";
//   landingPage.style.display = "block";
// });

playbtn.addEventListener("click", startQuiz);

// LOGIQUE DU QUIZZ
function startQuiz() {
  landingPage.style.display = "none";
  quizz.style.display = "block";
  renderQuestion();
  renderCounter();
  timerGame = setInterval(renderCounter, 1000);
}

function renderCounter() {
  if (count <= tempsParQuestion) {
    counter.innerHTML = count;
    tempsJauge.style.width = count * jaugeUnit + "px";
    count++;
  } else {
    count = 0;
    loose();
    runningQuestion++;
    renderQuestion();
  }
}

//si le temps de la dernière question est écoulé alors on display le résultat

//tempsParQuestion
//lastQuestion
//runninQuestion

// if (runninQuestion === lastQuestion) {

// if (runningQuestion < lastQuestion) {
//   runningQuestion++;
//   renderQuestion();
// } else {
//   displayResult();
// }

//AJOUTER UN ENFANT PROG A LA DIV PROGRESS EN FONCTION DU NOMBRE DE QUESTION DANS MON ARRAY QUESTIONS

let prog;
let progs;

questions.forEach(function () {
  prog = document.createElement("div");
  prog.className = "prog";
  progress.appendChild(prog);
});

progs = document.querySelectorAll(".prog");
console.log(progs);

function win() {
  progs[runningQuestion].classList.add("win");
}

function loose() {
  progs[runningQuestion].classList.add("loose");
}

function verifReponse(evt) {
  //choixRetenu = questions[runningQuestion].choiceA;
  // console.log(evt.target);
  if (evt.target.textContent === questions[runningQuestion].correct) {
    score++;
    win();
    console.log("gagné");
  } else {
    console.log("perdu");
    loose();
    renderQuestion();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // LA FIN DU GAME
    clearInterval(timerGame);
    displayResult();
  }
}

const choices = [choiceA, choiceB, choiceC, choiceD];

choices.forEach((choice) => {
  choice.onclick = verifReponse;
});

function displayResult() {
  result.style.display = "block";

  const resultPerCent = Math.round((100 * score) / questions.length);

  let img = "";

  if (resultPerCent >= 80) {
    img = "./img/5.png";
  } else if (resultPerCent >= 60) {
    img = "./img/4.png";
  } else if (resultPerCent >= 40) {
    img = "./img/3.png";
  } else if (resultPerCent >= 20) {
    img = "./img/2.png";
  } else {
    img = "./img/1.png";
  }
  result.innerHTML = `<img src="${img}">`;
  result.innerHTML += `<div>${resultPerCent}%</div>`;

  let avis = "";
  if (resultPerCent >= 80) {
    avis = `Great! You know so much about our world! You'll learn even more on our <a href="https://thegeopolitics.com/">website</a>`;
  } else if (resultPerCent >= 60) {
    avis = `Pretty good! Why don't you continue your training on our <a href="https://thegeopolitics.com/">website</a>`;
  } else if (resultPerCent >= 40) {
    avis = `That's a decent start! You'll do better once you visit our <a href="https://thegeopolitics.com/">website</a>`;
  } else if (resultPerCent >= 20) {
    avis = `Ok, there is some work to do, but don't worry you'll soon do better thanks to our <a href="https://thegeopolitics.com/">website</a>`;
  } else {
    avis = `Oh no! that wasn't great. I'm sure you'll do better after visiting our <a href="https://thegeopolitics.com/">website</a>`;
  }

  result.innerHTML += `<div>${avis}</div>`;
}

result.style.textAlign = "center";

result.style.padding = "40px";

result.style.fontWeight = "bold";

//const startOver = document.querySelector(".start-over");

// let landResult = document.createElement("div");
// landResult.className = "start-over";
// landResult.textContent = "Back";
// result.appendChild(landResult);

// landResult.addEventListener("click", function backToLanding() {
//   result.style.display = "none";
//   landingPage.style.display = "block";
// });
