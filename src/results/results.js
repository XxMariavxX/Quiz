
function escapeHTML(s){ if(typeof s !== 'string') return ''; return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

function getResults(){
	try{ return JSON.parse(localStorage.getItem('results') || '[]'); }catch(e){ return []; }
}

function arraysEqualAsSets(a,b){
	if(!Array.isArray(a)) a = [];
	if(!Array.isArray(b)) b = [];
	if(a.length !== b.length) return false;
	const sa = a.map(String).sort();
	const sb = b.map(String).sort();
	return sa.every((v,i)=>v===sb[i]);
}

function computeScore(res){
	const total = (res.questions||[]).length || 1;
	let correct = 0;
	(res.questions||[]).forEach(q=>{
		if(arraysEqualAsSets(q.correct_answers||[], q.user_answer||[])) correct++;
	});
	return {correct, total};
}

function renderResults(){
	const root = document.getElementById('results');
	if(!root) return;
	const results = getResults();
	root.innerHTML = '';
	if(!results.length){ root.innerHTML = '<p>No results yet.</p>'; return; }

	results.forEach(r=>{
		const s = computeScore(r);
		const div = document.createElement('div');
		div.className = 'result-item';
		div.style.border='1px solid #ddd'; div.style.padding='8px'; div.style.marginBottom='8px';

		const title = document.createElement('div');
		title.innerHTML = `<strong>Quiz:</strong> ${escapeHTML(String(r.quizId||''))} <small>${escapeHTML((r.date||'').slice(0,19))}</small>`;
		div.appendChild(title);

		const score = document.createElement('div');
		score.textContent = `Score: ${s.correct}/${s.total} (${Math.round((s.correct/s.total)*100) || 0}%)`;
		div.appendChild(score);

		const btnDetails = document.createElement('button'); btnDetails.textContent='Details'; btnDetails.style.marginRight='6px';
		const btnDelete = document.createElement('button'); btnDelete.textContent='Delete';
		div.appendChild(btnDetails); div.appendChild(btnDelete);

		const details = document.createElement('div'); details.style.display='none'; details.style.marginTop='8px';
		(r.questions||[]).forEach((q,i)=>{
			const qd = document.createElement('div'); qd.style.marginBottom='6px';
			qd.innerHTML = `<div><strong>Q${i+1}:</strong> ${escapeHTML(q.name||'')}</div>
											<div><small><strong>Correct:</strong> ${escapeHTML((q.correct_answers||[]).join(', '))}</small></div>
											<div><small><strong>Your:</strong> ${escapeHTML((q.user_answer||[]).join(', '))}</small></div>`;
			details.appendChild(qd);
		});

		btnDetails.addEventListener('click', ()=>{ details.style.display = details.style.display==='none' ? 'block':'none'; });
		btnDelete.addEventListener('click', ()=>{
			if(!confirm('Delete this result?')) return;
			const filtered = getResults().filter(x=> x.resultId !== r.resultId);
			localStorage.setItem('results', JSON.stringify(filtered));
			renderResults();
		});

		div.appendChild(details);
		root.appendChild(div);
	});

	const clear = document.createElement('button'); clear.textContent='Clear all results'; clear.style.marginTop='6px';
	clear.addEventListener('click', ()=>{ if(confirm('Clear all results?')){ localStorage.removeItem('results'); renderResults(); } });
	root.appendChild(clear);
}

document.addEventListener('DOMContentLoaded', renderResults);
