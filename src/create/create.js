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
        <button type="button" id="add-question">Add question</button>
        <button type="button" id="add-answer">Add answer</button>
        <fieldset class = "quiz" id="quiz">
        <input type="text" id="question" placeholder= Write your question ?">
        <input type="text" id="answer" placeholder= your answer ?">
        <input type="text" id="answer" placeholder= your answer ?">  
        </fieldset>`
  );
});


addQuestion.addEventListener("click", function () {
  const inputQuestion = document.createElement("div");
  inputQuestion.insertAdjacentHTML("beforeend", function () {
    `<br>
    <input type="text" id="question" placeholder= Write your question ?">
    <input type="text" id="add-question" placeholder= your answer ?">
    <input type="text" id="add-question" placeholder= your answer ?">
    </fieldset>
    `;
  });
  field__1.appendChild(inputQuestion);
});


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
