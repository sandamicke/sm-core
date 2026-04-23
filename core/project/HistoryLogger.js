/* ==========================================================
   HISTORY LOGGER – auto-trim, timestamps, ren loggning
   ========================================================== */

   const fs = require('fs');
   const path = require('path');
   
   class HistoryLogger {
     constructor(projectPath) {
       this.projectPath = projectPath;
       this.maxEntries = 100; // auto-trim
     }
   
     loadProject() {
       try {
         const data = fs.readFileSync(this.projectPath, 'utf8');
         return JSON.parse(data);
       } catch {
         return { history: [] };
       }
     }
   
     saveProject(project) {
       fs.writeFileSync(this.projectPath, JSON.stringify(project, null, 2));
     }
   
     log(job_id, status) {
       const project = this.loadProject();
   
       const entry = {
         job_id,
         status,
         timestamp: new Date().toISOString()
       };
   
       project.history.push(entry);
   
       // Auto-trim
       if (project.history.length > this.maxEntries) {
         project.history = project.history.slice(-this.maxEntries);
       }
   
       this.saveProject(project);
   
       console.log(`[HISTORY] ${job_id} → ${status}`);
     }
   }
   
   // ⭐ Exportera en instans – inte klassen
   module.exports = new HistoryLogger(path.join(__dirname, '../../project.json'));
   
