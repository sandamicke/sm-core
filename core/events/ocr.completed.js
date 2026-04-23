/* ==========================================================
   FILE: core/events/ocr.completed.js
   MODULE: Event Handler
   SYSTEM: SM CORE
   ========================================================== */

   const dispatcher = require('./dispatcher');
   const JobStore = require('../project/JobStore');
   const DocumentGenerator = require('../documents/DocumentGenerator');
   
   module.exports = async (payload) => {
     console.log(`[OCR DONE] ${payload.job_id}`);
   
     // 1. Uppdatera status
     JobStore.updateStatus(payload.job_id, "ocr_completed");
   
     // 2. Hämta jobb från JobStore
     let job = JobStore.getJob(payload.job_id);
   
     // 3. Om jobbet saknas – bygg och spara ett temporärt jobbobjekt
     if (!job) {
       console.warn(`[WARN] Inget jobb hittades i JobStore för ${payload.job_id}, bygger temporärt jobbobjekt.`);
   
       job = {
         job_id: payload.job_id,
         before: payload.before || {},
         after: payload.after || {},
         metadata: payload.metadata || {},
         status: "ocr_completed"
       };
   
       // ⭐ Spara tillbaka i JobStore så resten av pipen fungerar
       JobStore.saveJob(job);
     }
   
     // 4. Trigga dokumentgenerering
     await DocumentGenerator.generate(job, payload);
   };
   
