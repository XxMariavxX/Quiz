const titleE = document.getElementById("quiz-title");
const questionsEl = document.getElementById("quiz-questions");
const finishBtn = document.getElementById("finish");

const currentQuiz = JSON.parse(localStorage.getItem("currentQuiz"));

if (!currentQuiz) {
  console.error("No quiz selected!");
} else {
  titleE.textContent = currentQuiz.title;

  currentQuiz.question.forEach((q, qIndex) => {
    let answersHTML = "";
    currentQuiz.answers[qIndex].forEach((ans, aIndex) => {
      const id = 
      `q${qIndex}_a${aIndex}`;
      answersHTML += 
      `<div class="answerblock">
      <input type="checkbox" name="q${qIndex}" id="${id}" value="${ans}">
        <label for="${id}">${ans}</label>
        <br></div>`;
    });

    const questionHTML = `
    <fieldset>
        ${q}
      </fieldset>
      <fieldset>
        ${answersHTML}
      </fieldset>
    `;

    questionsEl.insertAdjacentHTML("beforeend", questionHTML);
  });

}
finishBtn.addEventListener("click", function(){

})