const title = document.getElementById("title");
const description = document.getElementById("description");
const block = document.getElementById("field");
const container = document.getElementById("create-quiz");
const center = document.getElementById("center");
const addQuestion = document.getElementById("addQuestion");
const create = document.getElementById("create");

addQuestion.addEventListener("click", function () {
  block.insertAdjacentHTML(
    "beforeend",
    `<fieldset class = "quiz">
        <button type="button" class="deleteBlock">❌</button>
        <button type="button" id = "add-answer" class = "add-answer">Add answer</button>
        <div>
        <br>
        <input type="text" class="question" c placeholder= "Write your question ">
        <br> 
        <div class="answer">
          <input type="text"  placeholder= "your answer ">
          <input type="checkbox" />
        </div>
        <div class="answer">
          <input type="text"  placeholder= "your answer ">
          <input type="checkbox" />
        </div>
        <div>
    </fieldset>`
  );
  const field = block.querySelector(".quiz:last-child");
  const addAnswer = field.querySelector(".add-answer");
  const deleteBlock = field.querySelector(".deleteBlock");
  addAnswer.addEventListener("click", function () {
    field.insertAdjacentHTML(
      "beforeend",
      `<div class="newAnswer">
            <div>
            <button type="button" class="deleteAnswer">❌</button>
            <input type="text" id="answer" placeholder= "your answer">
            <input type="checkbox" />
       </div>`
    );
    const newAnswer = field.querySelector(".newAnswer:last-child");
    const deleteAnswer = newAnswer.querySelector(".deleteAnswer");

    deleteAnswer.addEventListener("click", function () {
      newAnswer.remove();
    });
  });

  deleteBlock.addEventListener("click", function () {
    field.remove();
  });
  
});

function saveQuiz() {
  const form = document.querySelectorAll(".quiz");
  let id;
  if(localStorage.getItem("quizzes") !== null) {
    id = JSON.parse(localStorage.getItem("quizzes")).length + 1
  }else {
    id = 1
  }

  if (form.length === 0) return;

  const result = {
    id:id,
    title: title.value.trim(),
    description: description.value.trim(),
    question: [],
    answers: [],
    correct: [],
    amount: form.length, 
  };

  form.forEach((quizField, qIndex) => {

    const questionText = quizField.querySelector(".question").value.trim();
    result.question.push(questionText);

    const questionAnswers = [];
    const questionCorrect = [];

    const answersFields = quizField.querySelectorAll(".answer, .newAnswer");
    answersFields.forEach((ansField, aIndex) => {
      const answerText = ansField.querySelector('input[type="text"]').value.trim();
      const checked = ansField.querySelector('input[type="checkbox"]').checked;

      questionAnswers.push({
          answerIndex: `q${qIndex + 1}_answer_${aIndex + 1}`,
          answerText: answerText,
        });

      if (checked) {
        questionCorrect.push({
          answerIndex: `q${qIndex + 1}_answer_${aIndex + 1}`,
          answerText: answerText,
        });
      }
    });

    result.answers.push(questionAnswers);
    result.correct.push(questionCorrect);
  });

  if (!localStorage.getItem("quizzes")) {
    localStorage.setItem("quizzes", JSON.stringify([result]));
  } else {
    const quizzes = JSON.parse(localStorage.getItem("quizzes"));
    quizzes.push(result);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }
}

create.addEventListener("click", saveQuiz);