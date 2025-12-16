const resultsContainer = document.getElementById("results");4
const results = JSON.parse(localStorage.getItem("results")) || [];
const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

function escapeHTML(unsafe) {
  if (typeof unsafe !== "string") return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

resultsContainer.innerHTML = "";

if (results.length === 0) {
  resultsContainer.innerHTML = "<div class='no-results'>No results yet</div>";
} else {
  results.slice().reverse().forEach((resultItem) => {
    
    const originalQuiz = quizzes.find((q) => q.id == resultItem.quizId);
    const quizTitle = originalQuiz ? originalQuiz.title : "Unknown Quiz";


    let score = 0;
    const questions = resultItem.questions;

    questions.forEach((q) => {
      
      const correctIndices = q.correct_answers.map((a) => a.answerIndex);
      const userIndices = q.user_answer.map((a) => a.answerIndex);

      let correct = 0;
      let wrong = 0;

      for (let answer of userIndices) {
        if (correctIndices.includes(answer)) {
          correct += 1;
        } else {
          wrong += 1;
        }
      }

      let score_question = (correct - wrong) / correctIndices.length;
      
      if (Number.isNaN(score_question)) {
        score_question = 0;
      } else {
        score += Math.max(0, Math.min(score_question, 1));
      }
    });

    const finalScore = Number(score.toFixed(2));
    const maxScore = questions.length;


    let detailsHTML = "";
    questions.forEach((q, index) => {
      const correctText = q.correct_answers
        .map((a) => escapeHTML(a.answerText))
        .join(", ");
      
      const userText = q.user_answer.length > 0 
        ? q.user_answer.map((a) => escapeHTML(a.answerText)).join(", ") 
        : "<p>No answer</p>";

      const isCorrect = JSON.stringify(q.correct_answers.map(a=>a.answerIndex).sort()) === 
                        JSON.stringify(q.user_answer.map(a=>a.answerIndex).sort());
      
      const statusColor = isCorrect ? "#e6fffa" : "#fff5f5";
      const borderColor = isCorrect ? "#38b2ac" : "#e53e3e";

      detailsHTML += `
        <div style="background: ${statusColor};
         border-left: 4px solid ${borderColor}; 
         padding: 10px; 
         margin-bottom: 8px; 
         border-radius: 4px;">
          <div style="font-weight: bold;
           margin-bottom: 4px;">
           ${index + 1}. ${escapeHTML(q.name)}
           </div>

          <div style="font-size: 0.9em; color: #555;">
            Correct: ${correctText}<br>
            Your answer: ${userText}
          </div>
        </div>
      `;
    });

    const cardHTML = `
      <div class="result-card" style="background: rgba(255, 255, 255, 0.8); 
      padding: 20px; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h2 style="margin: 0; font-size: 1.5rem; color: #301832;">${escapeHTML(quizTitle)}</h2>
          <span style="font-size: 1rem; font-weight: bold; background: #f7b5d9; padding: 5px 15px; border-radius: 12px;">
            ${finalScore} / ${maxScore}
          </span>
        </div>
        
        <details style="margin-top: 10px;">
          <summary style="cursor: pointer; color: #555; font-weight: 600; outline: none;">View Details</summary>
          <div style="margin-top: 15px;">
            ${detailsHTML}
          </div>
        </details>
      </div>
    `;

    resultsContainer.insertAdjacentHTML("beforeend", cardHTML);
  });
}

const clearBtn = document.getElementById("clear-results");

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        const results = localStorage.getItem("results");

        if(!results){
          confirm("You have nothing to clear ♥")
        }
        else if (confirm("Are you sure you want to clear all results?☺")) {
            localStorage.removeItem("results");
            resultsContainer.innerHTML = '<div class="no-results">No results yet</div>';
            window.location.reload();
        }
    });
}