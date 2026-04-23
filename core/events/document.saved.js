/* ==========================================================
   FILE: core/events/document.saved.js
   MODULE: Event Handler
   SYSTEM: SM CORE
   ========================================================== */

   const JobStore = require('../project/JobStore');

   module.exports = (payload) => {
     console.log(`[EXPORTED] ${payload.job_id}`);
   
     // 1. Hämta jobb
     const job = JobStore.getJob(payload.job_id);
   
     if (!job) {
       console.warn(`[WARN] document.saved: Jobb saknas i JobStore för ${payload.job_id}`);
       return;
     }
   
     // 2. Uppdatera jobb med export-path
     job.exported_path = payload.exported_path;
     job.status = "completed";
     job.completed_at = new Date().toISOString();
   
     // 3. Spara tillbaka i JobStore
     JobStore.saveJob(job);
   
     // 4. Logga slutstatus
     console.log(`[COMPLETED] ${payload.job_id}`);
   };
   
