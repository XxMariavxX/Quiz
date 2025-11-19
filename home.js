function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
quizzes.forEach(renderquiz);
console.log(localStorage.getItem("quizzes"));

function renderquiz(quiz, index) {
  const section = document.getElementById("quiz-card");
  const card = document.createElement("div");
  card.classList.add("quiz");

  card.innerHTML = `
    <h2>${escapeHTML(quiz.title)}</h2>
    <p>${escapeHTML(quiz.description)}</p>
    <button class="delete">❌</button>
    <button class="start">Start</button>
  `;

  section.appendChild(card);

  const deleteButton = card.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    if (confirm("Ви точно хочете видалити квіз?")) {
      card.remove();               
      quizzes.splice(index, 1);    
      localStorage.setItem("quizzes", JSON.stringify(quizzes));
    }
  });

  const startButton = card.querySelector(".start");
  startButton.addEventListener("click", () => {
    console.log("Назва квізу:", quiz.title);
    
  });
}






    