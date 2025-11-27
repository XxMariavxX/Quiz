function escapeHTML(unsafe) {
  if (typeof unsafe !== "string") return "";

  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getResults() {
  return JSON.parse(localStorage.getItem("results") || "[]");
}

function renderResults() {
  const root = document.getElementById("results");
  const results = getResults();
  
  root.innerHTML = "";
  
  if (results.length === 0) {
    root.innerHTML = "<p>No results</p>";
    return;
  }
  
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    let correct = 0;
    
    for (let j = 0; j < r.questions.length; j++) {
      const q = r.questions[j];
      const c = [];
      for (let k = 0; k < q.correct_answers.length; k++) {
        const item = q.correct_answers[k];
        c.push(item.answerText || item);
      }
      c.sort();
      
      const u = [];
      for (let k = 0; k < q.user_answer.length; k++) {
        const item = q.user_answer[k];
        u.push(item.answerText || item);
      }
      u.sort();
      
      if (c.length === u.length) {
        let same = true;
        for (let x = 0; x < c.length; x++) {
          if (c[x] !== u[x]) same = false;
        }
        if (same) correct++;
      }
    }
    
    const card = document.createElement("div");
    card.style.border = "1px solid #ddd";
    card.style.padding = "10px";
    card.style.marginBottom = "10px";
    
    const info = document.createElement("div");
    info.innerHTML = "<strong>" + escapeHTML(r.quizId) + "</strong> - " + correct + "/" + r.questions.length;
    card.appendChild(info);
    
    const btn = document.createElement("button");
    btn.textContent = "Details";
    btn.style.marginTop = "5px";
    card.appendChild(btn);
    
    const details = document.createElement("div");
    details.style.display = "none";
    details.style.marginTop = "10px";
    
    for (let j = 0; j < r.questions.length; j++) {
      const q = r.questions[j];
      const div = document.createElement("div");
      
      const c = [];
      for (let k = 0; k < q.correct_answers.length; k++) {
        const item = q.correct_answers[k];
        c.push(item.answerText || item);
      }
      
      const u = [];
      for (let k = 0; k < q.user_answer.length; k++) {
        const item = q.user_answer[k];
        u.push(item.answerText || item);
      }
      
      div.innerHTML = "<div><strong>Question " + (j + 1) + ":</strong> " + c.join(", ") + " / Your: " + u.join(", ") + "</div>";
      details.appendChild(div);
    }
    
    card.appendChild(details);
    
    btn.onclick = function() {
      if (details.style.display === "none") {
        details.style.display = "block";
      } else {
        details.style.display = "none";
      }
    };
    
    root.appendChild(card);
  }
}

document.addEventListener("DOMContentLoaded", renderResults);