const title = document.getElementById("title");
const description = document.getElementById("description");
const block = document.getElementById("field");
const create = document.getElementById("create");
const createQuiz = document.getElementById("createQuiz");
const container = document.getElementById("create-quiz");
const blockQuestionAnswer = document.getElementById("question");

createQuiz.addEventListener("click", function () {
  if (!block || !createQuiz) return;
  block.insertAdjacentHTML(
    "beforeend",
    `<br>
        <button type="button" id="addquestion">Add question</button>
        <button type="button" id="add-answer">Add answer</button>
        <fieldset class = "quiz" id="quiz">
        <br>
        <input type="text" id="question" placeholder= "Write your question ">
        <br>
        <input type="text" id="answer" placeholder= "your answer ">
        <br>
        <input type="text" id="answer" placeholder= "your answer ">  `
  );
  const addQuestion = block.querySelector("#addquestion");
  addQuestion.addEventListener("click", function () {
    const inputQuestion = document.createElement("div");
    inputQuestion.insertAdjacentHTML(
      "beforeend",
      `<br>
    <input type="text" id="question" placeholder=" Write your question ?">
    <br>
    <input type="text" id="add-answer" placeholder= "your answer">
    <br>
    <input type="text" id="add-answer" placeholder= "your answer">
    `
    );
    block.appendChild(inputQuestion);
  });
  const addAnswer = block.querySelector("#answer");
  addAnswer.addEventListener("click", function () {
    const inputAnswer = document.createElement("div");
    inputAnswer.insertAdjacentHTML(
      "beforeend",
    `<br>
    <input type="text" id="add-answer" placeholder= "your answer">`
    );
    block.appendChild(inputAnswer);
  });
});