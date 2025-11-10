const title = document.getElementById("title");
const description = document.getElementById("description");
const block = document.getElementById("field");
const block1 = document.getElementById("field__1");
const create = document.getElementById("create");
const createQuiz = document.getElementById("createQuiz");
const container = document.getElementById("create-quiz");
const blockQuestionAnswer = document.getElementById("question");

createQuiz.addEventListener("click", function () {
  if (!block || !createQuiz) return;
  block.insertAdjacentHTML(
    "beforeend",
    `<br>
        <fieldset>
        <button type="button" id="addquestion">Add question</button>
        <button type="button" id="add-answer">Add answer</button>
        <fieldset class = "quiz" id="quiz">
        <br>
        <input type="text" id="question" placeholder= "Write your question ">
        <br>
        <input type="text" id="answer" placeholder= "your answer ">
        <br>
        <input type="text" id="answer" placeholder= "your answer ">  
        </fieldset>`
  );
  const addQuestion = block1.querySelector("#addquestion");
  addQuestion.addEventListener("click", function () {
    const inputQuestion = document.createElement("div");
    inputQuestion.insertAdjacentHTML("beforeend",  
    `<br>
    <input type="text" id="question" placeholder=" Write your question ?">
    <br>
    <input type="text" id="add-answer" placeholder= "your answer">
    <br>
    <input type="text" id="add-answer" placeholder= "your answer">
    `);
    field__1.appendChild(inputQuestion);
  });
  // const addAnswer = block1.querySelector("#answer");
  // addAnswer.
});