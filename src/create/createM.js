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

createQuiz.addEventListener("click", function () {
  if (block.querySelector("div")) return;
  block.insertAdjacentHTML(
    "beforeend",
    `<br>
        <fieldset>
        <button type="button" id="add-question">Add question</button>
        <button type="button" id="add-answer">Add answer</button>
        <fieldset class = "question" id="question">
        <input>  
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
// quizElement.querySelector("#delete").addEventListener("click", e => {
//     e.target.closest(".question").remove();
// });
// addAnswer.addEventListener("click", function () {
//   const inputAnswer = document.createElement("input");
//   field__1.appendChild(inputAnswer);
// });

// createQuiz.addEventListener("click", function () {
//     if (!block || !createQuiz) return;
//     block.insertAdjacentHTML("beforeend",
//         `<br>
//         <button type="button" id="add-question">Add question</button>
//         <button type="button" id="add-answer">Add answer</button>
//         <fieldset class = "question" >
//         </fieldset>
//         `)
// });

// addQuestion.addEventListener("click", function () {
//     field__1.insertAdjacentHTML(".question",`
//         <fieldset>
//         <input type="text" id="add-question" placeholder="Write your question ?">
//         </fieldset>
//         <fieldset>
//         <input type="text" id="add-question" placeholder= your answer ?">
//         <input type="text" id="add-question" placeholder= your answer ?">
//         </fieldset>
//         `)
// });

// addAnswer.addEventListener("click", function () {
//     field__1.insertAdjacentHTML("beforeend",`
//         <fieldset>
//         <input type="text" id="add-question" placeholder= your answer">
//         </fieldset>
//         `)
// });

// addQuestion.addEventListener("click", function () {
//     const inputQuestion = document.createElement("input")
//     field.appendChild(inputQuestion)
// });

// addAnswer.addEventListener("click", function(){
//     const inputAnswer =document.createElement("input")
//     field.appendChild(inputAnswer)
// })
