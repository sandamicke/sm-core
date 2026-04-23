/* ==========================================================
   EVENT: images.received
   ========================================================== */

   const dispatcher = require('./dispatcher');
   const JobManager = require('../jobs/JobManager');
   
   module.exports = (payload) => {
     console.log("📸 Event triggered: images.received");
     console.log("Payload:", payload);
   
     // 1. Loggning – klart ovan
   
     // 2. Statusuppdatering – ej relevant här (job skapas nu)
   
     // 3. Modul-anrop – skapa jobb
     const job = JobManager.createJob(payload);
   
     // 4. Trigga nästa event (sker i JobManager.createJob)
     //    → job.created
     //    → job.ready_for_processing
   };
   
