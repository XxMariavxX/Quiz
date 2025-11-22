const startQuiz =document.getElementById("startQuiz")
const currentQuiz = JSON.parse(localStorage.getItem("currentQuiz"));

if(currentQuiz){
  document.getElementById("title").textContent = currentQuiz.title;
}


