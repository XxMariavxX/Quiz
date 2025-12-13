// function escapeHTML(unsafe) {
//   if (typeof unsafe !== "string") return "";

//   return unsafe
//     .replace(/&/g, "&amp;")
//     .replace(/</g, "&lt;")
//     .replace(/>/g, "&gt;")
//     .replace(/"/g, "&quot;")
//     .replace(/'/g, "&#039;");
// }

// function getResults() {
//   return JSON.parse(localStorage.getItem("results") || "[]");
// }

// function renderResults() {
//   const root = document.getElementById("results");
//   const results = getResults();
  
//   root.innerHTML = "";
  
//   if (results.length === 0) {
//     root.innerHTML = "<p>No results</p>";
//     return;
//   }
  
//   for (let i = 0; i < results.length; i++) {
//     const r = results[i];
//     let correct = 0;
    
//     for (let j = 0; j < r.questions.length; j++) {
//       const q = r.questions[j];
//       const c = [];
//       for (let k = 0; k < q.correct_answers.length; k++) {
//         const item = q.correct_answers[k];
//         c.push(item.answerText || item);
//       }
//       c.sort();
      
//       const u = [];
//       for (let k = 0; k < q.user_answer.length; k++) {
//         const item = q.user_answer[k];
//         u.push(item.answerText || item);
//       }
//       u.sort();
      
//       if (c.length === u.length) {
//         let same = true;
//         for (let x = 0; x < c.length; x++) {
//           if (c[x] !== u[x]) same = false;
//         }
//         if (same) correct++;
//       }
//     }
    
//     const card = document.createElement("div");
//     card.style.border = "1px solid #ddd";
//     card.style.padding = "10px";
//     card.style.marginBottom = "10px";
    
//     const info = document.createElement("div");
//     info.innerHTML = "<strong>" + escapeHTML(r.quizId) + "</strong>  " + correct + "/" + r.questions.length;
//     card.appendChild(info);
    
//     const btn = document.createElement("button");
//     btn.textContent = "Details";
//     btn.style.marginTop = "5px";
//     card.appendChild(btn);
    
//     const details = document.createElement("div");
//     details.style.display = "none";
//     details.style.marginTop = "10px";
    
//     for (let j = 0; j < r.questions.length; j++) {
//       const q = r.questions[j];
//       const div = document.createElement("div");
      
//       const c = [];
//       for (let k = 0; k < q.correct_answers.length; k++) {
//         const item = q.correct_answers[k];
//         c.push(item.answerText || item);
//       }
      
//       const u = [];
//       for (let k = 0; k < q.user_answer.length; k++) {
//         const item = q.user_answer[k];
//         u.push(item.answerText || item);
//       }
      
//       div.innerHTML = "<div><strong>Question " + (j + 1) + ":</strong> " + c.join(", ") + " / Your: " + u.join(", ") + "</div>";
//       details.appendChild(div);
//     }
    
//     card.appendChild(details);
    
//     btn.onclick = function() {
//       if (details.style.display === "none") {
//         details.style.display = "block";
//       } else {
//         details.style.display = "none";
//       }
//     };
    
//     root.appendChild(card);
//   }
// }

// document.addEventListener("DOMContentLoaded", renderResults);


const resultsContainer = document.getElementById("results");

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
        : "<em>No answer</em>";

      const isCorrect = JSON.stringify(q.correct_answers.map(a=>a.answerIndex).sort()) === 
                        JSON.stringify(q.user_answer.map(a=>a.answerIndex).sort());
      
      const statusColor = isCorrect ? "#e6fffa" : "#fff5f5";
      const borderColor = isCorrect ? "#38b2ac" : "#e53e3e";

      detailsHTML += `
        <div style="background: ${statusColor}; border-left: 4px solid ${borderColor}; padding: 10px; margin-bottom: 8px; border-radius: 4px;">
          <div style="font-weight: bold; margin-bottom: 4px;">${index + 1}. ${escapeHTML(q.name)}</div>
          <div style="font-size: 0.9em; color: #555;">
            Correct: ${correctText}<br>
            Your answer: ${userText}
          </div>
        </div>
      `;
    });

    const cardHTML = `
      <div class="result-card" style="background: rgba(255, 255, 255, 0.8); padding: 20px; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h2 style="margin: 0; font-size: 1.5rem; color: #301832;">${escapeHTML(quizTitle)}</h2>
          <span style="font-size: 1.2rem; font-weight: bold; background: #f7b5d9; padding: 5px 15px; border-radius: 12px;">
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
        if (confirm("Are you sure you want to clear all results?")) {
            localStorage.removeItem("results");
            resultsContainer.innerHTML = "<div class='no-results'>No results yet</div>";
            window.location.reload();
        }
    });
}