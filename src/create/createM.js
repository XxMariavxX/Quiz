const title = document.getElementById("title");
const description = document.getElementById("description");
const addAnswer = document.getElementById("add-answer");
const addQuestion = document.getElementById("add-question");
const block = document.getElementById("field");
const block1 = document.getElementById("field__1");
const create = document.getElementById("create");
const createQuiz = document.getElementById("createQuiz");
const container = document.getElementById("create-quiz");
const blockQuestionAnswer = document.getElementById("question")

if (!block || !createQuiz) return;

createQuiz.addEventListener("click", function () {
  if (block.querySelector("div")) return;
  block.insertAdjacentHTML(
    "beforeend",
    `<br>
        <fieldset>
        <button type="button" id="add-question">Add question</button>
        <button type="button" id="add-answer">Add answer</button>
        <fieldset class = "question" id="question">
        </fieldset>
         </fieldset>`
  );
});

addQuestion.addEventListener("click", function () {
  const inputQuestion = document.createElement("input");
  field__1.appendChild(inputQuestion);
});

addAnswer.addEventListener("click", function () {
  const inputAnswer = document.createElement("input");
  field__1.appendChild(inputAnswer);
});
