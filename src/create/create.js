const title = document.getElementById("title")
const description = document.getElementById("description")
const image = document.getElementById("img")
const addAnswer = document.getElementById("add-answer")
const addQuestion = document.getElementById("add-question")
const block = document.getElementById("field")
const create = document.getElementById("create")
const createQuiz = document.getElementById("createQuiz")
const container = document.getElementById("create-quiz")

createQuiz.addEventListener("click", function () {
    block.insertAdjacentHTML("beforeend",
        `<br>
        <button type="button" id="add-question">Add question</button>
        <button type="button" id="add-answer">Add answer</button>
        <fieldset class = "question" >
        </fieldset>
         </fieldset>`)
})

addQuestion.addEventListener("click", function () {
    const inputQuestion = document.createElement("input")
    field.appendChild(inputQuestion)
})

addAnswer.addEventListener("click", function(){
    const inputAnswer =document.createElement("input")
    field.appendChild(inputAnswer)
})