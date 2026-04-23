/* ==========================================================
   FILE: server.js
   MODULE: Minimal Web UI
   SYSTEM: SM CORE
   ========================================================== */

// ⭐ Krävs för StackBlitz – tvinga port 3000
process.env.PORT = 3000;

const express = require('express');
const JobStore = require('./core/project/JobStore');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  const project = JobStore.loadProject();

  let html = `
    <h1>SM Core – Job Overview</h1>
    <p>En första liten titt i webbläsaren.</p>
    <hr>
  `;

  if (!project.jobs || project.jobs.length === 0) {
    html += `<p>Inga jobb ännu. Kör pipen i terminalen.</p>`;
  } else {
    html += `<ul>`;
    for (const job of project.jobs) {
      html += `
        <li>
          <strong>${job.title || job.id}</strong><br>
          Status: ${job.status}<br>
          Dokument: ${job.document || '–'}<br>
          Export: ${job.export || '–'}
        </li>
        <br>
      `;
    }
    html += `</ul>`;
  }

  res.send(html);
});

// ⭐ Viktigt för StackBlitz – lyssna på 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Web UI körs på http://localhost:${PORT}`);
});
