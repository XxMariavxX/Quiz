const title = document.querySelector("#title");
const output = document.querySelector("#outputNumb")
const description = document.querySelector("#description");
const count = document.querySelector("#outputN")
const block = document.querySelector("#field");
const container = document.querySelector("#create-quiz");
const center = document.querySelector("#center");
const addQuestion = document.querySelector("#addQuestion");
const create = document.querySelector("#create");
const minutes = document.querySelector("#minutes")
const hours = document.querySelector("#hours")
const seconds = document.querySelector("#seconds")

const MaxLengthTitle = 20;
title.setAttribute("maxlength", MaxLengthTitle);

title.addEventListener("input", function(event){
  
  let currentLength = event.target.value.length;

  output.textContent= `${currentLength} / ${MaxLengthTitle}`;

  if (event.target.value.length === MaxLengthTitle){
    output.style.color = "#DC143C";
  }
  else if (event.target.value.length === 0){
    output.style.color = "";
  }
  else {
    output.style.color = "green";
  }
})

const MaxLengthDescr = 50;
description.setAttribute("maxlength", MaxLengthDescr);

description.addEventListener("input", function(event){
  
  let currentLength = event.target.value.length;

  count.textContent= `${currentLength} / ${MaxLengthDescr}`;

  if (event.target.value.length === MaxLengthDescr){
    count.style.color = "#DC143C";
  }
  else if (event.target.value.length === 0){
    count.style.color = "";
  }
  else {
    count.style.color = "green";
  }
})

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
    time: {
      hours:+hours.value || 0,
      minutes:+minutes.value || 0,
      seconds:+seconds.value || 0
    },
    question: [],
    answers: [],
    correct: [],
    amount: form.length, 
  };
  console.log(result.time)

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