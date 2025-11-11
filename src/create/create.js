const title = document.getElementById("title");
const description = document.getElementById("description");
const block = document.getElementById("field");
const create = document.getElementById("create");
const createQuiz = document.getElementById("createQuiz");
const container = document.getElementById("create-quiz");
const center = document.getElementById("center")

createQuiz.addEventListener("click", function () {
  createQuiz.remove()
  center.insertAdjacentHTML(
    "afterbegin",
    `<button type="button" id="addquestion">Add question</button>`
  )
  block.insertAdjacentHTML(
    "beforeend",
    `<br>
        <fieldset >
        <button type="button" class = "add-answer">Add answer</button>
        <div class = "quiz" id="quiz">
        <br>
        <input type="text"  placeholder= "Write your question ">
        <br>
        <input type="text"  placeholder= "your answer ">
        <br>
        <input type="text"  placeholder= "your answer ">
        </div>
        </fieldset>`
  );
  const addQuestion = document.getElementById("addquestion");
  addQuestion.addEventListener("click", function () {
    block.insertAdjacentHTML("beforeend",  
    `<fieldset>
        <button type="button"  class = "add-answer">Add answer</button>
        <fieldset class = "quiz" id="quiz">
        <br>
        <input type="text"  placeholder= "Write your question ">
        <br>
        <input type="text"  placeholder= "your answer ">
        <br>
        <input type="text"  placeholder= "your answer ">
  
    </fieldset>`
    );
  });
})
const addAnswer = document.querySelector(".add-answer")
        addAnswer.addEventListener("click", function() {
        const answer = document.createElement("input");
        answer.type = "text";
        answer.placeholder = "Write your question";
        answer.className = "question"
        const field_2 = document.querySelector(".quiz")
        field_2.insertAdjacentHTML("beforeend",
            `<input type="text" id="question" placeholder= "Write your question "></input>`
            )
        })