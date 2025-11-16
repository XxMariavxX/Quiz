const title = document.getElementById("title");
const description = document.getElementById("description");
const block = document.getElementById("field");
const create = document.getElementById("create");
const container = document.getElementById("create-quiz");
const center = document.getElementById("center")
const addQuestion = document.getElementById("addquestion");

const result = {correct:[]};

addQuestion.addEventListener("click", function () {
    block.insertAdjacentHTML("afterbegin",  
    `<fieldset class = "quiz">
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
        )
    const field = block.querySelector(".quiz")
    const addAnswer = field.querySelector(".add-answer")
    addAnswer.addEventListener("click", function() {
       field.insertAdjacentHTML("beforeend",
            `<div class="answer">
            <input type="text" id="answer" placeholder= "your answer">
            <input type="checkbox" />
            </div>`

            )
        })
      })
    

function saveQuiz() {
        const form = document.querySelector(".quiz")
        if(!form) {
          return
        }
        const answers = form.querySelectorAll(".answer")
        for(let i = 0; i < answers.length; i++) {
          const answer = answers[i].querySelector('input[type ="text"]').value
          const answerIndex = `answer_${i + 1}`
          result[answerIndex] = answer
          const checked = answers[i].querySelector('input[type="checkbox"]').checked 
          if(checked){
            result.correct.push({
              answerIndex: answerIndex,
              answerText: answer
            })
          }
        }

        
        result.question = form.querySelector(".question").value

        if(!localStorage.getItem('quizzes')) {
          localStorage.setItem('quizzes', JSON.stringify([result]))
        } else {
          const quizzes = JSON.parse(localStorage.getItem('quizzes'))
          quizzes.push(result)
          localStorage.setItem('quizzes', JSON.stringify(quizzes))
        }
        console.log(localStorage.getItem('quizzes'));
      
}
create.addEventListener('click', saveQuiz)