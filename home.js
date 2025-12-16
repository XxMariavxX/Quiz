function escapeHTML(unsafe) {
  if (typeof unsafe !== "string") return "";

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const section = document.querySelector(".quiz-cards");
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

function render(){
  section.innerHTML = "";

  if (quizzes.length === 0){
    section.insertAdjacentHTML("afterbegin", 
      `
      <div>You don't have any quizzes yet
      <br> Let's create it !!!<div>
      <a href = "/src/create/create.html"><button type = "button" class="create">Create it♥</button></a>
      `
    )
    return 
  }
  quizzes.forEach(renderQuiz);
}

function renderQuiz(quiz, index) {
  const hours = quiz.time.hours.toString().padStart(2, "0")
  const minutes = quiz.time.minutes.toString().padStart(2, "0")
  const seconds = quiz.time.seconds.toString().padStart(2, "0")

  if(quiz.time.hours <= 0 && quiz.time.minutes <= 0 && quiz.time.seconds <= 0) {
    timerText = "Time: unlimited"
  }else{
    timerText = `Time:${hours}:${minutes}:${seconds}`
  }

  const myCard = `
  <div class="card">
  <div class="title-container">
    <button class="delete">❌</button>
    <h2 class="title">${escapeHTML(quiz.title)}</h2>
    </div>
    
    <div class="description">
    ${escapeHTML(quiz.description)} 
    </div>
  
    <div>
    <span id = "timer">${timerText}</span>
    </div>
    <div class="action-container">
    <p class="amount">Questions:${quiz.amount}</p>
    <button data-index="${index}" class="start">Start</button>
    </div>
    </div>
  `;

  section.insertAdjacentHTML("beforeend", myCard);

  let card = section.lastElementChild;

  const deleteButton = card.querySelector(".delete");

  deleteButton.addEventListener("click", function () {
    if (!confirm("Do you really want to delete quiz?")) return ;

      quizzes.splice(index, 1);
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
      render();
  });

  const start = section.lastElementChild;
  const startButton = start.querySelector(".start");

  startButton.addEventListener("click", function (e) {
    if(quiz.hours > 0 || quiz.time.minutes > 0 || quiz.time.seconds > 0){
      const agree = confirm("This quiz is time limited, are you sure you want to start??")
      if(!agree) {
        return
    }
  }
    window.location.href = "./src/quiz/quiz.html"
    const index = e.target.dataset.index;
    const selectedQuiz = quizzes[index];

    localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
  });
}
function quizStart(id) {
  const selectedQuiz = quizzes.find((quiz) => quiz.id == id);
  localStorage.setItem("currentQuiz", JSON.stringify(selectedQuiz));
  console.log(currentQuiz);
}

render()