/* ==========================================================
   EVENT: document.generated
   ========================================================== */

   const dispatcher = require('./dispatcher');
   const ExportManager = require('../exports/ExportManager');
   const JobStore = require('../project/JobStore');
   
   module.exports = async (payload) => {
     console.log(`[PDF DONE] ${payload.job_id}`);
   
     // 1. Statusuppdatering
     JobStore.updateStatus(payload.job_id, "document_generated");
   
     // 2. Hämta job-objektet
     const job = JobStore.getJob(payload.job_id);
   
     if (!job) {
       console.warn(`[WARN] Inget jobb hittades i JobStore för ${payload.job_id}.`);
       return;
     }
   
     // 3. Exportera dokumentet (vänta på resultatet)
     const exportedPath = await ExportManager.export(job, payload, payload.document_path);
   
     // 4. Trigga nästa event
     dispatcher.emit("document.saved", {
       job_id: payload.job_id,
       exported_path: exportedPath
     });
   };
   
